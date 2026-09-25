# Author: yangjie
# Date: 2026-09-25
# File: 0-pythonServer/index.py
# Copyright (c) 2026 by bimcc, All Rights Reserved.

"""SpringAutumn GIS API process entry point."""

from __future__ import annotations

import argparse
import socket

from app.main import app
from app.config import get_settings


def parse_args() -> argparse.Namespace:
    settings = get_settings()
    parser = argparse.ArgumentParser(description="启动 SpringAutumn GIS API")
    parser.add_argument(
        "--host",
        default=settings.api_host,
        help="监听地址，默认 0.0.0.0",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=settings.api_port,
        help=f"监听端口，当前默认 {settings.api_port}",
    )
    parser.add_argument("--reload", action="store_true", help="启用开发热重载")
    parser.add_argument(
        "--migrate",
        action="store_true",
        help="应用数据库迁移后退出",
    )
    return parser.parse_args()


def port_is_available(host: str, port: int) -> bool:
    probe_host = "0.0.0.0" if host in {"0.0.0.0", "::"} else host
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
        try:
            probe.bind((probe_host, port))
        except OSError:
            return False
    return True


def main() -> int:
    args = parse_args()
    if args.migrate:
        from app.migrations import apply_migrations

        try:
            results = apply_migrations()
        except Exception as exc:
            print(f"数据库迁移失败：{exc}")
            return 1
        for version, result in results:
            message = "已应用" if result == "applied" else "已存在，跳过"
            print(f"{version}: {message}")
        print("数据库迁移完成。")
        return 0

    if not 1 <= args.port <= 65535:
        print("启动失败：端口必须位于 1-65535。")
        return 2
    if not port_is_available(args.host, args.port):
        print(f"启动失败：{args.host}:{args.port} 已被其他程序或 Windows HTTP.sys 占用。")
        print("查看占用：Get-NetTCPConnection -LocalPort " + str(args.port))
        print("临时换端口示例：python index.py --port 18081")
        print("更换后端端口后，也要修改各前端自己的 API 环境变量。")
        return 2

    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        access_log=get_settings().access_log,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

