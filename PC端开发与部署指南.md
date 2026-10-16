# PC 端开发与部署指南

> 对应仓库根目录的 Vue 3 + TypeScript + Vite 工程。最后核对：2026-10-16。PC 正式端口固定为 `8000`，Python API 固定为 `8080`。

## 1. 运行环境

- 推荐 Node.js 22 LTS；当前验证环境为 Node `22.16.0`。
- npm 随 Node 安装，不建议用 `--force` 或 `--legacy-peer-deps` 掩盖依赖问题。
- Python、PostgreSQL 和 APK 的依赖不要安装到本工程目录。

```powershell
cd E:\0-SpringGISNet
node -v
npm -v
npm install
```

## 2. PC 独立配置

唯一环境文件是 `config/pc.env.json`：

```json
{
  "devServer": { "host": "0.0.0.0", "port": 5173, "strictPort": true, "previewPort": 4173 },
  "api": {
    "developmentBasePath": "/api/v1",
    "developmentProxyTarget": "http://8.137.36.114:8080",
    "productionBaseUrl": "http://8.137.36.114:8080/api/v1"
  }
}
```

- `developmentBasePath` 是开发服务器使用的同源代理路径。
- `developmentProxyTarget` 只控制 `npm run dev`。
- `productionBaseUrl` 会编译进正式 PC 包，当前固定为后端 `8080` 的完整接口前缀。
- 正式 PC 页面运行在 `8000`，不会再把 `/api/v1` 错误发送给静态站点端口。
- 因 `8000` 与 `8080` 属于不同源，后端 `env.ini` 的 CORS 必须精确允许 `http://8.137.36.114:8000`。

GIS 资源凭据从 `token.json` 读取。首次使用：

```powershell
Copy-Item token.example.json token.json
```

只编辑 `token.json`。它已被 Git 忽略，不要把真实令牌写进源码、截图或文档。`npm run config:deploy` 会部署资源配置，运行前应确认目标和公开范围。

## 3. 开发、检查与构建

```powershell
npm run dev
```

- 主站：`http://127.0.0.1:5173/`
- TypeScript SDK：`http://127.0.0.1:5173/sdk.html`
- JavaScript SDK：`http://127.0.0.1:5173/sdk-js.html`

发布前：

```powershell
npm run typecheck
npm run build:deploy
npm run preview
```

构建输出为 `dist/`。正式发布必须使用 `npm run build:deploy`：它先执行生产构建，再把根目录 `token.json` 过滤为仅含浏览器公开字段的 `dist/token.json`。单独运行 `npm run build` 会清空旧 `dist`，并且不会复制资源配置。Preview 只用于本机验收，不用于生产常驻。可选执行 `npm run sdk:check-js`、`npm run test:sdk` 和 `npm run test:sdk:browser`。

## 4. 更新本地 GIS SDK

SDK 源工程默认位于 `E:\SpringAndAutumnGIS\SpringAndAutumnGIS`。只有明确升级时运行：

```powershell
npm run sdk:update
npm run typecheck
npm run build
```

脚本打包 SDK 的已构建 `dist`，更新 `vendor` 包与安装依赖。日常 `dev`/`build` 不会隐式读取 SDK 源工程。若源工程在其他位置：

```powershell
$env:SDK_ENGINE_DIR = 'D:\path\to\SpringAndAutumnGIS'
npm run sdk:update
Remove-Item Env:SDK_ENGINE_DIR
```

## 5. OpenResty/Nginx 正式部署

将 `dist/` 上传到站点目录，例如 `/opt/springgis/web/dist`。PC 对外端口固定为 `8000`；API 由前端生产配置直接访问 `8080`，Web 服务器不需要配置 `/api/` 代理：

```nginx
server {
    listen 8000;
    server_name 8.137.36.114;
    root /opt/springgis/web/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

浏览器页面地址为 `http://8.137.36.114:8000`，接口地址为 `http://8.137.36.114:8080/api/v1/...`。服务器防火墙必须允许 `8000` 和 `8080`，后端 CORS 必须允许 PC 的 `8000` 来源。

1Panel 中应创建静态网站、将运行目录指向 `dist`，并将 PC 监听端口设置为 `8000`。`config/pc.env.json` 决定生产包访问哪个 API，但不会替代服务器防火墙和后端 CORS 配置。

## 6. 发布、回滚和验收

发布前保存旧构建：

```bash
cd /opt/springgis/web
cp -a dist "dist.backup.$(date +%Y%m%d-%H%M%S)"
```

上传后检查并 reload OpenResty。异常时恢复旧目录；不要同时回滚数据库，除非迁移手册明确允许且已经备份。

- 首页、登录/注册、用户管理和 GIS 展示可打开。
- 刷新页面不出现 Web 服务器 404。
- 网络面板中的生产接口请求为 `http://8.137.36.114:8080/api/v1/...`，不能是 `:8000/api/v1/...`。
- Refresh Token Cookie 保持 `HttpOnly`。
- `dist/token.json` 只包含浏览器可公开的资源字段；原始 `serverToken`、数据库密码和服务端密钥不在 `dist` 中。

## 7. 常见问题

### 5173 被占用

`strictPort` 会直接退出。查找旧进程，不要让开发端口漂移：

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen
Get-Process -Id <PID>
```

### 页面能开但 API 404

开发请求应以 `/api/v1` 开头并由 Vite 转发；生产请求的完整地址应为 `http://8.137.36.114:8080/api/v1/...`。如果仍然请求 `:8000/api/v1`，说明服务器上还是旧的 `dist`，需要重新构建、上传并清理浏览器缓存。

### API 500

先请求后端 health，再看 Python 日志、数据库连接和迁移版本。这通常不是 PC 样式或页面问题。

### GIS 资源不显示

确认根目录 `token.json` 有效，并使用 `npm run build:deploy`；上传后确认服务器上的 `/token.json` 返回 JSON 而不是 404/HTML。网络面板还应无 401/403/CORS；升级 SDK 后重新执行依赖安装、类型检查和正式发布构建。

