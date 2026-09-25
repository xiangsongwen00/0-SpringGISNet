# SpringAutumn GIS Python API

第一阶段提供最小信息账户注册、密码登录、令牌刷新、退出登录、当前账户查询，以及 Android Keystore 公钥挑战绑定。服务只保存用户名与认证所需数据，不接收邮箱、手机号、真实姓名或原始设备标识。Web 端的 Refresh Token 使用 `HttpOnly + SameSite=Strict` Cookie，JavaScript 不可读取；非浏览器客户端可从响应体取得令牌并交由系统安全存储。

## 运行

```powershell
cd 0-pythonServer
python -m pip install -r requirements.txt
python index.py
```

后端全局运行配置只位于 `env.ini`，端口固定为 `8080`，接口文档位于 `http://localhost:8080/docs`。后端不读取 PC 或 APK 的配置文件。

如果本机 `8080` 已被其他服务占用，可以临时使用：

```powershell
python index.py --port 18081
```

`--port` 只用于临时诊断；本项目正常启动请保持 `env.ini` 中的 `8080`。PC 与 APK 各自维护自己的连接地址，后端不会读取或修改它们。

完整接口定义和调用示例见根目录的 `API.md`。

数据库默认读取 `data/postgis.json`。配置支持 `database` 字段；缺省时使用数据库用户名作为库名。生产环境推荐通过 `SPRINGGIS_DATABASE_URL` 和 `SPRINGGIS_SECRET_KEY` 注入配置，不要把凭据提交到版本库。

首次部署或代码更新后，在 `0-pythonServer` 目录执行：

```powershell
python index.py --migrate
```

迁移成功后启动服务：

```powershell
python index.py
```

测试目录中的兼容入口只能从仓库根目录运行：`python 0-testpy/apply_migration.py`。

## 目录边界

- `app/api/v1`：版本化 HTTP 路由
- `app/services`：会话、审计等业务逻辑
- `app/models.py`：持久化模型
- `app/schemas.py`：输入输出白名单
- `migrations`：PostgreSQL 迁移文件
- `data`：运行配置，不放业务代码

