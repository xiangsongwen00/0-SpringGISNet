# 独立项目消费 SDK dist

2026-10-08。本项目是应用，不是引擎仓库，也不是临时验收消费者。

## 日常运行：只在这个项目里启动

以下是Windows CMD命令：

```bat
cd /d E:\0-SpringGISNet
npm run dev
```

开发端口沿用config/pc.env.json，当前5173。无需SDK_TOKEN_FILE、SDK_CONSUMER_PORT，不会打包引擎、创建临时目录或安装依赖。初次取得项目按通常流程npm install（SDK的vendor tgz必须随项目交付）。

- http://localhost:5173/：现有Vue站点，“引擎”区域展示同一套SDK交互页，可切换TS/JS、全屏、最小化。
- http://localhost:5173/sdk.html：TypeScript独立交互。
- http://localhost:5173/sdk-js.html：JavaScript ES6独立交互。

生产构建一次、直接预览：

```bat
cd /d E:\0-SpringGISNet
npm run build
npm run preview
```

默认http://localhost:4173/，TS/JS页面路径相同。preview只服务当前应用dist，不重新打包SDK，不跑自动验收。config/pc.env.json中的API代理保持原样。生产静态服务器部署整个dist，包括HTML、assets和自有样式/资源；源码HTML不能直接Open with Live Server，因为TS需编译、JS中的npm模块也需解析。Live Server应打开dist/sdk.html或dist/sdk-js.html。

## 真正的依赖：不连接引擎源码

应用依赖为：

```json
{ "spring-and-autumn-gis": "file:vendor/spring-and-autumn-gis-0.1.0.tgz" }
```

sdk/demo.ts与sdk/demo-js.js都使用：

```js
import { Viewer, TerrainRgbProvider, GeoJsonLayer } from 'spring-and-autumn-gis';
```

安装后从本项目node_modules中的包exports加载dist/spring-and-autumn-gis.es.js；不是目录链接、不是../../引擎/src相对导入，没有引擎env.config.json别名。SDK包只包含已构建库和公共文档，不包含源码、交互项目或真实配置。vendor tgz是应用的固定可交付依赖，随项目保留；不要用全局npm link替换它。

引擎更新时才显式执行：

```bat
cd /d E:\SpringAndAutumnGIS\SpringAndAutumnGIS
npm run build
cd /d E:\0-SpringGISNet
npm run sdk:update
```

sdk:update读取当前已经生成的dist，通过npm pack --ignore-scripts产生vendor tgz并安装，检查安装文件与引擎dist一致；不会调用引擎build，不启动服务，不创建临时消费者。其他引擎路径可先set "SDK_ENGINE_DIR=完整目录"。正常运行不读取引擎仓库，SDK更新后记得重新build本应用。

## TS / JavaScript 两种消费

| 类型 | 文件 | 说明 |
| --- | --- | --- |
| TypeScript | sdk.html、sdk/demo.ts、sdk/demo-config.ts | tsconfig.sdk.json单独严格类型检查 |
| JavaScript ES6 | sdk-js.html、sdk/demo-js.js、sdk/demo-config.js | 实际.js模块，不是浏览器执行TS；独立页面回归 |

两版接口和控件一致。维护时以TS行为为源，npm run sdk:sync-js同步JS，npm run sdk:check-js检查一致性；build自动同步。这仅同步应用代码，不构建SDK。站点嵌入相同交互页而不重复创建另一套引擎；最小化发stop，展开发start，退出发destroy。

覆盖当前Viewer的方法与状态：create、setBaseMap、setTerrainEnabled、setLodGridVisible、flyTo、getCameraViewState、start、stop、destroy、getBaseMaps、baseMap/terrainEnabled/lodGridVisible/isDestroyed，初始自动启动/信号取消/相机/LOD及统计回调。支持XYZ/TMS、Style JSON、底图快速切换、GeoJSON业务图层与能力报告。业务面目前显示边界，不是填充面或尚未实现的entities/鼠标绘制；不是完整MapLibre样式兼容承诺。stop暂停渲染，不承诺停止所有加载。

## 用户自己的 token.json

现有根目录token.json可以继续使用。没有文件时从token.example.json复制后填写自己的配置。不能发布维护者凭据，也不能自动回退OSM或合成地形：普通交互需要至少一个底图及DEM来源，否则显示配置指引，不创建地图。

开发和preview通过本项目同源/token.json返回白名单字段，剔除serverToken等服务端字段。旧的import tokenConfig from '../../token.json'已移除；构建不把凭据写进JS，也不自动复制token.json到dist；Vite原始文件访问禁用token.json，避免绕过白名单接口。

字段：

- tianditu.token：用户自己的天地图浏览器Key，提供影像和栅格制图预设，不是MVT。天地图仍需申请自己的Key，不提供共享Key；本次未实现其配套栅格注记控件。
- maptiler.key：自己的Key，提供Streets Style JSON，并在没有显式DEM时使用Terrain RGB v2 TileJSON。
- geovis.terrainToken：已有地形授权者可填；没有显式DEM/MapTiler时才使用。不分发维护者资源。
- osm.rasterUrl / osm.styleUrl / attribution：自己选择的服务地址和署名。OSMF标准栅格不需要假造API Key，但不自动启用它。
- demo.basemaps：自有XYZ/TMS或Style JSON，支持name/sourceId/levelOffset/symbols/attribution；id必须唯一。
- demo.defaultBaseMap：可用底图id，留空选第一项。
- demo.terrain：自有tileJsonUrl或urlTemplates，以及encoding、scheme、maxLevel、attribution。优先于地形预设。

根目录原有tianditu/maptiler/geovis字段兼容；mapbox.serverToken等私密字段不返回浏览器。Mapbox等其他服务请通过自有底图/地形定义接入。页面输入可临时追加服务并重建，不写回文件。不可将地形晕渲图片误当DEM。

静态部署由用户显式提供自己的配置：

```bat
cd /d E:\0-SpringGISNet
npm run build
npm run config:deploy
```

config:deploy只把浏览器白名单写入dist/token.json；不得把带本机Key的dist当成无凭据样例分发。发布应用时使用你自己的受限浏览器Key或授权网关。文件名不是加密，客户端配置可被浏览器读取；只放允许公开且限制域名/权限/配额的Key，Secret留服务端。

注意：现有token.json此前已经被Git跟踪，新增.gitignore不能自动取消跟踪。此次未改Git索引、未提交或删除你的本地文件；发布前请检查跟踪状态，必要时git rm --cached token.json（保留本地文件），并处理已有提交里的密钥历史/权限。

获取教程：

- 天地图：[开发者平台](https://lbs.tianditu.gov.cn/)，注册应用申请自己的服务Key，域名/配额以平台为准。
- MapTiler：[Key教程](https://docs.maptiler.com/guides/credentials/api-key/)、[Terrain RGB v2](https://docs.maptiler.com/schema-raster/terrain-rgb/)。优先TileJSON，避免写死过期PNG路径。
- OSM：使用自己授权/自建的衍生服务；主动选择OSMF公共标准栅格时遵守[瓦片政策](https://operations.osmfoundation.org/policies/tiles/)，显示署名、正常Referer和缓存，不批量下载/压测公共服务。

HTTP服务启动、Viewer配置就绪、底图瓦片全部加载是不同阶段。页面会显示等待/就绪/失败，不用合成图掩盖429、401/403或跨域错误。本机此前天地图遇到429，不能据此宣称真实数据授权/配额已经验证通过。

## 验证

```bat
npm run typecheck:sdk
npm run test:sdk
npm run test:sdk:browser
```

test:sdk检查安装的dist、接口、XYZ/TMS、TS/JS产物和凭据未进入bundle；test:sdk:browser直接服务本项目现有dist，分别检查TS/JS控件、真实Worker、暂停/恢复、取消、销毁/重建后canvas保留，以及缺少配置时不创建地图，也检查Vue站点嵌入。不会创建/安装临时消费者或读取引擎源码；合成数据只在显式smoke=1自动测试中使用，不请求真实地图服务。需要Chrome与Node22；CHROME_PATH可指定浏览器。

全站npm run typecheck仍检查Vue账户等旧模块。当前AccountDialog.vue有3处已有类型错误（点击回调参数、可能undefined的安全答案），不属于SDK接口问题，此次未改账户逻辑。build沿用原站Vite构建，并增加SDK范围严格检查，没有掩盖SDK类型错误。
