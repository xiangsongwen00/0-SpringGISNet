from __future__ import annotations

import secrets
from datetime import timedelta, timezone
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models import AuthorizationCode, utc_now
from ..security import hash_authorization_code


QUICK_CODE_LIFETIME_SECONDS = 45
AUTHORIZATION_CODE_LIFETIME_SECONDS = 600
AUTHORIZATION_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


def is_expired(expires_at) -> bool:
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    return expires_at <= utc_now()


def invalidate_active_codes(
    db: Session,
    *,
    purpose: str,
    user_id: int | None,
    terminal_id: int | None = None,
) -> None:
    query = select(AuthorizationCode).where(
        AuthorizationCode.purpose == purpose,
        AuthorizationCode.user_id == user_id,
        AuthorizationCode.status == 1,
    )
    if terminal_id is not None:
        query = query.where(AuthorizationCode.terminal_id == terminal_id)
    for item in db.scalars(query):
        item.status = 4


def create_authorization_code(
    db: Session,
    *,
    purpose: str,
    user_id: int | None,
    terminal_id: int | None = None,
    client_name: str | None = None,
) -> tuple[AuthorizationCode, str]:
    for _ in range(20):
        if purpose in {"QUICK_LOGIN", "TERMINAL_REVOKE_VERIFY"}:
            code = f"{secrets.randbelow(1_000_000):06d}"
            lifetime_seconds = QUICK_CODE_LIFETIME_SECONDS
        else:
            code = "".join(secrets.choice(AUTHORIZATION_CODE_ALPHABET) for _ in range(10))
            lifetime_seconds = AUTHORIZATION_CODE_LIFETIME_SECONDS
        code_hash = hash_authorization_code(purpose, code)
        collision = db.scalar(
            select(AuthorizationCode.id).where(
                AuthorizationCode.code_hash == code_hash,
                AuthorizationCode.purpose == purpose,
                AuthorizationCode.status == 1,
                AuthorizationCode.expires_at > utc_now(),
            )
        )
        if collision is None:
            break
    else:
        raise RuntimeError("无法生成唯一授权码")

    item = AuthorizationCode(
        request_uuid=str(uuid4()),
        code_hash=code_hash,
        purpose=purpose,
        user_id=user_id,
        terminal_id=terminal_id,
        client_name=client_name,
        expires_at=utc_now() + timedelta(seconds=lifetime_seconds),
    )
    db.add(item)
    db.flush()
    return item, code
