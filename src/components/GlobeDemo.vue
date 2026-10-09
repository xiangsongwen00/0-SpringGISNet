<template>
  <div ref="wrap" class="sdk-frame" :class="{ minimized }">
    <div class="sdk-toolbar">
      <strong>已安装 SDK · dist 依赖</strong>
      <select v-model="language" aria-label="SDK消费语言"><option value="ts">TypeScript</option><option value="js">JavaScript ES6</option></select>
      <a :href="pageUrl" target="_blank" rel="noopener">独立打开交互页 ↗</a>
      <button type="button" @click="toggleMinimized">{{ minimized ? '展开' : '最小化' }}</button>
      <button type="button" @click="toggleFullscreen">全屏</button>
    </div>
    <iframe ref="frame" v-show="!minimized" :src="frameUrl" title="SpringGISNet SDK dist交互验证" scrolling="no" @load="syncRunning"></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue';

const wrap = ref<HTMLElement | null>(null);
const frame = ref<HTMLIFrameElement | null>(null);
const language = ref<'ts' | 'js'>('ts');
const minimized = ref(false);
const pageUrl = computed(() => `${import.meta.env.BASE_URL}sdk${language.value === 'js' ? '-js' : ''}.html`);
const frameUrl = computed(() => pageUrl.value + '?embedded=1');
function send(type: string) { frame.value?.contentWindow?.postMessage({ type }, location.origin); }
function syncRunning() { if (minimized.value) send('springgis:stop'); }
function toggleMinimized() {
  minimized.value = !minimized.value;
  send(minimized.value ? 'springgis:stop' : 'springgis:start');
}
async function toggleFullscreen() {
  if (document.fullscreenElement === wrap.value) await document.exitFullscreen();
  else await wrap.value?.requestFullscreen();
}
onBeforeUnmount(() => send('springgis:destroy'));
</script>

<style scoped>
.sdk-frame{display:grid;grid-template-rows:auto minmax(0,1fr);height:clamp(620px,78dvh,900px);border-radius:18px;overflow:hidden;background:#09151e;border:1px solid #2e535d}
.sdk-toolbar{padding:12px 16px;display:flex;align-items:center;flex-wrap:wrap;gap:10px;background:#102b35;color:#dff7ff;font-size:13px}
.sdk-toolbar a{color:#82d8ed;margin-right:auto}
.sdk-toolbar button,.sdk-toolbar select{background:#163c48;color:#dff7ff;border:1px solid #416370;border-radius:6px;padding:6px 10px;cursor:pointer}
iframe{display:block;width:100%;height:100%;min-height:0;border:0;background:#09151e;overflow:hidden}
.sdk-frame.minimized{height:auto}
.sdk-frame:fullscreen{width:100vw;height:100vh;border-radius:0}
.sdk-frame:fullscreen iframe{height:100%}
@media(max-width:640px){.sdk-frame{height:72dvh;min-height:520px}.sdk-toolbar a{margin-right:0}}
</style>
