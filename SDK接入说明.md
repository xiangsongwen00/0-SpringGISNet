# 独立项目消费 SDK dist

2026-10-08。本项目是应用，不是引擎仓库，也不是临时验收消费者。

## 2026-10-11：独立地形LOD初版

本项目仍只消费vendor安装的SDK dist，不读取引擎源码。SDK在Mercator下默认使用独立DEM误差选择；无地形时保持原地图LOD。onStats新增terrain.lodMode、targetTiles/readyTargets、targetMinimumLevel/targetMaximumLevel、sourceMinimumLevel/sourceMaximumLevel，以及surfaceTiles/terrainSurfaceLimited，TS/JS交互页状态面板都显示。目标数、DEM源级别、影像请求zoom和地表mesh数是不同指标，不应只看60FPS或coverageReady。

ViewerOptions.terrainLod可配置maximumScreenSpaceError:3、maxTiles:96、maxSurfaceTiles:512；terrainLod:false对照旧共享选择。preemptFarDetail默认false，避免静止慢请求反复被取消。正常token.json配置不改、不复制到SDK包。细DEM可以细分地表但不提高原影像请求zoom；业务粗MVT跨细DEM分块及完整地形局部交接误差仍是后续阶段，不宣称所有珠峰刀片/等待已经解决。详细参数/限制见引擎SDK使用说明§6.5。

## 日常运行：只在这个项目里启动

本次绘制入口收尾：绘制/样式/对象管理表单统一挂在绘制工具弹窗，标准7个工具图标，默认底部48px，可CSS/参数覆盖；勾选图片点后从工具栏开始同样读取该图标。表单change更新当前同类型会话和后续绘制，连续点不会反向载入已提交对象覆盖预设；旧对象点“更新选中”。按ID选择可用viewer.selectEntity/selectedEntity与entities.selectById；选中不自动飞行或改符号。

完整初始化/属性/类型/方法/错误及TS示例在安装包根的SDK接口参考.md，包含坐标转换、高程来源、测量、地形配置与MVT实验限制。SDK只使用用户资源，未复制开发者密钥。此应用更新SDK后用build生成同步ES6页，不能只改TS后交付旧JS。

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

覆盖当前Viewer的方法与状态：create、setBaseMap、setTerrainEnabled、setLodGridVisible、flyTo、getCameraViewState、start、stop、destroy、getBaseMaps、baseMap/terrainEnabled/lodGridVisible/isDestroyed，初始自动启动/信号取消/相机/LOD及统计回调。支持XYZ/TMS、Style JSON、底图快速切换、GeoJSON业务图层与能力报告。2026-10-09增加B版viewer.entities：点、宽线、填充面/洞、独立与附属标注，新增/查询/修改符号和几何/移动/显隐/删除/清空。旧GeoJSON示例仍只是面边界；完整鼠标线面绘制和完整MapLibre样式兼容不在此版承诺内。stop暂停渲染，不承诺停止所有加载。

## B版交互验收

进入/sdk.html或/sdk-js.html，右侧“03 / 点线面与标注”点“加入四类示例”，相机会定位重庆示例范围。选择对象后可修改颜色/大小/线宽/填充/标注文字，点击“更新选中”；“移动与查询”可输入经纬度/高度增量和query JSON。支持单对象、整体显隐，删除/清空不影响底图。新增ID留空自动生成；修改沿用选中ID，不允许更改对象type。

线/面坐标可通过JSON输入positions，面洞用holes；示例面有真实孔洞。坐标高度是椭球绝对高度，示例1500米仅用于看清对象，**不是贴地**；实际业务应填自己的高度。省略高度默认30米；开启地形后低于地表会被遮挡，不会自动采样DEM。

点击地图会pick对象并回填编辑表单，拖动不当作点击。2026-10-10修正单击加点：默认求当前显示地表网格，用其经纬度及高度，而不是参考椭球坐标后强加表单1500米。“鼠标拾取依据”可选surface／ellipsoid／absolute-height；开启诊断显示来源、回投误差和参考椭球对照。正常模式点／文字可按地图地表深度排除被遮挡对象，线面pick仍是屏幕近似，不等于任意模型深度拾取。

面板已提供“绘制点／绘制折线／绘制面／绘制标注”独立按钮，调用同一个viewer.draw控制器。线至少2点、面至少3点后完成；鼠标移动预览、撤销顶点、取消、Enter完成/Esc取消；左键落点，右/中键和滚轮继续导航，可显式navigation:lock。结束后在同一个entities集合编辑符号/几何/移动/显隐/删除。不是只有单击新增点。面当前绘外环，孔洞可通过JSON再编辑；高级捕捉、顶点拖拽、Redo未实施，持续贴地和测量已加入，见后文。

“图形／图标／文字遮挡”可选正常深度或置顶表达，对应symbol/label.occlusion:depth/overlay。置顶不改高程，但不代表已贴合地形，仍保留背面剔除和文字碰撞限制；绘制线／面调试默认选置顶，结束后可切换正常深度检查物理遮挡。鼠标顶点取点击时地表快照，DEM细化后不会自动更新高度。

标注用系统字体GPU billboard，支持光晕/背景/偏移/字号，碰撞去重及256个可见上限。点形状circle/square/diamond或URL图标；面限定局部简单环，经纬各不超过1度，支持凹面/洞，拒绝自交或非法洞；业务order小于引擎底图注记。完整类型与边界见安装包SDK使用说明.md的4.1/4.2节。

“加入四类示例”现在包含：mylocation_up人物定位图标、Qianjin_left有宽度的方向流动线、半透明重复滚动箭头面（含洞）、独立文字标注。素材已复制到本应用public，随应用dist部署，不通过引擎路径读取，也不进入引擎tgz。

选中后展开“点图标／线面纹理与动画”，可以修改URL、目标朝向、素材原朝向、map/screen参照、线周期/流速/素材方向、面重复/旋转/UV流速；点击“更新选中”。图标原向上为0°，原向左为270°；线素材向左填left后校正为沿positions方向向前。面箭头默认朝西，负U流速表示向西移动。color为纹理乘色，用白色保持原色；opacity也对纹理生效。speed改0停止；取消图标／纹理勾选后更新可退回普通符号。状态诊断selectedImageState显示none/pending/loading/ready/error。

远程图片必须允许CORS；单图≤8MiB/2048×2048，共享ready/loading图片≤256且4并发。图片/文字纹理有共同64MiB估算RGBA上传预算，预算受限标注可能暂不显示并报告error；不包含解码临时内存。HTTP失败也返回error并保留简单几何，不影响底图队列；这不是自动替换用户资源。修复图片服务/释放其他对象后点“重试选中符号资源”（retryEntityResources）。动画只修改uniform，朝向更新复用图标几何/纹理；软件GPU测试不等于生产帧率保证。

```js
const point = viewer.entities.add({ id: 'my-point', type: 'point',
  position: [106.55,29.61,1500], symbol: { color: '#ffcc00', size: 18 },
  label: { text: '我的点', fontSize: 16 } });
viewer.entities.update(point.id, { symbol: { color: '#ff0066' } });
viewer.entities.move(point.id, { longitude: 0.01, height: 100 });
viewer.entities.setVisibleById(point.id, false);
const found = viewer.entities.query({ type: 'point' }); // 深度只读快照
viewer.entities.remove(point.id);
```

## 用户自己的 token.json

2026-10-10贴地更新：面板“高度参考”选持续贴地，折线/面绘制按钮默认clamp-to-ground+正常深度，随当前显示地表重建；人物图标与点/标注绘制明确overlay，近侧符号不再被分析椭球地平线误过滤。源坐标不改，第三维在贴地渲染时忽略；“贴地显示间距”可设0.5/1米对照闪烁，默认0.15米，还有有限约0.5米深度偏置。诊断groundState有pending/ready/unavailable/limited及顶点/patch数量，不用未就绪零地形兜底。鼠标移动使用轻量临时预览，完成后提交真正贴地对象；界面显示拾取/CPU预览/更新耗时。具体限制与API见安装包SDK使用说明§4.4，早期“持续贴地未实施”描述已被本更新替代，测量/高级编辑仍未实施。

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

test:sdk检查安装的dist、接口、XYZ/TMS、TS/JS产物和凭据未进入bundle；test:sdk:browser直接服务本项目现有dist，分别检查TS/JS控件、真实Worker、暂停/恢复、取消、销毁/重建后canvas保留，以及缺少配置时不创建地图，也检查Vue站点嵌入。B版增加CRUD/移动/符号/显隐/查询/拾取、真实GPU点/宽线/填充/孔洞/标注像素与连续更新资源数量检查。不会创建/安装临时消费者或读取引擎源码；合成数据只在显式smoke=1自动测试中使用，不请求真实地图服务。需要Chrome与Node22；CHROME_PATH可指定浏览器。自动软件GPU测试不是实景帧率基准。

全站npm run typecheck仍检查Vue账户等旧模块。当前AccountDialog.vue有3处已有类型错误（点击回调参数、可能undefined的安全答案），不属于SDK接口问题，此次未改账户逻辑。build沿用原站Vite构建，并增加SDK范围严格检查，没有掩盖SDK类型错误。

## 图标工具栏和测量（2026-10-11）

引擎地形新增默认camera-near调度，不改当前LOD/目标精度：请求、DEM解码队列、上传、局部事务按近相机可见范围优先，必要父覆盖仍先准备；已有覆盖后3:1给近景细节与补覆盖机会，远景细节可有界让位，原父地表保留。terrainLayer.requestPriority:'screen-error'可对照，preemptFarDetail:false可禁让位；stats提供requestPriority与preemptedRequests。不会自动启用experimental regionalCoverage，也未实现独立地形LOD或远景主动降级。详引擎SDK§6.5。

最新极圈补圈不再正常使用固定蓝白：按当前底图配置/样式准备自己的南北atlas，当前地图激活后自动烘焙，切换与缓存隔离；Google、天地图、Esri、OSM及自定义源走通用流程。矢量按本样式先生成，再用实际GPU制图像素更新。低优先1并发补采边缘，前景忙时让路，不额外请求DEM。getPolarSurfaceState()可看mapId、sampled/style/fallback、样本比例、排队/失败/内存。只有没有可用像素/样式才用northColor/southColor兜底；warmup:false可禁额外影像请求。仍非真实极地影像/DEM，不含维护者预置资源；详SDK§6.4。

最新交互：打开弹窗或选择类型不会自动启动，需点击“开始测量／开始绘制”；同类型完成后可以再次开始。新增“新对象提交后清除历史对象”，默认不勾选保留。点勾选后逐点替换、线面成功完成后替换；开始、预览、取消、失败不删旧数据。绘制/测量分组，不清普通业务对象。API为draw.start({type,clearPrevious:true})、measure.start(kind,{clearPrevious:true})。设置在开始时捕获。两极无数据默认色现为北极海洋蓝、南极冰雪白，可通过ViewerOptions.polarSurface的northColor/southColor覆盖，补圈近似/DEM缺失限制不变。详引擎SDK§6.3。

后续收拢：测量仅measure-distance图标、绘制仅polygon图标，弹窗选择类型，默认点；底图/偏移小弹窗跟随工具栏。draw.start点/标注默认连续，每次点击提交一个新对象，Enter/stop/关闭结束；continuous:false保留一次点击退出。线面支持双击（去重末点），也可Enter。measure.start()默认连续点坐标测量，另有distance/area；属性查询在测量类型中选择。close/stop不删已提交点，clear仅删测量控制器拥有的对象。

南北极超出Mercator瓦片覆盖的部分新增显示补圈；在±88°的合成场景验证过显示与拾取，拾取有approximation:polar-cap。这不是实际极地影像或DEM；域外真实DEM查询null，导航只按显示补圈维持间距，不改变实际DEM数据。新配置polarSurface:false可关闭，真实极地投影服务/重投影接入仍需后续独立实施。详引擎SDK§6.2。

TS demo创建Viewer后调用createToolbar，JS由sdk:sync-js生成，二者消费同一已安装dist。地图左下角为纵向图标栏，设置和测量结果在右侧面板。图标已内联SDK，无需复制引擎src/assets。包括初始视角、保持位置/高度的北向俯视、底图、偏移、地形、点属性查询、路程/面积和点线面绘制。对象管理可选择实体、查看JSON、显隐和删除；本页面原有完整表单保留用于修改符号/移动等验收。

绘制左键落点，右键旋转、中键俯仰、滚轮缩放；Enter完成、Esc取消、Backspace撤销。API需要锁定时设置draw.start的navigation:'lock'。viewer.measure.start('distance'|'area')调用同一输入系统；结果为WGS84椭球路程/面积，不是山坡测量，完成后结果实体可查询/显隐/删除，clear仅删除该工具拥有的测量实体。纯函数measureDistance/measureArea与viewer同名方法均可用。viewer.inspectAt返回自有entities属性及地表坐标，不提供全部业务瓦片源的要素属性查询。详见引擎SDK使用说明§6.1。
