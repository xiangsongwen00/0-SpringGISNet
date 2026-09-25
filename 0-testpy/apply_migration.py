"""Apply versioned PostgreSQL migrations using the configured database."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVER = ROOT / "0-pythonServer"
sys.path.insert(0, str(SERVER))

from app.migrations import apply_migrations  # noqa: E402


def main() -> None:
    for version, result in apply_migrations():
        print(f"{result} {version}")


if __name__ == "__main__":
    main()

