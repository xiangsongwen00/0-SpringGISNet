# SpringAutumn GIS API

本文档描述当前已实现的最小信息账户与认证终端绑定 API。用户名、时间记录和安全摘要仍可能依法构成个人信息，因此不使用“完全匿名”作不准确承诺。后续 Recovery、License 和 GIS 业务接口继续使用相同的版本化结构与响应约定。

## 1. 启动和配置

后端全局配置文件：

```text
0-pythonServer/env.ini
```

配置项：

| 分组 | 配置 | 说明 |
|---|---|---|
| `server` | `host` | 监听地址 |
| `server` | `port` | HTTP 端口；本机开发固定为 8080 |
| `server` | `environment` | `development`、`test` 或 `production` |
| `database` | `config_path` | PostgreSQL JSON 配置路径 |
| `security` | `access_token_minutes` | Access Token 有效分钟数 |
| `security` | `refresh_token_days` | Refresh Token 有效天数 |
| `security` | `secret_key_file` | 服务端 HMAC 密钥文件 |
| `cors` | `origins` | 跨域浏览器来源；同域部署默认留空，不允许使用 `*` |

启动：

```powershell
cd 0-pythonServer
python index.py --migrate
python index.py
```

临时覆盖端口：

```powershell
python index.py --port 8080
```

环境变量优先于 `env.ini`，可用变量包括：

```text
SPRINGGIS_ENV_FILE
SPRINGGIS_API_HOST
SPRINGGIS_API_PORT
SPRINGGIS_ENVIRONMENT
SPRINGGIS_DATABASE_URL
SPRINGGIS_DATABASE_CONFIG
SPRINGGIS_SECRET_KEY
SPRINGGIS_ACCESS_TOKEN_MINUTES
SPRINGGIS_REFRESH_TOKEN_DAYS
SPRINGGIS_CORS_ORIGINS
SPRINGGIS_AMAP_WEB_SERVICE_KEY
```

三个程序的配置文件完全独立：

| 程序 | 独立运行/API 配置文件 | 允许读取的范围 |
|---|---|---|
| Python 后端 | `0-pythonServer/env.ini` | 仅 Python 后端 |
| PC Web | `config/pc.env.json` | 仅根目录 Vue/Vite 工程 |
| Android APK | `0-auth-Apk/config/apk.env.json` | 仅独立 APK 工程 |

PC 和 APK 不读取 `env.ini`，也不互相读取配置或互相调用。两者仅通过 HTTP 请求连接 Python API。后端固定监听 `8080`。

### CORS 部署规则

当前 PC 正式站点与 API 使用不同端口，因此后端精确允许 PC 来源：

```ini
[cors]
origins = http://8.137.36.114:8000
```

- 当前 PC 页面是 `http://8.137.36.114:8000`，API 是 `http://8.137.36.114:8080`，端口不同即属于跨源；
- PC 本地开发通过自己的 Vite 代理访问 API，不需要后端放行 `localhost:5173`；
- APK 的 H5 布局调试通过 APK 工程自己的 Vite 代理访问 API，不需要后端放行 `localhost:5174`；
- 原生 Android APK 不受浏览器 CORS 限制；
- 只有浏览器页面与 API 确实使用不同来源时，才填写真实前端来源，例如 `origins = https://www.example.com`；
- 只能填写来源，即“协议 + 主机 + 可选端口”，不能附带 `/api` 路径，也不能使用通配符 `*`。

本机开发端口分工：

| 组件 | 端口 | 说明 |
|---|---:|---|
| Python API | `8080` | 唯一后端接口服务 |
| PC Web 开发服务器 | `5173` | 根目录 Vue/Vite 工程 |
| APK 的 H5 调试服务器 | `5174` | 仅用于调试 `0-auth-Apk` 页面；正式 APK 本身不监听端口 |

APK 工程使用自己配置文件中的 `api.androidBaseUrl`，当前指向预配置的公网 API。只有临时访问开发电脑本机 API 时，Android 官方模拟器才使用 `http://10.0.2.2:8080/api/v1`，真机则使用开发电脑的局域网地址；正式发布时必须填写正式 HTTPS API 域名。

当前为后续部署预先配置的远程服务地址：

```text
API 服务：http://8.137.36.114:8080
API 前缀：http://8.137.36.114:8080/api/v1
```

该地址已经分别写入 PC 和 APK 自己的配置文件。APK 直接请求完整 API 地址；PC 开发时请求同源 `/api/v1` 并由 Vite 代理，生产包直接请求 `http://8.137.36.114:8080/api/v1`。因此后端 CORS 写入的是 PC 页面来源 `http://8.137.36.114:8000`，不是 API 自身地址。正式公网通信仍应升级为 HTTPS。

后端在服务器或开发机自身的本地检查地址：

```text
http://127.0.0.1:8080
http://127.0.0.1:8080/api/v1
```

这里的 `127.0.0.1` 仅用于运行后端的同一台机器，不是 PC/APK 当前配置的远程上游。完整部署、数据库和打包步骤以[系统环境与部署总指南](环境配置说明.md)为入口。

非生产环境 OpenAPI 页面：

```text
http://127.0.0.1:8080/docs
```

## 2. 数据与隐私边界

注册只接收：

```json
{
  "username": "map_user",
  "password": "用户自己设置的密码",
  "client_type": "web",
  "terms_accepted": true,
  "privacy_accepted": true,
  "age_requirement_confirmed": true
}
```

服务不接收、不保存，也不为以下数据预留账户字段：

- 邮箱、手机号、短信内容；
- 真实姓名、证件号、明文住址（安全问题答案仅保存 Argon2 摘要）；
- 通讯录、GPS；
- IMEI、MAC、完整硬件序列号；
- 原始设备指纹。

向注册或登录接口提交未定义字段会返回 `422`，不会写入数据库。

## 3. 通用约定

请求体使用：

```http
Content-Type: application/json
```

所有服务端时间使用 UTC，以 ISO 8601 格式返回。

### 用户名

- 2-32 位；
- 允许中文、英文字母、数字、下划线 `_`、连字符 `-`；
- 唯一性不区分大小写；
- `SpringGIS`、`springgis` 和 `SPRINGGIS` 被视为同一用户名。

### 密码

- 10-128 位；
- 使用 Argon2id 保存摘要；
- API、日志和数据库均不保存明文密码。

### 客户端类型

| 值 | 用途 |
|---|---|
| `web` | PC Web 浏览器 |
| `mobile_web` | 手机或平板 Web 浏览器 |
| `desktop` | 非浏览器桌面客户端 |
| `auth_apk` | SpringAutumn Auth Android 认证终端 |

客户端类型只用于会话管理和界面适配，不参与权限判定。

## 4. 认证机制

### Access Token

- 注册或登录成功后在 JSON 响应中返回；
- 默认有效期 15 分钟；
- 数据库只保存 SHA-256 摘要；
- 通过请求头访问受保护接口：

```http
Authorization: Bearer <access_token>
```

### Refresh Token

浏览器客户端 `web` 和 `mobile_web`：

- 通过 `HttpOnly` Cookie 保存；
- 使用 `SameSite=Strict`；
- JavaScript 无法读取；
- 刷新后立即轮换，旧 Token 不可再次使用；
- 生产环境启用 `Secure`，并且必须部署 HTTPS。

非浏览器客户端 `desktop`：

- 在响应体的 `refresh_token` 字段返回；
- 客户端必须保存到操作系统凭据库，禁止写入普通配置文件和日志。

## 5. 健康检查

### `GET /api/v1/health`

无需登录，用于检查 API 和数据库连接。

响应 `200`：

```json
{
  "status": "ok",
  "database": "connected",
  "version": "v1"
}
```

## 6. 注册

### `POST /api/v1/users/register`

请求：

```json
{
  "username": "map_user",
  "password": "a-strong-passphrase",
  "client_type": "web",
  "terms_accepted": true,
  "privacy_accepted": true,
  "age_requirement_confirmed": true,
  "security_answers": [
    { "question_id": "favorite_food", "answer": "用户自定义答案" },
    { "question_id": "nickname", "answer": "另一个自定义答案" }
  ]
}
```

注册必须选择两个不同的安全问题。服务器仅保存答案的 Argon2 摘要，不保存或返回答案明文。对于“生日”、“家庭地址”等问题，界面明确建议用户使用虚构且可记住的答案，不要提交真实个人信息。

成功响应 `201`：

```json
{
  "access_token": "随机短期令牌",
  "refresh_token": null,
  "token_type": "bearer",
  "expires_in": 900,
  "user": {
    "user_uuid": "31e93d2f-4462-4547-a6af-1c857709d61a",
    "username": "map_user",
    "created_at": "2026-09-25T03:20:31.123456Z"
  }
}
```

| 状态码 | 含义 |
|---|---|
| `201` | 注册成功、记录当前协议版本并建立 Session |
| `409` | 用户名不可用 |
| `422` | 字段、用户名、密码或客户端类型不符合要求 |

## 7. 登录

### `POST /api/v1/auth/login`

请求：

```json
{
  "username": "map_user",
  "password": "a-strong-passphrase",
  "client_type": "web"
}
```

成功响应 `200`，结构与注册成功响应一致。

用户名不存在、密码错误或账户不可用统一返回：

```json
{
  "detail": "用户名或凭据不正确"
}
```

HTTP 状态码为 `401`。统一错误用于降低用户名枚举风险。

## 8. 查询当前账户

### `GET /api/v1/users/me`

请求头：

```http
Authorization: Bearer <access_token>
```

成功响应 `200`：

```json
{
  "user_uuid": "31e93d2f-4462-4547-a6af-1c857709d61a",
  "username": "map_user",
  "created_at": "2026-09-25T03:20:31.123456Z"
}
```

Token 缺失、过期或已撤销返回 `401`。

## 9. 刷新会话

### `POST /api/v1/auth/refresh`

浏览器依靠 HttpOnly Cookie，请求体传空对象：

```json
{}
```

桌面客户端和原生 APK 传入本机应用沙箱中保存的 Refresh Token：

```json
{
  "refresh_token": "原 refresh token"
}
```

成功响应 `200`，返回新的 Access Token，并轮换 Refresh Token。旧 Refresh Token 再次使用返回 `401`。每次成功刷新都把会话失效时间重新顺延 `security.refresh_token_days`（默认 30 天），因此连续 30 天没有成功使用/刷新才要求重新输入密码。刷新在原 Session 上完成，保留 APK 的终端绑定，不额外堆积 Session 行。

APK 只持久化 Refresh Token，不保存密码、Access Token、指纹模板或其他生物信息。启动、回到前台以及 Access Token 即将过期时自动刷新；网络暂时不可用时保留本地凭据，只有服务端明确返回 `401` 才清除免登录状态。

## 10. 退出登录

### `POST /api/v1/auth/logout`

浏览器请求体：

```json
{}
```

桌面客户端请求体：

```json
{
  "refresh_token": "当前 refresh token"
}
```

成功响应 `200`：

```json
{
  "message": "已退出登录"
}
```

退出会撤销服务端 Session，并清除浏览器 Refresh Cookie。APK 同步删除本地 Refresh Token 和内存中的 Access Token。

## 11. 错误响应

业务错误：

```json
{
  "detail": "错误说明"
}
```

参数错误返回 `422`，`detail` 为字段错误数组。服务器不会在 HTTP 响应中返回数据库连接、SQL、密码摘要、Token 摘要或调用栈。

常用状态码：

| 状态码 | 含义 |
|---|---|
| `200` | 请求成功 |
| `201` | 资源创建成功 |
| `401` | 登录缺失、过期或凭据错误 |
| `409` | 唯一字段冲突 |
| `422` | 请求格式或字段校验失败 |
| `500` | 未暴露内部细节的服务器错误 |

## 12. 浏览器调用示例

```ts
const loginResponse = await fetch('/api/v1/auth/login', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'map_user',
    password: 'a-strong-passphrase',
    client_type: 'web'
  })
});

const session = await loginResponse.json();

const meResponse = await fetch('/api/v1/users/me', {
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${session.access_token}`
  }
});
```

## 13. 后续接口命名

后续计划使用以下路径：

```text
/api/v1/recovery/*
/api/v1/license-groups/*
/api/v1/licenses/*
```

未实现的接口不会提前返回模拟成功结果。终端私钥、恢复密钥和 License 接口只有在数据库迁移、权限检查、审计和防重放机制完成后才开放。

移动端采用 `0-auth-Apk` 中独立的 `SpringAutumn Auth` APK，技术栈为 Vue 3 + TypeScript + uni-app，Android Keystore 由 UTS 模块封装。普通 Vue 官网继续响应式支持手机浏览器，但移动浏览器不承担终端私钥和恢复确认。认证功能按以下顺序开放：Terminal 绑定、六位码快速登录、终端管理、绑定终端密码恢复、离线 Recovery Key。

## 14. 注册账户的权限边界

注册只创建基础逻辑账户，用于登录、本人数据管理和技术反馈。注册不会自动授予：

- License 或付费能力；
- API 商业调用权限；
- 数据优先处理或内容优先展示；
- 内测、技术支持时效或服务等级承诺；
- 协作组管理员或系统管理员权限；
- 访问其他用户数据的权限。

任何扩展权限必须由独立授权关系产生，并接受服务端权限校验和审计。

## 15. Android 认证终端绑定

终端绑定不读取或上传 IMEI、MAC、手机号码、硬件序列号。APK 在 Android Keystore 中生成不可导出的 P-256 私钥，服务器只保存对应公钥，并通过一次性挑战验证 APK 确实持有私钥。

### `POST /api/v1/terminals/bind/start`

需要 Bearer Access Token。

请求：

```json
{
  "public_key": "Base64 编码的 X.509 SubjectPublicKeyInfo P-256 公钥",
  "authorization_code": "PC 下发的 8-12 位一次性字母数字授权码"
}
```

响应 `200`：

```json
{
  "challenge_id": "UUID",
  "nonce": "一次性随机挑战",
  "expires_at": "2026-09-25T06:00:00Z"
}
```

挑战默认五分钟后失效。APK 必须使用对应 Keystore 私钥对 `nonce` 的 UTF-8 字节执行 `SHA256withECDSA` 签名。

### `POST /api/v1/terminals/bind/confirm`

需要同一账户的 Bearer Access Token。

请求：

```json
{
  "challenge_id": "UUID",
  "nonce": "start 返回的原始一次性挑战",
  "signature": "Base64 编码的 DER ECDSA 签名"
}
```

验签成功响应 `201`：

```json
{
  "terminal_uuid": "UUID",
  "system_name": "terminal-000001",
  "display_name": null,
  "status": 1,
  "key_version": 1,
  "bound_at": "2026-09-25T05:59:00Z"
}
```

一次性挑战完成后不可重放。签名错误返回 `400`，重复公钥或超过十个有效终端返回 `409`，挑战过期返回 `410`。

### `GET /api/v1/terminals`

返回当前账户自己的终端列表，不返回公钥正文、公钥指纹或其他用户终端。

### `POST /api/v1/terminals/authorization-codes`

- `terminal_bind`：只能由已登录 PC 生成。账户从未存在过终端时只验证当前密码；已有过终端后，必须额外正确回答两道安全问题。
- `terminal_migrate`：PC 或已绑定 APK 均可生成，始终需要当前密码和两道安全问题。
- 返回 10 位大写字母数字一次性授权码，10 分钟过期；不轮询、不自动更换，用户主动再次申请时旧码立即失效。

### 快速登录验证码

- `POST /api/v1/auth/quick/start`：仅已绑定 APK 终端可调用，生成 6 位数字验证码，45 秒有效；APK 到期后自动换码。
- `POST /api/v1/auth/quick/consume`：未登录 PC 必须由用户自行输入用户名和 APK 显示的 6 位验证码，两者必须属于同一账户；验证成功后建立 Web 会话。界面不预填或默认任何用户名。
- 验证码与绑定/迁移授权码是两种独立凭据：前者是自动轮换的登录验证码，后者是手动申请的一次性高风险操作授权码。

### 旧账户安全问题补全

`GET /api/v1/users/me/security-questions` 只返回用户已选择的问题，不返回答案。`POST /api/v1/users/me/security-questions` 仅允许尚未设置过安全问题的旧账户在验证当前密码后设置一次，不允许覆盖。

### 终端状态与撤销

- `GET /api/v1/terminals/current`：APK 查询当前会话绑定的终端。APK 启动、回到前台及每 10 秒同步一次；安全问题读取失败不得阻断 Keystore 终端会话恢复。
- `POST /api/v1/terminals/revoke-codes`：仅当前已绑定 APK 可生成本终端的撤销凭据。`authorization_code` 为 10 位字母数字、10 分钟有效；`verification_code` 为 6 位数字、45 秒有效。
- `POST /api/v1/terminals/{terminal_uuid}/revoke`：不再允许仅凭 PC 登录态撤销。必须三选一：当前密码+两道安全问题；目标终端生成的撤销授权码；目标终端生成的 6 位撤销验证码。
- 撤销码具有独立用途标识，快速登录验证码、绑定码、迁移码均不能用于撤销。撤销成功后，该终端会话和关联的未使用凭据同时失效。

## 16. 实时位置与历史轨迹 API

位置模块独立于角色权限模块。注册、登录或绑定终端不会自动开启定位；只有用户在 APK 中主动开启后才采集。位置默认仅本人可读，服务端不提供管理员绕过接口。

数据结构：

- `location_settings`：用户定位开关与采样频率，允许 `1/2/5/10/30/60` 秒，默认 2 秒且关闭。
- `current_locations`：每个用户一条最新位置，用于低延迟读取。
- `track_segments`：按用户、终端、上海自然日及采样频率分段，每行最多 1000 点；跨日、频率改变、间隔超过五分钟或达到上限时建立新段。
- `location_shares`：本人向指定用户名发放的实时或历史时间窗授权，可随时撤销，最长三天。

### APK 写入

- `GET /api/v1/locations/settings`：读取本人定位设置。
- `PUT /api/v1/locations/settings`：更新 `write_interval_seconds` 和 `tracking_enabled`。
- `POST /api/v1/locations/points`：仅 `auth_apk` 且已绑定、未撤销的终端可调用；单次 1-100 点，坐标使用 WGS84。

写入示例：

```json
{
  "points": [{
    "longitude": 106.551,
    "latitude": 29.611,
    "altitude": 326.4,
    "accuracy": 8.0,
    "speed": 1.2,
    "heading": 35.0,
    "recorded_at": "2026-10-11T12:00:00Z"
  }]
}
```

### 本人查询与回放

- `GET /api/v1/locations/me/current`：读取本人最新终端位置。
- `GET /api/v1/locations/me/history?from=...&to=...`：读取最近三天内、最长三天的轨迹分段。PC 引擎将返回点转换为贴地折线并进行轨迹点回放。

### 用户间共享

- `POST /api/v1/locations/shares`：向指定用户名共享 `realtime` 或 `history`；历史共享必须提供开始、结束时间。
- `GET /api/v1/locations/shares`：查看本人发出的授权。
- `DELETE /api/v1/locations/shares/{share_id}`：本人撤销授权。
- `GET /api/v1/locations/shared/current`：读取其他用户明确共享给当前用户的实时位置。
- `GET /api/v1/locations/shared/{share_id}/history`：读取其他用户明确共享的历史时间窗。

### IP 近似位置与地名

- `GET /api/v1/locations/ip`：未登录或暂无终端位置时的 IP 城市级近似定位。
- `GET /api/v1/locations/place?longitude=...&latitude=...`：WGS84 坐标转 GCJ-02 后调用高德逆地理编码，返回地名但仍以原 WGS84 坐标展示。
- 在 `0-pythonServer/env.ini` 的 `[geocoding] amap_web_service_key` 配置高德 Web 服务 Key；未配置不会影响轨迹写入和回放，只禁用 IP 定位与地名查询。

部署新版本后执行：

```powershell
python 0-testpy/apply_migration.py
```

对应迁移为 `006_location_tracking.sql`。

