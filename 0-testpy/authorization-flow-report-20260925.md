# 授权码、快速登录与安全问题验证报告

日期：2026-09-25

## 已验证

- Python API 自动化测试：`10 passed`。
- PC Vue TypeScript 检查与 Vite 生产构建：通过。
- APK Vue/TypeScript 检查、H5 构建与 App 资源构建：通过。
- PostgreSQL 迁移：`004_authorization_codes.sql` 和 `005_security_answers.sql` 已应用。
- 使用本地新后端代码直连服务器 PostgreSQL 进行真实注册/登录/退出冒烟测试：通过；测试用户及审计数据已清理。
- 中文用户名注册、终端公钥挑战、授权码一次性、六位验证码一次性和答案二次校验均有回归覆盖。
- APK 终端状态恢复与安全问题同步已解耦；PC 终端列表与 APK 当前终端每 10 秒同步。
- PC 无条件撤销已移除；撤销必须使用密码+两道安全问题、终端撤销授权码或独立 6 位撤销验证码。
- PC APK 验证码登录页已改为用户自行输入账户名 + 6 位验证码，不使用默认用户名；服务端校验两者必须属于同一账户。
- PC 验证码弹窗已重做视觉层级、输入区、状态提示与按钮启用/禁用态，并用 Edge 无头浏览器分别生成 PC 与窄屏 H5 视觉截图检查。

## 公网运行状态

- `http://8.137.36.114:8080/api/v1/health`：`status=ok`、`database=connected`。
- 公网 OpenAPI 当时仍是旧后端路由，未出现 `/api/v1/auth/quick/consume`、`/api/v1/terminals/authorization-codes` 和 `/api/v1/users/me/security-questions`。
- 结论：数据库已就绪，仍需将新的 `0-pythonServer` 代码同步到服务器并重启 `python312` 容器后，才能进行公网全链路验证。
