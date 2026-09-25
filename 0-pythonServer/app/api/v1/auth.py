from __future__ import annotations

from datetime import timedelta

from fastapi import APIRouter, HTTPException, Request, Response, status
from sqlalchemy import func, select

from ...models import AuditLog, AuthSession, AuthorizationCode, Terminal, User, utc_now
from ...schemas import (
    LoginRequest,
    LogoutRequest,
    MessageResponse,
    RefreshRequest,
    TokenResponse,
    UserResponse,
    QuickLoginConsumeRequest,
    QuickLoginStartResponse,
    normalize_username,
)
from ...security import DUMMY_PASSWORD_HASH, hash_authorization_code, hash_ip, hash_token, verify_password
from ...services.audit import add_audit_log
from ...services.authorization_codes import QUICK_CODE_LIFETIME_SECONDS, create_authorization_code, invalidate_active_codes, is_expired
from ...services.sessions import issue_session, rotate_refresh_token
from ..dependencies import CurrentSession, DbSession
from .auth_cookies import REFRESH_COOKIE, clear_refresh_cookie, set_refresh_cookie


router = APIRouter(prefix="/auth", tags=["auth"])


def _client_ip(request: Request) -> str | None:
    return request.client.host if request.client else None


@router.post("/login", response_model=TokenResponse)
def login(
    payload: LoginRequest, request: Request, response: Response, db: DbSession
) -> TokenResponse:
    user = db.scalar(
        select(User).where(User.username_normalized == normalize_username(payload.username))
    )
    password_hash = user.password_hash if user else DUMMY_PASSWORD_HASH
    valid = verify_password(password_hash, payload.password)
    if user is None or not valid or user.status != 1:
        add_audit_log(
            db,
            event_type="PASSWORD_LOGIN",
            result="FAILURE",
            ip_address=_client_ip(request),
            user_id=user.id if user else None,
            detail={"client_type": payload.client_type},
        )
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或凭据不正确"
        )

    issued = issue_session(db, user, payload.client_type)
    add_audit_log(
        db,
        event_type="PASSWORD_LOGIN",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=user.id,
        detail={"client_type": payload.client_type},
    )
    db.commit()
    web_client = payload.client_type in {"web", "mobile_web"}
    if web_client:
        set_refresh_cookie(response, issued.refresh_token)
    return TokenResponse(
        access_token=issued.access_token,
        refresh_token=None if web_client else issued.refresh_token,
        expires_in=issued.expires_in,
        user=UserResponse.model_validate(user),
    )


@router.post("/refresh", response_model=TokenResponse)
def refresh(
    payload: RefreshRequest, request: Request, response: Response, db: DbSession
) -> TokenResponse:
    supplied_token = payload.refresh_token or request.cookies.get(REFRESH_COOKIE)
    if not supplied_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="登录已失效")
    result = rotate_refresh_token(db, supplied_token)
    if result is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="登录已失效")
    issued, user = result
    add_audit_log(
        db,
        event_type="SESSION_REFRESH",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=user.id,
    )
    db.commit()
    web_client = issued.session.client_type in {"web", "mobile_web"}
    if web_client:
        set_refresh_cookie(response, issued.refresh_token)
    return TokenResponse(
        access_token=issued.access_token,
        refresh_token=None if web_client else issued.refresh_token,
        expires_in=issued.expires_in,
        user=UserResponse.model_validate(user),
    )


@router.post("/logout", response_model=MessageResponse)
def logout(
    payload: LogoutRequest,
    request: Request,
    response: Response,
    db: DbSession,
) -> MessageResponse:
    supplied_token = payload.refresh_token or request.cookies.get(REFRESH_COOKIE)
    user_id: int | None = None
    if supplied_token:
        refresh_session = db.scalar(
            select(AuthSession).where(
                AuthSession.refresh_token_hash == hash_token(supplied_token)
            )
        )
        if refresh_session is not None:
            refresh_session.revoked_at = utc_now()
            user_id = refresh_session.user_id
    add_audit_log(
        db,
        event_type="LOGOUT",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=user_id,
    )
    db.commit()
    clear_refresh_cookie(response)
    return MessageResponse(message="已退出登录")


def _active_terminal_for_session(db: DbSession, session: AuthSession) -> Terminal:
    if session.client_type != "auth_apk":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="快速登录验证码只能由 APK 认证终端生成")
    if session.terminal_id is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="当前会话未绑定认证终端")
    terminal = db.scalar(
        select(Terminal).where(
            Terminal.id == session.terminal_id,
            Terminal.user_id == session.user_id,
            Terminal.status == 1,
        )
    )
    if terminal is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="认证终端已失效")
    return terminal


@router.post("/quick/start", response_model=QuickLoginStartResponse)
def quick_login_start(
    request: Request,
    session: CurrentSession,
    db: DbSession,
) -> QuickLoginStartResponse:
    terminal = _active_terminal_for_session(db, session)
    invalidate_active_codes(
        db, purpose="QUICK_LOGIN", user_id=session.user_id, terminal_id=terminal.id
    )
    item, code = create_authorization_code(
        db,
        purpose="QUICK_LOGIN",
        user_id=session.user_id,
        terminal_id=terminal.id,
    )
    add_audit_log(
        db,
        event_type="QUICK_LOGIN_CODE_CREATE",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=session.user_id,
        terminal_id=terminal.id,
    )
    db.commit()
    return QuickLoginStartResponse(
        request_id=item.request_uuid,
        code=code,
        expires_at=item.expires_at,
        refresh_after_seconds=QUICK_CODE_LIFETIME_SECONDS,
    )


@router.post("/quick/consume", response_model=TokenResponse)
def quick_login_consume(
    payload: QuickLoginConsumeRequest,
    request: Request,
    response: Response,
    db: DbSession,
) -> TokenResponse:
    ip_digest = hash_ip(_client_ip(request))
    recent_failures = db.scalar(
        select(func.count(AuditLog.id)).where(
            AuditLog.event_type == "QUICK_LOGIN_CONSUME",
            AuditLog.result == "FAILURE",
            AuditLog.ip_hash == ip_digest,
            AuditLog.created_at >= utc_now() - timedelta(minutes=1),
        )
    )
    if int(recent_failures or 0) >= 8:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="验证尝试过于频繁，请稍后再试")
    item = db.scalar(
        select(AuthorizationCode).where(
            AuthorizationCode.code_hash == hash_authorization_code("QUICK_LOGIN", payload.code),
            AuthorizationCode.purpose == "QUICK_LOGIN",
            AuthorizationCode.status == 1,
        )
    )
    if item is None or is_expired(item.expires_at):
        add_audit_log(
            db,
            event_type="QUICK_LOGIN_CONSUME",
            result="FAILURE",
            ip_address=_client_ip(request),
            detail={"reason": "invalid_or_expired_code", "client_name": payload.client_name},
        )
        db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或验证码不正确，或验证码已过期")
    terminal = db.get(Terminal, item.terminal_id) if item.terminal_id else None
    user = db.get(User, item.user_id) if item.user_id else None
    if (
        terminal is None
        or terminal.status != 1
        or user is None
        or user.status != 1
        or user.username_normalized != normalize_username(payload.username)
    ):
        add_audit_log(
            db,
            event_type="QUICK_LOGIN_CONSUME",
            result="FAILURE",
            ip_address=_client_ip(request),
            user_id=user.id if user else None,
            terminal_id=terminal.id if terminal else None,
            detail={"reason": "account_or_terminal_mismatch", "client_name": payload.client_name},
        )
        db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或验证码不正确，或验证码已过期")
    issued = issue_session(db, user, "web")
    issued.session.terminal_id = terminal.id
    item.status = 2
    item.consumed_at = utc_now()
    add_audit_log(
        db,
        event_type="QUICK_LOGIN_CONSUME",
        result="SUCCESS",
        ip_address=_client_ip(request),
        user_id=user.id,
        terminal_id=terminal.id,
        detail={"client_name": payload.client_name},
    )
    db.commit()
    set_refresh_cookie(response, issued.refresh_token)
    return TokenResponse(
        access_token=issued.access_token,
        refresh_token=None,
        expires_in=issued.expires_in,
        user=UserResponse.model_validate(user),
    )

