# SpringAutumn GIS Python API

FastAPI 后端负责账户、会话、安全问题、终端授权、位置轨迹与分享权限。服务只保存业务所需信息，不接收邮箱、手机号、短信、真实姓名或原始设备标识。

## 文档

- [服务端部署指南](服务端部署指南.md)：Windows、Docker、1Panel、8080、CORS、日志和发布。
- [数据库部署与迁移指南](数据库部署与迁移指南.md)：PostGIS、PgBouncer、备份、迁移和故障排查。
- [完整 API 文档](../API.md)：接口字段、状态码和调用示例。
- [系统总指南](../环境配置说明.md)：PC、服务、数据库和 APK 的整体顺序。

## 最短启动流程

```powershell
cd E:\0-SpringGISNet\0-pythonServer
D:\condamini\python.exe -m pip install -r requirements.txt
D:\condamini\python.exe index.py --migrate
D:\condamini\python.exe index.py
```

- 固定端口：`8080`
- 健康检查：`http://127.0.0.1:8080/api/v1/health`
- Swagger：`http://127.0.0.1:8080/docs`
- 后端配置：`env.ini`
- 数据库配置：`data/postgis.json`

测试目录兼容迁移入口只能从仓库根目录运行：`D:\condamini\python.exe 0-testpy\apply_migration.py`。日常优先使用当前目录的 `index.py --migrate`。

## 目录边界

- `app/api/v1`：版本化 HTTP 路由
- `app/services`：会话、审计、授权与位置业务逻辑
- `app/models.py`：持久化模型
- `app/schemas.py`：输入输出白名单
- `migrations`：按版本执行的 PostgreSQL 迁移
- `data`：运行配置和密钥，不放业务代码

