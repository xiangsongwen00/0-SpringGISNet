from fastapi import APIRouter
from sqlalchemy import text

from ...schemas import HealthResponse
from ..dependencies import DbSession


router = APIRouter(tags=["system"])


@router.get("/health", response_model=HealthResponse)
def health(db: DbSession) -> HealthResponse:
    db.execute(text("SELECT 1"))
    return HealthResponse(status="ok", database="connected", version="v1")

