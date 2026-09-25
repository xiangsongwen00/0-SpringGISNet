from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import BigInteger, DateTime, ForeignKey, Index, Integer, JSON, String, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    user_uuid: Mapped[str] = mapped_column(Uuid(as_uuid=False), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(32), nullable=False)
    username_normalized: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    password_changed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now, onupdate=utc_now
    )

    sessions: Mapped[list["AuthSession"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    consents: Mapped[list["UserConsent"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    terminals: Mapped[list["Terminal"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    security_answers: Mapped[list["SecurityAnswer"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )


class UserConsent(Base):
    __tablename__ = "user_consents"

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    terms_version: Mapped[str] = mapped_column(String(32), nullable=False)
    privacy_version: Mapped[str] = mapped_column(String(32), nullable=False)
    client_type: Mapped[str] = mapped_column(String(32), nullable=False)
    consented_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now
    )

    user: Mapped[User] = relationship(back_populates="consents")


class SecurityAnswer(Base):
    __tablename__ = "security_answers"
    __table_args__ = (
        Index("idx_security_answers_user", "user_id"),
        Index("uq_security_answers_user_question", "user_id", "question_id", unique=True),
    )

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    question_id: Mapped[str] = mapped_column(String(64), nullable=False)
    answer_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now, onupdate=utc_now
    )

    user: Mapped[User] = relationship(back_populates="security_answers")


class AuthSession(Base):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    session_uuid: Mapped[str] = mapped_column(Uuid(as_uuid=False), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    terminal_id: Mapped[int | None] = mapped_column(BigInteger)
    access_token_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    refresh_token_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    client_type: Mapped[str] = mapped_column(String(32), nullable=False, default="web")
    access_expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now
    )
    last_seen_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped[User] = relationship(back_populates="sessions")


class Terminal(Base):
    __tablename__ = "terminals"
    __table_args__ = (Index("idx_terminals_user", "user_id"),)

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    terminal_uuid: Mapped[str] = mapped_column(Uuid(as_uuid=False), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    system_name: Mapped[str] = mapped_column(String(64), nullable=False)
    display_name: Mapped[str | None] = mapped_column(String(128))
    public_key: Mapped[str] = mapped_column(Text, nullable=False)
    public_key_fingerprint: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    status: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    key_version: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    bound_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utc_now)
    last_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now, onupdate=utc_now
    )

    user: Mapped[User] = relationship(back_populates="terminals")


class AuthChallenge(Base):
    __tablename__ = "auth_challenges"
    __table_args__ = (
        Index("idx_auth_challenges_user", "user_id"),
        Index("idx_auth_challenges_expires", "expires_at"),
    )

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    challenge_uuid: Mapped[str] = mapped_column(Uuid(as_uuid=False), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    terminal_id: Mapped[int | None] = mapped_column(
        BigInteger, ForeignKey("terminals.id", ondelete="SET NULL")
    )
    authorization_code_id: Mapped[int | None] = mapped_column(
        BigInteger, ForeignKey("authorization_codes.id", ondelete="SET NULL")
    )
    challenge_type: Mapped[str] = mapped_column(String(32), nullable=False)
    nonce_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    pending_public_key: Mapped[str | None] = mapped_column(Text)
    public_key_fingerprint: Mapped[str | None] = mapped_column(String(64))
    status: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utc_now)
    finished_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class AuthorizationCode(Base):
    __tablename__ = "authorization_codes"
    __table_args__ = (
        Index("idx_authorization_codes_hash", "code_hash"),
        Index("idx_authorization_codes_request", "request_uuid"),
        Index("idx_authorization_codes_expires", "expires_at"),
    )

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    request_uuid: Mapped[str] = mapped_column(Uuid(as_uuid=False), unique=True, nullable=False)
    code_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    purpose: Mapped[str] = mapped_column(String(32), nullable=False)
    user_id: Mapped[int | None] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE")
    )
    terminal_id: Mapped[int | None] = mapped_column(
        BigInteger, ForeignKey("terminals.id", ondelete="SET NULL")
    )
    client_name: Mapped[str | None] = mapped_column(String(64))
    status: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utc_now)
    consumed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class AuditLog(Base):
    __tablename__ = "audit_logs"
    __table_args__ = (
        Index("idx_audit_user", "user_id"),
        Index("idx_audit_event", "event_type"),
        Index("idx_audit_created", "created_at"),
    )

    id: Mapped[int] = mapped_column(
        BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True
    )
    user_id: Mapped[int | None] = mapped_column(BigInteger, nullable=True)
    terminal_id: Mapped[int | None] = mapped_column(BigInteger, nullable=True)
    event_type: Mapped[str] = mapped_column(String(64), nullable=False)
    result: Mapped[str] = mapped_column(String(32), nullable=False)
    ip_hash: Mapped[str | None] = mapped_column(String(64), nullable=True)
    detail_json: Mapped[dict[str, object] | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now
    )

