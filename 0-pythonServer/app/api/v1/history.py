from __future__ import annotations

import hashlib
import json
import os
import re
import tempfile
import unicodedata
from pathlib import Path, PurePosixPath
from uuid import uuid4

from fastapi import APIRouter, HTTPException, Query, Request, status
from sqlalchemy import select, text
from sqlalchemy.exc import OperationalError

from ...config import get_settings
from ...models import HistoryArticle, HistoryCatalog
from ...schemas import HistoryArticleUpsertRequest, HistoryCatalogUpdateRequest
from ...services.audit import add_audit_log
from ..dependencies import CurrentUser, DbSession


router = APIRouter(prefix="/history", tags=["history"])
settings = get_settings()
CONTENT_ROOT = Path(settings.history_content_dir).resolve()
DOCS_ROOT = (CONTENT_ROOT / "docs").resolve()
SHA256_PATTERN = re.compile(r"^[a-f0-9]{64}$")
LEGACY_LOCAL_DOCUMENTS = {"旧版阅读器说明.md", "旧版自动定位实机验收.md"}
BOOK_DIVISIONS = {"A": "经部", "B": "史部", "C": "子部", "D": "集部"}
BOOK_CATEGORY_NAMES = {
    "A01": "经部总类",
    "B01": "正史", "B02": "编年与通史", "B03": "古史杂传", "B04": "历史笔记",
    "B05": "地方与纪事", "B06": "近世史料", "B07": "国别与政权史", "B08": "传记",
    "B09": "制度与掌故",
    "C01": "先秦诸子", "C02": "儒学与蒙学", "C03": "兵农医技", "C04": "艺术与音律",
    "C05": "杂家", "C06": "笔记杂录", "C07": "类书", "C08": "志怪与轶闻", "C09": "古典小说",
    "C10": "通俗小说", "C11": "近世小说", "C12": "道教", "C13": "佛典", "C14": "续藏佛典",
    "D01": "别集与楚辞", "D02": "总集", "D03": "文论", "D04": "诗话", "D05": "戏曲",
    "D06": "词学一", "D07": "词学二", "D08": "词学三", "D09": "词学四",
}


def _require_editor(user: CurrentUser) -> None:
    if user.username_normalized not in settings.history_editor_usernames:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="没有史地资料维护权限")


def _safe_article_path(raw_path: str) -> tuple[str, Path]:
    normalized = raw_path.strip().replace("\\", "/")
    posix_path = PurePosixPath(normalized)
    if (
        not normalized.startswith("docs/")
        or posix_path.is_absolute()
        or ".." in posix_path.parts
        or posix_path.suffix.lower() != ".md"
    ):
        raise HTTPException(status_code=422, detail="文章路径必须是 docs/ 下的相对 .md 路径")
    resolved = (CONTENT_ROOT / Path(*posix_path.parts)).resolve()
    if resolved == DOCS_ROOT or DOCS_ROOT not in resolved.parents:
        raise HTTPException(status_code=422, detail="文章路径超出史地资料目录")
    return posix_path.as_posix(), resolved


def _atomic_write(path: Path, content: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(fd, "wb") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary_name, path)
    except Exception:
        try:
            os.unlink(temporary_name)
        except FileNotFoundError:
            pass
        raise


def _article_summary(article: HistoryArticle) -> dict[str, object]:
    return {
        "article_id": article.article_uuid,
        "path": article.path,
        "title": article.title,
        "case_id": article.case_id,
        "category_path": article.category_path,
        "sort_order": article.sort_order,
        "updated_at": article.updated_at,
    }


def _public_catalog(value: object) -> object:
    """Remove obsolete local-reader operation documents from the published catalog."""
    if isinstance(value, list):
        return [
            _public_catalog(item)
            for item in value
            if not (isinstance(item, str) and PurePosixPath(item.replace("\\", "/")).name in LEGACY_LOCAL_DOCUMENTS)
        ]
    if isinstance(value, dict):
        return {key: _public_catalog(item) for key, item in value.items()}
    return value


@router.get("/catalog")
def get_catalog(db: DbSession) -> dict[str, object]:
    catalog = db.get(HistoryCatalog, "cases")
    articles = db.scalars(
        select(HistoryArticle)
        .where(HistoryArticle.published.is_(True))
        .order_by(HistoryArticle.sort_order, HistoryArticle.path)
    ).all()
    payload = _public_catalog(catalog.payload) if catalog is not None else {"cases": []}
    return {"catalog": payload, "articles": [_article_summary(item) for item in articles]}


@router.get("/articles/{article_id}")
def get_article(article_id: str, db: DbSession) -> dict[str, object]:
    article = db.scalar(
        select(HistoryArticle).where(
            HistoryArticle.article_uuid == article_id,
            HistoryArticle.published.is_(True),
        )
    )
    if article is None:
        raise HTTPException(status_code=404, detail="文章不存在或尚未发布")
    _, path = _safe_article_path(article.path)
    if not path.is_file():
        raise HTTPException(status_code=503, detail="文章文件尚未部署")
    content_bytes = path.read_bytes()
    digest = hashlib.sha256(content_bytes).hexdigest()
    if digest != article.sha256 or not SHA256_PATTERN.fullmatch(digest):
        raise HTTPException(status_code=409, detail="文章文件完整性校验失败")
    try:
        content = content_bytes.decode("utf-8-sig")
    except UnicodeDecodeError as exc:
        raise HTTPException(status_code=409, detail="文章不是 UTF-8 编码") from exc
    return {
        **_article_summary(article),
        "content": content,
        "sha256": digest,
        "byte_size": len(content_bytes),
    }


@router.put("/admin/articles")
def upsert_article(
    payload: HistoryArticleUpsertRequest,
    request: Request,
    db: DbSession,
    user: CurrentUser,
) -> dict[str, object]:
    _require_editor(user)
    relative_path, destination = _safe_article_path(payload.path)
    content_bytes = payload.content.encode("utf-8")
    if len(content_bytes) > settings.history_max_upload_bytes:
        raise HTTPException(status_code=413, detail="Markdown 文件超过服务器允许大小")
    if any(len(part) > 255 for part in payload.category_path):
        raise HTTPException(status_code=422, detail="目录名称过长")

    digest = hashlib.sha256(content_bytes).hexdigest()
    article = db.scalar(select(HistoryArticle).where(HistoryArticle.path == relative_path))
    if article is None:
        article = HistoryArticle(
            article_uuid=str(uuid4()),
            path=relative_path,
            title=payload.title.strip(),
            created_by=user.id,
            updated_by=user.id,
            sha256=digest,
            byte_size=len(content_bytes),
        )
        db.add(article)
    article.title = payload.title.strip()
    article.case_id = payload.case_id.strip() if payload.case_id else None
    article.category_path = [part.strip() for part in payload.category_path if part.strip()]
    article.published = payload.published
    article.sort_order = payload.sort_order
    article.sha256 = digest
    article.byte_size = len(content_bytes)
    article.updated_by = user.id

    previous_content = destination.read_bytes() if destination.is_file() else None
    _atomic_write(destination, content_bytes)
    add_audit_log(
        db,
        event_type="history_article_upsert",
        result="success",
        ip_address=request.client.host if request.client else None,
        user_id=user.id,
        detail={"path": relative_path, "sha256": digest, "published": payload.published},
    )
    try:
        db.commit()
    except Exception:
        db.rollback()
        if previous_content is None:
            destination.unlink(missing_ok=True)
        else:
            _atomic_write(destination, previous_content)
        raise
    db.refresh(article)
    return _article_summary(article)


@router.put("/admin/catalog")
def update_catalog(
    payload: HistoryCatalogUpdateRequest,
    request: Request,
    db: DbSession,
    user: CurrentUser,
) -> dict[str, object]:
    _require_editor(user)
    cleaned_payload = _public_catalog(payload.payload)
    if not isinstance(cleaned_payload, dict):
        raise HTTPException(status_code=422, detail="目录格式无效")
    cases = cleaned_payload.get("cases")
    if not isinstance(cases, list):
        raise HTTPException(status_code=422, detail="目录必须包含 cases 数组")
    encoded = json.dumps(cleaned_payload, ensure_ascii=False, indent=2).encode("utf-8") + b"\n"
    if len(encoded) > settings.history_max_upload_bytes:
        raise HTTPException(status_code=413, detail="目录文件超过服务器允许大小")
    catalog_path = DOCS_ROOT / "cases.json"
    previous_content = catalog_path.read_bytes() if catalog_path.is_file() else None
    _atomic_write(catalog_path, encoded)
    catalog = db.get(HistoryCatalog, "cases")
    if catalog is None:
        catalog = HistoryCatalog(catalog_key="cases", payload=cleaned_payload, updated_by=user.id)
        db.add(catalog)
    else:
        catalog.payload = cleaned_payload
        catalog.updated_by = user.id
    add_audit_log(
        db,
        event_type="history_catalog_update",
        result="success",
        ip_address=request.client.host if request.client else None,
        user_id=user.id,
        detail={"case_count": len(cases)},
    )
    try:
        db.commit()
    except Exception:
        db.rollback()
        if previous_content is None:
            catalog_path.unlink(missing_ok=True)
        else:
            _atomic_write(catalog_path, previous_content)
        raise
    return {"message": "史地目录已更新", "case_count": len(cases)}


@router.get("/text/books")
def list_books(
    db: DbSession,
    limit: int = Query(50, ge=1, le=1000),
    offset: int = Query(0, ge=0, le=1_000_000),
) -> list[dict[str, object]]:
    rows = db.execute(text("""
        SELECT b.book_id, b.title, count(c.chapter_id) AS chapter_count,
               count(c.original_text) AS text_chapter_count
        FROM history.books b LEFT JOIN history.chapters c USING (book_id)
        GROUP BY b.book_id, b.title ORDER BY b.book_id LIMIT :limit OFFSET :offset
    """), {"limit": limit, "offset": offset}).mappings()
    result: list[dict[str, object]] = []
    for row in rows:
        item = dict(row)
        category_code = str(item["book_id"]).split("-", 1)[0].upper()
        item["division"] = BOOK_DIVISIONS.get(category_code[:1], "未分类")
        item["category_code"] = category_code
        item["category_name"] = BOOK_CATEGORY_NAMES.get(category_code, f"库内 {category_code} 类")
        result.append(item)
    return result


@router.get("/text/books/{book_id}/chapters")
def list_chapters(
    book_id: str,
    db: DbSession,
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0, le=1_000_000),
) -> list[dict[str, object]]:
    rows = db.execute(text("""
        SELECT chapter_id, book_id, chapter_index, title,
               CASE WHEN btrim(title) = '' THEN '原记录无标题' ELSE title END AS display_title,
               verification_status, source_sha256, decoder, length(original_text) AS text_length
        FROM history.chapters WHERE book_id = :book_id
        ORDER BY chapter_index LIMIT :limit OFFSET :offset
    """), {"book_id": book_id, "limit": limit, "offset": offset}).mappings()
    return [dict(row) for row in rows]


@router.get("/text/chapters/{chapter_id}/paragraphs")
def list_paragraphs(
    chapter_id: str,
    db: DbSession,
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0, le=1_000_000),
) -> list[dict[str, object]]:
    rows = db.execute(text("""
        SELECT chapter_id, ordinal, original_text, normalized_text
        FROM history.paragraphs WHERE chapter_id = :chapter_id
        ORDER BY ordinal LIMIT :limit OFFSET :offset
    """), {"chapter_id": chapter_id, "limit": limit, "offset": offset}).mappings()
    return [dict(row) for row in rows]


@router.get("/text/chapters/{chapter_id}")
def get_chapter(chapter_id: str, db: DbSession) -> dict[str, object]:
    row = db.execute(text("""
        SELECT c.chapter_id, c.book_id, b.title AS book_title, c.chapter_index,
               c.title,
               CASE WHEN btrim(c.title) = '' THEN '原记录无标题' ELSE c.title END AS display_title,
               c.verification_status, c.source_sha256, c.decoder,
               c.original_text, length(c.original_text) AS text_length
        FROM history.chapters c
        JOIN history.books b USING (book_id)
        WHERE c.chapter_id = :chapter_id
    """), {"chapter_id": chapter_id}).mappings().one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="章节不存在")
    return dict(row)


def _escape_like(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


@router.get("/text/search")
def search_text(
    db: DbSession,
    q: str = Query(min_length=1, max_length=80),
    book_id: str | None = None,
    limit: int = Query(20, ge=1, le=50),
    offset: int = Query(0, ge=0, le=100_000),
    normalized: bool = False,
) -> dict[str, object]:
    if "\x00" in q or not q.strip():
        raise HTTPException(status_code=422, detail="检索词不能为空")
    raw_term = q.strip()
    if len(raw_term) < 2 and not book_id:
        raise HTTPException(status_code=422, detail="全库检索至少输入2个字；检索单字请先选择书目")
    term = unicodedata.normalize("NFKC", raw_term) if normalized else raw_term
    column = "p.normalized_text" if normalized else "p.original_text"
    book_filter = " AND c.book_id = :book_id" if book_id else ""
    # pg_trgm cannot form a trigram for one- or two-character terms. For those
    # queries, collect only the requested paragraph rows before joining and
    # sorting metadata. This lets PostgreSQL stop as soon as it has enough
    # matches instead of scanning and sorting all 3M+ paragraphs.
    if len(term) < 3:
        short_book_join = " JOIN history.chapters filter_c USING (chapter_id)" if book_id else ""
        short_book_filter = " AND filter_c.book_id = :book_id" if book_id else ""
        query = text(f"""
            WITH matches AS MATERIALIZED (
                SELECT p.chapter_id, p.ordinal, p.original_text, p.normalized_text
                FROM history.paragraphs p{short_book_join}
                WHERE {column} LIKE :pattern ESCAPE '\\'{short_book_filter}
                LIMIT :limit OFFSET :offset
            )
            SELECT c.book_id, b.title AS book_title, c.chapter_id,
                   CASE WHEN btrim(c.title) = '' THEN '原记录无标题' ELSE c.title END AS chapter_title,
                   m.ordinal, m.original_text, m.normalized_text, c.verification_status
            FROM matches m
            JOIN history.chapters c USING (chapter_id)
            JOIN history.books b USING (book_id)
            ORDER BY c.book_id, c.chapter_index, m.ordinal
        """)
    else:
        # The only interpolated fragments are server-selected constants; user values stay bound parameters.
        query = text(f"""
            SELECT c.book_id, b.title AS book_title, c.chapter_id,
                   CASE WHEN btrim(c.title) = '' THEN '原记录无标题' ELSE c.title END AS chapter_title,
                   p.ordinal, p.original_text, p.normalized_text, c.verification_status
            FROM history.paragraphs p
            JOIN history.chapters c USING (chapter_id)
            JOIN history.books b USING (book_id)
            WHERE {column} LIKE :pattern ESCAPE '\\'{book_filter}
            ORDER BY c.book_id, c.chapter_index, p.ordinal
            LIMIT :limit OFFSET :offset
        """)
    parameters: dict[str, object] = {
        "pattern": f"%{_escape_like(term)}%",
        "limit": limit + 1,
        "offset": offset,
    }
    if book_id:
        parameters["book_id"] = book_id
    db.execute(text("SET LOCAL statement_timeout = '20s'"))
    try:
        rows = [dict(row) for row in db.execute(query, parameters).mappings()]
    except OperationalError as exc:
        sqlstate = getattr(exc.orig, "sqlstate", None) or getattr(exc.orig, "pgcode", None)
        if sqlstate == "57014":
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="原文检索超时，请增加检索词字数或指定书目后重试",
            ) from exc
        raise
    return {
        "query": q,
        "normalized": normalized,
        "items": rows[:limit],
        "limit": limit,
        "offset": offset,
        "has_more": len(rows) > limit,
    }
