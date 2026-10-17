from __future__ import annotations

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from sqlalchemy.pool import StaticPool

from .config import get_settings


class Base(DeclarativeBase):
    pass


settings = get_settings()
engine_options: dict[str, object] = {"pool_pre_ping": True}
if settings.database_url.startswith("sqlite"):
    engine_options["connect_args"] = {"check_same_thread": False}
    if settings.database_url.endswith(":memory:"):
        engine_options["poolclass"] = StaticPool
else:
    # Keep the application pool deliberately small when PgBouncer is in front
    # of PostgreSQL. Bounded acquisition/connect waits turn an exhausted or
    # unreachable database into a prompt 500/503 instead of hanging every API
    # worker for the operating system's TCP timeout.
    engine_options.update({
        "pool_size": settings.database_pool_size,
        "max_overflow": settings.database_max_overflow,
        "pool_timeout": settings.database_pool_timeout_seconds,
        "pool_recycle": settings.database_pool_recycle_seconds,
        "connect_args": {
            "connect_timeout": settings.database_connect_timeout_seconds,
            "application_name": "springgis-api",
        },
    })

engine = create_engine(settings.database_url, **engine_options)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

