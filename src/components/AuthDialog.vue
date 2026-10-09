<template>
  <div class="auth-backdrop" role="presentation" @mousedown.self="$emit('close')">
    <section class="auth-dialog" :class="{ 'quick-auth-dialog': mode === 'quick' }" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button class="auth-close" type="button" aria-label="关闭" @click="$emit('close')">×</button>
      <template v-if="mode !== 'quick'">
        <span class="kicker">Minimal data account</span>
        <h2 id="auth-title">{{ title }}</h2>
        <p class="auth-intro">{{ intro }}</p>
      </template>

      <section v-if="mode === 'quick'" class="quick-login-panel">
        <header class="quick-hero">
          <div class="quick-device-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48"><rect x="13" y="5" width="22" height="38" rx="5"/><path d="M20 10h8M21 37h6"/><path class="quick-icon-check" d="m19 24 4 4 7-8"/></svg>
          </div>
          <div>
            <span class="quick-badge"><i></i> SpringAutumn Auth</span>
            <h2 id="auth-title">APK 验证码登录</h2>
            <p>输入你的账户名，以及已绑定手机当前显示的验证码。</p>
          </div>
        </header>

        <form class="quick-login-form" @submit.prevent="quickSignIn">
          <label class="quick-field">
            <span>账户名</span>
            <div class="quick-input-shell">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>
              <input v-model.trim="quickUsername" autocomplete="username" maxlength="32" required placeholder="请输入你的用户名" />
            </div>
          </label>
          <label class="quick-field">
            <span>6 位验证码</span>
            <input v-model="quickCode" class="quick-code-input" inputmode="numeric" maxlength="6" autocomplete="one-time-code" required placeholder="· · · · · ·" />
          </label>

          <div class="quick-validity"><span class="quick-pulse"></span><span>验证码由 APK 生成，每 45 秒自动更新</span></div>
          <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
          <button class="primary-btn quick-submit" type="submit" :disabled="quickLoading || !quickUsername || quickCode.length !== 6">
            <span>{{ quickLoading ? '正在安全验证…' : '验证并登录' }}</span><span v-if="!quickLoading" aria-hidden="true">→</span>
          </button>
        </form>

        <div class="quick-guide" aria-label="操作步骤">
          <div><b>1</b><span>打开已绑定的<br /><strong>SpringAutumn Auth</strong></span></div>
          <i aria-hidden="true"></i>
          <div><b>2</b><span>查看 APK 上的<br /><strong>6 位登录验证码</strong></span></div>
        </div>
        <button class="quick-back" type="button" @click="setMode('login')"><span aria-hidden="true">←</span> 返回密码登录</button>
      </section>

      <template v-else>
        <form class="auth-form" @submit.prevent="submit">
          <label><span>用户名</span><input v-model.trim="username" name="username" autocomplete="username" maxlength="32" required placeholder="2-32 位中文、字母、数字、_ 或 -" /></label>
          <label><span>密码</span><input v-model="password" name="password" :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" type="password" minlength="10" maxlength="128" required placeholder="至少 10 位" /></label>
          <label v-if="mode === 'register'"><span>确认密码</span><input v-model="confirmPassword" name="confirm-password" autocomplete="new-password" type="password" minlength="10" maxlength="128" required /></label>
          <template v-if="mode === 'register'">
            <label><span>安全问题一</span><select v-model="securityQuestion1" required><option value="" disabled>请选择</option><option v-for="item in securityQuestions" :key="item.id" :value="item.id" :disabled="item.id === securityQuestion2">{{ item.prompt }}</option></select></label>
            <label><span>答案一</span><input v-model.trim="securityAnswer1" minlength="2" maxlength="128" required autocomplete="off" /></label>
            <label><span>安全问题二</span><select v-model="securityQuestion2" required><option value="" disabled>请选择</option><option v-for="item in securityQuestions" :key="item.id" :value="item.id" :disabled="item.id === securityQuestion1">{{ item.prompt }}</option></select></label>
            <label><span>答案二</span><input v-model.trim="securityAnswer2" minlength="2" maxlength="128" required autocomplete="off" /></label>
            <p class="security-warning">答案只保存 Argon2 摘要且无法找回。建议使用自己能记住的虚构答案，不要填写真实住址、真实生日或他人真实信息。</p>
          </template>
          <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
          <p v-if="mode === 'register'" class="privacy-note">注册仅用于登录、本人数据管理和技术反馈，不产生会员等级、商业授权、数据优先级或其他优先权利。</p>
          <div v-if="mode === 'register'" class="collection-notice">
            <strong>注册前告知</strong>
            <p><b>必要处理：</b>用户名、密码摘要、系统 UUID、令牌摘要、客户端类型、必要时间信息、协议同意记录及安全事件；IP 仅保存密钥化 HMAC 摘要，不保存明文。</p>
            <p><b>明确不收集：</b>邮箱、手机号、短信、真实姓名、证件、明文住址、通讯录、GPS、IMEI、MAC、生物识别和金融信息；安全答案只保存不可逆摘要。</p>
          </div>
          <label v-if="mode === 'register'" class="consent-check"><input v-model="ageConfirmed" type="checkbox" required /><span>我确认本人已满十四周岁；未满十四周岁的用户当前不得自行注册。</span></label>
          <label v-if="mode === 'register'" class="consent-check"><input v-model="termsAccepted" type="checkbox" required /><span>我已阅读并同意 <button type="button" @click.prevent="legalView = 'terms'">《用户协议》</button></span></label>
          <label v-if="mode === 'register'" class="consent-check"><input v-model="privacyAccepted" type="checkbox" required /><span>我已阅读并同意 <button type="button" @click.prevent="legalView = 'privacy'">《隐私保护说明》</button></span></label>
          <button class="primary-btn auth-submit" type="submit" :disabled="busy">{{ busy ? '处理中…' : mode === 'login' ? '登录' : '注册并登录' }}</button>
        </form>
        <button v-if="mode === 'login'" class="auth-switch" type="button" @click="setMode('quick')">使用 APK 六位验证码登录</button>
        <button class="auth-switch" type="button" @click="setMode(mode === 'login' ? 'register' : 'login')">{{ mode === 'login' ? '没有账户？创建最小信息账户' : '已有账户？返回登录' }}</button>
      </template>
    </section>
    <LegalDialog v-if="legalView" :kind="legalView" @close="legalView = null" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useAuth } from '../composables/useAuth';
import { consumeQuickLogin } from '../services/api';
import type { DeviceType } from '../types/auth';
import LegalDialog from './LegalDialog.vue';
import { SECURITY_QUESTIONS } from '../config/securityQuestions';

const props = withDefaults(defineProps<{ deviceType: DeviceType; initialMode?: 'login' | 'quick' }>(), {
  initialMode: 'login'
});
const emit = defineEmits<{ close: [] }>();
const { busy, signIn, signUp, acceptTokens } = useAuth();
const mode = ref<'login' | 'register' | 'quick'>(props.initialMode);
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const termsAccepted = ref(false);
const privacyAccepted = ref(false);
const ageConfirmed = ref(false);
const legalView = ref<'terms' | 'privacy' | null>(null);
const securityQuestions = SECURITY_QUESTIONS;
const securityQuestion1 = ref('');
const securityQuestion2 = ref('');
const securityAnswer1 = ref('');
const securityAnswer2 = ref('');
const quickCode = ref('');
const quickUsername = ref('');
const quickLoading = ref(false);

const title = computed(() => mode.value === 'login' ? '登录春秋GIS' : mode.value === 'register' ? '创建最小信息账户' : 'APK 验证码登录');
const intro = computed(() => mode.value === 'login' ? '使用用户名和密码继续。' : mode.value === 'register' ? '只需用户名和密码，不收集邮箱、手机号或真实身份信息。' : '六位验证码由已绑定的 APK 终端生成，每 45 秒自动更新。');
watch(quickCode, (value) => { const digits = value.replace(/\D/g, '').slice(0, 6); if (digits !== value) quickCode.value = digits; });

async function quickSignIn() {
  quickLoading.value = true; error.value = '';
  try {
    const tokens = await consumeQuickLogin(quickUsername.value, quickCode.value, 'SpringGIS PC 浏览器');
    acceptTokens(tokens); emit('close');
  } catch (reason) { error.value = reason instanceof Error ? reason.message : '验证码无效或已过期'; }
  finally { quickLoading.value = false; }
}

function setMode(next: 'login' | 'register' | 'quick') {
  mode.value = next; password.value = ''; confirmPassword.value = ''; quickCode.value = ''; quickUsername.value = ''; error.value = '';
}

async function submit() {
  error.value = '';
  if (mode.value === 'register' && password.value !== confirmPassword.value) { error.value = '两次输入的密码不一致'; return; }
  if (mode.value === 'register' && (!termsAccepted.value || !privacyAccepted.value || !ageConfirmed.value)) { error.value = '请先阅读并同意协议，同时确认已满十四周岁'; return; }
  try {
    if (mode.value === 'login') await signIn(username.value, password.value, props.deviceType);
    else await signUp(username.value, password.value, props.deviceType, [
      { question_id: securityQuestion1.value, answer: securityAnswer1.value },
      { question_id: securityQuestion2.value, answer: securityAnswer2.value }
    ]);
    emit('close');
  } catch (reason) { error.value = reason instanceof Error ? reason.message : '请求失败，请稍后重试'; }
}

</script>
