<template>
  <view :class="['engine-shell', `engine-shell--${viewMode}`]">
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
    <view v-if="viewMode === 'minimized'" class="engine-minimized-label" @click="setViewMode('normal')">
      <text>三维地图已收起 · 点击恢复</text>
    </view>
    <view class="engine-status">
      <text class="engine-title">SpringAndAutumnGIS · WGS84</text>
      <text>{{ point ? '已同步当前终端位置' : '全球视角 · 开启轨迹后显示当前位置' }}</text>
      <text class="engine-runtime-status">引擎运行状态：等待 RenderJS</text>
    </view>
    <view class="engine-gesture">
      <text>单指旋转 · 双指平移/俯仰 · 双指捏合缩放 · 轻触用于测量与绘制</text>
    </view>
    <view class="map-controls">
      <template v-if="viewMode !== 'minimized'">
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
        <view class="map-control map-control--text" @click="sendControl('locate')">定位</view>
        <view class="map-control map-control--text" @click="setViewMode(viewMode === 'fullscreen' ? 'normal' : 'fullscreen')">{{ viewMode === 'fullscreen' ? '恢复' : '全屏' }}</view>
        <view class="map-control map-control--text" @click="setViewMode('minimized')">收起</view>
      </template>
      <view v-else class="map-control map-control--text" @click="setViewMode('normal')">展开</view>
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
}>();
const viewMode = ref<'normal' | 'fullscreen' | 'minimized'>('normal');
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
  recordedAt: props.point.recorded_at,
}) : '');
const trackPayload = computed(() => JSON.stringify(props.trackPoints ?? []));
const playbackPayload = computed(() => props.playbackPoint ? JSON.stringify({
  longitude: props.playbackPoint.longitude,
  latitude: props.playbackPoint.latitude,
  altitude: props.playbackPoint.altitude,
  accuracy: props.playbackPoint.accuracy,
  recordedAt: props.playbackPoint.recorded_at,
}) : '');

function sendControl(action: string, value?: number) {
  controlSequence.value += 1;
  controlPayload.value = JSON.stringify({ action, value, sequence: controlSequence.value });
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

function setViewMode(mode: 'normal' | 'fullscreen' | 'minimized') {
  viewMode.value = mode;
  void nextTick(() => {
    pitchTrackRect = null;
    measurePitchTrack();
    sendControl('resize');
  });
}

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
.engine-shell--fullscreen { position: fixed; z-index: 1000; inset: 0; width: 100vw; height: 100vh; min-height: 100vh; border: 0; border-radius: 0; }
.engine-shell--minimized { height: 112rpx; min-height: 112rpx; border-radius: 20rpx; }
.engine-shell--minimized .engine-canvas,.engine-shell--minimized .engine-status,.engine-shell--minimized .engine-gesture { visibility: hidden; pointer-events: none; }
.engine-shell--minimized :deep(.sag-tools),.engine-shell--minimized :deep(.sag-tool-panel) { display: none !important; }
.engine-canvas { position: absolute; z-index: 1; inset: 0; display: block; width: 100%; height: 100%; min-width: 1px; min-height: 1px; overflow: hidden; touch-action: none; }
.engine-minimized-label { position: absolute; z-index: 30; inset: 0 120rpx 0 0; display: flex; align-items: center; padding-left: 24rpx; color: #bde8ee; font-size: 23rpx; }
.engine-status,.engine-gesture {
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
.engine-gesture { bottom: 20rpx; left: 112rpx; font-size: 20rpx; line-height: 1.45; }
.map-controls { position: absolute; z-index: 90; top: 20rpx; right: 18rpx; display: flex; flex-direction: column; gap: 8rpx; }
.map-control { display: flex; align-items: center; justify-content: center; width: 68rpx; height: 64rpx; border: 1rpx solid rgba(126,214,223,.55); border-radius: 14rpx; background: rgba(7,29,41,.9); color: #e6fbff; font-size: 38rpx; font-weight: 700; box-shadow: 0 6rpx 16rpx rgba(0,0,0,.2); }
.map-control--text { font-size: 20rpx; font-weight: 600; }
.pitch-control { position: relative; width: 68rpx; height: 300rpx; border: 1rpx solid rgba(126,214,223,.55); border-radius: 16rpx; background: rgba(7,29,41,.9); box-shadow: 0 6rpx 16rpx rgba(0,0,0,.2); }
.pitch-track { position: absolute; z-index: 3; top: 44rpx; bottom: 42rpx; left: 16rpx; right: 16rpx; border-radius: 20rpx; background: #335d69; touch-action: none; }
.pitch-track-fill { position: absolute; right: 0; bottom: 0; left: 0; border-radius: 20rpx; background: #7ce0d1; pointer-events: none; }
.pitch-thumb { position: absolute; z-index: 2; left: 50%; width: 34rpx; height: 34rpx; border: 4rpx solid #7ce0d1; border-radius: 50%; background: #fff; box-shadow: 0 3rpx 10rpx rgba(0,0,0,.35); transform: translateX(-50%); pointer-events: none; }
.pitch-value { position: absolute; z-index: 2; top: 9rpx; left: 0; right: 0; color: #e6fbff; text-align: center; font-size: 18rpx; font-weight: 700; }
.pitch-caption { position: absolute; z-index: 2; bottom: 8rpx; left: 0; right: 0; color: #9bcbd4; text-align: center; font-size: 17rpx; }
.engine-shell--fullscreen .map-controls { top: calc(env(safe-area-inset-top) + 20rpx); }
.engine-shell--fullscreen .engine-status { top: calc(env(safe-area-inset-top) + 24rpx); }
:deep(.engine-canvas canvas) { position: absolute; inset: 0; display: block; width: 100% !important; height: 100% !important; }
:deep(.sag-tools) { z-index: 60 !important; left: 10px !important; max-height: calc(100% - 150px) !important; scrollbar-width: none; }
:deep(.sag-tools::-webkit-scrollbar) { display: none; }
:deep(.sag-tool-panel) { z-index: 120 !important; width: auto !important; max-height: min(72%, calc(100% - 40px)) !important; overscroll-behavior: contain; }
:deep(.sag-tool-panel--compact) { bottom: auto !important; }
:deep(.sag-tool-panel header) { position: sticky; z-index: 2; top: -14px; display: flex; justify-content: flex-start !important; gap: 12px; padding: 10px 0 8px; background: #071d29; }
:deep(.sag-tool-panel header strong) { margin-right: auto; }
:deep(.sag-tool-panel header button) { min-width: 44px; margin: 0 !important; }
:deep(.sag-tool-panel header .springgis-panel-minimize) { margin-left: auto !important; margin-right: 4px !important; color: #7ce0d1 !important; }
:deep(.sag-tool-panel select), :deep(.sag-tool-panel input), :deep(.sag-tool-panel button) { min-height: 36px; color: #dcf7ff !important; -webkit-text-fill-color: #dcf7ff; }
:deep(.engine-failure) { position: absolute; inset: 30% 24rpx auto; z-index: 80; padding: 24rpx; border-radius: 18rpx; background: rgba(111, 30, 30, .92); color: #fff; font: 14px/1.6 sans-serif; }
</style>
