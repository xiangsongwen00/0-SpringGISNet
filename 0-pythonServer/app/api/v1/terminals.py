from __future__ import annotations

import base64
import binascii
import hashlib
import hmac
import secrets
from datetime import timedelta, timezone
from uuid import uuid4

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError

from ...models import AuthChallenge, AuthorizationCode, AuthSession, SecurityAnswer, Terminal, User, utc_now
from ...schemas import (
    AuthorizationCodeCreateRequest,
    AuthorizationCodeResponse,
    MessageResponse,
    TerminalBindConfirmRequest,
    TerminalBindStartRequest,
    TerminalBindStartResponse,
    TerminalRevokeCodeCreateRequest,
    TerminalRevokeRequest,
    TerminalResponse,
    TerminalSessionStartRequest,
)
from ...security import hash_authorization_code, hash_token, verify_password
from ...services.audit import add_audit_log
from ...services.authorization_codes import AUTHORIZATION_CODE_LIFETIME_SECONDS, QUICK_CODE_LIFETIME_SECONDS, create_authorization_code, invalidate_active_codes, is_expired
from ..dependencies import CurrentSession, DbSession


router = APIRouter(prefix="/terminals", tags=["terminals"])
BIND_CHALLENGE_MINUTES = 5
MAX_ACTIVE_TERMINALS = 10


def _client_ip(request: Request) -> str | None:
    return request.client.host if request.client else None


def _decode_public_key(value: str) -> tuple[ec.EllipticCurvePublicKey, str]:
    try:
        der = base64.b64decode(value, validate=True)
        key = serialization.load_der_public_key(der)
    except (ValueError, TypeError, binascii.Error):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="公钥格式无效",
        ) from None

    if not isinstance(key, ec.EllipticCurvePublicKey) or not isinstance(
        key.curve, ec.SECP256R1
    ):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="只支持 Android Keystore P-256 公钥",
        )
    return key, hashlib.sha256(der).hexdigest()


def _expired(expires_at) -> bool:
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    return expires_at <= utc_now()


def _verify_password_and_security(
    db: DbSession,
    user_id: int,
    current_password: str | None,
    supplied_answers,
) -> bool:
    user = db.get(User, user_id)
    if user is None or not current_password or not verify_password(user.password_hash, current_password):
        return False
    supplied = {item.question_id: item.answer for item in supplied_answers or []}
    stored = db.scalars(
        select(SecurityAnswer).where(SecurityAnswer.user_id == user_id)
    ).all()
    return (
        len(stored) == 2
        and set(supplied) == {item.question_id for item in stored}
        and all(verify_password(item.answer_hash, supplied.get(item.question_id, "")) for item in stored)
    )


@router.post("/session/start", response_model=TerminalBindStartResponse)
def start_terminal_session(
    payload: TerminalSessionStartRequest,
    session: CurrentSession,
    db: DbSession,
) -> TerminalBindStartResponse:
    if session.client_type != "auth_apk":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="仅 APK 可恢复终端会话")
    _, fingerprint = _decode_public_key(payload.public_key)
    terminal = db.scalar(
        select(Terminal).where(
            Terminal.public_key_fingerprint == fingerprint,
            Terminal.user_id == session.user_id,
            Terminal.status == 1,
        )
    )
    if terminal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="当前密钥尚未绑定认证终端")
    nonce = secrets.token_urlsafe(32)
    challenge = AuthChallenge(
        challenge_uuid=str(uuid4()),
        user_id=session.user_id,
        challenge_type="TERMINAL_SESSION",
        terminal_id=terminal.id,
        nonce_hash=hash_token(nonce),
        expires_at=utc_now() + timedelta(minutes=BIND_CHALLENGE_MINUTES),
    )
    db.add(challenge)
    db.commit()
    return TerminalBindStartResponse(
        challenge_id=challenge.challenge_uuid,
        nonce=nonce,
        expires_at=challenge.expires_at,
    )


@router.post("/session/confirm", response_model=TerminalResponse)
def confirm_terminal_session(
    payload: TerminalBindConfirmRequest,
    request: Request,
    session: CurrentSession,
    db: DbSession,
) -> TerminalResponse:
    challenge = db.scalar(
        select(AuthChallenge).where(
            AuthChallenge.challenge_uuid == payload.challenge_id,
            AuthChallenge.user_id == session.user_id,
            AuthChallenge.challenge_type == "TERMINAL_SESSION",
            AuthChallenge.status == 1,
        )
    )
    if challenge is None or _expired(challenge.expires_at):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="终端会话挑战不存在或已过期")
    if not hmac.compare_digest(challenge.nonce_hash, hash_token(payload.nonce)):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="终端会话挑战不匹配")
    terminal = db.get(Terminal, challenge.terminal_id)
    if terminal is None or terminal.status != 1 or terminal.user_id != session.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="认证终端已失效")
    public_key, _ = _decode_public_key(terminal.public_key)
    try:
        signature = base64.b64decode(payload.signature, validate=True)
        public_key.verify(signature, payload.nonce.encode("utf-8"), ec.ECDSA(hashes.SHA256()))
    except (InvalidSignature, ValueError, binascii.Error):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="终端签名验证失败") from None
    challenge.status = 2
    challenge.finished_at = utc_now()
    terminal.last_verified_at = utc_now()
    session.terminal_id = terminal.id
    add_audit_log(
        db,
        event_type="TERMINAL_SESSION_ATTACH",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=session.user_id,
        terminal_id=terminal.id,
    )
    db.commit()
    return TerminalResponse.model_validate(terminal)


@router.post("/bind/start", response_model=TerminalBindStartResponse)
def start_binding(
    payload: TerminalBindStartRequest,
    request: Request,
    session: CurrentSession,
    db: DbSession,
) -> TerminalBindStartResponse:
    if session.client_type != "auth_apk":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="终端绑定只能由 APK 发起")
    _, fingerprint = _decode_public_key(payload.public_key)
    bind_hash = hash_authorization_code("TERMINAL_BIND", payload.authorization_code)
    migrate_hash = hash_authorization_code("TERMINAL_MIGRATE", payload.authorization_code)
    authorization = db.scalar(
        select(AuthorizationCode).where(
            AuthorizationCode.code_hash.in_([bind_hash, migrate_hash]),
            AuthorizationCode.purpose.in_(["TERMINAL_BIND", "TERMINAL_MIGRATE"]),
            AuthorizationCode.user_id == session.user_id,
            AuthorizationCode.status == 1,
        )
    )
    if authorization is None or is_expired(authorization.expires_at):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="授权码无效或已过期")

    replaced_terminal: Terminal | None = None
    if authorization.purpose == "TERMINAL_MIGRATE":
        replaced_terminal = db.scalar(
            select(Terminal).where(
                Terminal.id == authorization.terminal_id,
                Terminal.user_id == session.user_id,
                Terminal.status == 1,
            )
        )
        if replaced_terminal is None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="待迁移终端不存在或已撤销")
    existing = db.scalar(
        select(Terminal).where(Terminal.public_key_fingerprint == fingerprint)
    )
    if existing is not None:
        detail = "此认证密钥已经绑定当前账户" if existing.user_id == session.user_id else "此认证密钥已被使用"
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=detail)

    active_count = db.scalar(
        select(func.count(Terminal.id)).where(
            Terminal.user_id == session.user_id,
            Terminal.status == 1,
        )
    )
    if int(active_count or 0) >= MAX_ACTIVE_TERMINALS:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="已达到认证终端数量上限")

    nonce = secrets.token_urlsafe(32)
    challenge = AuthChallenge(
        challenge_uuid=str(uuid4()),
        user_id=session.user_id,
        challenge_type=authorization.purpose,
        terminal_id=replaced_terminal.id if replaced_terminal else None,
        authorization_code_id=authorization.id,
        nonce_hash=hash_token(nonce),
        pending_public_key=payload.public_key,
        public_key_fingerprint=fingerprint,
        expires_at=utc_now() + timedelta(minutes=BIND_CHALLENGE_MINUTES),
    )
    authorization.status = 2
    authorization.consumed_at = utc_now()
    db.add(challenge)
    add_audit_log(
        db,
        event_type="TERMINAL_BIND_START",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=session.user_id,
        detail={"challenge_id": challenge.challenge_uuid},
    )
    db.commit()
    return TerminalBindStartResponse(
        challenge_id=challenge.challenge_uuid,
        nonce=nonce,
        expires_at=challenge.expires_at,
    )


@router.post("/bind/confirm", response_model=TerminalResponse, status_code=status.HTTP_201_CREATED)
def confirm_binding(
    payload: TerminalBindConfirmRequest,
    request: Request,
    session: CurrentSession,
    db: DbSession,
) -> TerminalResponse:
    challenge = db.scalar(
        select(AuthChallenge).where(
            AuthChallenge.challenge_uuid == payload.challenge_id,
            AuthChallenge.user_id == session.user_id,
            AuthChallenge.challenge_type.in_(["TERMINAL_BIND", "TERMINAL_MIGRATE"]),
        )
    )
    if challenge is None or challenge.status != 1:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="绑定请求不存在或已完成")
    if _expired(challenge.expires_at):
        challenge.status = 4
        challenge.finished_at = utc_now()
        db.commit()
        raise HTTPException(status_code=status.HTTP_410_GONE, detail="绑定请求已过期，请重新发起")
    if not hmac.compare_digest(challenge.nonce_hash, hash_token(payload.nonce)):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="绑定挑战不匹配")
    if not challenge.pending_public_key or not challenge.public_key_fingerprint:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="绑定请求状态异常")

    public_key, fingerprint = _decode_public_key(challenge.pending_public_key)
    if not hmac.compare_digest(challenge.public_key_fingerprint, fingerprint):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="绑定公钥校验失败")
    try:
        signature = base64.b64decode(payload.signature, validate=True)
        public_key.verify(
            signature,
            payload.nonce.encode("utf-8"),
            ec.ECDSA(hashes.SHA256()),
        )
    except (InvalidSignature, ValueError, binascii.Error):
        add_audit_log(
            db,
            event_type="TERMINAL_BIND_CONFIRM",
            result="FAILURE",
            ip_address=_client_ip(request),
            user_id=session.user_id,
            detail={"reason": "invalid_signature"},
        )
        db.commit()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="终端签名验证失败") from None

    terminal = Terminal(
        terminal_uuid=str(uuid4()),
        user_id=session.user_id,
        system_name=f"pending-{uuid4().hex[:12]}",
        public_key=challenge.pending_public_key,
        public_key_fingerprint=fingerprint,
        last_verified_at=utc_now(),
    )
    db.add(terminal)
    try:
        db.flush()
        terminal.system_name = f"terminal-{terminal.id:06d}"
        replaced_terminal_id = challenge.terminal_id if challenge.challenge_type == "TERMINAL_MIGRATE" else None
        if replaced_terminal_id is not None:
            replaced = db.get(Terminal, replaced_terminal_id)
            if replaced is not None:
                replaced.status = 4
                replaced.revoked_at = utc_now()
                for old_session in db.scalars(
                    select(AuthSession).where(
                        AuthSession.terminal_id == replaced_terminal_id,
                        AuthSession.revoked_at.is_(None),
                    )
                ):
                    old_session.revoked_at = utc_now()
        challenge.terminal_id = terminal.id
        challenge.status = 2
        challenge.finished_at = utc_now()
        session.terminal_id = terminal.id
        add_audit_log(
            db,
            event_type="TERMINAL_BIND_CONFIRM",
            result="SUCCESS",
            ip_address=_client_ip(request),
            user_id=session.user_id,
            terminal_id=terminal.id,
        )
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="此认证密钥已经绑定") from None
    db.refresh(terminal)
    return TerminalResponse.model_validate(terminal)


@router.get("", response_model=list[TerminalResponse])
def list_terminals(session: CurrentSession, db: DbSession) -> list[TerminalResponse]:
    terminals = db.scalars(
        select(Terminal)
        .where(Terminal.user_id == session.user_id)
        .order_by(Terminal.created_at.desc())
    ).all()
    return [TerminalResponse.model_validate(item) for item in terminals]


@router.get("/current", response_model=TerminalResponse)
def current_terminal(session: CurrentSession, db: DbSession) -> TerminalResponse:
    if session.client_type != "auth_apk" or session.terminal_id is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="当前 APK 会话未绑定终端")
    terminal = db.scalar(
        select(Terminal).where(
            Terminal.id == session.terminal_id,
            Terminal.user_id == session.user_id,
            Terminal.status == 1,
        )
    )
    if terminal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="当前终端已失效")
    return TerminalResponse.model_validate(terminal)


@router.post("/authorization-codes", response_model=AuthorizationCodeResponse)
def create_terminal_authorization_code(
    payload: AuthorizationCodeCreateRequest,
    request: Request,
    session: CurrentSession,
    db: DbSession,
) -> AuthorizationCodeResponse:
    purpose = "TERMINAL_BIND" if payload.purpose == "terminal_bind" else "TERMINAL_MIGRATE"
    user = db.get(User, session.user_id)
    if user is None or not verify_password(user.password_hash, payload.current_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="账户密码或安全问题答案不正确")
    terminal_history_count = int(
        db.scalar(select(func.count(Terminal.id)).where(Terminal.user_id == session.user_id)) or 0
    )
    requires_security_answers = purpose == "TERMINAL_MIGRATE" or terminal_history_count > 0
    if requires_security_answers:
        if not _verify_password_and_security(
            db, session.user_id, payload.current_password, payload.security_answers
        ):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="账户密码或安全问题答案不正确")
    if purpose == "TERMINAL_BIND" and session.client_type not in {"web", "mobile_web"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="绑定授权码只能由已登录 PC 端生成")
    terminal_id: int | None = None
    if purpose == "TERMINAL_MIGRATE":
        if payload.terminal_uuid:
            terminal = db.scalar(
                select(Terminal).where(
                    Terminal.terminal_uuid == payload.terminal_uuid,
                    Terminal.user_id == session.user_id,
                    Terminal.status == 1,
                )
            )
        elif session.terminal_id is not None:
            terminal = db.scalar(
                select(Terminal).where(
                    Terminal.id == session.terminal_id,
                    Terminal.user_id == session.user_id,
                    Terminal.status == 1,
                )
            )
        else:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="PC 端生成迁移码必须指定原终端")
        if terminal is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="终端不存在或已撤销")
        terminal_id = terminal.id

    invalidate_active_codes(
        db, purpose=purpose, user_id=session.user_id, terminal_id=terminal_id
    )
    item, code = create_authorization_code(
        db,
        purpose=purpose,
        user_id=session.user_id,
        terminal_id=terminal_id,
    )
    add_audit_log(
        db,
        event_type=f"{purpose}_CODE_CREATE",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=session.user_id,
        terminal_id=terminal_id,
    )
    db.commit()
    return AuthorizationCodeResponse(
        request_id=item.request_uuid,
        code=code,
        purpose=payload.purpose,
        expires_at=item.expires_at,
        expires_in_seconds=AUTHORIZATION_CODE_LIFETIME_SECONDS,
    )


@router.post("/revoke-codes", response_model=AuthorizationCodeResponse)
def create_terminal_revoke_code(
    payload: TerminalRevokeCodeCreateRequest,
    request: Request,
    session: CurrentSession,
    db: DbSession,
) -> AuthorizationCodeResponse:
    if session.client_type != "auth_apk" or session.terminal_id is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="只有已绑定 APK 终端可生成撤销码")
    terminal = db.scalar(
        select(Terminal).where(
            Terminal.id == session.terminal_id,
            Terminal.user_id == session.user_id,
            Terminal.status == 1,
        )
    )
    if terminal is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="当前认证终端已失效")
    purpose = (
        "TERMINAL_REVOKE_AUTH"
        if payload.code_type == "authorization_code"
        else "TERMINAL_REVOKE_VERIFY"
    )
    invalidate_active_codes(
        db, purpose=purpose, user_id=session.user_id, terminal_id=terminal.id
    )
    item, code = create_authorization_code(
        db, purpose=purpose, user_id=session.user_id, terminal_id=terminal.id
    )
    lifetime = (
        AUTHORIZATION_CODE_LIFETIME_SECONDS
        if payload.code_type == "authorization_code"
        else QUICK_CODE_LIFETIME_SECONDS
    )
    add_audit_log(
        db,
        event_type="TERMINAL_REVOKE_CODE_CREATE",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=session.user_id,
        terminal_id=terminal.id,
        detail={"code_type": payload.code_type},
    )
    db.commit()
    return AuthorizationCodeResponse(
        request_id=item.request_uuid,
        code=code,
        purpose=payload.code_type,
        expires_at=item.expires_at,
        expires_in_seconds=lifetime,
    )


@router.post("/{terminal_uuid}/revoke", response_model=MessageResponse)
def revoke_terminal(
    terminal_uuid: str,
    payload: TerminalRevokeRequest,
    request: Request,
    session: CurrentSession,
    db: DbSession,
) -> MessageResponse:
    terminal = db.scalar(
        select(Terminal).where(
            Terminal.terminal_uuid == terminal_uuid,
            Terminal.user_id == session.user_id,
            Terminal.status == 1,
        )
    )
    if terminal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="终端不存在或已撤销")
    authorization: AuthorizationCode | None = None
    if payload.method == "password_security":
        authorized = _verify_password_and_security(
            db, session.user_id, payload.current_password, payload.security_answers
        )
    else:
        purpose = (
            "TERMINAL_REVOKE_AUTH"
            if payload.method == "terminal_authorization_code"
            else "TERMINAL_REVOKE_VERIFY"
        )
        authorization = db.scalar(
            select(AuthorizationCode).where(
                AuthorizationCode.code_hash == hash_authorization_code(purpose, payload.code or ""),
                AuthorizationCode.purpose == purpose,
                AuthorizationCode.user_id == session.user_id,
                AuthorizationCode.terminal_id == terminal.id,
                AuthorizationCode.status == 1,
            )
        )
        authorized = authorization is not None and not is_expired(authorization.expires_at)
    if not authorized:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="撤销验证失败：密码与安全问题或终端撤销码不正确")
    if authorization is not None:
        authorization.status = 2
        authorization.consumed_at = utc_now()
    terminal.status = 3
    terminal.revoked_at = utc_now()
    for old_session in db.scalars(
        select(AuthSession).where(
            AuthSession.terminal_id == terminal.id,
            AuthSession.revoked_at.is_(None),
        )
    ):
        old_session.revoked_at = utc_now()
    for pending_code in db.scalars(
        select(AuthorizationCode).where(
            AuthorizationCode.terminal_id == terminal.id,
            AuthorizationCode.status == 1,
        )
    ):
        pending_code.status = 4
    add_audit_log(
        db,
        event_type="TERMINAL_REVOKE",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=session.user_id,
        terminal_id=terminal.id,
        detail={"method": payload.method},
    )
    db.commit()
    return MessageResponse(message="终端已撤销")
