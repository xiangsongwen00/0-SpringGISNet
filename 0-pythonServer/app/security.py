from __future__ import annotations

import hashlib
import hmac
import secrets

from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerifyMismatchError

from .config import get_settings


password_hasher = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)
DUMMY_PASSWORD_HASH = password_hasher.hash("not-a-real-password-for-timing-only")


def hash_password(password: str) -> str:
    return password_hasher.hash(password)


def verify_password(password_hash: str, password: str) -> bool:
    try:
        return password_hasher.verify(password_hash, password)
    except (VerifyMismatchError, InvalidHashError):
        return False


def make_token(byte_length: int = 32) -> str:
    return secrets.token_urlsafe(byte_length)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def hash_ip(ip_address: str | None) -> str | None:
    if not ip_address:
        return None
    secret = get_settings().secret_key.encode("utf-8")
    return hmac.new(secret, ip_address.encode("utf-8"), hashlib.sha256).hexdigest()


def hash_authorization_code(purpose: str, code: str) -> str:
    secret = get_settings().secret_key.encode("utf-8")
    value = f"{purpose}:{code}".encode("utf-8")
    return hmac.new(secret, value, hashlib.sha256).hexdigest()

