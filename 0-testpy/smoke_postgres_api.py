"""Exercise the real PostgreSQL-backed API and remove the generated test data."""

from __future__ import annotations

import asyncio
import secrets
import sys
from pathlib import Path

from httpx import ASGITransport, AsyncClient
from sqlalchemy import delete, select


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "0-pythonServer"))

from app.database import SessionLocal  # noqa: E402
from app.main import app  # noqa: E402
from app.models import AuditLog, User  # noqa: E402


async def exercise(username: str) -> None:
    async with AsyncClient(
        transport=ASGITransport(app=app, raise_app_exceptions=True),
        base_url="http://postgres-smoke",
    ) as client:
        health = await client.get("/api/v1/health")
        assert health.status_code == 200, health.text

        registered = await client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": "smoke-test-passphrase",
                "client_type": "desktop",
                "terms_accepted": True,
                "privacy_accepted": True,
                "age_requirement_confirmed": True,
                "security_answers": [
                    {"question_id": "favorite_food", "answer": "虚构拉面"},
                    {"question_id": "nickname", "answer": "虚构昵称"},
                ],
            },
        )
        assert registered.status_code == 201, registered.text
        tokens = registered.json()

        me = await client.get(
            "/api/v1/users/me",
            headers={"Authorization": f"Bearer {tokens['access_token']}"},
        )
        assert me.status_code == 200, me.text
        assert me.json()["username"] == username

        logged_out = await client.post(
            "/api/v1/auth/logout",
            headers={"Authorization": f"Bearer {tokens['access_token']}"},
            json={"refresh_token": tokens["refresh_token"]},
        )
        assert logged_out.status_code == 200, logged_out.text


def cleanup(username: str) -> None:
    with SessionLocal.begin() as db:
        user_id = db.scalar(select(User.id).where(User.username_normalized == username))
        if user_id is None:
            return
        db.execute(delete(AuditLog).where(AuditLog.user_id == user_id))
        user = db.get(User, user_id)
        if user is not None:
            db.delete(user)


def main() -> None:
    username = f"smoke_{secrets.token_hex(5)}"
    try:
        asyncio.run(exercise(username))
        print("postgres api smoke test: ok")
    finally:
        cleanup(username)


if __name__ == "__main__":
    main()

