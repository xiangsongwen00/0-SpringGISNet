from fastapi import Response

from ...config import get_settings


REFRESH_COOKIE = "springgis_refresh"


def set_refresh_cookie(response: Response, token: str) -> None:
    settings = get_settings()
    response.set_cookie(
        key=REFRESH_COOKIE,
        value=token,
        max_age=settings.refresh_token_days * 24 * 60 * 60,
        path="/api/v1/auth",
        secure=settings.environment == "production",
        httponly=True,
        samesite="strict",
    )


def clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(
        key=REFRESH_COOKIE,
        path="/api/v1/auth",
        secure=get_settings().environment == "production",
        httponly=True,
        samesite="strict",
    )

