from __future__ import annotations

import json
import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path
from typing import Any

from .config import BASE_DIR, Settings


class JsonFormatter(logging.Formatter):
    """One JSON object per line without tokens, request bodies, or user data."""

    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, Any] = {
            "time": self.formatTime(record, "%Y-%m-%dT%H:%M:%S%z"),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        for name in ("request_id", "method", "path", "status_code", "duration_ms"):
            value = getattr(record, name, None)
            if value is not None:
                payload[name] = value
        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)
        return json.dumps(payload, ensure_ascii=False, separators=(",", ":"))


def configure_logging(settings: Settings) -> logging.Logger:
    logger = logging.getLogger("springgis")
    logger.setLevel(getattr(logging, settings.log_level, logging.INFO))
    logger.propagate = False
    if logger.handlers:
        return logger

    formatter = JsonFormatter()
    console = logging.StreamHandler()
    console.setFormatter(formatter)
    logger.addHandler(console)

    log_path = Path(settings.log_directory)
    if not log_path.is_absolute():
        log_path = BASE_DIR / log_path
    try:
        log_path.mkdir(parents=True, exist_ok=True)
        file_handler = RotatingFileHandler(
            log_path / "server.log",
            maxBytes=settings.log_max_bytes,
            backupCount=settings.log_backup_count,
            encoding="utf-8",
        )
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    except OSError:
        logger.warning("file_log_unavailable", extra={"path": str(log_path)})
    return logger
