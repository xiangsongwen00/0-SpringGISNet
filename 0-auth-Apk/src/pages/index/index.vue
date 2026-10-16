<template>
  <view :class="['page', { 'page--map': session }]">
    <view v-if="!session" class="status-bar-mask" aria-hidden="true" />
    <view v-if="!session" class="safe-top" />
    <view v-if="!session" class="brand-row">
      <image class="brand-icon" src="/static/app-icon.png" mode="aspectFill" />
      <view>
        <text class="brand-title">春秋GIS 人生轨迹</text>
        <text class="brand-subtitle">位置轨迹 · 共享 · 角色权限</text>
      </view>
    </view>

    <view v-if="restoringSession" class="panel login-panel session-restoring">
      <text class="eyebrow">SESSION RESTORE</text>
      <text class="heading">正在恢复登录</text>
      <text class="description">正在使用本机保存的会话凭据验证，不读取密码、指纹或其他生物信息。</text>
    </view>

    <view v-else-if="!session" class="panel login-panel">
      <text class="eyebrow">SPRINGAUTUMN TRACK</text>
      <text class="heading">{{ authMode === 'login' ? '登录人生轨迹' : '创建最小信息账户' }}</text>
      <text class="description">{{ authMode === 'login' ? '登录后可自行开启位置轨迹。不开启时不读取位置；不读取短信、通讯录、IMEI、MAC 或硬件序列号。' : '只需用户名、密码和两道安全问题；不要求邮箱、手机号或真实身份。' }}</text>
      <view class="field"><text>用户名</text><input v-model.trim="username" maxlength="32" placeholder="2-32 位中文、字母、数字、_ 或 -" /></view>
      <view class="field"><text>密码</text><input v-model="password" password maxlength="128" :placeholder="authMode === 'register' ? '至少 10 位' : '请输入密码'" /></view>
      <template v-if="authMode === 'register'">
        <view class="field"><text>确认密码</text><input v-model="confirmPassword" password maxlength="128" placeholder="再次输入密码" /></view>
        <view class="field">
          <text>安全问题一</text>
          <picker :range="registrationSecurityQuestions" range-key="prompt" :value="registerQuestion1Index" @change="changeRegisterQuestion(0, $event)">
            <view class="registration-picker">{{ registrationSecurityQuestions[registerQuestion1Index].prompt }}</view>
          </picker>
          <input v-model.trim="registerAnswer1" maxlength="128" placeholder="答案至少 2 个字符" />
        </view>
        <view class="field">
          <text>安全问题二</text>
          <picker :range="registrationSecurityQuestions" range-key="prompt" :value="registerQuestion2Index" @change="changeRegisterQuestion(1, $event)">
            <view class="registration-picker">{{ registrationSecurityQuestions[registerQuestion2Index].prompt }}</view>
          </picker>
          <input v-model.trim="registerAnswer2" maxlength="128" placeholder="答案至少 2 个字符" />
        </view>
        <text class="security-warning">安全答案只保存不可逆摘要且无法找回。请使用自己能记住的虚构答案，不要填写真实住址、真实生日或他人的真实信息。</text>
        <view class="registration-notice">
          <text>注册前告知</text>
          <text>必要处理：用户名、密码摘要、系统 UUID、令牌摘要、客户端类型、必要时间信息、协议同意记录及安全事件；IP 只保存密钥化 HMAC 摘要。</text>
          <text>明确不收集：邮箱、手机号、短信、真实姓名、证件、明文住址、通讯录、IMEI、MAC、生物识别和金融信息。</text>
          <text>注册只用于登录、本人数据管理和技术反馈，不产生会员等级、商业授权、管理权限、数据优先级或其他优先权利。</text>
        </view>
        <view class="consent-row" @click="ageConfirmed = !ageConfirmed"><checkbox :checked="ageConfirmed" color="#0e7c93" /><text>我确认本人已满十四周岁；未满十四周岁者当前不得自行注册。</text></view>
        <view class="consent-row" @click="termsAccepted = !termsAccepted"><checkbox :checked="termsAccepted" color="#0e7c93" /><text>我已阅读并同意</text><text class="legal-link" @click.stop="legalView = 'terms'">《用户协议》</text></view>
        <view class="consent-row" @click="privacyAccepted = !privacyAccepted"><checkbox :checked="privacyAccepted" color="#0e7c93" /><text>我已阅读并同意</text><text class="legal-link" @click.stop="legalView = 'privacy'">《隐私保护说明》</text></view>
      </template>
      <text v-if="error" class="error">{{ error }}</text>
      <button v-if="authMode === 'login' && hasSavedSession" class="secondary" :loading="busy" :disabled="busy" @click="restorePersistedSession">重试免登录</button>
      <button class="primary" :loading="busy" :disabled="busy" @click="authMode === 'login' ? signIn() : signUp()">{{ authMode === 'login' ? '登录' : '注册并登录' }}</button>
      <button class="auth-switch" :disabled="busy" @click="setAuthMode(authMode === 'login' ? 'register' : 'login')">{{ authMode === 'login' ? '没有账户？在 APK 创建账户' : '已有账户？返回登录' }}</button>
      <text v-if="authMode === 'login'" class="privacy">成功使用后会话自动续期；连续 30 天未使用才需要重新登录。本应用不保存密码，不要求指纹。</text>
    </view>

    <template v-else>
      <view class="map-home">
        <SpringGisMap
          immersive
          :point="locationState.lastPoint"
          :track-points="playbackTrackPoints"
          :playback-point="playbackPoint"
        />

        <view :class="['map-home-header', { active: activeModule === 'permission' }]" @click="toggleModule('permission')">
          <image class="map-home-icon" src="/static/app-icon.png" mode="aspectFill" />
          <view class="map-home-brand">
            <text>春秋 GIS</text>
            <text>{{ session.user.username }} · {{ terminalBound ? '终端已绑定' : '等待绑定' }}</text>
          </view>
        </view>

        <view class="map-launcher">
          <view :class="['map-launcher-item', { active: activeModule === 'track' }]" @click="toggleModule('track')">
            <text class="map-launcher-icon">轨</text><text>实时</text>
          </view>
          <view :class="['map-launcher-item', { active: activeModule === 'map' }]" @click="toggleModule('map')">
            <text class="map-launcher-icon">放</text><text>回放</text>
          </view>
        </view>

        <view v-if="activeModule" class="drawer-scrim" @click="activeModule = null" />
        <scroll-view v-if="activeModule" :class="['module-drawer', { 'module-drawer--half': activeModule !== 'permission' }]" scroll-y>
          <view class="drawer-header">
            <view>
              <text class="drawer-eyebrow">SPRINGAUTUMN GIS</text>
              <text class="drawer-title">{{ activeModule === 'track' ? '实时轨迹' : activeModule === 'map' ? '三天内轨迹回放' : '账户、终端与权限' }}</text>
            </view>
            <view class="drawer-close" @click="activeModule = null">×</view>
          </view>

          <view v-if="activeModule === 'track'" class="drawer-content tracking-panel">
        <text class="section-title">实时位置记录</text>
        <text class="description">位置只属于当前账户。只有你主动向指定用户共享后，对方才能查看实时位置或最近三天内指定时段的历史轨迹。</text>
        <view class="frequency-row">
          <text>写入频率</text>
          <picker :range="locationIntervals" :value="locationIntervalIndex" @change="changeLocationInterval">
            <view class="frequency-picker">每 {{ locationInterval }} 秒一次</view>
          </picker>
        </view>
        <view v-if="locationState.lastPoint" class="location-card">
          <text>{{ locationState.lastPoint.latitude.toFixed(6) }}, {{ locationState.lastPoint.longitude.toFixed(6) }}</text>
          <text>精度 {{ locationState.lastPoint.accuracy?.toFixed(0) || '—' }} 米 · {{ formatLocationTime(locationState.lastUploadedAt) }}</text>
        </view>
        <text v-else class="muted">尚未上传位置</text>
        <text v-if="locationState.error" class="error">{{ locationState.error }}</text>
        <button v-if="!locationState.running" class="primary" :disabled="!terminalBound || busy" @click="startLocationTracking">开启轨迹记录</button>
        <button v-else class="tracking-stop" :disabled="busy" @click="stopLocationTracking">停止轨迹记录</button>
        <text class="privacy">Android 首次开启会请求定位权限。1 秒频率耗电最高；默认 2 秒。系统省电策略或后台限制可能降低实际采样频率。</text>
          </view>
          <view v-if="activeModule === 'map'" class="drawer-content">
        <text class="section-title">轨迹动画回放</text>
        <text class="description">选择最近三天内的时间范围后读取轨迹。播放时轨迹线会随回放位置逐点延伸，不会提前显示尚未播放的路段。</text>
        <view class="playback-card">
          <view class="playback-row">
            <picker :range="historyWindowLabels" :value="historyWindowIndex" @change="changeHistoryWindow">
              <view class="playback-select">范围：{{ historyWindowLabels[historyWindowIndex] }}</view>
            </picker>
            <view class="playback-action" @click="loadHistoryTrack">{{ historyLoading ? '读取中…' : '读取轨迹' }}</view>
          </view>
          <template v-if="historyTrackPoints.length">
            <text class="playback-summary">已加载 {{ historyTrackPoints.length }} 个回放点 · {{ formatPlaybackTime(playbackPoint?.recorded_at) }}</text>
            <slider :value="playbackProgress" min="0" max="1000" activeColor="#25d9ff" backgroundColor="#d8e8eb" block-size="18" @change="seekPlayback" />
            <view class="playback-row">
              <view class="playback-action" @click="togglePlayback">{{ playbackPlaying ? '暂停' : '播放' }}</view>
              <view class="playback-action playback-action--muted" @click="stopPlayback">停止</view>
              <picker :range="playbackSpeedLabels" :value="playbackSpeedIndex" @change="changePlaybackSpeed">
                <view class="playback-select">速度 {{ playbackSpeedLabels[playbackSpeedIndex] }}</view>
              </picker>
            </view>
          </template>
          <text v-else class="playback-summary">支持读取并动画回放本人最近三天内的历史轨迹。</text>
          <text v-if="historyError" class="error">{{ historyError }}</text>
        </view>
        <text class="privacy">回放线仅显示已经播放到的部分；拖动进度条时，线与位置点会同步跳转。</text>
          </view>
          <view v-if="activeModule === 'permission'" class="drawer-content">
      <view class="drawer-section gesture-guide">
        <text class="section-title">地图手势操作</text>
        <text class="description">单指拖动旋转地球；双指平移或调整俯仰；双指捏合缩放；轻触地图用于当前启用的测量、点查询或绘制操作。工具面板最小化后，当前测量或绘制状态仍会继续。</text>
      </view>
      <view class="drawer-section">
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
      <view v-if="bindingLogs.length" class="drawer-section diagnostic-panel">
        <view class="diagnostic-title-row">
          <text class="section-title">绑定诊断日志</text>
          <text class="clear-log" @click="bindingLogs = []">清空</text>
        </view>
        <text v-for="(line, index) in bindingLogs" :key="index" class="diagnostic-line">{{ line }}</text>
        <text class="diagnostic-notice">日志不会输出密码、访问令牌、私钥或完整公钥。</text>
      </view>
      <view class="drawer-section">
        <text class="section-title">六位快速登录验证码</text>
        <text class="description">由本终端生成，在 PC 端“APK 验证码登录”中输入。验证码每 45 秒自动更新。</text>
        <view class="quick-code-display">{{ quickCode || '······' }}</view>
        <text class="quick-countdown">{{ terminalBound ? `${quickRemaining} 秒后更新` : '需先绑定当前终端' }}</text>
        <button class="primary" :loading="quickGenerating" :disabled="!terminalBound || busy || quickGenerating" @click="generateQuickCode">立即刷新验证码</button>
      </view>
      <view class="drawer-section">
        <text class="section-title">终端撤销凭据</text>
        <text class="description">只由当前已绑定终端生成，交给 PC 后可撤销本终端；与快速登录码、迁移码互不通用。</text>
        <button class="secondary" :disabled="!terminalBound || busy" @click="generateRevokeCode('authorization_code')">生成撤销授权码</button>
        <view v-if="revokeAuthorizationCode" class="authorization-result"><text>{{ revokeAuthorizationCode }}</text><text>10 分钟内一次有效，不自动轮换</text></view>
        <button class="secondary" :disabled="!terminalBound || busy" @click="generateRevokeCode('verification_code')">生成 6 位撤销验证码</button>
        <view v-if="revokeVerificationCode" class="authorization-result"><text>{{ revokeVerificationCode }}</text><text>{{ revokeVerificationRemaining }} 秒后失效</text></view>
      </view>
      <button class="logout" @click="signOut">退出当前账户</button>
          </view>
        </scroll-view>
      </view>
    </template>

    <view v-if="legalView" class="legal-mask">
      <scroll-view class="legal-sheet" scroll-y>
        <view class="legal-header"><text>{{ legalView === 'privacy' ? '春秋GIS 隐私保护说明' : '春秋GIS 用户协议' }}</text><view @click="legalView = null">×</view></view>
        <text class="legal-version">版本：2026-09-25</text>
        <template v-if="legalView === 'privacy'">
          <text class="legal-heading">适用范围与处理者</text><text class="legal-copy">适用于最小信息账户注册、登录、账户内数据管理、位置轨迹和技术反馈。处理者：凡语春秋（春秋GIS）。</text>
          <text class="legal-heading">必要处理的信息</text><text class="legal-copy">用户名；密码及安全答案的 Argon2id 摘要；系统生成的用户、会话和令牌标识；客户端类型、必要时间、协议同意记录及必要安全事件。网络地址仅保存带服务端密钥的 HMAC 摘要，不保存明文。</text>
          <text class="legal-heading">明确不收集</text><text class="legal-copy">不收集邮箱、手机号、短信、真实姓名、身份证件、明文住址、通讯录、IMEI、MAC、完整硬件序列号、生物识别、金融账户及其他与服务无关的敏感信息。定位只在用户主动开启轨迹功能后处理。</text>
          <text class="legal-heading">目的、保存与权利</text><text class="legal-copy">信息仅用于账户认证、本人数据管理、轨迹服务、必要安全审计和主动技术反馈，不用于广告画像或公开排行。用户依法享有知情、查阅、更正、删除、限制处理、撤回同意和注销账户等权利。</text>
          <text class="legal-heading">未成年人</text><text class="legal-copy">当前没有监护人同意流程，不接受未满十四周岁的未成年人自行注册。</text>
        </template>
        <template v-else>
          <text class="legal-heading">账户性质</text><text class="legal-copy">注册仅用于登录、本人数据管理和技术反馈。账户是内部逻辑标识，不等同于实名身份、会员资格或商业授权。</text>
          <text class="legal-heading">权限边界</text><text class="legal-copy">注册不会自动授予 License、API 商业调用、协作组角色、系统管理权限、数据优先处理、内容优先展示或其他优先权利。用户只能访问明确开放的功能和本人数据。</text>
          <text class="legal-heading">用户责任</text><text class="legal-copy">用户应妥善保管用户名、密码和终端凭据，不得访问他人账户、绕过权限控制、攻击服务或利用服务侵害他人合法权益。</text>
          <text class="legal-heading">适用法律</text><text class="legal-copy">本协议适用中华人民共和国法律，不排除或限制用户依法享有的个人信息权益和其他法定权利。</text>
        </template>
        <button class="primary legal-confirm" @click="legalView = null">我已阅读</button>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import SpringGisMap from '../../components/SpringGisMap.vue';
import { ApiError, confirmTerminalSession, createMigrationAuthorizationCode, createQuickCode, createTerminalRevokeCode, confirmTerminalBinding, getCurrentTerminal, getLocationSetting, getMySecurityQuestions, getMyTrackHistory, LOCATION_INTERVALS, login, logout as logoutApi, refreshLogin, register as registerApi, startTerminalBinding, startTerminalSession, updateLocationSetting, type AuthSession, type LocationInterval, type LocationPoint, type SecurityQuestion } from '../../services/api';
import { ensureTerminalKey, getNativeKeyDiagnostics, isNativeKeyAvailable, signTerminalPayload } from '../../services/keystore';
import { LocationTracker, type LocationTrackerState } from '../../services/locationTracker';
import { clearRefreshSession, loadRefreshToken, saveRefreshSession } from '../../services/sessionStorage';
import { REGISTRATION_SECURITY_QUESTIONS } from '../../config/securityQuestions';

const username = ref('');
const password = ref('');
const authMode = ref<'login' | 'register'>('login');
const confirmPassword = ref('');
const registrationSecurityQuestions = REGISTRATION_SECURITY_QUESTIONS;
const registerQuestion1Index = ref(0);
const registerQuestion2Index = ref(1);
const registerAnswer1 = ref('');
const registerAnswer2 = ref('');
const termsAccepted = ref(false);
const privacyAccepted = ref(false);
const ageConfirmed = ref(false);
const legalView = ref<'terms' | 'privacy' | null>(null);
const quickCode = ref('');
const bindingCode = ref('');
const busy = ref(false);
const error = ref('');
const session = ref<AuthSession | null>(null);
const restoringSession = ref(true);
const hasSavedSession = ref(Boolean(loadRefreshToken()));
const terminalBound = ref(false);
const activeModule = ref<'track' | 'map' | 'permission' | null>(null);
const locationIntervals = [...LOCATION_INTERVALS];
const locationInterval = ref<LocationInterval>(2);
const locationIntervalIndex = ref(1);
const locationState = ref<LocationTrackerState>({ running: false, lastPoint: null, lastUploadedAt: null, error: '' });
const historyWindows = [60 * 60 * 1000, 6 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 3 * 24 * 60 * 60 * 1000];
const historyWindowLabels = ['最近 1 小时', '最近 6 小时', '最近 24 小时', '最近 3 天'];
const historyWindowIndex = ref(2);
const historyTrackPoints = ref<LocationPoint[]>([]);
const historyLoading = ref(false);
const historyError = ref('');
const playbackIndex = ref(0);
const playbackPlaying = ref(false);
const playbackSpeedOptions = [1, 2, 5, 10];
const playbackSpeedLabels = playbackSpeedOptions.map((speed) => `${speed}×`);
const playbackSpeedIndex = ref(1);
const playbackPoint = computed(() => historyTrackPoints.value[playbackIndex.value] ?? null);
const playbackTrackPoints = computed(() => {
  if (historyTrackPoints.value.length < 2) return [];
  return historyTrackPoints.value.slice(0, Math.min(playbackIndex.value + 1, historyTrackPoints.value.length));
});
const playbackProgress = computed(() => historyTrackPoints.value.length <= 1
  ? 0
  : Math.round(playbackIndex.value / (historyTrackPoints.value.length - 1) * 1000));
let playbackTimer: ReturnType<typeof setInterval> | null = null;
let locationTracker: LocationTracker | null = null;
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
let accessExpiresAt = 0;
let sessionRefreshTimer: ReturnType<typeof setTimeout> | null = null;
let sessionRefreshPromise: Promise<boolean> | null = null;
let authGeneration = 0;

watch(bindingCode, (value) => { const normalized = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12); if (normalized !== value) bindingCode.value = normalized; });

function toggleModule(module: 'track' | 'map' | 'permission') {
  activeModule.value = activeModule.value === module ? null : module;
}

function clearSessionRefreshTimer() {
  if (sessionRefreshTimer !== null) clearTimeout(sessionRefreshTimer);
  sessionRefreshTimer = null;
}

function resetLocalSession(removeStoredSession = true) {
  authGeneration += 1;
  locationTracker?.stop(); locationTracker = null;
  clearQuickTimer(); clearRevokeVerificationTimer(); clearSessionRefreshTimer();
  session.value = null; accessExpiresAt = 0; terminalBound.value = false;
  quickCode.value = ''; bindingCode.value = ''; migrationCode.value = '';
  migrationPassword.value = ''; migrationAnswers.value = ['', '']; securityQuestions.value = [];
  revokeAuthorizationCode.value = ''; revokeVerificationCode.value = '';
  activeModule.value = null;
  locationState.value = { running: false, lastPoint: null, lastUploadedAt: null, error: '' };
  clearPlaybackTimer(); historyTrackPoints.value = []; playbackIndex.value = 0; historyError.value = '';
  if (removeStoredSession) {
    clearRefreshSession();
    hasSavedSession.value = false;
  }
}

function applySession(authenticated: AuthSession) {
  session.value = authenticated;
  locationTracker?.setAccessToken(authenticated.access_token);
  saveRefreshSession(authenticated);
  hasSavedSession.value = Boolean(authenticated.refresh_token);
  accessExpiresAt = Date.now() + authenticated.expires_in * 1000;
  clearSessionRefreshTimer();
  const refreshDelay = Math.max(30_000, authenticated.expires_in * 1000 - 60_000);
  sessionRefreshTimer = setTimeout(() => void refreshCurrentSession(false), refreshDelay);
}

async function initializeAuthenticatedSession(authenticated: AuthSession) {
  await attachExistingTerminal(authenticated);
  await refreshSecurityQuestions(authenticated);
  await restoreLocationTracking(authenticated);
}

async function refreshCurrentSession(initialize: boolean): Promise<boolean> {
  if (sessionRefreshPromise) return sessionRefreshPromise;
  const refreshToken = session.value?.refresh_token || loadRefreshToken();
  if (!refreshToken) return false;
  const generation = authGeneration;
  const operation = (async () => {
    try {
      const authenticated = await refreshLogin(refreshToken);
      if (generation !== authGeneration) return false;
      applySession(authenticated);
      if (initialize) await initializeAuthenticatedSession(authenticated);
      error.value = '';
      return true;
    } catch (reason) {
      if (generation !== authGeneration) return false;
      if (reason instanceof ApiError && reason.statusCode === 401) {
        resetLocalSession(true);
        error.value = '免登录已过期，请重新登录';
      } else {
        // Network outages must not destroy a still-valid 30-day refresh token.
        hasSavedSession.value = true;
        error.value = '暂时无法连接服务器，免登录凭据已保留，可稍后重试';
        clearSessionRefreshTimer();
        sessionRefreshTimer = setTimeout(() => void refreshCurrentSession(initialize), 60_000);
      }
      return false;
    }
  })();
  sessionRefreshPromise = operation;
  try { return await operation; }
  finally { if (sessionRefreshPromise === operation) sessionRefreshPromise = null; }
}

async function restorePersistedSession() {
  const refreshToken = loadRefreshToken();
  hasSavedSession.value = Boolean(refreshToken);
  if (!refreshToken) { restoringSession.value = false; return; }
  restoringSession.value = true;
  busy.value = true;
  try { await refreshCurrentSession(true); }
  finally { restoringSession.value = false; busy.value = false; }
}

function setAuthMode(mode: 'login' | 'register') {
  authMode.value = mode;
  password.value = '';
  confirmPassword.value = '';
  error.value = '';
}

function changeRegisterQuestion(question: 0 | 1, event: { detail: { value: string | number } }) {
  const index = Number(event.detail.value);
  if (!Number.isInteger(index) || !registrationSecurityQuestions[index]) return;
  if (question === 0) registerQuestion1Index.value = index;
  else registerQuestion2Index.value = index;
}

async function signUp() {
  error.value = '';
  if (!username.value || password.value.length < 10) { error.value = '用户名不能为空，密码至少 10 位'; return; }
  if (password.value !== confirmPassword.value) { error.value = '两次输入的密码不一致'; return; }
  if (registerQuestion1Index.value === registerQuestion2Index.value) { error.value = '必须选择两个不同的安全问题'; return; }
  if (registerAnswer1.value.length < 2 || registerAnswer2.value.length < 2) { error.value = '两个安全问题答案都至少需要 2 个字符'; return; }
  if (!termsAccepted.value || !privacyAccepted.value || !ageConfirmed.value) {
    error.value = '请先确认年龄，并分别同意用户协议和隐私保护说明'; return;
  }
  authGeneration += 1;
  clearSessionRefreshTimer();
  busy.value = true;
  try {
    const authenticated = await registerApi(username.value, password.value, [
      { question_id: registrationSecurityQuestions[registerQuestion1Index.value].id, answer: registerAnswer1.value },
      { question_id: registrationSecurityQuestions[registerQuestion2Index.value].id, answer: registerAnswer2.value },
    ]);
    applySession(authenticated);
    password.value = ''; confirmPassword.value = '';
    registerAnswer1.value = ''; registerAnswer2.value = '';
    await initializeAuthenticatedSession(authenticated);
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : '注册失败';
  } finally { busy.value = false; }
}

async function signIn() {
  error.value = '';
  if (!username.value || !password.value) { error.value = '请输入用户名和密码'; return; }
  authGeneration += 1;
  clearSessionRefreshTimer();
  busy.value = true;
  try {
    const authenticated = await login(username.value, password.value);
    applySession(authenticated); password.value = '';
    await initializeAuthenticatedSession(authenticated);
  }
  catch (reason) { error.value = reason instanceof Error ? reason.message : '登录失败'; }
  finally { busy.value = false; }
}

async function restoreLocationTracking(authenticated = session.value) {
  if (!authenticated) return;
  try {
    const setting = await getLocationSetting(authenticated.access_token);
    locationInterval.value = setting.write_interval_seconds;
    locationIntervalIndex.value = locationIntervals.indexOf(setting.write_interval_seconds);
    if (setting.tracking_enabled && terminalBound.value) startTracker(authenticated.access_token);
  } catch (reason) {
    locationState.value = { ...locationState.value, error: reason instanceof Error ? reason.message : '无法读取定位设置' };
  }
}

function startTracker(accessToken: string) {
  locationTracker?.stop();
  locationTracker = new LocationTracker(accessToken, locationInterval.value, (state) => { locationState.value = state; });
  locationTracker.start();
}

async function startLocationTracking() {
  if (!session.value || !terminalBound.value) return;
  busy.value = true;
  try {
    await updateLocationSetting(session.value.access_token, locationInterval.value, true);
    startTracker(session.value.access_token);
  } catch (reason) {
    locationState.value = { ...locationState.value, error: reason instanceof Error ? reason.message : '无法开启轨迹记录' };
  } finally { busy.value = false; }
}

async function stopLocationTracking() {
  locationTracker?.stop(); locationTracker = null;
  if (!session.value) return;
  busy.value = true;
  try { await updateLocationSetting(session.value.access_token, locationInterval.value, false); }
  catch (reason) { locationState.value = { ...locationState.value, error: reason instanceof Error ? reason.message : '无法保存停止状态' }; }
  finally { busy.value = false; }
}

async function changeLocationInterval(event: { detail: { value: string | number } }) {
  const index = Number(event.detail.value);
  const next = locationIntervals[index];
  if (!next) return;
  locationInterval.value = next; locationIntervalIndex.value = index;
  locationTracker?.setInterval(next);
  if (session.value) await updateLocationSetting(session.value.access_token, next, locationState.value.running);
}

function formatLocationTime(value: string | null): string {
  return value ? new Date(value).toLocaleTimeString('zh-CN', { hour12: false }) : '未上传';
}

function clearPlaybackTimer() {
  if (playbackTimer !== null) clearInterval(playbackTimer);
  playbackTimer = null;
  playbackPlaying.value = false;
}

function changeHistoryWindow(event: { detail: { value: string | number } }) {
  historyWindowIndex.value = Number(event.detail.value);
}

function changePlaybackSpeed(event: { detail: { value: string | number } }) {
  playbackSpeedIndex.value = Number(event.detail.value);
}

function formatPlaybackTime(value?: string): string {
  return value ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '尚未开始';
}

function downsampleTrack(points: LocationPoint[], maximum = 3000): LocationPoint[] {
  if (points.length <= maximum) return points;
  const step = Math.ceil(points.length / maximum);
  const sampled = points.filter((_point, index) => index % step === 0);
  const last = points[points.length - 1];
  if (last && sampled[sampled.length - 1] !== last) sampled.push(last);
  return sampled;
}

async function loadHistoryTrack() {
  if (!session.value || historyLoading.value) return;
  clearPlaybackTimer();
  historyLoading.value = true;
  historyError.value = '';
  try {
    const to = new Date();
    const windowMs = historyWindows[historyWindowIndex.value] ?? historyWindows[2];
    const history = await getMyTrackHistory(session.value.access_token, new Date(to.getTime() - windowMs), to);
    const points = history.segments
      .flatMap((segment) => segment.points)
      .filter((point) => Number.isFinite(point.longitude) && Number.isFinite(point.latitude) && Boolean(point.recorded_at))
      .sort((left, right) => new Date(left.recorded_at).getTime() - new Date(right.recorded_at).getTime());
    historyTrackPoints.value = downsampleTrack(points);
    playbackIndex.value = 0;
    if (!points.length) historyError.value = '所选时间范围内没有历史轨迹点。';
  } catch (reason) {
    historyTrackPoints.value = [];
    historyError.value = reason instanceof Error ? reason.message : '无法读取历史轨迹';
  } finally {
    historyLoading.value = false;
  }
}

function togglePlayback() {
  if (playbackPlaying.value) { clearPlaybackTimer(); return; }
  if (historyTrackPoints.value.length < 2) return;
  if (playbackIndex.value >= historyTrackPoints.value.length - 1) playbackIndex.value = 0;
  playbackPlaying.value = true;
  playbackTimer = setInterval(() => {
    const step = playbackSpeedOptions[playbackSpeedIndex.value] ?? 1;
    playbackIndex.value = Math.min(historyTrackPoints.value.length - 1, playbackIndex.value + step);
    if (playbackIndex.value >= historyTrackPoints.value.length - 1) clearPlaybackTimer();
  }, 160);
}

function stopPlayback() {
  clearPlaybackTimer();
  playbackIndex.value = 0;
}

function seekPlayback(event: { detail: { value: number } }) {
  clearPlaybackTimer();
  const maximum = Math.max(0, historyTrackPoints.value.length - 1);
  playbackIndex.value = Math.round(maximum * Number(event.detail.value) / 1000);
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

async function signOut() {
  const refreshToken = session.value?.refresh_token || loadRefreshToken();
  resetLocalSession(true);
  error.value = '';
  if (refreshToken) {
    try { await logoutApi(refreshToken); }
    catch (reason) { console.info('[auth-logout]', reason instanceof Error ? reason.message : String(reason)); }
  }
}

async function resumeSession() {
  if (restoringSession.value) return;
  if (!session.value) {
    if (loadRefreshToken()) await restorePersistedSession();
    return;
  }
  if (Date.now() >= accessExpiresAt - 60_000) {
    if (!await refreshCurrentSession(false)) return;
  }
  await syncRemoteState();
}

void restorePersistedSession();
onShow(() => void resumeSession());
statusTimer = setInterval(() => void syncRemoteState(), 10000);
onUnmounted(() => { locationTracker?.stop(); clearPlaybackTimer(); clearQuickTimer(); clearRevokeVerificationTimer(); clearSessionRefreshTimer(); if (statusTimer !== null) clearInterval(statusTimer); });
</script>

<style scoped>
.page { min-height: 100vh; padding: 0 32rpx 64rpx; background: radial-gradient(circle at 16% 6%, rgba(91,192,235,.2), transparent 28%), #f7fbfc; box-sizing: border-box; }
.page--map { position: fixed; inset: 0; min-height: 0; padding: 0; overflow: hidden; background: #071923; }
.map-home { position: absolute; inset: 0; overflow: hidden; background: #071923; }
.map-home-header { position: absolute; z-index: 150; top: calc(var(--status-bar-height) + 18rpx); left: 22rpx; display: flex; align-items: center; gap: 14rpx; max-width: calc(100% - 136rpx); padding: 12rpx 18rpx 12rpx 12rpx; border: 1rpx solid rgba(126,214,223,.44); border-radius: 999rpx; background: rgba(7,29,41,.88); box-shadow: 0 10rpx 28rpx rgba(0,0,0,.22); backdrop-filter: blur(14px); }
.map-home-header.active { border-color: #25d9ff; box-shadow: 0 0 0 4rpx rgba(37,217,255,.16), 0 10rpx 28rpx rgba(0,0,0,.22); }
.map-home-icon { width: 64rpx; height: 64rpx; flex: 0 0 64rpx; border-radius: 20rpx; }
.map-home-brand text { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.map-home-brand text:first-child { color: #e8fbff; font-size: 27rpx; font-weight: 800; letter-spacing: 1rpx; }
.map-home-brand text:last-child { margin-top: 2rpx; color: #9bcbd4; font-size: 20rpx; }
.map-launcher { position: absolute; z-index: 150; left: 50%; bottom: calc(env(safe-area-inset-bottom) + 18rpx); display: flex; gap: 10rpx; padding: 10rpx; border: 1rpx solid rgba(126,214,223,.36); border-radius: 24rpx; background: rgba(7,29,41,.9); box-shadow: 0 12rpx 34rpx rgba(0,0,0,.28); backdrop-filter: blur(14px); transform: translateX(-50%); }
.map-launcher-item { display: flex; align-items: center; gap: 8rpx; padding: 10rpx 14rpx; border-radius: 18rpx; color: #b9dce4; font-size: 21rpx; }
.map-launcher-item.active { background: #e58b47; color: #fff; }
.map-launcher-icon { display: flex; align-items: center; justify-content: center; width: 36rpx; height: 36rpx; border: 1rpx solid currentColor; border-radius: 50%; font-size: 19rpx; font-weight: 800; }
.drawer-scrim { position: absolute; z-index: 390; inset: 0; background: rgba(3,14,20,.46); backdrop-filter: blur(3px); }
.module-drawer { position: absolute; z-index: 400; top: calc(var(--status-bar-height) + 18rpx); right: 18rpx; bottom: calc(env(safe-area-inset-bottom) + 18rpx); left: 18rpx; width: auto; height: auto; border: 1rpx solid rgba(126,214,223,.35); border-radius: 30rpx; background: rgba(247,251,252,.98); box-shadow: 0 24rpx 70rpx rgba(0,0,0,.34); box-sizing: border-box; }
.module-drawer--half { top: auto; right: 0; bottom: 0; left: 0; height: 52vh; border-right: 0; border-bottom: 0; border-left: 0; border-radius: 34rpx 34rpx 0 0; }
.module-drawer--half .drawer-content { padding-bottom: calc(env(safe-area-inset-bottom) + 34rpx); }
.drawer-header { position: sticky; z-index: 3; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 26rpx 26rpx 22rpx; border-bottom: 1rpx solid rgba(14,124,147,.12); background: rgba(247,251,252,.96); backdrop-filter: blur(12px); }
.drawer-eyebrow,.drawer-title { display: block; }
.drawer-eyebrow { color: #0e7c93; font-size: 18rpx; letter-spacing: 3rpx; }
.drawer-title { margin-top: 5rpx; color: #10272d; font-size: 31rpx; font-weight: 800; }
.drawer-close { display: flex; align-items: center; justify-content: center; width: 72rpx; height: 72rpx; margin-left: 24rpx; border: 1rpx solid rgba(14,124,147,.22); border-radius: 50%; background: #fff; color: #31515b; font-size: 46rpx; line-height: 1; }
.drawer-content { padding: 26rpx; }
.drawer-section { margin-bottom: 24rpx; padding: 26rpx; border: 1rpx solid rgba(14,124,147,.14); border-radius: 24rpx; background: #fff; box-shadow: 0 10rpx 30rpx rgba(14,124,147,.07); }
.gesture-guide { border-color: rgba(37,217,255,.28); background: linear-gradient(145deg,#f1fdff,#fff); }
.status-bar-mask { position: fixed; z-index: 200; top: 0; left: 0; right: 0; height: var(--status-bar-height); background: rgba(247,251,252,.98); pointer-events: none; }
.safe-top { height: calc(var(--status-bar-height) + 24rpx); }
.brand-row { display: flex; align-items: center; gap: 20rpx; margin: 16rpx 0 40rpx; }
.brand-icon { width: 92rpx; height: 92rpx; flex: 0 0 92rpx; border-radius: 26rpx; box-shadow: 0 14rpx 36rpx rgba(181,103,49,.24); }
.brand-title,.brand-subtitle,.heading,.description,.label,.account-name,.section-title,.muted,.privacy,.error,.empty-state { display: block; }
.brand-title { font-size: 34rpx; font-weight: 700; }.brand-subtitle { margin-top: 5rpx; color: #7a949d; font-size: 24rpx; }
.panel,.account-card { margin-bottom: 28rpx; padding: 32rpx; border: 1rpx solid rgba(14,124,147,.14); border-radius: 28rpx; background: rgba(255,255,255,.92); box-shadow: 0 16rpx 44rpx rgba(14,124,147,.09); }.login-panel { padding-top: 40rpx; }
.eyebrow { color: #0e7c93; font-size: 21rpx; letter-spacing: 3rpx; }.heading { margin: 14rpx 0; font-family: serif; font-size: 46rpx; font-weight: 700; }.description { color: #3e5c66; font-size: 27rpx; line-height: 1.7; }
.field { margin-top: 28rpx; }.field text { display: block; margin-bottom: 12rpx; font-size: 27rpx; font-weight: 600; }.field input,.authorization-input { height: 92rpx; padding: 0 24rpx; border: 1rpx solid rgba(14,124,147,.24); border-radius: 20rpx; background: white; font-size: 30rpx; box-sizing: border-box; }
.registration-picker { display: flex; align-items: center; min-height: 88rpx; margin-bottom: 14rpx; padding: 0 24rpx; border: 1rpx solid rgba(14,124,147,.24); border-radius: 20rpx; background: #fff; color: #244a55; font-size: 27rpx; box-sizing: border-box; }
.security-warning { display: block; margin-top: 24rpx; padding: 20rpx; border-radius: 18rpx; background: #fff6e9; color: #87552e; font-size: 23rpx; line-height: 1.6; }
.registration-notice { margin-top: 24rpx; padding: 22rpx; border: 1rpx solid rgba(14,124,147,.16); border-radius: 20rpx; background: #f4fbfc; }
.registration-notice text { display: block; margin-top: 10rpx; color: #45656e; font-size: 22rpx; line-height: 1.55; }
.registration-notice text:first-child { margin-top: 0; color: #123f4a; font-size: 27rpx; font-weight: 800; }
.consent-row { display: flex; align-items: flex-start; gap: 10rpx; margin-top: 22rpx; color: #365963; font-size: 23rpx; line-height: 1.5; }
.consent-row checkbox { flex: 0 0 auto; transform: scale(.82); transform-origin: left top; }
.legal-link { color: #0e7c93; font-weight: 700; }
.auth-switch { margin-top: 18rpx; border: 0; background: transparent; color: #0e7c93; font-size: 25rpx; }
.auth-switch::after { border: 0; }
.legal-mask { position: fixed; z-index: 2000; inset: 0; padding: calc(var(--status-bar-height) + 24rpx) 22rpx calc(env(safe-area-inset-bottom) + 24rpx); background: rgba(3,14,20,.66); box-sizing: border-box; }
.legal-sheet { width: 100%; height: 100%; border-radius: 30rpx; background: #fff; box-shadow: 0 30rpx 90rpx rgba(0,0,0,.35); }
.legal-header { position: sticky; z-index: 2; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 28rpx; border-bottom: 1rpx solid #dcebee; background: rgba(255,255,255,.97); }
.legal-header > text { color: #10272d; font-size: 32rpx; font-weight: 800; }
.legal-header > view { display: flex; align-items: center; justify-content: center; width: 66rpx; height: 66rpx; border-radius: 50%; background: #eef7f8; color: #31515b; font-size: 44rpx; }
.legal-version,.legal-heading,.legal-copy { display: block; margin-right: 28rpx; margin-left: 28rpx; }
.legal-version { margin-top: 24rpx; color: #789098; font-size: 21rpx; }
.legal-heading { margin-top: 28rpx; color: #143d47; font-size: 29rpx; font-weight: 800; }
.legal-copy { margin-top: 12rpx; color: #49666e; font-size: 24rpx; line-height: 1.75; }
.legal-confirm { margin: 34rpx 28rpx 46rpx; }
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
.module-tabs { position: sticky; z-index: 120; top: calc(var(--status-bar-height) + 8rpx); display: flex; gap: 12rpx; margin-bottom: 28rpx; padding: 8rpx; border: 1rpx solid rgba(14,124,147,.12); border-radius: 24rpx; background: rgba(247,251,252,.96); box-shadow: 0 10rpx 28rpx rgba(16,39,45,.1); backdrop-filter: blur(12px); }
.module-tab { flex: 1; padding: 20rpx 12rpx; border-radius: 18rpx; color: #6a7d82; text-align: center; font-size: 27rpx; font-weight: 700; }
.module-tab.active { background: #10272d; color: white; box-shadow: 0 10rpx 24rpx rgba(16,39,45,.18); }
.tracking-panel { border-color: rgba(197,113,51,.22); background: linear-gradient(155deg,#fffaf3,#fff); }
.frequency-row { display: flex; align-items: center; justify-content: space-between; margin-top: 26rpx; font-size: 27rpx; font-weight: 700; }
.frequency-picker { padding: 16rpx 20rpx; border: 1rpx solid rgba(197,113,51,.28); border-radius: 18rpx; background: white; color: #a25424; }
.location-card { display: grid; gap: 10rpx; margin-top: 24rpx; padding: 24rpx; border-radius: 20rpx; background: #fff1df; color: #693619; }
.location-card text:first-child { font-family: monospace; font-size: 29rpx; font-weight: 700; }
.location-card text:last-child { color: #9b6a4d; font-size: 23rpx; }
.tracking-stop { margin-top: 28rpx; border: 1rpx solid #b35a36; border-radius: 999rpx; background: white; color: #9e4427; font-size: 29rpx; }
.engine-panel { padding: 24rpx; background: linear-gradient(155deg,#f7fcfd,#fff); }
.engine-panel > .description { margin-bottom: 24rpx; }
.playback-card { margin-bottom: 22rpx; padding: 20rpx; border: 1rpx solid rgba(197,113,51,.22); border-radius: 20rpx; background: #fffaf3; }
.playback-row { display: flex; align-items: center; justify-content: space-between; gap: 12rpx; }
.playback-select,.playback-action { padding: 14rpx 18rpx; border: 1rpx solid rgba(14,124,147,.25); border-radius: 14rpx; background: white; color: #0e7c93; font-size: 22rpx; font-weight: 700; }
.playback-action { background: #0e7c93; color: white; }
.playback-action--muted { background: white; color: #6a7d82; }
.playback-summary { display: block; margin: 16rpx 0 8rpx; color: #6a5a4e; font-size: 22rpx; line-height: 1.5; }

@media screen and (orientation: landscape) {
  .map-home-header { top: max(env(safe-area-inset-top), 7px); left: max(env(safe-area-inset-left), 9px); gap: 7px; max-width: calc(100% - 72px); padding: 6px 10px 6px 6px; border-radius: 24px; }
  .map-home-icon { width: 34px; height: 34px; flex-basis: 34px; border-radius: 10px; }
  .map-home-brand text:first-child { font-size: 14px; }
  .map-home-brand text:last-child { font-size: 10px; }
  .map-launcher { bottom: max(env(safe-area-inset-bottom), 7px); gap: 4px; padding: 5px; border-radius: 14px; }
  .map-launcher-item { gap: 4px; padding: 5px 8px; border-radius: 10px; font-size: 11px; }
  .map-launcher-icon { width: 20px; height: 20px; font-size: 10px; }
  .module-drawer { top: max(env(safe-area-inset-top), 7px); right: max(env(safe-area-inset-right), 7px); bottom: max(env(safe-area-inset-bottom), 7px); left: 42vw; border-radius: 18px; }
  .module-drawer--half { top: auto; right: 0; bottom: 0; left: 0; height: 52vh; border-radius: 18px 18px 0 0; }
  .drawer-header { padding: 10px 14px 9px; }
  .drawer-eyebrow { font-size: 9px; letter-spacing: 2px; }
  .drawer-title { margin-top: 2px; font-size: 16px; }
  .drawer-close { width: 34px; height: 34px; margin-left: 12px; font-size: 24px; }
  .drawer-content { padding: 12px; }
  .drawer-section { margin-bottom: 10px; padding: 12px; border-radius: 13px; }
  .module-drawer .section-title { margin-bottom: 6px; font-size: 16px; }
  .module-drawer .description { font-size: 12px; line-height: 1.55; }
  .module-drawer .privacy,.module-drawer .muted,.module-drawer .error { margin-top: 8px; font-size: 11px; line-height: 1.5; }
  .module-drawer .primary,.module-drawer .secondary,.module-drawer .logout,.module-drawer .tracking-stop { min-height: 34px; margin-top: 10px; font-size: 13px; }
  .frequency-row { margin-top: 10px; font-size: 13px; }
  .frequency-picker { padding: 7px 10px; border-radius: 9px; }
  .location-card { gap: 4px; margin-top: 9px; padding: 10px; border-radius: 10px; }
  .location-card text:first-child { font-size: 13px; }
  .location-card text:last-child { font-size: 11px; }
  .playback-card { margin-bottom: 8px; padding: 10px; border-radius: 10px; }
  .playback-row { gap: 6px; }
  .playback-select,.playback-action { padding: 7px 9px; border-radius: 8px; font-size: 11px; }
  .playback-summary { margin: 7px 0 3px; font-size: 11px; }
  .module-drawer .field { margin-top: 10px; }
  .module-drawer .field text { margin-bottom: 5px; font-size: 12px; }
  .module-drawer .field input,.module-drawer .authorization-input,.module-drawer .migration-verification > input { height: 38px; padding: 0 10px; border-radius: 9px; font-size: 13px; }
  .quick-code-display { margin-top: 10px; padding: 10px; border-radius: 10px; font-size: 25px; letter-spacing: 9px; }
  .quick-countdown { margin-top: 5px; font-size: 11px; }
}
</style>
