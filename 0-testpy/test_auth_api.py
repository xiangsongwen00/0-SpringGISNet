from __future__ import annotations

import asyncio

from httpx import ASGITransport, AsyncClient

from app.database import Base, engine
from app.main import app

CONSENT = {
    "terms_accepted": True,
    "privacy_accepted": True,
    "age_requirement_confirmed": True,
    "security_answers": [
        {"question_id": "favorite_food", "answer": "虚构拉面"},
        {"question_id": "nickname", "answer": "虚构昵称"},
    ],
}

def setup_function() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_register_login_refresh_logout_flow() -> None:
    asyncio.run(_register_login_refresh_logout_flow())


async def _register_login_refresh_logout_flow() -> None:
    client = AsyncClient(transport=ASGITransport(app=app), base_url="http://test")
    registered = await client.post(
        "/api/v1/users/register",
        json={"username": "Map_User", "password": "a-strong-passphrase", "client_type": "desktop", **CONSENT},
    )
    assert registered.status_code == 201, registered.text
    body = registered.json()
    assert body["user"]["username"] == "Map_User"
    assert "password" not in body["user"]

    duplicate = await client.post(
        "/api/v1/users/register",
        json={"username": "map_user", "password": "another-passphrase", "client_type": "desktop", **CONSENT},
    )
    assert duplicate.status_code == 409

    wrong = await client.post(
        "/api/v1/auth/login",
        json={"username": "Map_User", "password": "wrong-password", "client_type": "desktop"},
    )
    assert wrong.status_code == 401
    assert wrong.json()["detail"] == "用户名或凭据不正确"

    logged_in = await client.post(
        "/api/v1/auth/login",
        json={"username": "map_user", "password": "a-strong-passphrase", "client_type": "desktop"},
    )
    assert logged_in.status_code == 200, logged_in.text
    tokens = logged_in.json()

    me = await client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {tokens['access_token']}"},
    )
    assert me.status_code == 200
    assert me.json()["username"] == "Map_User"

    refreshed = await client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": tokens["refresh_token"]},
    )
    assert refreshed.status_code == 200, refreshed.text
    assert refreshed.json()["access_token"] != tokens["access_token"]

    replay = await client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": tokens["refresh_token"]},
    )
    assert replay.status_code == 401

    current = refreshed.json()
    logged_out = await client.post(
        "/api/v1/auth/logout",
        headers={"Authorization": f"Bearer {current['access_token']}"},
        json={"refresh_token": current["refresh_token"]},
    )
    assert logged_out.status_code == 200
    final_me = await client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {current['access_token']}"},
    )
    assert final_me.status_code == 401
    await client.aclose()


def test_registration_rejects_identity_fields_and_weak_inputs() -> None:
    asyncio.run(_registration_rejects_identity_fields_and_weak_inputs())


async def _registration_rejects_identity_fields_and_weak_inputs() -> None:
    client = AsyncClient(transport=ASGITransport(app=app), base_url="http://test")
    extra_identity_data = await client.post(
        "/api/v1/users/register",
        json={
            "username": "anon_user",
            "password": "a-strong-passphrase",
            "email": "should-not-be-collected@example.com",
            **CONSENT,
        },
    )
    assert extra_identity_data.status_code == 422

    chinese_username = await client.post(
        "/api/v1/users/register",
        json={"username": "春秋地图", "password": "a-strong-passphrase", **CONSENT},
    )
    assert chinese_username.status_code == 201, chinese_username.text
    assert chinese_username.json()["user"]["username"] == "春秋地图"

    invalid_username = await client.post(
        "/api/v1/users/register",
        json={"username": "含 空格", "password": "a-strong-passphrase", **CONSENT},
    )
    assert invalid_username.status_code == 422

    weak_password = await client.post(
        "/api/v1/users/register",
        json={"username": "valid_name", "password": "short", **CONSENT},
    )
    assert weak_password.status_code == 422

    missing_consent = await client.post(
        "/api/v1/users/register",
        json={"username": "no_consent", "password": "a-strong-passphrase"},
    )
    assert missing_consent.status_code == 422
    await client.aclose()


def test_web_refresh_token_stays_in_http_only_cookie() -> None:
    asyncio.run(_web_refresh_token_stays_in_http_only_cookie())


async def _web_refresh_token_stays_in_http_only_cookie() -> None:
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        registered = await client.post(
            "/api/v1/users/register",
            json={"username": "web_cookie", "password": "a-strong-passphrase", **CONSENT},
        )
        assert registered.status_code == 201, registered.text
        assert registered.json()["refresh_token"] is None
        set_cookie = registered.headers["set-cookie"].lower()
        assert "httponly" in set_cookie
        assert "samesite=strict" in set_cookie

        refreshed = await client.post("/api/v1/auth/refresh", json={})
        assert refreshed.status_code == 200, refreshed.text

        logged_out = await client.post("/api/v1/auth/logout", json={})
        assert logged_out.status_code == 200
        assert (await client.post("/api/v1/auth/refresh", json={})).status_code == 401

