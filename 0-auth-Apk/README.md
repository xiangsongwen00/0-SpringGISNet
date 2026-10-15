# 春秋GIS 人生轨迹

`0-auth-Apk` 是独立的 Vue 3 + TypeScript + uni-app Android 工程。它负责账户/终端授权模块、实时定位和个人轨迹；不读取 PC 或 Python 项目的配置，只通过 API 与服务端关联。

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
- 配置：`config/apk.env.json`
- 图标：`unpackage/res/icons/春秋GIS暖色人生轨迹.png`
- 默认轨迹频率：2 秒，可选 1/2/5/10/30/60 秒

不采集 IMEI、MAC、手机号、邮箱或真实身份。定位默认关闭，用户主动开启后才记录；位置默认仅本人可见，分享由用户主动创建并可撤销。后台实际采样仍受 Android 和荣耀/华为省电策略限制。
