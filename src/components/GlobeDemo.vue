<template>
  <div ref="globeWrap" class="globe-demo-wrap" :class="{ 'is-minimized': isMinimized }">
    <div ref="globeHost" class="globe-host" aria-label="SpringAndAutumnGIS 三维地球演示"></div>
    <div class="demo-hud">
      <div class="hud-pill">实时渲染</div>
      <div class="hud-data">
        <span>WGS84</span>
        <strong>LOD 2–27</strong>
      </div>
      <div class="demo-controls" aria-label="地图显示设置">
        <label>
          <span>底图</span>
          <select v-model="selectedBaseId" @change="changeBaseLayer">
            <option v-if="tiandituToken" value="tianditu-vector">天地图矢量</option>
            <option v-if="tiandituToken" value="tianditu-imagery">天地图影像</option>
            <option value="osm-standard">OpenStreetMap</option>
            <option value="google-satellite">Google 卫星</option>
          </select>
        </label>
        <label class="terrain-toggle">
          <input v-model="terrainOn" type="checkbox" :disabled="!terrainAvailable" @change="toggleTerrain" />
          <span>地形</span>
        </label>
        <button
          class="demo-icon-button"
          type="button"
          :aria-label="isMinimized ? '展开引擎' : '最小化引擎'"
          :title="isMinimized ? '展开引擎' : '最小化引擎'"
          @click="toggleMinimized"
        >{{ isMinimized ? '＋' : '−' }}</button>
        <button
          class="demo-icon-button"
          type="button"
          :aria-label="isFullscreen ? '退出全屏' : '进入全屏'"
          :title="isFullscreen ? '退出全屏' : '进入全屏'"
          @click="toggleFullscreen"
        >{{ isFullscreen ? '⛶' : '□' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import {
  DataSourceRegistry,
  GlobeEngine,
  LayerCollection,
  TerrainRgbProvider,
  DEFAULT_LEVEL_OFFSET
} from 'spring-autumn-gis';
import layerCatalogJson from 'spring-autumn-gis/env.config.json';
import tokenConfig from '../../token.json';

const globeHost = ref<HTMLElement | null>(null);
const globeWrap = ref<HTMLElement | null>(null);
const isFullscreen = ref(false);
const isMinimized = ref(false);
let engine: GlobeEngine | null = null;
const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;
const tiandituToken = import.meta.env.VITE_TIANDITU_TOKEN || tokenConfig.tianditu?.token;
const terrainAvailable = Boolean(mapTilerKey);
const terrainOn = ref(import.meta.env.VITE_ENABLE_TERRAIN !== 'false' && terrainAvailable);
const selectedBaseId = ref(tiandituToken ? 'tianditu-vector' : 'osm-standard');
let sourceRegistry: DataSourceRegistry | null = null;
let layerCatalog: any;

const changeBaseLayer = () => {
  if (!engine || !sourceRegistry) return;
  const layer = layerCatalog.layers.find((item: any) => item.id === selectedBaseId.value);
  if (!layer) return;
  try {
    engine.setImageryProvider(sourceRegistry.createRasterProvider(layer.sourceId, {
      levelOffset: layer.levelOffset
    }));
  } catch {
    selectedBaseId.value = 'osm-standard';
  }
};

const toggleTerrain = () => {
  engine?.setTerrainEnabled(terrainOn.value);
};

const toggleMinimized = () => {
  isMinimized.value = !isMinimized.value;
};

const syncFullscreenState = () => {
  isFullscreen.value = document.fullscreenElement === globeWrap.value;
};

const toggleFullscreen = async () => {
  if (!globeWrap.value) return;
  if (document.fullscreenElement === globeWrap.value) {
    await document.exitFullscreen();
  } else if (globeWrap.value.requestFullscreen) {
    await globeWrap.value.requestFullscreen();
  }
};

onMounted(async () => {
  if (!globeHost.value) return;
  document.addEventListener('fullscreenchange', syncFullscreenState);

  layerCatalog = layerCatalogJson as any;
  sourceRegistry = new DataSourceRegistry(layerCatalog.sources, {
    defaultLevelOffset: layerCatalog.defaults.levelOffset ?? DEFAULT_LEVEL_OFFSET,
    variables: {
      TIANDITU_TOKEN: tiandituToken,
      MAPTILER_KEY: undefined,
      OSM_VECTOR_VERSION: undefined
    }
  });
  const layers = new LayerCollection(layerCatalog.layers.map((layer: any) => ({
    ...layer,
    levelOffset: layer.levelOffset ?? (layerCatalog.defaults.levelOffset ?? DEFAULT_LEVEL_OFFSET)
  })));

  const baseLayers = layers.values().filter((layer: any) => layer.role === 'base');
  const preferredBaseId = tiandituToken ? 'tianditu-vector' : 'osm-standard';
  const selectedBase = baseLayers.find((layer: any) => layer.id === preferredBaseId)
    ?? baseLayers.find((layer: any) => layer.id === layerCatalog.defaultBaseLayerId)
    ?? baseLayers.find((layer: any) => layer.id === 'osm-standard')
    ?? baseLayers[0];
  if (!selectedBase) return;
  const baseProvider = sourceRegistry.createRasterProvider(selectedBase.sourceId, {
    levelOffset: selectedBase.levelOffset
  });

  const terrain = terrainOn.value
    ? new TerrainRgbProvider({
        id: 'terrain-rgb-demo',
        tileJsonUrl: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${mapTilerKey}`,
        scheme: 'xyz',
        encoding: 'mapbox',
        maxLevel: 14,
        attribution: 'MapTiler / GeoVIS'
      })
    : undefined;

  engine = new GlobeEngine({
    container: globeHost.value,
    imagery: baseProvider,
    terrain,
    initialView: { longitude: 105, latitude: 32, altitude: 8_600_000 },
    navigation: {
      rotateSpeed: 0.38,
      minRotateSpeed: 0.000001,
      zoomSpeed: 0.42,
      minZoomSpeed: 0.00000001,
      zoomAltitudeGain: 5,
      lookSpeed: 1,
      tiltSpeed: 1,
      dampingFactor: 0.1,
      minAltitude: 0.25
    },
    lod: {
      minLevel: 2,
      maxLevel: 27,
      targetPixels: 128,
      collapseFactor: 0.7,
      maxTiles: 480,
      minimumHorizonDetailFactor: 0.08,
      horizonDetailExponent: 0.5,
      maximumSurfaceDisplacement: 12_000
    },
    terrainLayer: {
      segments: 64,
      maxConcurrentRequests: 4,
      maxCachedTiles: 256,
      maxResourceBytes: 96 * 1024 * 1024,
      showDebugSurface: false,
      exaggeration: 1
    },
    raster: {
      segments: 16,
      maxConcurrentRequests: 10,
      maxCachedTiles: 2_048,
      maxTextureBytes: 192 * 1024 * 1024,
      surfaceOffset: 0.1
    }
  });

  engine.start();
});

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', syncFullscreenState);
  engine?.dispose();
});
</script>

<style scoped>
.globe-demo-wrap {
  position: relative;
  width: 100%;
  min-height: 620px;
  background: radial-gradient(circle at 30% 20%, rgba(91,192,235,0.28), rgba(11,43,51,0.96));
  border-radius: 24px;
  overflow: hidden;
}
.globe-demo-wrap:fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  border-radius: 0;
}
.globe-demo-wrap:fullscreen .globe-host,
.globe-demo-wrap:fullscreen .globe-host :deep(canvas) {
  min-height: 100vh;
  height: 100vh;
}
.globe-demo-wrap.is-minimized {
  min-height: 74px;
}
.globe-demo-wrap.is-minimized .globe-host {
  display: none;
}
.globe-demo-wrap.is-minimized .demo-hud {
  position: relative;
  top: auto;
  left: auto;
  padding: 18px;
  max-width: none;
}
.globe-host {
  width: 100%;
  min-height: 620px;
}
.globe-host :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
}
.demo-hud {
  position: absolute;
  top: 18px;
  left: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10;
  flex-wrap: wrap;
  max-width: calc(100% - 36px);
}
.demo-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.45rem 0.65rem;
  border: 1px solid rgba(100,216,255,0.3);
  border-radius: 12px;
  background: rgba(11,43,51,0.68);
  color: #dff7ff;
  font-size: 0.78rem;
}
.demo-controls label {
  display: flex;
  align-items: center;
  gap: 5px;
}
.demo-controls select {
  max-width: 132px;
  padding: 0.25rem 0.35rem;
  border: 1px solid rgba(191,234,247,0.35);
  border-radius: 6px;
  background: #123943;
  color: #dff7ff;
}
.terrain-toggle input { accent-color: #5bc0eb; }
.demo-icon-button {
  display: inline-grid;
  width: 26px;
  height: 26px;
  padding: 0;
  place-items: center;
  border: 1px solid rgba(191,234,247,0.35);
  border-radius: 6px;
  background: transparent;
  color: #dff7ff;
  cursor: pointer;
  line-height: 1;
}
.demo-icon-button:hover { background: rgba(91,192,235,0.2); }
.hud-pill {
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(11,43,51,0.6);
  border: 1px solid rgba(100,216,255,0.35);
  color: #dff7ff;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hud-data {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  background: rgba(11,43,51,0.5);
  border: 1px solid rgba(100,216,255,0.3);
  color: #bfeaf7;
}
.hud-data span { font-size: 0.68rem; opacity: 0.78; }
.hud-data strong { font-size: 0.82rem; }
@media (max-width: 640px) {
  .globe-demo-wrap, .globe-host { min-height: 420px; }
  .demo-hud { top: 10px; left: 10px; gap: 7px; max-width: calc(100% - 20px); }
  .demo-controls { width: 100%; justify-content: space-between; }
}
</style>
