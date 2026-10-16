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
    reportStatus(container, message, level = 'info') {
      const shell = container?.parentElement;
      const status = shell?.querySelector?.('.engine-runtime-status');
      if (status) {
        status.textContent = `引擎运行状态：${message}`;
        status.style.color = level === 'error' ? '#ff9b9b' : level === 'success' ? '#86efcf' : '#ffd28a';
      }
      const method = level === 'error' ? 'error' : level === 'success' ? 'info' : 'log';
      console[method](`[springgis-map] ${message}`);
    },
    resolveContainer() {
      const root = this.$el;
      if (!root) return null;
      if (root.classList?.contains('engine-canvas')) return root;
      return root.querySelector?.('.engine-canvas') || null;
    },
    async waitForLayout(container) {
      for (let attempt = 0; attempt < 30; attempt += 1) {
        const rect = container.getBoundingClientRect();
        if (rect.width >= 10 && rect.height >= 10) return true;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      return false;
    },
    showFailure(container, reason) {
      if (!container || container.querySelector?.('.engine-failure')) return;
      const message = document.createElement('div');
      message.className = 'engine-failure';
      message.textContent = `三维引擎启动失败：${reason}`;
      container.append(message);
    },
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
      const container = this.resolveContainer();
      if (!container) {
        console.error('[springgis-map] 找不到 engine-canvas 挂载节点');
        return;
      }
      this.reportStatus(container, 'RenderJS 已加载，正在检查地图容器');
      if (!await this.waitForLayout(container)) {
        this.reportStatus(container, '地图容器没有可用尺寸', 'error');
        this.showFailure(container, '地图容器没有可用尺寸');
        return;
      }
      const rect = container.getBoundingClientRect();
      this.reportStatus(container, `容器 ${Math.round(rect.width)}×${Math.round(rect.height)}，正在准备资源`);
      const map = apkEnvironment.map || {};
      const { definitions: basemaps, names: baseMapNames } = this.buildBaseMaps();
      const terrainProvider = map.terrainEnabled === false ? null : this.buildTerrain();
      const configuredDefault = text(resourceConfig?.demo?.defaultBaseMap);
      const baseMap = basemaps.some((item) => item.id === configuredDefault)
        ? configuredDefault
        : (basemaps[0]?.id ?? null);
      this.reportStatus(container, `发现 ${basemaps.length} 个底图，地形${terrainProvider ? '已配置' : '未配置'}，正在初始化 WebGL`);
      const viewerOptions = {
        basemaps,
        // Start with the ellipsoid first. Remote imagery is attached only after
        // the globe and toolbar are visible, so a provider failure cannot leave
        // the entire Android map area blank.
        baseMap: null,
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
      };
      try {
        try {
          this.viewer = await Viewer.create(container, viewerOptions);
        } catch (terrainError) {
          if (!terrainProvider) throw terrainError;
          this.reportStatus(container, '地形初始化失败，正在降级为 WGS84 基础球体');
          this.viewer = await Viewer.create(container, { ...viewerOptions, terrain: false });
        }
        this.viewer.createToolbar({
          container,
          bottomOffset: number(map.toolbarBottomOffset, 58),
          baseMapNames,
        });
        const canvasReady = Boolean(container.querySelector?.('canvas'));
        const toolbarReady = Boolean(container.querySelector?.('.sag-tools'));
        this.reportStatus(
          container,
          `基础球体${canvasReady ? '已创建' : '未检测到 Canvas'}，工具栏${toolbarReady ? '已创建' : '未创建'}`,
          canvasReady && toolbarReady ? 'success' : 'error',
        );
        if (this.lastPayload) this.applyLocation(this.lastPayload, true);
        if (baseMap) {
          this.reportStatus(container, `地球与工具栏已就绪，正在加载底图 ${baseMap}`);
          this.viewer.setBaseMap(baseMap).then(() => {
            this.reportStatus(container, `地球、工具栏和底图 ${baseMap} 已就绪`, 'success');
          }).catch((baseMapError) => {
            const reason = baseMapError instanceof Error ? baseMapError.message : String(baseMapError);
            this.reportStatus(container, `基础球体已就绪，但底图加载失败：${reason}`, 'error');
          });
        }
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        this.reportStatus(container, `启动失败：${reason}`, 'error');
        this.showFailure(container, reason);
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
