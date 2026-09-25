from __future__ import annotations

from dataclasses import dataclass
from datetime import timedelta
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import get_settings
from ..models import AuthSession, User, utc_now
from ..security import hash_token, make_token


@dataclass(frozen=True)
class IssuedTokens:
    access_token: str
    refresh_token: str
    expires_in: int
    session: AuthSession


def issue_session(db: Session, user: User, client_type: str) -> IssuedTokens:
    settings = get_settings()
    now = utc_now()
    access_token = make_token(32)
    refresh_token = make_token(48)
    session = AuthSession(
        session_uuid=str(uuid4()),
        user_id=user.id,
        access_token_hash=hash_token(access_token),
        refresh_token_hash=hash_token(refresh_token),
        client_type=client_type,
        access_expires_at=now + timedelta(minutes=settings.access_token_minutes),
        expires_at=now + timedelta(days=settings.refresh_token_days),
    )
    db.add(session)
    db.flush()
    return IssuedTokens(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.access_token_minutes * 60,
        session=session,
    )


def find_access_session(db: Session, access_token: str) -> AuthSession | None:
    return db.scalar(
        select(AuthSession).where(
            AuthSession.access_token_hash == hash_token(access_token),
            AuthSession.revoked_at.is_(None),
            AuthSession.access_expires_at > utc_now(),
        )
    )


def rotate_refresh_token(db: Session, refresh_token: str) -> tuple[IssuedTokens, User] | None:
    session = db.scalar(
        select(AuthSession).where(
            AuthSession.refresh_token_hash == hash_token(refresh_token),
            AuthSession.revoked_at.is_(None),
            AuthSession.expires_at > utc_now(),
        )
    )
    if session is None or session.user.status != 1:
        return None

    session.revoked_at = utc_now()
    return issue_session(db, session.user, session.client_type), session.user

