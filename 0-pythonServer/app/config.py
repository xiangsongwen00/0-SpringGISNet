from __future__ import annotations

import json
import os
import secrets
from configparser import ConfigParser
from functools import lru_cache
from pathlib import Path
from urllib.parse import quote_plus, urlsplit

from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"


class Settings(BaseModel):
    app_name: str = "SpringAutumn GIS API"
    environment: str = "development"
    database_url: str
    secret_key: str
    api_host: str = "0.0.0.0"
    api_port: int = 8080
    access_log: bool = False
    access_token_minutes: int = 15
    refresh_token_days: int = 30
    cors_origins: tuple[str, ...] = ()
    amap_web_service_key: str = ""


def _read_ini() -> ConfigParser:
    ini = ConfigParser()
    ini_path = Path(os.getenv("SPRINGGIS_ENV_FILE", str(BASE_DIR / "env.ini")))
    if not ini_path.is_file():
        raise RuntimeError(f"找不到后端环境配置: {ini_path}")
    ini.read(ini_path, encoding="utf-8")
    return ini


def _resolve_from_base(value: str) -> Path:
    path = Path(value)
    return path if path.is_absolute() else BASE_DIR / path


def _read_database_url(ini: ConfigParser) -> str:
    explicit = os.getenv("SPRINGGIS_DATABASE_URL")
    if explicit:
        return explicit

    config_path = _resolve_from_base(
        os.getenv(
            "SPRINGGIS_DATABASE_CONFIG",
            ini.get("database", "config_path", fallback="data/postgis.json"),
        )
    )
    raw = json.loads(config_path.read_text(encoding="utf-8-sig"))
    required = ("host", "port", "user", "password")
    missing = [key for key in required if key not in raw]
    if missing:
        raise RuntimeError(f"数据库配置缺少字段: {', '.join(missing)}")

    database = raw.get("database") or raw.get("dbname") or raw["user"]
    return (
        "postgresql+psycopg2://"
        f"{quote_plus(str(raw['user']))}:{quote_plus(str(raw['password']))}"
        f"@{raw['host']}:{raw['port']}/{quote_plus(str(database))}"
    )


def _read_or_create_secret(ini: ConfigParser) -> str:
    explicit = os.getenv("SPRINGGIS_SECRET_KEY")
    if explicit:
        return explicit

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    secret_path = _resolve_from_base(
        ini.get("security", "secret_key_file", fallback="data/server_secret.key")
    )
    secret_path.parent.mkdir(parents=True, exist_ok=True)
    if secret_path.exists():
        return secret_path.read_text(encoding="utf-8").strip()

    secret = secrets.token_urlsafe(64)
    secret_path.write_text(secret, encoding="utf-8")
    return secret


def _parse_cors_origins(raw_origins: str) -> tuple[str, ...]:
    origins = tuple(
        item.strip().rstrip("/")
        for item in raw_origins.split(",")
        if item.strip()
    )
    for origin in origins:
        if origin == "*":
            raise RuntimeError("CORS 不允许使用通配符 *；请填写明确的前端来源")
        parsed = urlsplit(origin)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            raise RuntimeError(f"CORS 来源格式无效: {origin}")
        if parsed.path or parsed.query or parsed.fragment:
            raise RuntimeError(f"CORS 来源只能包含协议、主机和端口: {origin}")
    return origins


def _read_amap_web_service_key(ini: ConfigParser) -> str:
    explicit = os.getenv("SPRINGGIS_AMAP_WEB_SERVICE_KEY", "").strip()
    if explicit:
        return explicit
    inline = ini.get("geocoding", "amap_web_service_key", fallback="").strip()
    if inline:
        return inline
    key_file = ini.get("geocoding", "amap_web_service_key_file", fallback="").strip()
    if not key_file:
        return ""
    path = _resolve_from_base(key_file)
    return path.read_text(encoding="utf-8").strip() if path.is_file() else ""


@lru_cache
def get_settings() -> Settings:
    ini = _read_ini()
    origins = os.getenv(
        "SPRINGGIS_CORS_ORIGINS",
        ini.get(
            "cors",
            "origins",
            fallback="",
        ),
    )
    return Settings(
        environment=os.getenv(
            "SPRINGGIS_ENVIRONMENT",
            ini.get("server", "environment", fallback="development"),
        ),
        database_url=_read_database_url(ini),
        secret_key=_read_or_create_secret(ini),
        api_host=os.getenv(
            "SPRINGGIS_API_HOST", ini.get("server", "host", fallback="0.0.0.0")
        ),
        api_port=int(
            os.getenv(
                "SPRINGGIS_API_PORT", ini.get("server", "port", fallback="8080")
            )
        ),
        access_log=os.getenv(
            "SPRINGGIS_ACCESS_LOG",
            ini.get("server", "access_log", fallback="false"),
        ).lower() in {"1", "true", "yes", "on"},
        access_token_minutes=int(
            os.getenv(
                "SPRINGGIS_ACCESS_TOKEN_MINUTES",
                ini.get("security", "access_token_minutes", fallback="15"),
            )
        ),
        refresh_token_days=int(
            os.getenv(
                "SPRINGGIS_REFRESH_TOKEN_DAYS",
                ini.get("security", "refresh_token_days", fallback="30"),
            )
        ),
        cors_origins=_parse_cors_origins(origins),
        amap_web_service_key=_read_amap_web_service_key(ini),
    )

