from __future__ import annotations

from uuid import uuid4

from fastapi import APIRouter, HTTPException, Request, Response, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from ...models import SecurityAnswer, User, UserConsent
from ...schemas import SECURITY_QUESTIONS, MessageResponse, RegisterRequest, SecurityAnswersSetupRequest, TokenResponse, UserResponse, normalize_username
from ...security import hash_password, verify_password
from ...services.audit import add_audit_log
from ...services.sessions import issue_session
from .auth_cookies import set_refresh_cookie
from ..dependencies import CurrentUser, DbSession


router = APIRouter(prefix="/users", tags=["users"])
TERMS_VERSION = "2026-09-25"
PRIVACY_VERSION = "2026-09-25.2"


def _client_ip(request: Request) -> str | None:
    return request.client.host if request.client else None


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(
    payload: RegisterRequest, request: Request, response: Response, db: DbSession
) -> TokenResponse:
    normalized = normalize_username(payload.username)
    exists = db.scalar(select(User.id).where(User.username_normalized == normalized))
    if exists is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="该用户名不可用")

    user = User(
        user_uuid=str(uuid4()),
        username=payload.username,
        username_normalized=normalized,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    try:
        db.flush()
        db.add(
            UserConsent(
                user_id=user.id,
                terms_version=TERMS_VERSION,
                privacy_version=PRIVACY_VERSION,
                client_type=payload.client_type,
            )
        )
        for answer in payload.security_answers:
            db.add(
                SecurityAnswer(
                    user_id=user.id,
                    question_id=answer.question_id,
                    answer_hash=hash_password(answer.answer),
                )
            )
        issued = issue_session(db, user, payload.client_type)
        add_audit_log(
            db,
            event_type="USER_REGISTER",
            result="SUCCESS",
            ip_address=_client_ip(request),
            user_id=user.id,
            detail={
                "client_type": payload.client_type,
                "terms_version": TERMS_VERSION,
                "privacy_version": PRIVACY_VERSION,
            },
        )
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="该用户名不可用"
        ) from None

    web_client = payload.client_type in {"web", "mobile_web"}
    if web_client:
        set_refresh_cookie(response, issued.refresh_token)
    return TokenResponse(
        access_token=issued.access_token,
        refresh_token=None if web_client else issued.refresh_token,
        expires_in=issued.expires_in,
        user=UserResponse.model_validate(user),
    )


@router.get("/me", response_model=UserResponse)
def me(user: CurrentUser) -> UserResponse:
    return UserResponse.model_validate(user)


@router.get("/security-questions")
def security_questions() -> list[dict[str, str]]:
    return [{"id": key, "prompt": prompt} for key, prompt in SECURITY_QUESTIONS.items()]


@router.get("/me/security-questions")
def my_security_questions(user: CurrentUser) -> list[dict[str, str]]:
    selected = {item.question_id for item in user.security_answers}
    return [
        {"id": key, "prompt": prompt}
        for key, prompt in SECURITY_QUESTIONS.items()
        if key in selected
    ]


@router.post("/me/security-questions", response_model=MessageResponse)
def setup_my_security_questions(
    payload: SecurityAnswersSetupRequest,
    user: CurrentUser,
    db: DbSession,
) -> MessageResponse:
    existing = db.scalars(
        select(SecurityAnswer).where(SecurityAnswer.user_id == user.id)
    ).all()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="安全问题已设置，不能通过此接口覆盖")
    if not verify_password(user.password_hash, payload.current_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="账户密码不正确")
    for answer in payload.security_answers:
        db.add(
            SecurityAnswer(
                user_id=user.id,
                question_id=answer.question_id,
                answer_hash=hash_password(answer.answer),
            )
        )
    db.commit()
    return MessageResponse(message="安全问题已设置")

