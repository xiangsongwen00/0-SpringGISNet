<template>
  <view class="page">
    <view class="safe-top" />
    <view class="brand-row">
      <view class="brand-mark">春</view>
      <view>
        <text class="brand-title">SpringAutumn Auth</text>
        <text class="brand-subtitle">春秋GIS 独立授权终端</text>
      </view>
    </view>

    <view v-if="!session" class="panel login-panel">
      <text class="eyebrow">MINIMAL AUTH CLIENT</text>
      <text class="heading">登录并绑定认证终端</text>
      <text class="description">仅用于设备绑定、六码登录确认和账户恢复确认。不读取短信、通讯录、位置或硬件序列号。</text>
      <view class="field"><text>用户名</text><input v-model.trim="username" maxlength="32" placeholder="请输入用户名" /></view>
      <view class="field"><text>密码</text><input v-model="password" password maxlength="128" placeholder="请输入密码" /></view>
      <text v-if="error" class="error">{{ error }}</text>
      <button class="primary" :loading="busy" :disabled="busy" @click="signIn">登录</button>
      <text class="privacy">本应用不提供注册。请先在官网创建账户，再在此处绑定授权终端。</text>
    </view>

    <template v-else>
      <view class="account-card">
        <view><text class="label">当前账户</text><text class="account-name">{{ session.user.username }}</text></view>
        <view class="status-pill">{{ terminalBound ? '终端已绑定' : '等待绑定' }}</view>
      </view>
      <view class="panel">
        <text class="section-title">认证终端</text>
        <text class="description">私钥由 Android Keystore 生成并保存在本机。初次绑定或迁移时，还必须输入 PC 账户管理页下发的 8-12 位授权码。</text>
        <template v-if="!terminalBound">
          <input v-model="bindingCode" class="authorization-input" maxlength="12" placeholder="8-12 位绑定 / 迁移授权码" />
          <button class="secondary" :disabled="busy || bindingCode.length < 8" @click="bindTerminal">绑定 / 迁移到当前设备</button>
        </template>
        <view v-else class="terminal-summary">
          <text>此设备已绑定</text><text class="muted">不采集 IMEI、MAC 或设备序列号。</text>
          <view class="migration-verification">
            <input v-model="migrationPassword" password maxlength="128" placeholder="账户密码" />
            <view v-for="(question, index) in securityQuestions" :key="question.id" class="field"><text>{{ question.prompt }}</text><input v-model.trim="migrationAnswers[index]" maxlength="128" placeholder="安全问题答案" /></view>
            <text v-if="securityQuestions.length !== 2" class="error">请先在 PC 账户管理中设置两个安全问题。</text>
          </view>
          <button class="secondary" :disabled="busy" @click="generateMigrationCode">生成迁移授权码</button>
          <view v-if="migrationCode" class="authorization-result"><text>{{ migrationCode }}</text><text>一次性，10 分钟内有效且不自动更换；请输入新终端。</text></view>
        </view>
      </view>
      <view v-if="bindingLogs.length" class="panel diagnostic-panel">
        <view class="diagnostic-title-row">
          <text class="section-title">绑定诊断日志</text>
          <text class="clear-log" @click="bindingLogs = []">清空</text>
        </view>
        <text v-for="(line, index) in bindingLogs" :key="index" class="diagnostic-line">{{ line }}</text>
        <text class="diagnostic-notice">日志不会输出密码、访问令牌、私钥或完整公钥。</text>
      </view>
      <view class="panel">
        <text class="section-title">六位快速登录验证码</text>
        <text class="description">由本终端生成，在 PC 端“APK 验证码登录”中输入。验证码每 45 秒自动更新。</text>
        <view class="quick-code-display">{{ quickCode || '······' }}</view>
        <text class="quick-countdown">{{ terminalBound ? `${quickRemaining} 秒后更新` : '需先绑定当前终端' }}</text>
        <button class="primary" :loading="quickGenerating" :disabled="!terminalBound || busy || quickGenerating" @click="generateQuickCode">立即刷新验证码</button>
      </view>
      <view class="panel">
        <text class="section-title">终端撤销凭据</text>
        <text class="description">只由当前已绑定终端生成，交给 PC 后可撤销本终端；与快速登录码、迁移码互不通用。</text>
        <button class="secondary" :disabled="!terminalBound || busy" @click="generateRevokeCode('authorization_code')">生成撤销授权码</button>
        <view v-if="revokeAuthorizationCode" class="authorization-result"><text>{{ revokeAuthorizationCode }}</text><text>10 分钟内一次有效，不自动轮换</text></view>
        <button class="secondary" :disabled="!terminalBound || busy" @click="generateRevokeCode('verification_code')">生成 6 位撤销验证码</button>
        <view v-if="revokeVerificationCode" class="authorization-result"><text>{{ revokeVerificationCode }}</text><text>{{ revokeVerificationRemaining }} 秒后失效</text></view>
      </view>
      <button class="logout" @click="signOut">退出当前账户</button>
    </template>
  </view>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { confirmTerminalSession, createMigrationAuthorizationCode, createQuickCode, createTerminalRevokeCode, confirmTerminalBinding, getCurrentTerminal, getMySecurityQuestions, login, startTerminalBinding, startTerminalSession, type AuthSession, type SecurityQuestion } from '../../services/api';
import { ensureTerminalKey, getNativeKeyDiagnostics, isNativeKeyAvailable, signTerminalPayload } from '../../services/keystore';

const username = ref('');
const password = ref('');
const quickCode = ref('');
const bindingCode = ref('');
const busy = ref(false);
const error = ref('');
const session = ref<AuthSession | null>(null);
const terminalBound = ref(false);
const bindingLogs = ref<string[]>([]);
const quickRemaining = ref(0);
const quickGenerating = ref(false);
const migrationCode = ref('');
const migrationPassword = ref('');
const migrationAnswers = ref(['', '']);
const securityQuestions = ref<SecurityQuestion[]>([]);
const revokeAuthorizationCode = ref('');
const revokeVerificationCode = ref('');
const revokeVerificationRemaining = ref(0);
let quickTimer: ReturnType<typeof setInterval> | null = null;
let quickExpiresAt = 0;
let statusTimer: ReturnType<typeof setInterval> | null = null;
let revokeVerificationTimer: ReturnType<typeof setInterval> | null = null;
let revokeVerificationExpiresAt = 0;

watch(bindingCode, (value) => { const normalized = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12); if (normalized !== value) bindingCode.value = normalized; });

async function signIn() {
  error.value = '';
  if (!username.value || !password.value) { error.value = '请输入用户名和密码'; return; }
  busy.value = true;
  try {
    const authenticated = await login(username.value, password.value);
    session.value = authenticated; password.value = '';
    await attachExistingTerminal(authenticated);
    await refreshSecurityQuestions(authenticated);
  }
  catch (reason) { error.value = reason instanceof Error ? reason.message : '登录失败'; }
  finally { busy.value = false; }
}

async function refreshSecurityQuestions(authenticated = session.value) {
  if (!authenticated) return;
  try { securityQuestions.value = await getMySecurityQuestions(authenticated.access_token); }
  catch (reason) { console.info('[security-questions-sync]', reason instanceof Error ? reason.message : String(reason)); }
}

async function attachExistingTerminal(authenticated: AuthSession) {
  if (!isNativeKeyAvailable()) return;
  try {
    const alias = `springgis_${authenticated.user.user_uuid}`;
    const publicKey = await ensureTerminalKey(alias);
    const challenge = await startTerminalSession(authenticated.access_token, publicKey);
    const signature = signTerminalPayload(alias, challenge.nonce);
    const terminal = await confirmTerminalSession(authenticated.access_token, challenge.challenge_id, challenge.nonce, signature);
    terminalBound.value = terminal.status === 1;
    if (terminalBound.value) await generateQuickCode();
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : String(reason);
    if (!message.includes('尚未绑定')) console.info('[terminal-session]', message);
  }
}

function appendBindingLog(message: string) {
  const timestamp = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  const line = `[${timestamp}] ${message}`;
  bindingLogs.value = [...bindingLogs.value.slice(-19), line];
  console.info('[terminal-binding]', message);
}

async function bindTerminal() {
  if (!session.value) return;
  bindingLogs.value = [];
  const diagnostics = getNativeKeyDiagnostics();
  appendBindingLog(
    `开始绑定：appBuild=${diagnostics.appBuild}，platform=${diagnostics.platform}，system=${diagnostics.system}`,
  );
  if (!isNativeKeyAvailable()) {
    appendBindingLog('环境检查失败：当前构建无法调用 Android Keystore');
    uni.showModal({
      title: '无法使用原生密钥',
      content: `appBuild=${diagnostics.appBuild}\nplatform=${diagnostics.platform}\nsystem=${diagnostics.system}`,
      showCancel: false,
    });
    return;
  }
  busy.value = true;
  try {
    const alias = `springgis_${session.value.user.user_uuid}`;
    const publicKey = await ensureTerminalKey(alias, appendBindingLog);
    appendBindingLog('正在向服务器提交公钥绑定请求');
    const challenge = await startTerminalBinding(session.value.access_token, publicKey, bindingCode.value);
    appendBindingLog('服务器已返回一次性绑定挑战');
    const signature = signTerminalPayload(alias, challenge.nonce, appendBindingLog);
    appendBindingLog('正在向服务器提交挑战签名');
    const terminal = await confirmTerminalBinding(
      session.value.access_token,
      challenge.challenge_id,
      challenge.nonce,
      signature,
    );
    terminalBound.value = terminal.status === 1;
    bindingCode.value = '';
    appendBindingLog(`终端绑定成功：${terminal.system_name}`);
    await generateQuickCode();
    uni.showToast({ title: '终端绑定成功', icon: 'success' });
  } catch (reason) {
    appendBindingLog(`绑定失败：${reason instanceof Error ? reason.message : String(reason)}`);
    uni.showModal({ title: '暂无法绑定', content: reason instanceof Error ? reason.message : '终端绑定失败', showCancel: false });
  } finally { busy.value = false; }
}

function clearQuickTimer() {
  if (quickTimer !== null) clearInterval(quickTimer);
  quickTimer = null;
}

async function generateQuickCode() {
  if (!session.value || !terminalBound.value || quickGenerating.value) return;
  clearQuickTimer();
  quickGenerating.value = true;
  try {
    const result = await createQuickCode(session.value.access_token);
    quickCode.value = result.code;
    quickExpiresAt = new Date(result.expires_at).getTime();
    quickRemaining.value = Math.max(0, Math.ceil((quickExpiresAt - Date.now()) / 1000));
    quickTimer = setInterval(() => {
      quickRemaining.value = Math.max(0, Math.ceil((quickExpiresAt - Date.now()) / 1000));
      if (quickRemaining.value <= 0) void generateQuickCode();
    }, 1000);
  } catch (reason) {
    clearQuickTimer(); quickCode.value = ''; quickRemaining.value = 0;
    uni.showModal({ title: '无法生成验证码', content: reason instanceof Error ? reason.message : '请稍后重试', showCancel: false });
  } finally { quickGenerating.value = false; }
}

async function generateMigrationCode() {
  if (!session.value || !terminalBound.value) return;
  if (!migrationPassword.value || securityQuestions.value.length !== 2 || migrationAnswers.value.some((item) => item.length < 2)) {
    uni.showModal({ title: '需要身份校验', content: '请输入账户密码并回答两个安全问题。', showCancel: false });
    return;
  }
  busy.value = true;
  try {
    const result = await createMigrationAuthorizationCode(
      session.value.access_token,
      migrationPassword.value,
      securityQuestions.value.map((item, index) => ({ question_id: item.id, answer: migrationAnswers.value[index] })),
    );
    migrationCode.value = result.code;
    migrationPassword.value = ''; migrationAnswers.value = ['', ''];
  } catch (reason) {
    uni.showModal({ title: '无法生成迁移码', content: reason instanceof Error ? reason.message : '请稍后重试', showCancel: false });
  } finally { busy.value = false; }
}

function clearRevokeVerificationTimer() {
  if (revokeVerificationTimer !== null) clearInterval(revokeVerificationTimer);
  revokeVerificationTimer = null;
}

async function generateRevokeCode(codeType: 'authorization_code' | 'verification_code') {
  if (!session.value || !terminalBound.value) return;
  busy.value = true;
  try {
    const result = await createTerminalRevokeCode(session.value.access_token, codeType);
    if (codeType === 'authorization_code') {
      revokeAuthorizationCode.value = result.code;
    } else {
      revokeVerificationCode.value = result.code;
      revokeVerificationExpiresAt = new Date(result.expires_at).getTime();
      revokeVerificationRemaining.value = Math.max(0, Math.ceil((revokeVerificationExpiresAt - Date.now()) / 1000));
      clearRevokeVerificationTimer();
      revokeVerificationTimer = setInterval(() => {
        revokeVerificationRemaining.value = Math.max(0, Math.ceil((revokeVerificationExpiresAt - Date.now()) / 1000));
        if (revokeVerificationRemaining.value <= 0) {
          clearRevokeVerificationTimer(); revokeVerificationCode.value = '';
        }
      }, 1000);
    }
  } catch (reason) {
    uni.showModal({ title: '无法生成撤销凭据', content: reason instanceof Error ? reason.message : '请稍后重试', showCancel: false });
  } finally { busy.value = false; }
}

async function syncRemoteState() {
  if (!session.value) return;
  await refreshSecurityQuestions();
  if (!terminalBound.value) {
    await attachExistingTerminal(session.value);
    return;
  }
  try {
    const terminal = await getCurrentTerminal(session.value.access_token);
    terminalBound.value = terminal.status === 1;
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : String(reason);
    if (message.includes('失效') || message.includes('未绑定') || message.includes('登录')) {
      terminalBound.value = false; clearQuickTimer(); clearRevokeVerificationTimer();
      quickCode.value = ''; revokeAuthorizationCode.value = ''; revokeVerificationCode.value = '';
    }
  }
}

function signOut() { clearQuickTimer(); clearRevokeVerificationTimer(); if (statusTimer !== null) clearInterval(statusTimer); statusTimer = null; session.value = null; terminalBound.value = false; quickCode.value = ''; bindingCode.value = ''; migrationCode.value = ''; migrationPassword.value = ''; migrationAnswers.value = ['', '']; securityQuestions.value = []; revokeAuthorizationCode.value = ''; revokeVerificationCode.value = ''; }
onShow(() => void syncRemoteState());
statusTimer = setInterval(() => void syncRemoteState(), 10000);
onUnmounted(() => { clearQuickTimer(); clearRevokeVerificationTimer(); if (statusTimer !== null) clearInterval(statusTimer); });
</script>

<style scoped>
.page { min-height: 100vh; padding: 0 32rpx 64rpx; background: radial-gradient(circle at 16% 6%, rgba(91,192,235,.2), transparent 28%), #f7fbfc; box-sizing: border-box; }
.safe-top { height: calc(var(--status-bar-height) + 24rpx); }
.brand-row { display: flex; align-items: center; gap: 20rpx; margin: 16rpx 0 40rpx; }
.brand-mark { display: flex; width: 82rpx; height: 82rpx; align-items: center; justify-content: center; border-radius: 24rpx; background: linear-gradient(135deg,#5bc0eb,#0e9aa7); color: white; font-size: 38rpx; font-family: serif; box-shadow: 0 14rpx 36rpx rgba(14,124,147,.2); }
.brand-title,.brand-subtitle,.heading,.description,.label,.account-name,.section-title,.muted,.privacy,.error,.empty-state { display: block; }
.brand-title { font-size: 34rpx; font-weight: 700; }.brand-subtitle { margin-top: 5rpx; color: #7a949d; font-size: 24rpx; }
.panel,.account-card { margin-bottom: 28rpx; padding: 32rpx; border: 1rpx solid rgba(14,124,147,.14); border-radius: 28rpx; background: rgba(255,255,255,.92); box-shadow: 0 16rpx 44rpx rgba(14,124,147,.09); }.login-panel { padding-top: 40rpx; }
.eyebrow { color: #0e7c93; font-size: 21rpx; letter-spacing: 3rpx; }.heading { margin: 14rpx 0; font-family: serif; font-size: 46rpx; font-weight: 700; }.description { color: #3e5c66; font-size: 27rpx; line-height: 1.7; }
.field { margin-top: 28rpx; }.field text { display: block; margin-bottom: 12rpx; font-size: 27rpx; font-weight: 600; }.field input,.authorization-input { height: 92rpx; padding: 0 24rpx; border: 1rpx solid rgba(14,124,147,.24); border-radius: 20rpx; background: white; font-size: 30rpx; box-sizing: border-box; }
.primary,.secondary,.logout { margin-top: 28rpx; border-radius: 999rpx; font-size: 29rpx; }.primary { background: linear-gradient(135deg,#5bc0eb,#0e9aa7); color: white; }.secondary { border: 1rpx solid #0e7c93; background: white; color: #0e7c93; }.logout { background: transparent; color: #7a949d; }
.privacy,.muted { margin-top: 20rpx; color: #7a949d; font-size: 23rpx; line-height: 1.6; }.error { margin-top: 18rpx; color: #b52c2c; font-size: 25rpx; }
.account-card { display: flex; align-items: center; justify-content: space-between; }.label { color: #7a949d; font-size: 23rpx; }.account-name { margin-top: 6rpx; font-size: 35rpx; font-weight: 700; }.status-pill { padding: 10rpx 18rpx; border-radius: 999rpx; background: #d7f0f5; color: #0e7c93; font-size: 23rpx; }
.section-title { margin-bottom: 12rpx; font-size: 32rpx; font-weight: 700; }.authorization-input { width: 100%; margin-top: 24rpx; text-align: center; font-family: monospace; letter-spacing: 5rpx; }.quick-code-display { margin-top: 24rpx; padding: 24rpx; border-radius: 20rpx; background: #10272d; color: white; text-align: center; font-family: monospace; font-size: 54rpx; font-weight: 700; letter-spacing: 18rpx; }.quick-countdown { display: block; margin-top: 12rpx; color: #0e7c93; text-align: center; font-size: 24rpx; }.authorization-result { margin-top: 20rpx; padding: 20rpx; border-radius: 18rpx; background: #10272d; color: white; text-align: center; }.authorization-result text { display: block; }.authorization-result text:first-child { font-family: monospace; font-size: 40rpx; font-weight: 700; letter-spacing: 6rpx; }.authorization-result text:last-child { margin-top: 8rpx; color: #b9dce1; font-size: 22rpx; }
.diagnostic-panel { background: #10272d; color: #d7f0f5; }
.diagnostic-title-row { display: flex; align-items: center; justify-content: space-between; }
.diagnostic-title-row .section-title { color: #fff; }
.clear-log { padding: 8rpx 12rpx; color: #7ed6df; font-size: 23rpx; }
.diagnostic-line { display: block; margin-top: 10rpx; font-family: monospace; font-size: 22rpx; line-height: 1.55; word-break: break-all; }
.diagnostic-notice { display: block; margin-top: 20rpx; color: #91afb6; font-size: 21rpx; line-height: 1.5; }
.migration-verification { margin-top: 20rpx; }
.migration-verification > input { width: 100%; height: 88rpx; padding: 0 22rpx; border: 1rpx solid rgba(14,124,147,.24); border-radius: 18rpx; background: white; box-sizing: border-box; }
</style>
