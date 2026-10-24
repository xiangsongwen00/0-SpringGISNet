# 史地原文库一次性迁移服务

此目录与 PC、Android 和正式 8080 API 的运行完全独立。它不需要上传本机 PostgreSQL 数据目录、Python 虚拟环境、`readerTool`、`myHistorySys` 源码或任何桌面服务。

## 需要上传的文件

先在 Windows 本机、项目根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\0-historyMigration\export-local.ps1
```

它会从 `E:\历史地理古籍整理\myHistorySys\.local\database.url` 读取源库，只生成：

- `0-historyMigration/export/history-data.dump`：`history` schema 的完整数据归档；
- `0-historyMigration/export/history-data.manifest`：SHA256 和五张核心表的期望行数。

向服务器同一目录上传以下内容即可：

```text
0-historyMigration/
├── history-data.dump
├── history-data.manifest
├── migrate-server.sh
└── .env
```

不要上传 `.local/postgres-data`；那是数据库物理文件，跨容器/版本直接复制存在损坏风险。

## 服务器执行

1. 先部署新版 `0-pythonServer`，在 API 容器中执行 `python index.py --migrate`，创建空的 `history` schema。
2. 复制 `.env.example` 为 `.env`，确认 PostgreSQL 容器名、数据库名和用户。密码可以留空，脚本运行时会隐藏输入。
3. 将导出的两个文件放在脚本旁，并执行：

```bash
cd /你的上传目录/0-historyMigration
chmod +x migrate-server.sh
./migrate-server.sh
```

脚本会校验归档、拒绝覆盖非空目标库、备份当前 `history` schema、绕过 PgBouncer 直连 PostgreSQL、恢复数据、重建全文检索索引、执行 `ANALYZE`，最后逐表核对数量。2 核 2 GiB 服务器重建两个 GIN 索引可能耗时较长，期间不要中断 PostgreSQL 容器。

Markdown 整理稿不在这个大归档中；它随 `0-pythonServer/history_content/docs` 部署，并通过 `scripts/import_history_content.py` 登记到正式数据库。
