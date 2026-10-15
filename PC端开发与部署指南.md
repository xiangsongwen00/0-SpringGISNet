# PC 端开发与部署指南

> 对应仓库根目录的 Vue 3 + TypeScript + Vite 工程。最后核对：2026-10-15。

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
    "basePath": "/api/v1",
    "developmentProxyTarget": "http://8.137.36.114:8080",
    "productionReverseProxyUpstream": "http://8.137.36.114:8080"
  }
}
```

- `basePath` 是浏览器使用的同源路径。
- `developmentProxyTarget` 只控制 `npm run dev`。
- `productionReverseProxyUpstream` 只控制 `npm run preview`，不会自动配置 OpenResty。
- 正式部署必须单独配置 Web 服务器的 `/api/` 代理。

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
npm run build
npm run preview
```

构建输出为 `dist/`。Preview 只用于本机验收，不用于生产常驻。可选执行 `npm run sdk:check-js`、`npm run test:sdk` 和 `npm run test:sdk:browser`。

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

将 `dist/` 上传到站点目录，例如 `/opt/springgis/web/dist`。推荐同域配置：

```nginx
server {
    listen 80;
    server_name gis.example.com;
    root /opt/springgis/web/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

启用 HTTPS 后让 80 跳转 443。浏览器请求 `https://gis.example.com/api/v1/...`，OpenResty 内部转发到 8080；后端 CORS 保持空白。

1Panel 中应创建静态网站、将运行目录指向 `dist`、添加 `/api/` 反向代理、申请证书并开启 HTTPS 跳转。`config/pc.env.json` 不会替代 1Panel 配置。

## 6. 发布、回滚和验收

发布前保存旧构建：

```bash
cd /opt/springgis/web
cp -a dist "dist.backup.$(date +%Y%m%d-%H%M%S)"
```

上传后检查并 reload OpenResty。异常时恢复旧目录；不要同时回滚数据库，除非迁移手册明确允许且已经备份。

- 首页、登录/注册、用户管理和 GIS 展示可打开。
- 刷新页面不出现 Web 服务器 404。
- 网络面板请求当前站点 `/api/v1/...`。
- Refresh Token Cookie 保持 `HttpOnly`。
- `token.json`、数据库密码和服务端密钥不在 `dist` 中。

## 7. 常见问题

### 5173 被占用

`strictPort` 会直接退出。查找旧进程，不要让开发端口漂移：

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen
Get-Process -Id <PID>
```

### 页面能开但 API 404

确认请求以 `/api/v1` 开头；开发时检查 Vite，生产时检查 OpenResty `/api/` 代理。`productionReverseProxyUpstream` 只对 `npm run preview` 生效。

### API 500

先请求后端 health，再看 Python 日志、数据库连接和迁移版本。这通常不是 PC 样式或页面问题。

### GIS 资源不显示

确认 `token.json` 有效；网络面板无 401/403/CORS；升级 SDK 后重新执行依赖安装、类型检查和构建。

