from __future__ import annotations

import pytest

from app.config import _parse_cors_origins, get_settings


def test_cors_is_disabled_by_default() -> None:
    assert get_settings().cors_origins == ()


def test_cors_accepts_explicit_origins_only() -> None:
    assert _parse_cors_origins(
        "https://www.example.com, https://admin.example.com:8443/"
    ) == (
        "https://www.example.com",
        "https://admin.example.com:8443",
    )


@pytest.mark.parametrize(
    "value",
    ("*", "www.example.com", "https://example.com/api", "https://example.com?x=1"),
)
def test_cors_rejects_unsafe_or_invalid_origins(value: str) -> None:
    with pytest.raises(RuntimeError):
        _parse_cors_origins(value)
