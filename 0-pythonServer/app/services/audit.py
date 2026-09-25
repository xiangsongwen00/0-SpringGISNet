from __future__ import annotations

from sqlalchemy.orm import Session

from ..models import AuditLog
from ..security import hash_ip


def add_audit_log(
    db: Session,
    *,
    event_type: str,
    result: str,
    ip_address: str | None,
    user_id: int | None = None,
    terminal_id: int | None = None,
    detail: dict[str, object] | None = None,
) -> None:
    db.add(
        AuditLog(
            user_id=user_id,
            terminal_id=terminal_id,
            event_type=event_type,
            result=result,
            ip_hash=hash_ip(ip_address),
            detail_json=detail,
        )
    )

