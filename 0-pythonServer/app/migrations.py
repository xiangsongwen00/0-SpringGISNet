from __future__ import annotations

from pathlib import Path

from .config import BASE_DIR
from .database import engine


MIGRATIONS_DIR = BASE_DIR / "migrations"


def apply_migrations(migrations_dir: Path = MIGRATIONS_DIR) -> list[tuple[str, str]]:
    """Apply pending SQL migrations and return (version, result) entries."""
    if not migrations_dir.is_dir():
        raise RuntimeError(f"找不到数据库迁移目录: {migrations_dir}")

    connection = engine.raw_connection()
    results: list[tuple[str, str]] = []
    try:
        connection.autocommit = True
        with connection.cursor() as cursor:
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS schema_migrations (
                    version VARCHAR(128) PRIMARY KEY,
                    applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cursor.execute("SELECT version FROM schema_migrations")
            applied = {row[0] for row in cursor.fetchall()}

            migration_paths = sorted(migrations_dir.glob("*.sql"))
            if not migration_paths:
                raise RuntimeError(f"迁移目录中没有 SQL 文件: {migrations_dir}")

            for path in migration_paths:
                if path.name in applied:
                    results.append((path.name, "skipped"))
                    continue
                cursor.execute(path.read_text(encoding="utf-8"))
                cursor.execute(
                    "INSERT INTO schema_migrations (version) VALUES (%s)",
                    (path.name,),
                )
                results.append((path.name, "applied"))
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()
    return results

