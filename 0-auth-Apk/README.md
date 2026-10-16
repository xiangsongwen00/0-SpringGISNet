# 春秋GIS 人生轨迹

`0-auth-Apk` 是独立的 Vue 3 + TypeScript + uni-app Android 工程。它负责账户/终端授权模块、实时定位、个人轨迹和 SpringAndAutumnGIS 三维地图；不读取 PC 配置，只通过 API 与服务端关联。

## 文档

- [Android调试、打包与安装指南](APK打包教程.md)：从 npm 安装、H5、自定义基座到云打包、签名、安装和故障排查。
- [系统总指南](../环境配置说明.md)：完整部署顺序与端口表。
- [API 文档](../API.md)：登录、终端、授权码和位置接口。

## 最短 H5 调试流程

```powershell
cd E:\0-SpringGISNet\0-auth-Apk
nvm use 22
npm install
npm run dev:h5
```

H5 地址为 `http://127.0.0.1:5174`。它只能调试布局和普通 API；Android Keystore、定位权限与后台行为必须使用自定义基座或正式 APK 真机验证。

## 检查与 App 资源构建

```powershell
npm run type-check
npm run build:h5
npm run build:app
```

`build:app` 生成 App 打包资源，不是可安装 APK。最终 APK 使用 HBuilderX 打开本目录，通过“发行 → 原生 App-云打包”生成，具体步骤见打包指南。

## 当前边界

- 应用名：春秋GIS 人生轨迹
- AppID：`__UNI__11F019F`
- 版本：`1.1.0` / `110`
- H5 端口：`5174`
- 环境/API 配置：`config/apk.env.json`
- 地图资源配置：`config/token.json`（本机私有文件，不提交 Git）
- 图标：`unpackage/res/icons/春秋GIS暖色人生轨迹.png`
- 默认轨迹频率：2 秒，可选 1/2/5/10/30/60 秒
- 登录保持：成功使用即滑动续期 30 天，连续 30 天未使用才重新登录
- 三维引擎：APK 自带 `vendor/spring-and-autumn-gis-0.1.0.tgz`，支持安卓触控工具栏和当前终端位置标记

本机已将根目录 `token.json` 中允许进入客户端的地图字段复制为 APK 独立配置 `config/token.json`。这是一次性导入：APK 编译只读取自己的文件，之后修改根目录文件不会自动影响 APK。新电脑先执行：

```powershell
.\scripts\import-map-token.ps1
```

导入脚本会主动排除 `serverToken`、Mapbox 服务端令牌和其他服务端字段，避免它们进入可反编译的 APK。

`config/token.json` 与根目录 `token.example.json` 使用同一标准结构：`tianditu`、`maptiler`、`geovis`、`osm`、`demo`。Google 卫星和其他自定义 XYZ/TMS/Style 服务都放入 `demo.basemaps`，不再增加供应商专用顶层字段，也不再把资源地址混入环境配置。项目不会内置未经授权的 Google 瓦片地址。

地形按以下优先级启用：`demo.terrain` 自定义 Terrain-RGB、`maptiler.key`、`geovis.terrainToken`。可通过 `config/apk.env.json` 的 `map.terrainEnabled` 总开关关闭。若底图或地形均未配置，引擎仍显示 WGS84 三维地球和经纬网。字段模板见 `config/token.example.json`。

`config/apk.env.json` 必须保留且正在被使用：Vite 读取 `development`，API 客户端读取 `api`，三维引擎读取 `map`。该文件只保存非敏感运行参数，不保存 Token 或地图资源 URL。

APK 只在应用沙箱保存轮换式 Refresh Token，不保存账户密码、Access Token、指纹模板或其他生物信息；指纹快速解锁不是登录必要条件。主动退出会同时撤销服务端会话并清除本地凭据。

不采集 IMEI、MAC、手机号、邮箱或真实身份。定位默认关闭，用户主动开启后才记录；位置默认仅本人可见，分享由用户主动创建并可撤销。后台实际采样仍受 Android 和荣耀/华为省电策略限制。
