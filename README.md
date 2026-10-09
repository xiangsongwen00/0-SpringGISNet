# 春秋GIS · SpringGISNet

本项目保留现有Vue站点、登录/账户与后端接口，独立消费SpringAndAutumnGIS的**dist安装包**。不链接引擎源码，不从引擎项目启动临时消费者。

## 日常启动（Windows CMD）

```bat
cd /d E:\0-SpringGISNet
npm run dev
```

开发端口沿用config/pc.env.json（当前5173）：

- /：网站，“引擎”区域嵌入SDK交互，可切换TS/JS。
- /sdk.html：TypeScript交互页。
- /sdk-js.html：JavaScript ES6交互页。

普通地图须提供用户自己的根目录token.json（参考token.example.json），缺少底图/DEM会显示配置指引，不自动用OSM或合成数据兜底。不再import凭据到bundle，开发/preview从本项目同源接口读取经过白名单过滤的浏览器配置。

## 构建成果直接运行

```bat
npm run build
npm run preview
```

preview默认4173，只服务这个应用dist；不会重打包引擎、重新安装依赖或创建临时目录。静态部署整个dist。静态部署自己的配置时显式npm run config:deploy；不要共享维护者Key。

## 更新SDK（仅引擎版本变化时）

先在引擎项目npm run build，然后在本项目：

```bat
npm run sdk:update
```

更新只包装当前引擎dist并安装vendor/spring-and-autumn-gis-0.1.0.tgz，不执行引擎构建或启动。vendor包随本项目交付。之后正常dev/build/preview不需要引擎目录存在，也不读取env.config.json。

## 检查

```bat
npm run typecheck:sdk
npm run test:sdk
npm run test:sdk:browser
```

检查真实安装包、TS/JS交互、Worker与凭据隔离。自动浏览器检查直接使用本项目dist；合成瓦片仅供自动测试，不请求公共地图服务。全站Vue类型检查有账户组件原有错误，未在这次SDK接入中改动账户逻辑。

完整资源申请、接口范围、CMD步骤、发布安全及历史token.json跟踪注意事项见[SDK接入说明](./SDK接入说明.md)。

PC API设置仍在config/pc.env.json，保留现有/api代理和后端配置。本次不修改0-pythonServer的数据、认证或你的未提交改动。
