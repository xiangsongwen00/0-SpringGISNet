import { TerrainRgbProvider, Viewer } from 'spring-and-autumn-gis';
import apkEnvironment from '../../config/apk.env.json';
import resourceConfig from '../../config/token.json';

const LOCATION_ENTITY_ID = 'springgis-current-device';

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function resourceText(value) {
  const valueText = text(value);
  return /YOUR_|REPLACE_|<YOUR/i.test(valueText) ? '' : valueText;
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
      const definitions = [];
      const names = {};
      const ids = new Set();
      const add = (definition, name) => {
        if (!definition?.id || ids.has(definition.id)) return;
        ids.add(definition.id);
        definitions.push(definition);
        names[definition.id] = name || definition.id;
      };

      const tiandituToken = resourceText(resourceConfig?.tianditu?.token);
      if (tiandituToken) {
        add({
          id: 'tianditu-imagery',
          type: 'xyz',
          scheme: 'xyz',
          minLevel: 1,
          maxLevel: 18,
          levelOffset: -1.7,
          url: `https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${encodeURIComponent(tiandituToken)}`,
          attribution: '天地图',
        }, '天地图影像');
      }

      const maptilerKey = resourceText(resourceConfig?.maptiler?.key);
      if (maptilerKey) {
        add({
          id: 'maptiler-vector',
          type: 'vector-style',
          style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${encodeURIComponent(maptilerKey)}`,
          symbols: true,
          levelOffset: -1.7,
        }, 'MapTiler Streets');
      }

      const osm = resourceConfig?.osm || {};
      const osmRasterUrl = resourceText(osm.rasterUrl);
      const osmStyleUrl = resourceText(osm.styleUrl);
      const osmAttribution = text(osm.attribution) || '© OpenStreetMap contributors';
      if (osmRasterUrl) {
        add({ id: 'osm-raster', type: 'xyz', url: osmRasterUrl, maxLevel: 19, attribution: osmAttribution }, 'OpenStreetMap 栅格');
      }
      if (osmStyleUrl) {
        add({ id: 'osm-vector', type: 'vector-style', style: osmStyleUrl, symbols: true }, 'OpenStreetMap 矢量');
      }

      // Google satellite and every other custom service use the same standard
      // demo.basemaps structure as the SDK demo. No provider-specific top-level
      // object is invented here.
      const customMaps = Array.isArray(resourceConfig?.demo?.basemaps) ? resourceConfig.demo.basemaps : [];
      for (const customMap of customMaps) {
        const id = resourceText(customMap?.id);
        const name = resourceText(customMap?.name) || (id === 'google-satellite' ? 'Google 卫星影像' : id);
        if (!id) continue;
        if (customMap.type === 'xyz') {
          const url = resourceText(customMap.url);
          if (!url) continue;
          add({
            id,
            type: 'xyz',
            url,
            scheme: customMap.scheme === 'tms' ? 'tms' : 'xyz',
            minLevel: Math.max(0, number(customMap.minLevel, 0)),
            maxLevel: Math.max(0, number(customMap.maxLevel, 20)),
            levelOffset: number(customMap.levelOffset, -1.7),
            attribution: text(customMap.attribution) || '用户提供服务',
          }, name);
        } else if (customMap.type === 'vector-style') {
          const style = resourceText(customMap.style);
          if (!style) continue;
          add({
            id,
            type: 'vector-style',
            style,
            sourceId: resourceText(customMap.sourceId) || undefined,
            symbols: customMap.symbols !== false,
            levelOffset: number(customMap.levelOffset, -1.7),
          }, name);
        }
      }

      return { definitions, names };
    },
    buildTerrain() {
      const terrain = resourceConfig?.demo?.terrain || {};
      const configuredTemplates = templateList(terrain.urlTemplates).map(resourceText).filter(Boolean);
      const configuredTileJson = resourceText(terrain.tileJsonUrl);
      let tileJsonUrl = configuredTileJson;
      let urlTemplates = configuredTemplates;
      let id = 'apk-terrain-rgb';
      let attribution = text(terrain.attribution) || '用户配置 DEM';

      if (!tileJsonUrl && urlTemplates.length === 0) {
        const maptilerKey = resourceText(resourceConfig?.maptiler?.key);
        const geovisToken = resourceText(resourceConfig?.geovis?.terrainToken);
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
          pixelRatio: Math.min(window.devicePixelRatio || 1, number(map.maxPixelRatio, 1.5)),
          initialView: {
            longitude: number(map.initialView?.longitude, 106.55),
            latitude: number(map.initialView?.latitude, 29.61),
            altitude: number(map.initialView?.altitude, 18000000),
          },
          lod: {
            minLevel: number(map.lod?.minLevel, 2),
            maxLevel: number(map.lod?.maxLevel, 22),
            maxTiles: number(map.lod?.maxTiles, 120),
          },
        });
        this.viewer.createToolbar({ bottomOffset: number(map.toolbarBottomOffset, 58), baseMapNames });
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
