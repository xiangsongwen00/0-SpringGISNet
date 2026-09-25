# SpringAutumn Auth APK 打包教程（零经验版）

这份教程只针对 Windows、Android 和本仓库的 `0-auth-Apk` 工程。第一次打包建议先生成“测试 APK”，确认能安装和打开后，再处理正式证书和正式服务器域名。

## 一、先理解两个容易混淆的结果

执行：

```powershell
npm run build:app
```

得到的是 uni-app 的 App 编译资源，不是可以直接安装的 `.apk` 文件。uni-app 的 npm CLI 不能直接生成云端 APK；生成可安装 APK 仍需使用 HBuilderX 的 App 云端打包功能。

本项目包含 Android UTS Keystore 插件。正式测试“绑定设备”和私钥功能时必须运行 Android App，H5 浏览器页面只能检查界面。

## 二、准备软件和账号

### 1. 安装 Node.js

当前已经验证可用的版本：

```text
Node.js 22.16.0
```

检查：

```powershell
node -v
npm -v
```

### 2. 安装 HBuilderX

1. 打开 DCloud 的 HBuilderX 下载页面。
2. 下载 Windows 版本，优先选择包含 App 开发能力的版本。
3. 解压到一个固定目录，例如 `D:\HBuilderX`。
4. 双击 `HBuilderX.exe`。
5. 第一次使用 App 功能时，如果提示安装“uni-app 编译器”“App 真机运行”或“UTS 编译”插件，选择安装。

HBuilderX 是解压运行的软件，不要求安装 Android Studio，也不要求本项目维护 Gradle 主工程。

### 3. 登录 DCloud 账号

App 云端打包需要登录 DCloud：

1. 在 HBuilderX 右上角找到登录入口。
2. 注册或登录 DCloud 开发者账号。
3. 当前只是内部测试时，不要购买任何付费服务；先使用允许的免费测试打包额度。

## 三、安装项目依赖

打开 PowerShell：

```powershell
cd E:\0-SpringGISNet\0-auth-Apk
npm install
npm run type-check
npm run build:app
```

正确结果应包含：

```text
DONE Build complete.
```

如果 `npm install` 又出现 Vite 冲突，先确认 `package.json` 中是：

```json
"vite": "5.2.8"
```

不要使用 `npm install --force` 或 `npm install --legacy-peer-deps`。

## 四、配置 APK 连接的服务器

APK 只读取：

```text
0-auth-Apk/config/apk.env.json
```

它不会读取后端的 `env.ini`，也不会读取 PC 的配置。

### 情况 A：使用 Android 模拟器

当前工程已经预配置远程服务器：

```json
"androidBaseUrl": "http://8.137.36.114:8080/api/v1"
```

模拟器和真机都可以请求该公网地址。只有需要临时连接开发电脑本机后端时，Android 官方模拟器才改用 `http://10.0.2.2:8080/api/v1`。

### 情况 B：使用真实 Android 手机

使用已经配置的公网服务器时不需要修改地址。只有需要连接开发电脑本机后端时，手机才需要改成电脑局域网地址。手机不能使用 `127.0.0.1` 或 `10.0.2.2` 访问电脑；先在 Windows PowerShell 执行：

```powershell
ipconfig
```

在当前 Wi-Fi 网卡下面找到类似：

```text
IPv4 地址 . . . . . . . . . . . : 192.168.1.25
```

然后把 `androidBaseUrl` 改成：

```json
"androidBaseUrl": "http://192.168.1.25:8080/api/v1"
```

注意：

1. 手机和电脑必须连接同一个局域网。
2. Python 后端必须先启动，并监听 `0.0.0.0:8080`。
3. Windows 防火墙必须允许 Python 接收专用网络中的 TCP 8080 请求。
4. 如果路由器开启了“客户端隔离”，手机可能仍无法访问电脑。

### 情况 C：正式发布

正式 APK 不应连接开发电脑，应改为正式 HTTPS 地址，例如：

```json
"androidBaseUrl": "https://api.example.com/api/v1"
```

当前预配置的 `http://8.137.36.114:8080` 可用于前期联调，但正式包应升级为 HTTPS。正式包不要使用明文 HTTP，也不要使用 `127.0.0.1`、`10.0.2.2` 或个人电脑局域网地址。

## 五、启动后端并确认 8080

另开一个 PowerShell：

```powershell
cd E:\0-SpringGISNet\0-pythonServer
D:\condamini\python.exe index.py
```

正确输出：

```text
Uvicorn running on http://0.0.0.0:8080
```

电脑浏览器打开：

```text
http://127.0.0.1:8080/api/v1/health
```

应看到：

```json
{"status":"ok","database":"connected","version":"v1"}
```

如果 8080 被占用，不要修改项目端口。先在管理员 PowerShell 查询占用者：

```powershell
Get-NetTCPConnection -LocalPort 8080 -State Listen
```

再根据返回的 `OwningProcess` 查询程序：

```powershell
Get-CimInstance Win32_Process -Filter "ProcessId=这里填写进程号"
```

确认不是系统关键服务和自己的重要程序后，再关闭占用程序。

## 六、把项目导入 HBuilderX

1. 打开 HBuilderX。
2. 点击顶部菜单“文件”。
3. 选择“导入”。
4. 选择“从本地目录导入”。
5. 选择目录：

   ```text
   E:\0-SpringGISNet\0-auth-Apk
   ```

6. 导入后，项目管理器中应看到 `package.json`、`vite.config.ts` 和 `src`。
7. 如果项目图标没有被识别为 uni-app，右键项目，选择“重新识别项目类型”。

这是 Vue 3 + TypeScript 的 uni-app CLI 工程。不要只导入 `src`，也不要导入根目录 `E:\0-SpringGISNet`。

## 七、取得 DCloud AppID

当前 `src/manifest.json` 的 `appid` 为空，云端打包前必须取得 AppID。

1. 在 HBuilderX 中打开 `0-auth-Apk/src/manifest.json`。
2. HBuilderX 应显示可视化的 Manifest 配置页面；如果显示源码，寻找“可视化”切换入口。
3. 打开“基础配置”。
4. 找到“DCloud AppID”。
5. 点击“重新获取”或“获取 AppID”。
6. 按提示在当前 DCloud 账号下创建应用。
7. 确认 AppID 已写回 `src/manifest.json`。

AppID 是 DCloud 应用标识，不是 Android 包名。取得后不要随意更换，否则云端服务、插件和后续升级可能被视为另一个应用。

## 八、检查应用基础信息和权限

仍在 `src/manifest.json` 中检查：

```text
应用名称：SpringAutumn Auth
版本名称：1.0.0
版本号：100
Android 最低版本：API 23
Android 目标版本：API 35
```

本项目设计上只需要 Android 的网络权限：

```text
android.permission.INTERNET
```

不要随意添加短信、通讯录、位置、相机、电话、设备标识或存储权限。如果 HBuilderX 自动生成额外权限，打包前必须核对原因。

正式应用还应准备不同尺寸的 App 图标。当前 `src/static/logo.png` 可以用于开发识别，但发布前应在 Manifest 的“App 图标配置”中生成和检查 Android 图标。

## 九、第一次建议先做真机调试

### 1. 准备 Android 手机

1. 打开手机“设置”。
2. 连续点击系统版本号，开启“开发者选项”。
3. 在开发者选项中打开“USB 调试”。
4. 用支持数据传输的 USB 线连接电脑。
5. 手机弹出“是否允许 USB 调试”时选择允许。
6. 某些国产手机还需要开启“USB 安装”或“通过 USB 验证应用”。

### 2. 使用 HBuilderX 运行

1. 在 HBuilderX 中选中 `0-auth-Apk` 项目。
2. 点击“运行”。
3. 选择“运行到手机或模拟器”。
4. 选择检测到的 Android 设备。
5. 如果提示安装真机运行插件，允许安装。

本项目的 UTS 插件只使用 Android 系统 Keystore，没有额外第三方 SDK。普通 UTS 代码可先尝试标准基座；如果 Keystore 模块没有被加载，或者 Manifest/原生配置没有生效，则按下一节制作自定义调试基座。

## 十、制作自定义调试基座（需要时）

自定义调试基座用于边开发边看日志，它不是给用户发布的正式 APK。

1. 选中 `0-auth-Apk`。
2. 点击“发行”。
3. 选择“原生 App - 云打包”。不同 HBuilderX 版本也可能显示为“App 云端打包”。
4. 选择 Android。
5. 选择“自定义调试基座”或“制作自定义基座”。
6. 使用测试证书或云端自动生成的开发证书。
7. 提交打包，等待完成。
8. 一般会在项目的 `unpackage/debug` 下生成 `android_debug.apk`。
9. 回到“运行到手机或模拟器”，选择“自定义基座 - 本地基座”。

自定义调试基座启动时可能提示它是调试基座，不能当作正式安装包发布。

## 十一、生成可安装的正式测试 APK

### 1. 确定 Android 包名

推荐使用稳定、全小写、反向域名格式，例如：

```text
com.springautumn.auth
```

包名一旦用于安装和发布，后续不要更换。更换包名后 Android 会把它视为另一个应用，不能直接覆盖升级。

### 2. 选择签名证书

第一次仅供内部安装测试，可以在云端打包页面选择“使用云端证书”，让 DCloud 生成开发证书。

准备正式长期发布时，应生成并使用自有 `.keystore` 证书。证书必须：

- 长期备份至少两份；
- 不提交到代码仓库；
- 不通过聊天工具公开发送；
- 单独保存证书密码和别名；
- 后续每个升级包继续使用同一个证书。

如果证书丢失，通常无法再用新证书覆盖安装已经发布的同包名应用。

### 3. HBuilderX 云端打包

1. 选中 `0-auth-Apk`。
2. 点击“发行”。
3. 选择“原生 App - 云打包”。
4. 只勾选 Android。
5. 填写固定包名，例如 `net.springautumn.auth`。
6. 选择“正式包”，不要选择自定义调试基座。
7. 第一次内部测试可选择“使用云端证书”。
8. 保持“安心打包”开启；若提示安装安心打包插件，安装后重新提交。
9. 确认应用名称、版本号、包名和证书。
10. 点击“打包”或“提交打包”。
11. 等待 HBuilderX 控制台显示完成。

通常 APK 会保存到：

```text
0-auth-Apk/unpackage/release/apk/
```

HBuilderX 版本不同，最终控制台可能显示另一个保存位置，应以控制台提供的完整路径为准。

## 十二、安装 APK

方法一：把 APK 复制到手机，点击安装。Android 可能要求允许文件管理器“安装未知应用”。

方法二：电脑已安装 adb 时执行：

```powershell
adb devices
adb install -r "APK完整路径.apk"
```

`-r` 表示保留数据并覆盖升级，但前提是新旧 APK 的包名和签名证书一致。

安装后至少检查：

1. 应用名称和图标正确；
2. 应用能正常打开，没有白屏；
3. 可以连接 `8080` 后端并登录；
4. 关闭应用再打开后行为正常；
5. 设备绑定时没有索要短信、通讯录、位置等权限；
6. Android Keystore 密钥只在 App 环境生成；
7. 六位码功能在后端对应接口完成后可以正常确认或拒绝。

当前后端尚未完成全部 Terminal、快速登录和恢复接口时，相关按钮应明确显示接口失败；不能把“客户端打包成功”误认为“所有业务接口已经完成”。

## 十三、最常见问题

### HBuilderX 没有 App 云端打包菜单

- 确认导入的是 `0-auth-Apk` 整个目录；
- 右键项目，执行“重新识别项目类型”；
- 安装 uni-app、App 和 UTS 相关插件；
- 登录 DCloud 账号；
- 尽量使用 HBuilderX App 开发版。

### 手机连接不到电脑上的 8080

- APK 配置不能写 `127.0.0.1`；
- 真机要写电脑局域网 IPv4；
- 手机和电脑连接同一网络；
- 检查 Windows 防火墙；
- 浏览器先访问后端健康检查；
- 公司或公共 Wi-Fi 可能禁止设备互访。

### APK 无法覆盖安装

新旧 APK 的包名或签名证书不一致。卸载旧 App 可以重新安装，但会清除旧 App 本地数据和 Android Keystore 中与该 App 相关的密钥，不能作为正式升级方案。

### `npm run build:app` 后找不到 APK

这是正常的。该命令只生成 App 编译资源；可安装 APK 必须继续通过 HBuilderX 的 App 云端打包生成。

### 打包后接口仍指向旧地址

修改 `config/apk.env.json` 后必须重新打包。已经生成的 APK 不会在安装后重新读取电脑上的 JSON 文件。

### 点击“绑定当前设备”后如何看日志

登录后点击“绑定当前设备”，页面会出现“绑定诊断日志”。正常 Android APK 应依次显示：

```text
appBuild=true，platform=android
正在加载 Android Keystore UTS 模块
UTS 模块加载成功
Keystore 公钥准备完成
正在向服务器提交公钥绑定请求
```

日志不会输出密码、访问令牌、私钥或完整公钥。

- `appBuild=false`：安装的仍是旧 APK，或实际运行的是 H5；递增版本号后重新云打包并安装。
- `platform` 不是 `android`：当前运行环境不是 Android App。
- 停在“正在加载 UTS 模块”：APK 没有正确包含 UTS 插件，应重新生成 App 资源并重新云打包。
- 已生成公钥，但显示 HTTP `404`：Android 原生部分正常，服务器尚未部署终端绑定接口。
- 显示 HTTP `500`：查看 Python 后端日志和数据库迁移状态。

Android Keystore 是 Android 系统提供给应用的密钥容器，生成本应用自己的密钥不需要申请相机、存储、定位、通讯录、电话、短信或读取硬件标识权限。项目只需要联网使用的 `INTERNET` 权限；不要为了修复绑定而增加读取设备标识的权限。

### 提示 `SpringGIS Android Keystore not found`

这表示前端代码已经调用 UTS 插件，但安装包的原生层没有包含该插件，不是 Android Keystore 权限不足。

1. HBuilderX 主程序版本必须与项目 uni-app 编译器同代。本项目编译器为 `5.24`，应升级 HBuilderX 到 `5.24` 或更新版本；推荐直接升级到当前提示的 `5.26`。
2. 关闭“安心打包/快速打包”，至少执行一次“传统云端打包”，强制云端重新编译 UTS 原生代码。
3. 不要使用之前缓存的 APK，确认新包版本为 `1.0.2 (102)`。
4. 使用相同包名和签名安装新包；若覆盖安装失败，先核对签名，不要随意卸载正式绑定过的 App。
5. 传统云打包成功并验证 UTS 模块存在后，后续纯前端修改才可以恢复使用安心打包。

## 十四、正式发布前检查清单

- [ ] `api.androidBaseUrl` 已改成正式 HTTPS API；
- [ ] AppID 固定且由项目自己的 DCloud 账号管理；
- [ ] Android 包名固定；
- [ ] 使用自有正式签名证书；
- [ ] 证书和密码已经离线备份；
- [ ] 版本名称和版本号已递增；
- [ ] 只有业务确实需要的 Android 权限；
- [ ] 隐私声明与实际采集行为一致；
- [ ] 真机登录、设备绑定、退出和异常网络均已测试；
- [ ] 后端使用 HTTPS；
- [ ] APK 没有连接开发电脑地址；
- [ ] 保留最终 APK、对应源码版本、包名、AppID 和证书指纹记录。

## 十五、官方参考

- uni-app CLI 与 App 打包：https://uniapp.dcloud.net.cn/worktile/CLI.html
- HBuilderX 真机运行和自定义基座：https://uniapp.dcloud.net.cn/tutorial/run/run-app
- Manifest 与 DCloud AppID：https://uniapp.dcloud.net.cn/tutorial/app-base
- UTS 插件真机运行：https://uniapp.dcloud.net.cn/plugin/uts-plugin.html
- Android 签名证书说明：https://ask.dcloud.net.cn/article/35985
- Android `.keystore` 生成指南：https://ask.dcloud.net.cn/article/35777
- 安心打包：https://uniapp.dcloud.net.cn/tutorial/build/SafePack
