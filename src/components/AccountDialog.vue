<template>
  <div class="auth-backdrop" role="presentation" @mousedown.self="$emit('close')">
    <section class="auth-dialog account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <button class="auth-close" type="button" aria-label="关闭" @click="$emit('close')">×</button>
      <span class="kicker">Account & terminals</span>
      <h2 id="account-title">账户与终端管理</h2>
      <div class="account-profile">
        <strong>{{ user.username }}</strong>
        <span>账户 UUID：{{ user.user_uuid }}</span>
        <span>创建时间：{{ formatDate(user.created_at) }}</span>
      </div>

      <section v-if="!questionsLoading && myQuestions.length === 0" class="account-section legacy-security-setup">
        <h3>请先设置两个安全问题</h3>
        <p>这是旧账户的一次性补全步骤。答案只保存 Argon2 摘要；请使用虚构且可记住的答案，不要填写真实住址或真实生日。</p>
        <div class="verification-grid">
          <select v-model="setupQuestion1"><option value="" disabled>问题一</option><option v-for="item in allQuestions" :key="item.id" :value="item.id" :disabled="item.id === setupQuestion2">{{ item.prompt }}</option></select>
          <input v-model.trim="setupAnswer1" maxlength="128" placeholder="答案一" />
          <select v-model="setupQuestion2"><option value="" disabled>问题二</option><option v-for="item in allQuestions" :key="item.id" :value="item.id" :disabled="item.id === setupQuestion1">{{ item.prompt }}</option></select>
          <input v-model.trim="setupAnswer2" maxlength="128" placeholder="答案二" />
          <input v-model="setupPassword" type="password" autocomplete="current-password" placeholder="当前账户密码" />
        </div>
        <button class="primary-btn small-action" type="button" :disabled="busy" @click="setupLegacySecurity">保存安全问题</button>
      </section>

      <section v-else-if="myQuestions.length === 2" class="account-section verification-panel">
        <h3>授权码身份校验</h3>
        <p>首次绑定只校验密码；已有终端后的绑定及所有迁移，还必须回答两个安全问题。</p>
        <div class="verification-grid">
          <input v-model="currentPassword" type="password" autocomplete="current-password" placeholder="当前账户密码" />
          <label v-for="(question, index) in myQuestions" :key="question.id"><span>{{ question.prompt }}</span><input v-model.trim="securityAnswers[index]" maxlength="128" autocomplete="off" placeholder="请输入答案" /></label>
        </div>
      </section>

      <section class="account-section">
        <div class="account-section-head">
          <div><h3>绑定新终端</h3><p>在 APK 绑定页输入这个六位码。</p></div>
          <button class="secondary-btn small-action" type="button" :disabled="busy" @click="generateCode('terminal_bind')">生成授权码</button>
        </div>
        <div v-if="activeCode" class="management-code">
          <strong>{{ activeCode.code }}</strong>
          <span>{{ activeCodeLabel }} · 一次性授权码，{{ remainingSeconds }} 秒后过期，不会自动更换</span>
        </div>
      </section>

      <section class="account-section">
        <div class="account-section-head"><div><h3>已绑定终端</h3><p>迁移码会在新终端绑定成功后自动撤销旧终端。</p></div><button class="ghost-btn small-action" type="button" :disabled="busy" @click="loadTerminals">刷新</button></div>
        <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
        <p v-if="loading" class="terminal-empty">正在读取…</p>
        <p v-else-if="terminals.length === 0" class="terminal-empty">尚未绑定认证终端。</p>
        <article v-for="terminal in terminals" :key="terminal.terminal_uuid" class="terminal-row">
          <div>
            <strong>{{ terminal.display_name || terminal.system_name }}</strong>
            <span>{{ statusLabel(terminal.status) }} · {{ formatDate(terminal.bound_at) }}</span>
          </div>
          <div v-if="terminal.status === 1" class="terminal-actions">
            <button type="button" :disabled="busy" @click="generateCode('terminal_migrate', terminal)">迁移授权码</button>
            <button class="danger-action" type="button" :disabled="busy" @click="revokeWithSecurity(terminal)">密码+安全问题撤销</button>
          </div>
          <div v-if="terminal.status === 1" class="terminal-revoke-code">
            <input v-model.trim="revokeCodes[terminal.terminal_uuid]" maxlength="12" placeholder="终端撤销授权码 / 6 位验证码" />
            <button class="danger-action" type="button" :disabled="busy" @click="revokeWithTerminalCode(terminal)">使用终端码撤销</button>
          </div>
        </article>
      </section>
      <p class="management-note">系统不收集 IMEI、MAC、硬件序列号或位置；终端身份由 Android Keystore 公钥证明。
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { AuthUser, SecurityQuestion } from '../types/auth';
import { createTerminalAuthorizationCode, getMySecurityQuestions, listTerminals, revokeTerminal, setupSecurityQuestions, type AuthorizationCode, type TerminalInfo } from '../services/api';
import { SECURITY_QUESTIONS } from '../config/securityQuestions';

defineProps<{ user: AuthUser }>();
defineEmits<{ close: [] }>();
const terminals = ref<TerminalInfo[]>([]);
const activeCode = ref<AuthorizationCode | null>(null);
const activeTerminal = ref<TerminalInfo | null>(null);
const remainingSeconds = ref(0);
const loading = ref(false);
const busy = ref(false);
const error = ref('');
const allQuestions = SECURITY_QUESTIONS;
const myQuestions = ref<SecurityQuestion[]>([]);
const questionsLoading = ref(true);
const currentPassword = ref('');
const securityAnswers = ref(['', '']);
const setupQuestion1 = ref('');
const setupQuestion2 = ref('');
const setupAnswer1 = ref('');
const setupAnswer2 = ref('');
const setupPassword = ref('');
const revokeCodes = ref<Record<string, string>>({});
let countdownTimer: number | undefined;
let codeExpiresAt = 0;
let terminalPollTimer: number | undefined;

const activeCodeLabel = computed(() => activeCode.value?.purpose === 'terminal_migrate'
  ? `迁移 ${activeTerminal.value?.display_name || activeTerminal.value?.system_name || '终端'}` : '绑定新终端');

function clearCountdown() { if (countdownTimer !== undefined) window.clearInterval(countdownTimer); countdownTimer = undefined; }
async function loadTerminals(silent = false) {
  if (!silent) loading.value = true;
  if (!silent) error.value = '';
  try { terminals.value = await listTerminals(); }
  catch (reason) { if (!silent) error.value = reason instanceof Error ? reason.message : '无法读取终端'; }
  finally { if (!silent) loading.value = false; }
}

async function loadSecurityQuestions() {
  questionsLoading.value = true;
  try { myQuestions.value = await getMySecurityQuestions(); }
  catch (reason) { error.value = reason instanceof Error ? reason.message : '无法读取安全问题'; }
  finally { questionsLoading.value = false; }
}

async function setupLegacySecurity() {
  if (!setupPassword.value || !setupQuestion1.value || !setupQuestion2.value || setupAnswer1.value.length < 2 || setupAnswer2.value.length < 2) {
    error.value = '请完整填写两个不同问题、答案和当前密码'; return;
  }
  busy.value = true; error.value = '';
  try {
    await setupSecurityQuestions(setupPassword.value, [
      { question_id: setupQuestion1.value, answer: setupAnswer1.value },
      { question_id: setupQuestion2.value, answer: setupAnswer2.value }
    ]);
    setupPassword.value = ''; setupAnswer1.value = ''; setupAnswer2.value = '';
    await loadSecurityQuestions();
  } catch (reason) { error.value = reason instanceof Error ? reason.message : '安全问题设置失败'; }
  finally { busy.value = false; }
}

async function generateCode(purpose: 'terminal_bind' | 'terminal_migrate', terminal?: TerminalInfo) {
  const requiresAnswers = purpose === 'terminal_migrate' || terminals.value.length > 0;
  if (!currentPassword.value) { error.value = '请输入当前账户密码'; return; }
  if (requiresAnswers && (myQuestions.value.length !== 2 || securityAnswers.value.some((item) => item.length < 2))) {
    error.value = '本次操作必须回答两个安全问题'; return;
  }
  clearCountdown(); busy.value = true; error.value = ''; activeTerminal.value = terminal ?? null;
  try {
    const answers = requiresAnswers ? myQuestions.value.map((item, index) => ({ question_id: item.id, answer: securityAnswers.value[index] })) : undefined;
    const result = await createTerminalAuthorizationCode(purpose, currentPassword.value, answers, terminal?.terminal_uuid);
    activeCode.value = result; codeExpiresAt = new Date(result.expires_at).getTime();
    remainingSeconds.value = Math.max(0, Math.ceil((codeExpiresAt - Date.now()) / 1000));
    currentPassword.value = ''; securityAnswers.value = ['', ''];
    countdownTimer = window.setInterval(() => {
      remainingSeconds.value = Math.max(0, Math.ceil((codeExpiresAt - Date.now()) / 1000));
      if (remainingSeconds.value <= 0) { clearCountdown(); activeCode.value = null; }
    }, 1000);
  } catch (reason) { error.value = reason instanceof Error ? reason.message : '无法生成授权码'; activeCode.value = null; }
  finally { busy.value = false; }
}

async function performRevoke(terminal: TerminalInfo, payload: Parameters<typeof revokeTerminal>[1]) {
  if (!window.confirm(`确定撤销终端“${terminal.display_name || terminal.system_name}”？它将立即失去授权能力。`)) return false;
  busy.value = true; error.value = '';
  try { await revokeTerminal(terminal.terminal_uuid, payload); await loadTerminals(); return true; }
  catch (reason) { error.value = reason instanceof Error ? reason.message : '撤销失败'; return false; }
  finally { busy.value = false; }
}

async function revokeWithSecurity(terminal: TerminalInfo) {
  if (!currentPassword.value || myQuestions.value.length !== 2 || securityAnswers.value.some((item) => item.length < 2)) {
    error.value = '兜底撤销必须输入当前密码并回答两道安全问题'; return;
  }
  const success = await performRevoke(terminal, {
    method: 'password_security',
    current_password: currentPassword.value,
    security_answers: myQuestions.value.map((item, index) => ({ question_id: item.id, answer: securityAnswers.value[index] }))
  });
  if (success) { currentPassword.value = ''; securityAnswers.value = ['', '']; }
}

async function revokeWithTerminalCode(terminal: TerminalInfo) {
  const code = (revokeCodes.value[terminal.terminal_uuid] || '').replace(/\s/g, '').toUpperCase();
  const isVerificationCode = /^\d{6}$/.test(code);
  if (!isVerificationCode && !/^[A-Z0-9]{8,12}$/.test(code)) {
    error.value = '请输入 APK 生成的 8-12 位撤销授权码或 6 位撤销验证码'; return;
  }
  const success = await performRevoke(terminal, {
    method: isVerificationCode ? 'terminal_verification_code' : 'terminal_authorization_code',
    code
  });
  if (success) revokeCodes.value[terminal.terminal_uuid] = '';
}

function statusLabel(status: number) { return status === 1 ? '有效' : status === 4 ? '已迁移' : '已撤销'; }
function formatDate(value: string) { return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }
onMounted(() => {
  void loadTerminals(); void loadSecurityQuestions();
  terminalPollTimer = window.setInterval(() => void loadTerminals(true), 10000);
});
onBeforeUnmount(() => {
  clearCountdown();
  if (terminalPollTimer !== undefined) window.clearInterval(terminalPollTimer);
});
</script>
