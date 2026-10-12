<template>
  <div ref="wrap" class="sdk-frame" :class="{ minimized }">
    <div class="sdk-toolbar">
      <strong>已安装 SDK · dist 依赖</strong>
      <select v-model="language" aria-label="SDK消费语言"><option value="ts">TypeScript</option><option value="js">JavaScript ES6</option></select>
      <a :href="pageUrl" target="_blank" rel="noopener">独立打开交互页 ↗</a>
      <span class="location-state">{{ locationLabel }}</span>
      <button type="button" :disabled="locationBusy" @click="refreshLocation">定位</button>
      <button type="button" :disabled="locationBusy" @click="loadRecentTrack">最近一小时轨迹</button>
      <button type="button" @click="toggleMinimized">{{ minimized ? '展开' : '最小化' }}</button>
      <button type="button" @click="toggleFullscreen">全屏</button>
    </div>
    <iframe ref="frame" v-show="!minimized" :src="frameUrl" title="SpringGISNet SDK dist交互验证" scrolling="no" @load="syncRunning"></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount, onMounted } from 'vue';
import { getApproximateIpLocation, getMyCurrentLocation, getMyTrackHistory, getSharedCurrentLocations, type LocationPoint } from '../services/api';

const wrap = ref<HTMLElement | null>(null);
const frame = ref<HTMLIFrameElement | null>(null);
const language = ref<'ts' | 'js'>('ts');
const minimized = ref(false);
const locationBusy = ref(false);
const locationLabel = ref('位置未加载');
let locationTimer: number | undefined;
const pageUrl = computed(() => `${import.meta.env.BASE_URL}sdk${language.value === 'js' ? '-js' : ''}.html`);
const frameUrl = computed(() => pageUrl.value + '?embedded=1');
function send(type: string, payload: Record<string, unknown> = {}) { frame.value?.contentWindow?.postMessage({ type, ...payload }, location.origin); }
function syncRunning() { if (minimized.value) send('springgis:stop'); else void refreshLocation(); }
async function refreshLocation() {
  if (locationBusy.value) return;
  locationBusy.value = true;
  try {
    let point: LocationPoint;
    try { point = await getMyCurrentLocation(); locationLabel.value = `终端位置 · ${new Date(point.recorded_at).toLocaleTimeString('zh-CN',{hour12:false})}`; }
    catch {
      const approximate = await getApproximateIpLocation();
      point = { ...approximate, altitude: null, accuracy: null, speed: null, heading: null, recorded_at: new Date().toISOString() };
      locationLabel.value = `IP 近似位置${approximate.label ? ` · ${approximate.label}` : ''}`;
    }
    send('springgis:location', { point });
    try {
      const shared = await getSharedCurrentLocations();
      send('springgis:shared-locations', { locations: shared.filter(item => item.location).map(item => ({ shareId: item.share_id, ...item.location })) });
    } catch { /* 未登录或无人共享时不影响本人/IP 定位 */ }
  } catch { locationLabel.value = '暂无位置（可配置高德 IP 定位）'; }
  finally { locationBusy.value = false; }
}
async function loadRecentTrack() {
  locationBusy.value = true;
  try {
    const end = new Date(), start = new Date(end.getTime() - 60 * 60 * 1000);
    const history = await getMyTrackHistory(start, end);
    const points = history.segments.flatMap(segment => segment.points);
    if (!points.length) throw new Error('最近一小时没有轨迹');
    send('springgis:track', { points });
    locationLabel.value = `回放轨迹 · ${points.length} 点`;
  } catch (reason) { locationLabel.value = reason instanceof Error ? reason.message : '轨迹读取失败'; }
  finally { locationBusy.value = false; }
}
function toggleMinimized() {
  minimized.value = !minimized.value;
  send(minimized.value ? 'springgis:stop' : 'springgis:start');
}
async function toggleFullscreen() {
  if (document.fullscreenElement === wrap.value) await document.exitFullscreen();
  else await wrap.value?.requestFullscreen();
}
onMounted(() => { void refreshLocation(); locationTimer = window.setInterval(() => void refreshLocation(), 10000); });
onBeforeUnmount(() => { if (locationTimer !== undefined) window.clearInterval(locationTimer); send('springgis:destroy'); });
</script>

<style scoped>
.sdk-frame{display:grid;grid-template-rows:auto minmax(0,1fr);height:clamp(620px,78dvh,900px);border-radius:18px;overflow:hidden;background:#09151e;border:1px solid #2e535d}
.sdk-toolbar{padding:12px 16px;display:flex;align-items:center;flex-wrap:wrap;gap:10px;background:#102b35;color:#dff7ff;font-size:13px}
.sdk-toolbar a{color:#82d8ed;margin-right:auto}
.sdk-toolbar button,.sdk-toolbar select{background:#163c48;color:#dff7ff;border:1px solid #416370;border-radius:6px;padding:6px 10px;cursor:pointer}
.sdk-toolbar button:disabled{opacity:.5;cursor:wait}.location-state{max-width:220px;overflow:hidden;color:#9fe1ce;text-overflow:ellipsis;white-space:nowrap}
iframe{display:block;width:100%;height:100%;min-height:0;border:0;background:#09151e;overflow:hidden}
.sdk-frame.minimized{height:auto}
.sdk-frame:fullscreen{width:100vw;height:100vh;border-radius:0}
.sdk-frame:fullscreen iframe{height:100%}
@media(max-width:640px){.sdk-frame{height:72dvh;min-height:520px}.sdk-toolbar a{margin-right:0}}
</style>
