"""Import the bundled Markdown catalog into the SpringGIS database.

This script is intentionally separate from application startup. It never creates users and
only associates imported content with an already-existing editor account.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path
from uuid import uuid4

from sqlalchemy import select

SERVER_ROOT = Path(__file__).resolve().parents[1]
if str(SERVER_ROOT) not in sys.path:
    sys.path.insert(0, str(SERVER_ROOT))

from app.config import get_settings  # noqa: E402
from app.database import SessionLocal  # noqa: E402
from app.models import HistoryArticle, HistoryCatalog, User  # noqa: E402
from app.schemas import normalize_username  # noqa: E402


HEADING = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
LEGACY_LOCAL_DOCUMENTS = {"旧版阅读器说明.md", "旧版自动定位实机验收.md"}


def public_catalog(value: object) -> object:
    if isinstance(value, list):
        return [
            public_catalog(item)
            for item in value
            if not (isinstance(item, str) and Path(item.replace("\\", "/")).name in LEGACY_LOCAL_DOCUMENTS)
        ]
    if isinstance(value, dict):
        return {key: public_catalog(item) for key, item in value.items()}
    return value


def collect_case_paths(catalog: dict[str, object]) -> dict[str, str]:
    result: dict[str, str] = {}
    for case in catalog.get("cases", []):
        if not isinstance(case, dict):
            continue
        case_id = str(case.get("id", "")) or None
        for key in ("entry",):
            value = case.get(key)
            if isinstance(value, str) and value.endswith(".md"):
                result[value.replace("\\", "/")] = case_id
        for value in case.get("documents", []):
            if isinstance(value, str) and value.endswith(".md"):
                result[value.replace("\\", "/")] = case_id
        for group in case.get("documentGroups", []):
            if not isinstance(group, dict):
                continue
            for value in group.get("documents", []):
                if isinstance(value, str) and value.endswith(".md"):
                    result[value.replace("\\", "/")] = case_id
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="导入史地预览室 Markdown 目录和文章元数据")
    parser.add_argument("--content-dir", type=Path, default=Path(get_settings().history_content_dir))
    parser.add_argument("--editor", default="springgis", help="必须是已存在的内容维护账户")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    root = args.content_dir.resolve()
    docs = root / "docs"
    catalog_path = docs / "cases.json"
    raw_catalog = json.loads(catalog_path.read_text(encoding="utf-8-sig"))
    catalog = public_catalog(raw_catalog)
    if not isinstance(catalog, dict):
        raise RuntimeError("cases.json 顶层必须是对象")
    declared_paths = collect_case_paths(catalog)
    markdown_paths = sorted(path for path in docs.rglob("*.md") if path.name not in LEGACY_LOCAL_DOCUMENTS)
    missing = sorted(path for path in declared_paths if not (root / path).is_file())
    if missing:
        raise RuntimeError(f"cases.json 引用了不存在的文章: {missing[:10]}")

    if args.dry_run:
        print(json.dumps({"root": str(root), "articles": len(markdown_paths), "missing": 0}, ensure_ascii=False))
        return 0

    with SessionLocal() as db:
        editor = db.scalar(select(User).where(User.username_normalized == normalize_username(args.editor)))
        if editor is None:
            raise RuntimeError(f"维护账户不存在，不会自动创建用户: {args.editor}")
        catalog_row = db.get(HistoryCatalog, "cases")
        if catalog_row is None:
            catalog_row = HistoryCatalog(catalog_key="cases", payload=catalog, updated_by=editor.id)
            db.add(catalog_row)
        else:
            catalog_row.payload = catalog
            catalog_row.updated_by = editor.id

        imported = 0
        for sort_order, file_path in enumerate(markdown_paths):
            relative = file_path.relative_to(root).as_posix()
            raw = file_path.read_bytes()
            decoded = raw.decode("utf-8-sig")
            title_match = HEADING.search(decoded)
            title = title_match.group(1).strip() if title_match else file_path.stem
            digest = hashlib.sha256(raw).hexdigest()
            row = db.scalar(select(HistoryArticle).where(HistoryArticle.path == relative))
            if row is None:
                row = HistoryArticle(
                    article_uuid=str(uuid4()),
                    path=relative,
                    created_by=editor.id,
                    updated_by=editor.id,
                    title=title,
                    sha256=digest,
                    byte_size=len(raw),
                )
                db.add(row)
            row.title = title
            row.case_id = declared_paths.get(relative)
            row.category_path = list(file_path.relative_to(docs).parts[:-1])
            row.published = True
            row.sort_order = sort_order
            row.sha256 = digest
            row.byte_size = len(raw)
            row.updated_by = editor.id
            imported += 1
        db.commit()
    print(json.dumps({"catalog": "cases", "articles": imported, "editor": args.editor}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
