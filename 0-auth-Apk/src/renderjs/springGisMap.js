import { TerrainRgbProvider, Viewer } from 'spring-and-autumn-gis';
import apkEnvironment from '../../config/apk.env.json';
import resourceConfig from '../../config/token.json';

const LOCATION_ENTITY_ID = 'springgis-current-device';

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function number(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function templateList(value) {
  if (!Array.isArray(value)) return [];
  return value.map(text).filter(Boolean);
}

export default {
  data() {
    return { viewer: null, lastPayload: '' };
  },
  mounted() {
    void this.createViewer();
  },
  beforeUnmount() {
    this.destroyViewer();
  },
  beforeDestroy() {
    this.destroyViewer();
  },
  methods: {
    buildBaseMaps() {
      const map = apkEnvironment.map || {};
      const definitions = [];
      const names = {};
      const tiandituToken = text(resourceConfig?.tianditu?.token);
      if (tiandituToken) {
        definitions.push({
          id: 'tianditu-imagery',
          type: 'xyz',
          scheme: 'xyz',
          minLevel: 1,
          maxLevel: 18,
          levelOffset: -1.7,
          url: `https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${encodeURIComponent(tiandituToken)}`,
          attribution: '天地图',
        });
        names['tianditu-imagery'] = '天地图影像';
      }

      // Google imagery is opt-in. Supply an authorised XYZ URL in token.json;
      // the application does not embed or guess a Google endpoint.
      const googleSatelliteUrl = text(resourceConfig?.google?.satelliteUrl);
      if (googleSatelliteUrl) {
        definitions.push({
          id: 'google-satellite',
          type: 'xyz',
          scheme: resourceConfig?.google?.scheme === 'tms' ? 'tms' : 'xyz',
          minLevel: Math.max(0, number(resourceConfig?.google?.minLevel, 0)),
          maxLevel: Math.max(0, number(resourceConfig?.google?.maxLevel, 20)),
          levelOffset: number(resourceConfig?.google?.levelOffset, -1.7),
          url: googleSatelliteUrl,
          attribution: text(resourceConfig?.google?.attribution) || 'Google Satellite (authorised source)',
        });
        names['google-satellite'] = 'Google 卫星影像';
      }

      const customUrl = text(map.xyzUrl);
      if (customUrl) {
        definitions.push({
          id: 'apk-custom-map',
          type: 'xyz',
          url: customUrl,
          scheme: map.xyzScheme === 'tms' ? 'tms' : 'xyz',
          maxLevel: number(map.xyzMaxLevel, 20),
          levelOffset: number(map.levelOffset, -1.7),
          attribution: text(map.attribution) || '用户配置底图',
        });
        names['apk-custom-map'] = '自定义底图';
      }
      return { definitions, names };
    },
    buildTerrain() {
      const terrain = resourceConfig?.demo?.terrain || {};
      const configuredTemplates = templateList(terrain.urlTemplates);
      const configuredTileJson = text(terrain.tileJsonUrl);
      let tileJsonUrl = configuredTileJson;
      let urlTemplates = configuredTemplates;
      let id = 'apk-terrain-rgb';
      let attribution = text(terrain.attribution) || '用户配置 DEM';

      if (!tileJsonUrl && urlTemplates.length === 0) {
        const maptilerKey = text(resourceConfig?.maptiler?.key);
        const geovisToken = text(resourceConfig?.geovis?.terrainToken);
        if (maptilerKey) {
          id = 'maptiler-terrain-rgb';
          tileJsonUrl = `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${encodeURIComponent(maptilerKey)}`;
          attribution = 'MapTiler';
        } else if (geovisToken) {
          id = 'geovis-terrain-rgb';
          urlTemplates = [`https://tiles1.geovisearth.com/base/v1/terrain-rgb/{z}/{x}/{y}?format=png&tmsIds=w&token=${encodeURIComponent(geovisToken)}`];
          attribution = 'GeoVIS';
        }
      }
      if (!tileJsonUrl && urlTemplates.length === 0) return null;

      return new TerrainRgbProvider({
        id,
        ...(tileJsonUrl ? { tileJsonUrl } : {}),
        ...(urlTemplates.length ? { urlTemplates } : {}),
        scheme: terrain.scheme === 'tms' ? 'tms' : 'xyz',
        encoding: terrain.encoding === 'terrarium' ? 'terrarium' : 'mapbox',
        minLevel: Math.max(0, number(terrain.minLevel, 0)),
        maxLevel: Math.max(0, number(terrain.maxLevel, 14)),
        attribution,
      });
    },
    async createViewer() {
      if (this.viewer) return;
      const container = this.$el.querySelector('.engine-canvas');
      if (!container) return;
      const map = apkEnvironment.map || {};
      const { definitions: basemaps, names: baseMapNames } = this.buildBaseMaps();
      const terrainProvider = map.terrainEnabled === false ? null : this.buildTerrain();
      const configuredDefault = text(resourceConfig?.demo?.defaultBaseMap);
      const baseMap = basemaps.some((item) => item.id === configuredDefault)
        ? configuredDefault
        : (basemaps[0]?.id ?? null);
      try {
        this.viewer = await Viewer.create(container, {
          basemaps,
          baseMap,
          terrain: terrainProvider ? { provider: terrainProvider, enabled: true } : false,
          showLodGrid: map.showLodGrid !== false,
          autoStart: true,
          pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
          initialView: {
            longitude: number(map.initialLongitude, 106.55),
            latitude: number(map.initialLatitude, 29.61),
            altitude: number(map.initialAltitude, 18000000),
          },
          lod: { minLevel: 2, maxLevel: 22, maxTiles: 120 },
        });
        this.viewer.createToolbar({ bottomOffset: 58, baseMapNames });
        if (this.lastPayload) this.applyLocation(this.lastPayload, true);
      } catch (error) {
        const message = document.createElement('div');
        message.className = 'engine-failure';
        message.textContent = `三维引擎启动失败：${error instanceof Error ? error.message : String(error)}`;
        container.append(message);
      }
    },
    updateLocation(value) {
      this.lastPayload = value || '';
      if (this.viewer && value) this.applyLocation(value, false);
    },
    applyLocation(value, fly) {
      let point;
      try { point = JSON.parse(value); } catch { return; }
      if (!Number.isFinite(point.longitude) || !Number.isFinite(point.latitude)) return;
      const position = [point.longitude, point.latitude, Number.isFinite(point.altitude) ? point.altitude : 0];
      const entity = {
        id: LOCATION_ENTITY_ID,
        name: '当前终端位置',
        type: 'point',
        position,
        heightReference: 'clamp-to-ground',
        groundOffset: 1,
        symbol: { color: '#ff9f43', outlineColor: '#ffffff', outlineWidth: 3, size: 24, shape: 'circle', occlusion: 'overlay' },
        label: {
          text: point.accuracy ? `当前设备 · ±${Math.round(point.accuracy)}m` : '当前设备',
          color: '#ffffff',
          haloColor: '#173342',
          fontSize: 15,
          occlusion: 'overlay',
        },
        properties: { source: 'android-location', recordedAt: point.recordedAt || null },
      };
      if (this.viewer.entities.has(LOCATION_ENTITY_ID)) this.viewer.entities.update(LOCATION_ENTITY_ID, entity);
      else this.viewer.entities.add(entity);
      this.viewer.selectEntity(LOCATION_ENTITY_ID);
      if (fly) this.viewer.flyTo({ longitude: point.longitude, latitude: point.latitude, altitude: 4500, pitch: -58, heading: 0, duration: 900 });
    },
    destroyViewer() {
      if (!this.viewer) return;
      this.viewer.destroy();
      this.viewer = null;
    },
  },
};
