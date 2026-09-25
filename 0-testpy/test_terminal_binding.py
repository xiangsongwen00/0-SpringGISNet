from __future__ import annotations

import asyncio
import base64

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
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


def test_terminal_binding_requires_private_key_proof() -> None:
    asyncio.run(_terminal_binding_requires_private_key_proof())


async def _terminal_binding_requires_private_key_proof() -> None:
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        registered = await client.post(
            "/api/v1/users/register",
            json={
                "username": "terminal_user",
                "password": "a-strong-passphrase",
                "client_type": "web",
                **CONSENT,
            },
        )
        assert registered.status_code == 201, registered.text
        web_headers = {"Authorization": f"Bearer {registered.json()['access_token']}"}
        apk_login = await client.post(
            "/api/v1/auth/login",
            json={"username": "terminal_user", "password": "a-strong-passphrase", "client_type": "auth_apk"},
        )
        assert apk_login.status_code == 200, apk_login.text
        headers = {"Authorization": f"Bearer {apk_login.json()['access_token']}"}

        private_key = ec.generate_private_key(ec.SECP256R1())
        public_der = private_key.public_key().public_bytes(
            serialization.Encoding.DER,
            serialization.PublicFormat.SubjectPublicKeyInfo,
        )
        public_key = base64.b64encode(public_der).decode("ascii")

        authorization = await client.post(
            "/api/v1/terminals/authorization-codes",
            headers=web_headers,
            json={"purpose": "terminal_bind", "current_password": "a-strong-passphrase"},
        )
        assert authorization.status_code == 200, authorization.text

        started = await client.post(
            "/api/v1/terminals/bind/start",
            headers=headers,
            json={
                "public_key": public_key,
                "authorization_code": authorization.json()["code"],
            },
        )
        assert started.status_code == 200, started.text
        challenge = started.json()

        bad_confirm = await client.post(
            "/api/v1/terminals/bind/confirm",
            headers=headers,
            json={
                "challenge_id": challenge["challenge_id"],
                "nonce": challenge["nonce"],
                "signature": base64.b64encode(b"not-a-signature" * 5).decode("ascii"),
            },
        )
        assert bad_confirm.status_code == 400

        signature = private_key.sign(
            challenge["nonce"].encode("utf-8"), ec.ECDSA(hashes.SHA256())
        )
        confirmed = await client.post(
            "/api/v1/terminals/bind/confirm",
            headers=headers,
            json={
                "challenge_id": challenge["challenge_id"],
                "nonce": challenge["nonce"],
                "signature": base64.b64encode(signature).decode("ascii"),
            },
        )
        assert confirmed.status_code == 201, confirmed.text
        terminal = confirmed.json()
        assert terminal["status"] == 1
        assert terminal["system_name"].startswith("terminal-")

        listed = await client.get("/api/v1/terminals", headers=web_headers)
        assert listed.status_code == 200, listed.text
        assert [item["terminal_uuid"] for item in listed.json()] == [
            terminal["terminal_uuid"]
        ]

        replay = await client.post(
            "/api/v1/terminals/bind/confirm",
            headers=headers,
            json={
                "challenge_id": challenge["challenge_id"],
                "nonce": challenge["nonce"],
                "signature": base64.b64encode(signature).decode("ascii"),
            },
        )
        assert replay.status_code == 404

        quick = await client.post("/api/v1/auth/quick/start", headers=headers, json={})
        assert quick.status_code == 200, quick.text
        assert quick.json()["code"].isdigit() and len(quick.json()["code"]) == 6
        wrong_quick_username = await client.post(
            "/api/v1/auth/quick/consume",
            json={"username": "another_user", "code": quick.json()["code"], "client_name": "pytest PC"},
        )
        assert wrong_quick_username.status_code == 401
        consumed = await client.post(
            "/api/v1/auth/quick/consume",
            json={"username": "terminal_user", "code": quick.json()["code"], "client_name": "pytest PC"},
        )
        assert consumed.status_code == 200, consumed.text
        assert consumed.json()["user"]["username"] == "terminal_user"
        assert (
            await client.post(
                "/api/v1/auth/quick/consume",
                json={"username": "terminal_user", "code": quick.json()["code"], "client_name": "replay"},
            )
        ).status_code == 401

        missing_second_factor = await client.post(
            "/api/v1/terminals/authorization-codes",
            headers=web_headers,
            json={"purpose": "terminal_bind", "current_password": "a-strong-passphrase"},
        )
        assert missing_second_factor.status_code == 401

        migration = await client.post(
            "/api/v1/terminals/authorization-codes",
            headers=headers,
            json={
                "purpose": "terminal_migrate",
                "current_password": "a-strong-passphrase",
                "security_answers": CONSENT["security_answers"],
            },
        )
        assert migration.status_code == 200, migration.text
        migration_code = migration.json()["code"]
        assert 8 <= len(migration_code) <= 12
        assert migration_code.isalnum()

        no_revoke_proof = await client.post(
            f"/api/v1/terminals/{terminal['terminal_uuid']}/revoke",
            headers=web_headers,
            json={},
        )
        assert no_revoke_proof.status_code == 422

        revoke_authorization = await client.post(
            "/api/v1/terminals/revoke-codes",
            headers=headers,
            json={"code_type": "authorization_code"},
        )
        assert revoke_authorization.status_code == 200, revoke_authorization.text
        assert 8 <= len(revoke_authorization.json()["code"]) <= 12

        revoke_verification = await client.post(
            "/api/v1/terminals/revoke-codes",
            headers=headers,
            json={"code_type": "verification_code"},
        )
        assert revoke_verification.status_code == 200, revoke_verification.text
        assert revoke_verification.json()["code"].isdigit()
        assert len(revoke_verification.json()["code"]) == 6

        revoked = await client.post(
            f"/api/v1/terminals/{terminal['terminal_uuid']}/revoke",
            headers=web_headers,
            json={
                "method": "terminal_verification_code",
                "code": revoke_verification.json()["code"],
            },
        )
        assert revoked.status_code == 200, revoked.text
        listed_after_revoke = await client.get("/api/v1/terminals", headers=web_headers)
        assert listed_after_revoke.json()[0]["status"] == 3
        assert (await client.get("/api/v1/terminals/current", headers=headers)).status_code == 401
