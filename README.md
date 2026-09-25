# 春秋GIS

春秋GIS 的历史地理、GIS 技术整理与轻量 3D GIS 引擎演示页面，当前内容以舆图笔记方向为主。页面默认使用天地图，适合国内网络环境；演示中也可以临时切换其他底图，并开关 Terrain-RGB 地形。

## 快速运行

```bash
npm install
npm run dev
```

PC Web 的运行端口和后端 API 连接只在 `config/pc.env.json` 中配置。PC 不读取 `0-pythonServer/env.ini` 或 `0-auth-Apk/config/apk.env.json`。浏览器始终请求同源 `/api/v1`；开发代理和生产反向代理的上游均为 `http://8.137.36.114:8080`。

生产构建与 Vue 类型检查：

```bash
npx vue-tsc -p tsconfig.json --noEmit
npm run build
```

## 天地图令牌放置位置

项目根目录的 `token.json` 已经是自动读取位置，也就是与 `package.json` 同级：

```text
0-SpringGISNet/
├─ token.json
├─ package.json
└─ src/
```

文件使用以下结构，令牌放在 `tianditu.token` 字段：

```json
{
  "tianditu": {
    "token": "你的天地图 Token"
  }
}
```

也可以用环境变量覆盖 `token.json`：

```dotenv
VITE_TIANDITU_TOKEN=你的天地图 Token
```

环境变量优先级高于 `token.json`。浏览器端地图令牌属于公开客户端凭据，请在天地图控制台限制域名和调用额度，不要把服务器私密密钥放进前端。

没有天地图令牌时，演示会自动回退到 OpenStreetMap，不会把 Google 作为默认底图。

## 引擎演示

进入页面的“引擎”区域后可以使用控件：

- **底图**：默认是天地图矢量；可切换天地图影像、OpenStreetMap 和 Google 卫星。
- **地形**：使用 MapTiler Terrain-RGB 时默认开启，可以实时关闭或重新开启。

地形需要在项目根目录的 `.env.local` 中配置：

```dotenv
VITE_ENABLE_TERRAIN=true
VITE_MAPTILER_KEY=你的公开 MapTiler Key
```

关闭地形但保留地形数据配置：

```dotenv
VITE_ENABLE_TERRAIN=false
```

当前引擎包含 WGS84 三维经纬网、LOD 调度、XYZ/WMTS 栅格瓦片、Terrain-RGB 高程解码、祖先瓦片回退和基础相机交互。演示控件调用引擎提供的 `setImageryProvider()` 与 `setTerrainEnabled()`，切换时不会重建整个地球实例。

## 目录说明

- `src/App.vue`：站点页面结构、文章、技术和笔记内容。
- `src/components/GlobeDemo.vue`：三维地球演示、底图切换和地形开关。
- `src/config/site.config.json`：页面模块开关。
- `token.json`：本地开发使用的公开客户端令牌配置。
- `public/layer-catalog.schema.json`：图层目录结构约束。

## 注意事项

Google 地图服务在国内网络环境下不稳定，因此只作为可选切换项。天地图服务需要有效 Token，使用时应遵守对应服务条款和署名要求。
