<template>
  <view class="engine-shell">
    <!-- @vue-ignore uni-app renderjs module method -->
    <view
      class="engine-canvas"
      :location-payload="locationPayload"
      :change:location-payload="springgis.updateLocation"
    />
    <view class="engine-status">
      <text class="engine-title">SpringAndAutumnGIS · WGS84</text>
      <text>{{ point ? '已同步当前终端位置' : '全球视角 · 开启轨迹后显示当前位置' }}</text>
    </view>
    <view class="engine-gesture">
      <text>单指旋转 · 双指平移/俯仰 · 双指捏合缩放 · 轻触用于测量与绘制</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LocationPoint } from '../services/api';

const props = defineProps<{ point: LocationPoint | null }>();
const locationPayload = computed(() => props.point ? JSON.stringify({
  longitude: props.point.longitude,
  latitude: props.point.latitude,
  altitude: props.point.altitude,
  accuracy: props.point.accuracy,
  recordedAt: props.point.recorded_at,
}) : '');
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
.engine-canvas { position: absolute; z-index: 1; inset: 0; display: block; width: 100%; height: 100%; min-width: 1px; min-height: 1px; overflow: hidden; touch-action: none; }
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
.engine-status { top: 24rpx; }
.engine-status text { display: block; font-size: 22rpx; }
.engine-title { margin-bottom: 4rpx; color: #7ce0d1; font-size: 25rpx !important; font-weight: 700; }
.engine-gesture { bottom: 20rpx; left: 112rpx; font-size: 20rpx; line-height: 1.45; }
:deep(.engine-canvas canvas) { position: absolute; inset: 0; display: block; width: 100% !important; height: 100% !important; }
:deep(.sag-tools) { z-index: 60 !important; left: 10px !important; max-height: calc(100% - 150px) !important; scrollbar-width: none; }
:deep(.sag-tools::-webkit-scrollbar) { display: none; }
:deep(.sag-tool-panel) { z-index: 70 !important; top: 112px !important; max-height: calc(100% - 190px) !important; overscroll-behavior: contain; }
:deep(.sag-tool-panel--compact) { top: auto !important; }
:deep(.sag-tool-panel select), :deep(.sag-tool-panel input), :deep(.sag-tool-panel button) { min-height: 36px; color: #dcf7ff !important; -webkit-text-fill-color: #dcf7ff; }
:deep(.engine-failure) { position: absolute; inset: 30% 24rpx auto; z-index: 80; padding: 24rpx; border-radius: 18rpx; background: rgba(111, 30, 30, .92); color: #fff; font: 14px/1.6 sans-serif; }
</style>
