#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"
[[ -f .env ]] && set -a && source .env && set +a

: "${POSTGRES_CONTAINER:?请设置 POSTGRES_CONTAINER}"
: "${TARGET_DATABASE:?请设置 TARGET_DATABASE}"
: "${TARGET_USER:?请设置 TARGET_USER}"
: "${DUMP_FILE:=history-data.dump}"
: "${MANIFEST_FILE:=history-data.manifest}"

[[ -f "$DUMP_FILE" ]] || { echo "找不到归档: $DUMP_FILE" >&2; exit 2; }
[[ -f "$MANIFEST_FILE" ]] || { echo "找不到校验清单: $MANIFEST_FILE" >&2; exit 2; }
set -a
source "$MANIFEST_FILE"
set +a

actual_sha="$(sha256sum "$DUMP_FILE" | awk '{print $1}')"
[[ "$actual_sha" == "$DUMP_SHA256" ]] || { echo "归档 SHA256 不一致，停止迁移" >&2; exit 3; }

if [[ -z "${TARGET_PASSWORD:-}" ]]; then
  read -rsp "数据库用户 ${TARGET_USER} 的密码: " TARGET_PASSWORD
  echo
fi

psql_exec() {
  docker exec -e PGPASSWORD="$TARGET_PASSWORD" "$POSTGRES_CONTAINER" \
    psql -X -v ON_ERROR_STOP=1 -U "$TARGET_USER" -d "$TARGET_DATABASE" "$@"
}

for table in import_runs books chapters paragraphs character_notes chapter_assets; do
  psql_exec -Atc "SELECT to_regclass('history.${table}') IS NOT NULL" | grep -qx t || {
    echo "缺少 history.${table}。请先在 0-pythonServer 执行 python index.py --migrate" >&2
    exit 4
  }
done

existing="$(psql_exec -Atc 'SELECT count(*) FROM history.books')"
[[ "$existing" == "0" ]] || {
  echo "目标 history.books 已有 ${existing} 行；为避免覆盖，本服务拒绝继续。" >&2
  exit 5
}

backup="history-before-$(date +%Y%m%d-%H%M%S).dump"
echo "创建迁移前结构备份: $backup"
docker exec -e PGPASSWORD="$TARGET_PASSWORD" "$POSTGRES_CONTAINER" \
  pg_dump -U "$TARGET_USER" -d "$TARGET_DATABASE" --schema=history --format=custom --no-owner --no-acl > "$backup"

cleanup_indexes() {
  psql_exec -c 'CREATE INDEX IF NOT EXISTS paragraphs_original_trgm ON history.paragraphs USING gin(original_text gin_trgm_ops);'
  psql_exec -c 'CREATE INDEX IF NOT EXISTS paragraphs_normalized_trgm ON history.paragraphs USING gin(normalized_text gin_trgm_ops);'
}
trap cleanup_indexes EXIT
psql_exec -c 'DROP INDEX IF EXISTS history.paragraphs_original_trgm; DROP INDEX IF EXISTS history.paragraphs_normalized_trgm;'

echo "开始恢复数据（不经过 PgBouncer）..."
docker exec -i -e PGPASSWORD="$TARGET_PASSWORD" "$POSTGRES_CONTAINER" \
  pg_restore -U "$TARGET_USER" -d "$TARGET_DATABASE" --data-only --schema=history \
  --single-transaction --exit-on-error --no-owner --no-privileges < "$DUMP_FILE"

cleanup_indexes
trap - EXIT
psql_exec -c 'ANALYZE history.books; ANALYZE history.chapters; ANALYZE history.paragraphs; ANALYZE history.character_notes; ANALYZE history.chapter_assets;'

verify_count() {
  local table="$1" expected="$2" actual
  actual="$(psql_exec -Atc "SELECT count(*) FROM history.${table}")"
  printf '%-20s expected=%s actual=%s\n' "$table" "$expected" "$actual"
  [[ "$actual" == "$expected" ]]
}
verify_count books "$BOOKS"
verify_count chapters "$CHAPTERS"
verify_count paragraphs "$PARAGRAPHS"
verify_count character_notes "$CHARACTER_NOTES"
verify_count chapter_assets "$CHAPTER_ASSETS"
echo "史地原文库迁移与数量核验完成。"
