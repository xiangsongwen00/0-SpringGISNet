from fastapi import APIRouter

from .auth import router as auth_router
from .health import router as health_router
from .locations import router as locations_router
from .terminals import router as terminals_router
from .users import router as users_router


router = APIRouter()
router.include_router(health_router)
router.include_router(users_router)
router.include_router(auth_router)
router.include_router(terminals_router)
router.include_router(locations_router)

