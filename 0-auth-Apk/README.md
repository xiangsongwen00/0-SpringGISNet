<!--
 * @Author: yangjie
 * @Date: 2026-09-25 01:47:47
 * @LastEditors: yangjie 
 * @LastEditTime: 2026-09-25 02:43:18
 * @FilePath: \0-SpringGISNet\0-auth-Apk\README.md
 * @Description: 
 * 
 * Copyright (c) 2026 by bimcc, All Rights Reserved. 
-->
# SpringAutumn Auth

独立授权 APK，目录固定为 `0-auth-Apk`。技术栈为 Vue 3 + TypeScript + uni-app；Android Keystore 通过项目内的 UTS 模块调用，不维护单独的 Android Studio/Gradle 主工程。

## 职责

- 登录已有账户；
- 生成并绑定 Android Keystore P-256 终端密钥；
- 生成并每 45 秒刷新六位快速登录验证码，供 PC 输入；
- 在密码和两道安全问题校验后生成一次性迁移授权码；
- 生成独立的终端撤销授权码或 6 位撤销验证码，供 PC 完成有条件撤销；
- 确认账户恢复；
- 查看和撤销当前终端。

不包含注册、GIS 地图、文章、社区、短信、通讯录、定位、广告或扫码。Android 权限只有 `INTERNET`。

## 安装与页面调试

```powershell
cd 0-auth-Apk
npm install
npm run dev:h5
```

H5 只用于调试布局，不生成或保存终端私钥。

本机开发端口固定分开：Python API 为 `8080`，PC Web 为 `5173`，本工程的 H5 调试为 `5174`。正式 APK 是客户端，不监听 HTTP 端口。若 `5174` 已被占用，开发命令会直接报错，避免自动换端口造成混淆。

## App 编译与 APK

```powershell
npm run build:app
```

CLI 生成 App 资源。正式 APK 使用 HBuilderX 打开本目录，通过“发行 → App 云端打包”生成。项目包含 UTS Android Keystore 模块，需使用支持 UTS 的 HBuilderX App 开发版进行真机验证。

首次云端打包前需在 HBuilderX 中为 `manifest.json` 获取或填写 DCloud AppID，并配置正式 Android 包名和签名证书。签名证书不得提交到仓库。

本工程只读取 `config/apk.env.json`，不读取后端或 PC 配置。H5 调试通过本工程自己的 Vite 代理访问 API，不要求后端开放 localhost CORS；`api.androidBaseUrl` 用于 Android。当前已预配置 `http://8.137.36.114:8080/api/v1`，正式发布改用 HTTPS 的方法见 `APK打包教程.md`。

完整的新手打包步骤见：[APK打包教程.md](./APK打包教程.md)。

## 当前后端依赖

以下接口由后端下一阶段实现；未实现时客户端会明确显示失败，不会模拟成功：

```text
POST /api/v1/terminals/bind/start
POST /api/v1/terminals/bind/confirm
POST /api/v1/terminals/session/start
POST /api/v1/terminals/session/confirm
POST /api/v1/terminals/authorization-codes
GET  /api/v1/terminals/current
POST /api/v1/terminals/revoke-codes
POST /api/v1/auth/quick/start
POST /api/v1/auth/quick/consume
```

## 依赖说明

工程由官方 Vue3/Vite/TS 模板创建，并已删除小程序、鸿蒙和快应用依赖。当前官方编译器依赖树仍会被 `npm audit` 报告若干构建期间接依赖告警；没有执行会破坏 DCloud 版本配套关系的 `npm audit fix --force`。发布前应随 HBuilderX/uni-app 官方版本整体升级后重新审计，开发服务器不得暴露到公网。
