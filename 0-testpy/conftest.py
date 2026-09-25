from __future__ import annotations

import os
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SERVER_DIR = ROOT / "0-pythonServer"
sys.path.insert(0, str(SERVER_DIR))
os.environ["SPRINGGIS_DATABASE_URL"] = "sqlite+pysqlite:///:memory:"
os.environ["SPRINGGIS_SECRET_KEY"] = "test-only-secret-key"
os.environ["SPRINGGIS_ENVIRONMENT"] = "test"

