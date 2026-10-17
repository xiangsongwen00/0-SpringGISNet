from __future__ import annotations

import logging
from time import perf_counter
from uuid import uuid4

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import OperationalError, TimeoutError as SqlAlchemyTimeoutError

from .api.v1 import router as api_v1_router
from .config import get_settings
from .logging_config import configure_logging


settings = get_settings()
logger = configure_logging(settings)
app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/docs" if settings.environment != "production" else None,
    redoc_url=None,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.cors_origins),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
app.include_router(api_v1_router, prefix="/api/v1")


@app.middleware("http")
async def request_diagnostics(request: Request, call_next):
    request_id = request.headers.get("x-request-id", "").strip()[:64] or uuid4().hex
    started = perf_counter()
    try:
        response = await call_next(request)
    except Exception:
        duration_ms = round((perf_counter() - started) * 1000, 2)
        logger.exception(
            "request_failed",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "duration_ms": duration_ms,
            },
        )
        raise
    duration_ms = round((perf_counter() - started) * 1000, 2)
    response.headers["X-Request-ID"] = request_id
    log_method = logger.warning if duration_ms >= settings.slow_request_ms else logger.info
    log_method(
        "request_complete",
        extra={
            "request_id": request_id,
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "duration_ms": duration_ms,
        },
    )
    return response


async def database_unavailable_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(
        "database_unavailable",
        exc_info=(type(exc), exc, exc.__traceback__),
        extra={"method": request.method, "path": request.url.path},
    )
    return JSONResponse(
        status_code=503,
        headers={"Retry-After": "5"},
        content={"detail": "数据库暂时不可用，请稍后重试"},
    )


app.add_exception_handler(SqlAlchemyTimeoutError, database_unavailable_handler)
app.add_exception_handler(OperationalError, database_unavailable_handler)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    # Avoid exposing database or server internals in HTTP responses.
    logger.error(
        "unhandled_exception",
        exc_info=(type(exc), exc, exc.__traceback__),
        extra={"method": request.method, "path": request.url.path},
    )
    return JSONResponse(status_code=500, content={"detail": "服务器内部错误"})

