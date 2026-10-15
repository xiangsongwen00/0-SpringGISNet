# Android 调试、打包与安装指南

> 对应 `0-auth-Apk` 独立 uni-app 工程。最后核对：2026-10-15。本工程与 PC、Python 环境隔离，只通过 HTTP(S) API 关联。

## 1. 当前工程信息

| 项目 | 当前值 |
| --- | --- |
| 应用名 | 春秋GIS 人生轨迹 |
| DCloud AppID | `__UNI__11F019F` |
| 版本 | `1.1.0` / versionCode `110` |
| 框架 | uni-app Vue 3 + TypeScript |
| H5 调试端口 | `5174` |
| H5 Preview | `4174` |
| Android 最低/目标 SDK | 23 / 35 |
| 图标 | `unpackage/res/icons/春秋GIS暖色人生轨迹.png` |

原生能力包括 Android Keystore、自身定位/轨迹上传、SpringAndAutumnGIS 三维地图以及终端授权。账户权限仍是一个模块，不是整个 APK 的唯一功能。

三维地图 SDK 已独立保存在 `vendor/spring-and-autumn-gis-0.1.0.tgz`。App 的 renderjs/WebView 直接加载打包后的 SDK，不打开 PC 页面，也不依赖 PC 工程运行。单指旋转，双指平移/俯仰，双指捏合缩放；测量和绘制使用轻触落点。

## 2. 准备工具

### Node 环境

推荐 Node.js 22 LTS；当前验证环境为 `22.16.0`：

```powershell
nvm use 22
node -v
npm -v
cd E:\0-SpringGISNet\0-auth-Apk
npm install
```

`nvm use ww` 不是有效版本。当前 uni-app 依赖要求 Vite 精确为 `5.2.8`，`package.json` 已固定；不要手工改回 5.4，也不要使用 `--force` 或 `--legacy-peer-deps` 忽略冲突。

若编辑器提示找不到 `@vue/tsconfig/tsconfig.json`，先在本工程执行正常的 `npm install`，再重启 TypeScript 服务。不要让编辑器读取 PC 工程的 tsconfig。

### HBuilderX

安装支持当前 uni-app 编译器的 HBuilderX，建议不低于 5.24，优先使用与依赖版本接近的 5.26 或更新稳定版。登录拥有 AppID `__UNI__11F019F` 的 DCloud 账号。

HBuilderX 中导入的是完整目录：

```text
E:\0-SpringGISNet\0-auth-Apk
```

不要只导入 `src`，不要重新生成 AppID，也不要把 PC 根工程作为 uni-app 工程运行。

## 3. APK 独立环境配置

只编辑 `config/apk.env.json`：

```json
{
  "h5DebugServer": {
    "host": "0.0.0.0",
    "port": 5174,
    "strictPort": true,
    "previewPort": 4174
  },
  "api": {
    "h5DebugBaseUrl": "/api/v1",
    "h5DevelopmentProxyTarget": "http://8.137.36.114:8080",
    "androidBaseUrl": "http://8.137.36.114:8080/api/v1"
  }
}
```

- H5 请求 `/api/v1`，Vite 用 `h5DevelopmentProxyTarget` 转发。
- 真机不经过 Vite，直接使用 `androidBaseUrl`，所以必须包含 `/api/v1`。
- 真机中的 `127.0.0.1` 是手机自己，不能指向电脑或服务器。
- Android 官方模拟器访问开发电脑可用 `10.0.2.2`；真机访问电脑使用同一局域网的电脑 IPv4 地址。
- 当前公网 HTTP 只适合联调。正式发布应换成可信域名 HTTPS，并重新打包。

临时连接电脑本机后端示例：

```json
"androidBaseUrl": "http://192.168.1.25:8080/api/v1"
```

这要求后端监听 `0.0.0.0:8080`、手机和电脑处于同一局域网、Windows 防火墙允许专用网络 TCP 8080。

## 4. H5 页面调试

```powershell
cd E:\0-SpringGISNet\0-auth-Apk
npm run dev:h5
```

访问 `http://127.0.0.1:5174`。H5 可验证：

- 页面布局、中文用户名、登录注册与安全问题。
- API 可达性、错误提示、快速登录码页面。
- 轨迹模块的非原生状态和接口展示。

H5 无法验证：

- Android Keystore UTS 模块。
- Android 定位权限和真实 GPS。
- 锁屏/后台定时器、厂商电池优化。
- 安装升级、签名和原生插件。

H5 出现“需要 App 环境”是正确保护，不表示手机 APK 一定失败。

检查命令：

```powershell
npm run type-check
npm run build:h5
```

## 5. 原生权限与模块

`src/manifest.json` 当前声明：

- `INTERNET`
- `ACCESS_COARSE_LOCATION`
- `ACCESS_FINE_LOCATION`
- `ACCESS_BACKGROUND_LOCATION`
- `FOREGROUND_SERVICE`
- `FOREGROUND_SERVICE_LOCATION`
- `WAKE_LOCK`
- uni-app `Geolocation` 模块

地图凭据与资源地址只读取 APK 自己的 `config/token.json`，不会在运行时读取 PC 工程配置。首次构建或更新资源凭据时，在 `0-auth-Apk` 目录执行：

```powershell
.\scripts\import-map-token.ps1
```

该脚本只导入允许进入客户端的地图字段，并排除 `serverToken` 和 Mapbox 服务端令牌；它不会建立同步关系，导入后 PC 与 APK 两份文件完全独立。`config/token.json` 已被 Git 忽略，字段格式见 `config/token.example.json`。发布前仅放允许随客户端分发、已限制来源和配额的公开 Key，严禁放服务端私钥。

- `tianditu.token`：显示“天地图影像”。
- `google.satelliteUrl`：显示“Google 卫星影像”，必须填写你有权使用的 XYZ 瓦片模板；项目不内置未经授权的 Google 瓦片端点。
- `demo.terrain`：优先使用自定义 Terrain-RGB TileJSON 或 URL 模板。
- `maptiler.key`：未配置自定义地形时，使用 MapTiler Terrain-RGB。
- `geovis.terrainToken`：前两项为空时，作为 GeoVIS Terrain-RGB 后备。
- `demo.defaultBaseMap`：可填 `tianditu-imagery` 或 `google-satellite`。

`config/apk.env.json` 的 `map` 段只保留非敏感运行参数、自定义 `xyzUrl` 和 `terrainEnabled` 总开关。高德 Web 服务 Key 仍只放 Python 服务端，用于 IP 定位和经纬度地名反查，不能作为底图 Key 打进 APK。

Keystore UTS 插件位于 `uni_modules/springgis-keystore`。修改 UTS 插件、manifest 权限、原生模块或 AppID 后，旧自定义基座不会自动拥有新能力，必须重新制作自定义基座或重新云打包。

权限声明只是前提，运行时仍需用户授权。Android 11+ 的后台位置通常需要先授权前台位置，再在系统设置中选择始终允许；荣耀/华为设备还可能需要关闭电池优化、允许后台活动和自启动。

重要限制：当前 JavaScript 定时上传在前台最可靠。仅声明后台定位/前台服务权限，并不自动等于已经实现持续原生前台服务；锁屏或被系统清理时仍可能降频/停止。需要严格全天后台轨迹时，应另行实现并测试原生前台定位服务。

## 6. 真机运行调试

由于工程包含 UTS 原生插件，优先使用自定义调试基座：

1. 手机开启开发者选项和 USB 调试。
2. USB 连接电脑，确认 HBuilderX 能识别设备。
3. HBuilderX 打开整个 `0-auth-Apk`。
4. 选择“运行 → 运行到手机或模拟器 → 制作自定义调试基座”。
5. 基座制作完成后，选择该自定义基座运行到 Android。
6. 手机首次启动时按顺序授予定位权限。

若更改原生插件或权限，删除旧基座并重新制作。只执行 `npm run dev:app` 或热更新 JavaScript 不能替代基座重建。

定位调试顺序：

1. 登录并确认终端已经绑定。
2. 在系统设置确认精确位置权限。
3. 在 APK 中开启轨迹，选择 1s/2s/5s/60s 等频率。
4. 保持前台移动，观察最近位置和上传时间。
5. 再测试锁屏、切后台、断网恢复和电池优化场景。
6. 使用 PC 同账户查看当前终端位置和历史轨迹。

## 7. 命令行构建与 APK 的区别

```powershell
npm run type-check
npm run build:app
```

`build:app` 会生成供 App 打包使用的编译资源，一般位于 `unpackage/dist/build/app-plus`；它不是可安装 APK。最终 APK 仍需 HBuilderX 的“发行 → 原生 App-云打包”或配置完整 Android 原生环境后的本地 App 打包。

## 8. HBuilderX 云打包

### 打包前检查

1. `npm install` 成功且 `npm run type-check` 通过。
2. `manifest.json` 中 AppID、版本、权限、Geolocation 模块正确。
3. `config/apk.env.json` 的 `androidBaseUrl` 是手机可达的正式地址。
4. 图标文件存在，清晰且路径未改变。
5. UTS 插件可以在自定义基座编译运行。
6. 后端迁移完成，health、登录、绑定、位置接口都可用。

### 操作步骤

1. 在 HBuilderX 左侧选中项目 `0-auth-Apk`。
2. 打开 `manifest.json` 可视化界面，确认 AppID、Android 权限和模块。
3. 选择“发行 → 原生 App-云打包”。
4. 平台只选 Android。
5. 首次内部测试可使用云端证书；正式发布必须使用自己的固定签名证书并妥善备份。
6. 包类型选择 APK；若应用商店要求可另选 AAB。
7. 包含原生插件/权限变更时使用传统云打包，不要误用无法包含插件的快速安心打包流程。
8. 提交后等待构建，下载产物并保存构建日志和版本号。

同一应用升级必须使用相同 AppID、包名和签名，并递增 `versionCode`。签名私钥、alias 和密码丢失后将无法覆盖升级已有安装。

## 9. 安装与升级

通过 ADB 安装：

```powershell
adb devices
adb install -r .\path\to\springgis.apk
```

`-r` 保留应用数据升级。若签名不同会安装失败；不要为了绕过签名问题随意卸载生产用户的 APK。

卸载会清除应用数据和 Android Keystore 私钥。服务器仍保留旧终端公钥/绑定时，新安装可能需要迁移或重新绑定流程，不能把卸载重装当成普通升级。

## 10. 完整验收清单

- 应用名、图标、版本正确。
- 注册必须填写两个不同安全问题与答案，中文用户名可用。
- 密码登录、刷新、退出正常。
- 首次绑定需要密码和首次绑定授权码；Keystore 公钥生成并提交成功。
- 六位快速登录验证码在规定周期内轮换，PC/APK 的方向符合业务设计。
- 非首次查看绑定/迁移授权码需密码和安全问题验证。
- 定位权限拒绝、仅使用时允许、始终允许三种分支都有清晰提示。
- 默认 2 秒频率可上传；切换其他频率生效；停止轨迹后不再写入。
- 当前实时位置、三天内历史轨迹、分享/撤销权限符合账户边界。
- 断网后不会崩溃，恢复网络后状态可理解且不重复制造异常点。
- 锁屏和荣耀/华为省电策略下的实际行为有记录，不把前台测试结果当作后台保证。

## 11. 常见错误

### npm ERESOLVE，Vite 5.4.21 与 5.2.8 冲突

确保 `package.json` 中 Vite 是精确 `5.2.8`，删除由错误版本产生的本工程 `node_modules` 后重新执行 `npm install`。不要更改 PC 工程依赖，也不要使用 force。当前仓库已固定正确版本。

### SpringGIS Android Keystore not found

H5 或标准基座中没有此 UTS 原生模块。制作包含 `uni_modules/springgis-keystore` 的自定义基座，或重新云打包并安装新 APK。若日志显示模块加载成功，则继续检查服务端绑定接口，不再把问题归因于硬件权限。

### UTS Kotlin 编译失败，Key 不是 PrivateKey

说明云端编译到了旧版/错误版 UTS 源码或插件类型未修正。确认 `index.kt` 使用 `PrivateKey`，清理旧打包缓存并重新提交；不要继续安装旧失败产物。

### 绑定提交 Not Found

确认 `androidBaseUrl` 包含 `/api/v1`，服务器已部署含终端路由的新代码并重启。用手机浏览器访问 health，随后查看后端日志中的实际路径。

### 定位无回调

依次检查 manifest 模块、运行时精确位置、系统定位总开关、荣耀/华为后台活动和电池优化、网络、APK 是否为权限变更后的新包。H5 成功不代表原生定位已验证。

### 手机连不上 API

- 公网地址：检查 8080/443 安全组和 health。
- 局域网电脑：后端监听 `0.0.0.0`，手机同 Wi-Fi，Windows 防火墙允许 8080。
- `127.0.0.1`：在真机上一定是手机自身，必须改掉。
- Android 报 cleartext：正式解决是部署 HTTPS，不建议长期放宽明文策略。

### 修改了配置但手机仍旧行为

H5 配置热更新不等于已安装 APK 更新。重新构建/云打包、递增 versionCode、用相同签名安装，再在应用信息中核对版本。

## 12. 发布物保存

每次发布至少保存：

- APK/AAB 文件及 SHA-256。
- AppID、versionName、versionCode、构建时间。
- HBuilderX/uni-app 编译器版本。
- 使用的 Git 提交号。
- 签名证书指纹（不保存明文密码到仓库）。
- 云打包成功/失败日志。
- 对应服务端 API 版本与数据库迁移版本。
