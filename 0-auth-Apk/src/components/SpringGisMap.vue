<template>
  <view :class="['engine-shell', `engine-shell--${viewMode}`, { 'engine-shell--immersive': immersive }]">
    <!-- @vue-ignore uni-app renderjs module method -->
    <view
      id="springgis-engine-canvas"
      class="engine-canvas"
      :location-payload="locationPayload"
      :change:location-payload="springgis.updateLocation"
      :track-payload="trackPayload"
      :change:track-payload="springgis.updateTrack"
      :playback-payload="playbackPayload"
      :change:playback-payload="springgis.updatePlayback"
      :control-payload="controlPayload"
      :change:control-payload="springgis.handleControl"
    />
    <view class="engine-status">
      <text class="engine-title">SpringAndAutumnGIS · WGS84</text>
      <text>{{ point ? '已同步当前终端位置' : '全球视角 · 开启轨迹后显示当前位置' }}</text>
      <text class="engine-runtime-status">引擎运行状态：等待 RenderJS</text>
    </view>
    <view class="map-controls">
      <view class="pitch-control">
        <text class="pitch-value">{{ pitchValue }}°</text>
        <view
          class="pitch-track"
          @touchstart.stop.prevent="changePitchFromTouch"
          @touchmove.stop.prevent="changePitchFromTouch"
          @touchend.stop.prevent="changePitchFromTouch"
        >
          <view class="pitch-track-fill" :style="{ height: `${pitchPercent}%` }" />
          <view class="pitch-thumb" :style="{ bottom: `calc(${pitchPercent}% - 10rpx)` }" />
        </view>
        <text class="pitch-caption">俯仰</text>
      </view>
      <view class="map-control map-control--text" @click="locateOnce">定位</view>
      <view
        :class="['map-control', 'map-control--text', { 'map-control--active': followLocation }]"
        @click="toggleLocationFollow"
      >{{ followLocation ? '追踪中' : '追踪' }}</view>
      <view class="map-control map-control--text" @click="setViewMode(viewMode === 'fullscreen' ? 'normal' : 'fullscreen')">{{ viewMode === 'fullscreen' ? '恢复' : '全屏' }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import type { LocationPoint } from '../services/api';

const props = defineProps<{
  point: LocationPoint | null;
  trackPoints?: LocationPoint[];
  playbackPoint?: LocationPoint | null;
  playbackIndex?: number;
  immersive?: boolean;
}>();
const emit = defineEmits<{ (event: 'follow-mode-change', mode: 'none' | 'live' | 'playback'): void }>();
const viewMode = ref<'normal' | 'fullscreen'>('normal');
const followMode = ref<'none' | 'live' | 'playback'>('none');
const followLocation = computed(() => followMode.value === 'live');
const pitchValue = ref(58);
const pitchPercent = computed(() => pitchValue.value / 90 * 100);
const controlSequence = ref(0);
const controlPayload = ref('');
let pitchTrackRect: { top: number; height: number } | null = null;
const locationPayload = computed(() => props.point ? JSON.stringify({
  longitude: props.point.longitude,
  latitude: props.point.latitude,
  altitude: props.point.altitude,
  accuracy: props.point.accuracy,
  heading: props.point.heading,
  recordedAt: props.point.recorded_at,
}) : '');
const trackPayload = computed(() => JSON.stringify(props.trackPoints ?? []));
const playbackPayload = computed(() => props.playbackPoint ? JSON.stringify({
  longitude: props.playbackPoint.longitude,
  latitude: props.playbackPoint.latitude,
  altitude: props.playbackPoint.altitude,
  accuracy: props.playbackPoint.accuracy,
  speed: props.playbackPoint.speed,
  heading: props.playbackPoint.heading,
  playbackIndex: props.playbackIndex ?? 0,
  recordedAt: props.playbackPoint.recorded_at,
}) : '');

function sendControl(action: string, value?: number | string) {
  controlSequence.value += 1;
  controlPayload.value = JSON.stringify({ action, value, sequence: controlSequence.value });
}

function toggleLocationFollow() {
  if (!props.point) {
    uni.showToast({ title: '请先开启轨迹定位', icon: 'none' });
    return;
  }
  setFollowMode(followMode.value === 'live' ? 'none' : 'live');
}

function locateOnce() {
  if (!props.point) {
    uni.showToast({ title: '请先开启轨迹定位', icon: 'none' });
    return;
  }
  sendControl('locate');
}

function setFollowMode(mode: 'none' | 'live' | 'playback') {
  followMode.value = mode;
  sendControl('follow-mode', mode);
  emit('follow-mode-change', mode);
}

function setPlaybackFollow(enabled: boolean) {
  if (enabled) setFollowMode('playback');
  else if (followMode.value === 'playback') setFollowMode('none');
}

function measurePitchTrack(callback?: () => void) {
  uni.createSelectorQuery()
    .select('.pitch-track')
    .boundingClientRect((rect) => {
      const top = rect && !Array.isArray(rect) ? Number(rect.top) : Number.NaN;
      const height = rect && !Array.isArray(rect) ? Number(rect.height) : Number.NaN;
      if (Number.isFinite(top) && Number.isFinite(height) && height > 0) {
        pitchTrackRect = { top, height };
        callback?.();
      }
    })
    .exec();
}

function changePitchFromTouch(event: TouchEvent) {
  const touch = event.touches?.[0] ?? event.changedTouches?.[0];
  const clientY = Number(touch?.clientY ?? touch?.pageY);
  if (!Number.isFinite(clientY)) return;
  const apply = () => {
    if (!pitchTrackRect) return;
    const ratio = 1 - Math.max(0, Math.min(1, (clientY - pitchTrackRect.top) / pitchTrackRect.height));
    const value = Math.round(ratio * 90);
    if (value === pitchValue.value) return;
    pitchValue.value = value;
    sendControl('pitch', value);
  };
  if (pitchTrackRect) apply();
  else measurePitchTrack(apply);
}

function setViewMode(mode: 'normal' | 'fullscreen') {
  viewMode.value = mode;
  void nextTick(() => {
    pitchTrackRect = null;
    measurePitchTrack();
    sendControl('resize');
  });
}

function syncPitchFromEngine(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return;
  pitchValue.value = Math.round(Math.max(0, Math.min(90, parsed)));
}

function recyclePlaybackEntities() {
  sendControl('clear-playback');
}

defineExpose({ syncPitchFromEngine, recyclePlaybackEntities, setPlaybackFollow });

onMounted(() => void nextTick(() => measurePitchTrack()));
</script>

<script module="springgis" lang="renderjs" src="../renderjs/springGisMap.js"></script>

<style scoped>
.engine-shell {
  position: relative;
  width: 100%;
  height: min(980rpx, 72vh);
  min-height: 920rpx;
  overflow: hidden;
  border: 1rpx solid rgba(51, 100, 119, .85);
  border-radius: 28rpx;
  background: #071923;
  box-shadow: 0 20rpx 48rpx rgba(7, 29, 41, .24);
}
.engine-shell--immersive { width: 100%; height: 100%; min-height: 0; border: 0; border-radius: 0; box-shadow: none; }
.engine-shell--immersive .engine-status { display: none; }
.engine-shell--immersive .map-controls { top: calc(env(safe-area-inset-top) + 18rpx); }
.engine-shell--fullscreen { position: fixed; z-index: 1000; inset: 0; width: 100vw; height: 100vh; height: 100dvh; min-height: 100vh; min-height: 100dvh; border: 0; border-radius: 0; }
.engine-canvas { position: absolute; z-index: 1; inset: 0; display: block; width: 100%; height: 100%; min-width: 1px; min-height: 1px; overflow: hidden; touch-action: none; }
.engine-status {
  position: absolute;
  z-index: 20;
  left: 24rpx;
  right: 24rpx;
  padding: 16rpx 20rpx;
  border: 1rpx solid rgba(82, 143, 162, .55);
  border-radius: 18rpx;
  background: rgba(7, 29, 41, .86);
  color: #c9e9f2;
  pointer-events: none;
}
.engine-status { top: 24rpx; right: 124rpx; }
.engine-status text { display: block; font-size: 22rpx; }
.engine-title { margin-bottom: 4rpx; color: #7ce0d1; font-size: 25rpx !important; font-weight: 700; }
.engine-runtime-status { margin-top: 6rpx; color: #ffd28a; font-size: 19rpx !important; }
.map-controls { position: absolute; z-index: 90; top: 20rpx; right: 18rpx; display: flex; flex-direction: column; gap: 8rpx; }
.map-control { display: flex; align-items: center; justify-content: center; width: 68rpx; height: 64rpx; border: 1rpx solid rgba(126,214,223,.55); border-radius: 14rpx; background: rgba(7,29,41,.9); color: #e6fbff; font-size: 38rpx; font-weight: 700; box-shadow: 0 6rpx 16rpx rgba(0,0,0,.2); }
.map-control--text { font-size: 20rpx; font-weight: 600; }
.map-control--active { border-color: #25d9ff; background: rgba(14,124,147,.96); color: #7eeeff; box-shadow: 0 0 0 4rpx rgba(37,217,255,.18), 0 6rpx 16rpx rgba(0,0,0,.2); }
.pitch-control { position: relative; width: 68rpx; height: 300rpx; border: 1rpx solid rgba(126,214,223,.55); border-radius: 16rpx; background: rgba(7,29,41,.9); box-shadow: 0 6rpx 16rpx rgba(0,0,0,.2); }
.pitch-track { position: absolute; z-index: 3; top: 44rpx; bottom: 42rpx; left: 16rpx; right: 16rpx; border-radius: 20rpx; background: #335d69; touch-action: none; }
.pitch-track-fill { position: absolute; right: 0; bottom: 0; left: 0; border-radius: 20rpx; background: #7ce0d1; pointer-events: none; }
.pitch-thumb { position: absolute; z-index: 2; left: 50%; width: 34rpx; height: 34rpx; border: 4rpx solid #7ce0d1; border-radius: 50%; background: #fff; box-shadow: 0 3rpx 10rpx rgba(0,0,0,.35); transform: translateX(-50%); pointer-events: none; }
.pitch-value { position: absolute; z-index: 2; top: 9rpx; left: 0; right: 0; color: #e6fbff; text-align: center; font-size: 18rpx; font-weight: 700; }
.pitch-caption { position: absolute; z-index: 2; bottom: 8rpx; left: 0; right: 0; color: #9bcbd4; text-align: center; font-size: 17rpx; }
.engine-shell--fullscreen .map-controls { top: calc(env(safe-area-inset-top) + 20rpx); }
.engine-shell--fullscreen .engine-status { top: calc(env(safe-area-inset-top) + 24rpx); }
:deep(.sag-tools) { z-index: 170 !important; left: 10px !important; max-height: calc(100% - 150px) !important; scrollbar-width: none; }
:deep(.sag-tools::-webkit-scrollbar) { display: none; }
:deep(.sag-tool-panel) { z-index: 260 !important; width: auto !important; max-height: min(72%, calc(100% - 40px)) !important; overscroll-behavior: contain; }
:deep(.sag-tool-panel--compact) { bottom: auto !important; }
:deep(.sag-tool-panel header) { position: sticky; z-index: 2; top: -14px; display: flex; justify-content: flex-start !important; gap: 12px; padding: 10px 0 8px; background: #071d29; }
:deep(.sag-tool-panel header strong) { margin-right: auto; }
:deep(.sag-tool-panel header button) { min-width: 44px; margin: 0 !important; }
:deep(.sag-tool-panel header .springgis-panel-minimize) { margin-left: auto !important; margin-right: 4px !important; color: #7ce0d1 !important; }
:deep(.sag-tool-panel select), :deep(.sag-tool-panel input), :deep(.sag-tool-panel button) { min-height: 36px; color: #dcf7ff !important; -webkit-text-fill-color: #dcf7ff; }
:deep(.engine-failure) { position: absolute; inset: 30% 24rpx auto; z-index: 80; padding: 24rpx; border-radius: 18rpx; background: rgba(111, 30, 30, .92); color: #fff; font: 14px/1.6 sans-serif; }

@media screen and (orientation: landscape) {
  .engine-shell--immersive .map-controls { top: max(env(safe-area-inset-top), 6px); right: max(env(safe-area-inset-right), 8px); gap: 4px; }
  .pitch-control { width: 44px; height: clamp(96px, 38vh, 156px); border-radius: 10px; }
  .pitch-track { top: 28px; bottom: 25px; left: 11px; right: 11px; }
  .pitch-thumb { width: 20px; height: 20px; border-width: 2px; }
  .pitch-value { top: 5px; font-size: 11px; }
  .pitch-caption { bottom: 4px; font-size: 10px; }
  .map-control { width: 44px; height: 32px; border-radius: 9px; font-size: 20px; }
  .map-control--text { font-size: 11px; }
  :deep(.sag-tools) { left: max(env(safe-area-inset-left), 6px) !important; max-height: calc(100% - 16px) !important; }
  :deep(.sag-tool-panel) { max-height: calc(100% - 16px) !important; font-size: 12px !important; }
  :deep(.sag-tool-panel header button) { min-width: 36px; min-height: 32px; }
  :deep(.sag-tool-panel select), :deep(.sag-tool-panel input), :deep(.sag-tool-panel button) { min-height: 30px; font-size: 12px !important; }
}
</style>
