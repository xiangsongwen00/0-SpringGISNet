"""Read-only database schema checks for the deployed authentication API."""

from __future__ import annotations

import sys
from pathlib import Path

from sqlalchemy import inspect, text


ROOT = Path(__file__).resolve().parents[1]
SERVER_DIR = ROOT / "0-pythonServer"
sys.path.insert(0, str(SERVER_DIR))

from app.database import engine  # noqa: E402


EXPECTED_COLUMNS = {
    "users": {
        "id",
        "user_uuid",
        "username",
        "username_normalized",
        "password_hash",
        "status",
        "password_changed_at",
        "created_at",
        "updated_at",
    },
    "sessions": {
        "id",
        "session_uuid",
        "user_id",
        "terminal_id",
        "access_token_hash",
        "refresh_token_hash",
        "client_type",
        "access_expires_at",
        "expires_at",
        "created_at",
        "last_seen_at",
        "revoked_at",
    },
    "audit_logs": {
        "id",
        "user_id",
        "terminal_id",
        "event_type",
        "result",
        "ip_hash",
        "detail_json",
        "created_at",
    },
    "user_consents": {
        "id",
        "user_id",
        "terms_version",
        "privacy_version",
        "client_type",
        "consented_at",
    },
}


def main() -> None:
    inspector = inspect(engine)
    tables = set(inspector.get_table_names())
    print("database_connection=ok")
    print("tables=" + ",".join(sorted(tables)))

    for table, expected in EXPECTED_COLUMNS.items():
        if table not in tables:
            print(f"table.{table}=missing")
            continue
        actual = {column["name"] for column in inspector.get_columns(table)}
        missing = sorted(expected - actual)
        print(f"table.{table}=ok" if not missing else f"table.{table}.missing={','.join(missing)}")

    with engine.connect() as connection:
        endpoint = connection.execute(
            text(
                "SELECT inet_server_addr()::text, inet_server_port(), "
                "current_database(), current_user"
            )
        ).one()
        print(f"postgres_server={endpoint[0]}:{endpoint[1]}")
        print(f"postgres_database={endpoint[2]}")
        print(f"postgres_user={endpoint[3]}")
        if "schema_migrations" in tables:
            versions = connection.execute(
                text("SELECT version FROM schema_migrations ORDER BY version")
            ).scalars()
            print("migrations=" + ",".join(versions))
        probe_count = connection.execute(
            text(
                "SELECT COUNT(*) FROM users "
                "WHERE username_normalized LIKE 'codex_probe_%'"
            )
        ).scalar_one()
        print(f"failed_probe_users={probe_count}")


if __name__ == "__main__":
    main()
