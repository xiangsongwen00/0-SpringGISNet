import { TerrainRgbProvider, Viewer } from 'spring-and-autumn-gis';
import apkEnvironment from '../../config/apk.env.json';
import resourceConfig from '../../config/token.json';

const LOCATION_ENTITY_ID = 'springgis-current-device';
const TRACK_ENTITY_ID = 'springgis-history-track';
const PLAYBACK_ENTITY_ID = 'springgis-track-playback';
// Viewer/Three.js instances must stay outside Vue/uni-app reactive data.
// Proxying the SDK object graph makes Map values non-cloneable in Android's
// WebView and breaks drawing with a structuredClone DataCloneError.
let viewerInstance = null;

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
    return { lastPayload: '', lastTrackPayload: '', lastPlaybackPayload: '', minimizedToolMode: null };
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
      const status = shell?.querySelector?.('.engine-runtime-status')
        || document.querySelector?.('.engine-runtime-status');
      if (status) {
        status.textContent = `引擎运行状态：${message}`;
        status.style.color = level === 'error' ? '#ff9b9b' : level === 'success' ? '#86efcf' : '#ffd28a';
      }
      const method = level === 'error' ? 'error' : level === 'success' ? 'info' : 'log';
      console[method](`[springgis-map] ${message}`);
    },
    enhanceMobileToolbar(container) {
      const toolbarHost = container.parentElement || container;
      const panel = toolbarHost.querySelector?.('.sag-tool-panel');
      const toolbarElement = toolbarHost.querySelector?.('.sag-tools');
      const closeButton = panel?.querySelector?.('header button');
      const header = panel?.querySelector?.('header');
      if (!panel || !toolbarElement || !header || !closeButton || toolbarElement.dataset.springgisMobileEnhanced === 'true') return;
      toolbarElement.dataset.springgisMobileEnhanced = 'true';
      closeButton.textContent = '×';
      closeButton.setAttribute('aria-label', '关闭并终止当前工具');
      closeButton.title = '关闭并终止当前工具';

      const minimizeButton = document.createElement('button');
      minimizeButton.type = 'button';
      minimizeButton.className = 'springgis-panel-minimize';
      minimizeButton.textContent = '—';
      minimizeButton.setAttribute('aria-label', '最小化工具面板并保持当前操作');
      minimizeButton.title = '最小化，保持当前测量或绘制状态';
      minimizeButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.minimizedToolMode = viewerInstance?.toolbar?.mode || null;
        toolbarElement.dataset.minimizedTool = this.minimizedToolMode || '';
        panel.hidden = true;
        this.reportStatus(container, this.minimizedToolMode
          ? `${this.minimizedToolMode === 'measure' ? '测量' : this.minimizedToolMode === 'draw' ? '绘制' : '工具'}面板已最小化，当前操作继续`
          : '工具面板已最小化');
      });
      header.insertBefore(minimizeButton, closeButton);

      toolbarElement.addEventListener('click', (event) => {
        const button = event.target?.closest?.('button[data-tool]');
        const tool = button?.dataset?.tool;
        if (!tool) return;
        if (this.minimizedToolMode && tool === this.minimizedToolMode) {
          // Restore the exact existing panel. Do not call the SDK tool handler,
          // because rebuilding the same tool would cancel the active gesture.
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          panel.hidden = false;
          this.minimizedToolMode = null;
          toolbarElement.dataset.minimizedTool = '';
          this.positionToolPanel(container, button);
          this.reportStatus(container, '已恢复当前工具面板，操作状态保持不变', 'success');
          return;
        }
        // A different tool is allowed through to the SDK. Its normal open()
        // path closes/cancels the previous interaction before switching.
        if (this.minimizedToolMode) {
          this.minimizedToolMode = null;
          toolbarElement.dataset.minimizedTool = '';
        }
        // SDK opens panels in a microtask. Position after that microtask so the
        // measured height and compact mode are already final.
        setTimeout(() => this.positionToolPanel(container, button), 0);
      }, true);
      closeButton.addEventListener('click', () => {
        this.minimizedToolMode = null;
        toolbarElement.dataset.minimizedTool = '';
      });
    },
    positionToolPanel(container, button) {
      const panel = (container?.parentElement || container)?.querySelector?.('.sag-tool-panel');
      if (!panel || panel.hidden || !button) return;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const controls = container.parentElement?.querySelector?.('.map-controls');
      const controlsRect = controls?.getBoundingClientRect?.();
      const left = Math.max(58, Math.round(buttonRect.right - containerRect.left + 8));
      const rightEdge = controlsRect
        ? Math.min(containerRect.width - 8, controlsRect.left - containerRect.left - 8)
        : containerRect.width - 58;
      const right = Math.max(8, Math.round(containerRect.width - rightEdge));
      const topGap = 12;
      // Keep the popup visibly above the map bottom and Android gesture area.
      // Oversized content scrolls inside the panel instead of reaching the edge.
      const bottomGap = 28;
      const maximumHeight = Math.max(120, Math.min(
        containerRect.height * 0.72,
        containerRect.height - topGap - bottomGap,
      ));
      panel.style.setProperty('max-height', `${Math.round(maximumHeight)}px`, 'important');
      const renderedHeight = panel.getBoundingClientRect().height;
      const panelHeight = Math.min(renderedHeight || panel.scrollHeight || 260, maximumHeight);
      const wantedTop = buttonRect.top - containerRect.top;
      const top = Math.max(topGap, Math.min(wantedTop, containerRect.height - panelHeight - bottomGap));
      panel.style.setProperty('left', `${left}px`, 'important');
      panel.style.setProperty('right', `${right}px`, 'important');
      panel.style.setProperty('top', `${Math.round(top)}px`, 'important');
      panel.style.setProperty('bottom', 'auto', 'important');
    },
    resolveContainer() {
      const root = this.$el;
      if (root?.nodeType === 1 && root.classList?.contains('engine-canvas')) return root;
      const nested = root?.nodeType === 1
        ? root.querySelector?.('#springgis-engine-canvas, .engine-canvas')
        : null;
      if (nested) return nested;
      // App-vue RenderJS may expose uni-app's proxy root through this.$el,
      // especially during page show/resume. The WebView document is the stable
      // fallback for the element carrying the :change binding.
      return document.getElementById('springgis-engine-canvas')
        || document.querySelector?.('.engine-canvas')
        || null;
    },
    async waitForContainer() {
      for (let attempt = 0; attempt < 60; attempt += 1) {
        const container = this.resolveContainer();
        if (container) return container;
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return null;
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
      if (viewerInstance) return;
      const container = await this.waitForContainer();
      if (!container) {
        const root = this.$el;
        const rootDescription = root
          ? `${root.nodeName || 'unknown'}.${root.className || ''} nodeType=${root.nodeType}`
          : 'null';
        console.error(`[springgis-map] 等待 6 秒后仍找不到 engine-canvas 挂载节点；renderjsRoot=${rootDescription}`);
        this.reportStatus(null, '等待 6 秒后仍找不到地图挂载节点', 'error');
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
        navigation: {
          zoomSpeed: number(map.navigation?.zoomSpeed, 1.2),
          minZoomSpeed: number(map.navigation?.minZoomSpeed, 0.00000005),
          zoomAltitudeGain: number(map.navigation?.zoomAltitudeGain, 8),
          dampingFactor: number(map.navigation?.dampingFactor, 0.14),
        },
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
          viewerInstance = await Viewer.create(container, viewerOptions);
        } catch (terrainError) {
          if (!terrainProvider) throw terrainError;
          this.reportStatus(container, '地形初始化失败，正在降级为 WGS84 基础球体');
          viewerInstance = await Viewer.create(container, { ...viewerOptions, terrain: false });
        }
        const toolbarHost = container.parentElement || container;
        viewerInstance.createToolbar({
          container: toolbarHost,
          bottomOffset: number(map.toolbarBottomOffset, 58),
          baseMapNames,
        });
        this.enhanceMobileToolbar(container);
        const canvasReady = Boolean(container.querySelector?.('canvas'));
        const toolbarReady = Boolean(toolbarHost.querySelector?.('.sag-tools'));
        this.reportStatus(
          container,
          `基础球体${canvasReady ? '已创建' : '未检测到 Canvas'}，工具栏${toolbarReady ? '已创建' : '未创建'}`,
          canvasReady && toolbarReady ? 'success' : 'error',
        );
        if (this.lastPayload) this.applyLocation(this.lastPayload, true);
        if (this.lastTrackPayload) this.applyTrack(this.lastTrackPayload);
        if (this.lastPlaybackPayload) this.applyPlayback(this.lastPlaybackPayload);
        if (baseMap) {
          this.reportStatus(container, `地球与工具栏已就绪，正在加载底图 ${baseMap}`);
          viewerInstance.setBaseMap(baseMap).then(() => {
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
      if (viewerInstance && value) this.applyLocation(value, false);
    },
    updateTrack(value) {
      this.lastTrackPayload = value || '';
      if (viewerInstance) this.applyTrack(this.lastTrackPayload);
    },
    updatePlayback(value) {
      this.lastPlaybackPayload = value || '';
      if (viewerInstance) this.applyPlayback(this.lastPlaybackPayload);
    },
    handleControl(value) {
      if (!value) return;
      let command;
      try { command = JSON.parse(value); } catch { return; }
      if (command.action === 'resize') {
        window.dispatchEvent(new Event('resize'));
        return;
      }
      if (!viewerInstance) return;
      if (command.action === 'locate') {
        let point;
        try { point = JSON.parse(this.lastPayload); } catch { point = null; }
        if (!point || !Number.isFinite(point.longitude) || !Number.isFinite(point.latitude)) {
          this.reportStatus(this.resolveContainer(), '还没有可定位的终端位置', 'error');
          return;
        }
        viewerInstance.flyTo({ longitude: point.longitude, latitude: point.latitude, altitude: 2000, pitch: -58, heading: 0, duration: 650 });
        this.reportStatus(this.resolveContainer(), '已定位到当前终端位置，高度约 2000m', 'success');
        return;
      }
      if (command.action === 'pitch') {
        const pitchDegrees = Math.max(0, Math.min(90, number(command.value, 58)));
        viewerInstance.setCameraPitch(-pitchDegrees);
        return;
      }
      if (command.action === 'zoom-in' || command.action === 'zoom-out') {
        const state = viewerInstance.getCameraViewState();
        let fallback;
        try { fallback = JSON.parse(this.lastPayload); } catch { fallback = {}; }
        const longitude = Number.isFinite(state.focusLongitude) ? state.focusLongitude : number(fallback.longitude, 106.55);
        const latitude = Number.isFinite(state.focusLatitude) ? state.focusLatitude : number(fallback.latitude, 29.61);
        const currentAltitude = Math.max(20, number(state.cameraAltitude, 18000000));
        const altitude = command.action === 'zoom-in'
          ? Math.max(20, currentAltitude * 0.42)
          : Math.min(50000000, currentAltitude * 2.1);
        viewerInstance.flyTo({
          longitude,
          latitude,
          altitude,
          pitch: Number.isFinite(state.pitch) ? state.pitch : -65,
          heading: Number.isFinite(state.heading) ? state.heading : 0,
          duration: 220,
        });
        this.reportStatus(
          this.resolveContainer(),
          `视角高度约 ${altitude >= 1000 ? `${(altitude / 1000).toFixed(1)}km` : `${Math.round(altitude)}m`}`,
          'success',
        );
      }
    },
    upsertEntity(entity) {
      if (!viewerInstance?.entities || !entity?.id) return;
      if (!viewerInstance.entities.has(entity.id)) {
        viewerInstance.entities.add(entity);
        return;
      }
      // The SDK treats identity fields as immutable. Passing a complete entity
      // to update() caused the recurring "type/id cannot change" exception.
      const { id: _id, type: _type, ...mutableFields } = entity;
      viewerInstance.entities.update(entity.id, mutableFields);
    },
    applyTrack(value) {
      let points;
      try { points = JSON.parse(value || '[]'); } catch { points = []; }
      if (!Array.isArray(points) || points.length < 2) {
        if (viewerInstance.entities.has(TRACK_ENTITY_ID)) viewerInstance.entities.remove(TRACK_ENTITY_ID);
        return;
      }
      const positions = points
        .filter((point) => Number.isFinite(point.longitude) && Number.isFinite(point.latitude))
        .map((point) => [point.longitude, point.latitude, Number.isFinite(point.altitude) ? point.altitude : 0]);
      if (positions.length < 2) return;
      const entity = {
        id: TRACK_ENTITY_ID,
        name: '最近三天历史轨迹',
        type: 'polyline',
        positions,
        heightReference: 'clamp-to-ground',
        groundOffset: 2,
        symbol: { color: '#ff9f43', outlineColor: '#ffffff', outlineWidth: 2, width: 7, opacity: 0.92, occlusion: 'overlay' },
        properties: { source: 'android-history', pointCount: positions.length },
      };
      this.upsertEntity(entity);
      const first = positions[0];
      viewerInstance.flyTo({ longitude: first[0], latitude: first[1], altitude: 4000, pitch: -62, heading: 0, duration: 650 });
      this.reportStatus(this.resolveContainer(), `已显示 ${positions.length} 个历史轨迹点`, 'success');
    },
    applyPlayback(value) {
      let point;
      try { point = value ? JSON.parse(value) : null; } catch { point = null; }
      if (!point || !Number.isFinite(point.longitude) || !Number.isFinite(point.latitude)) {
        if (viewerInstance.entities.has(PLAYBACK_ENTITY_ID)) viewerInstance.entities.remove(PLAYBACK_ENTITY_ID);
        return;
      }
      const entity = {
        id: PLAYBACK_ENTITY_ID,
        name: '轨迹回放位置',
        type: 'point',
        position: [point.longitude, point.latitude, Number.isFinite(point.altitude) ? point.altitude : 0],
        heightReference: 'clamp-to-ground',
        groundOffset: 4,
        symbol: { color: '#00e5ff', outlineColor: '#ffffff', outlineWidth: 4, size: 30, shape: 'circle', occlusion: 'overlay' },
        label: { text: point.recordedAt ? new Date(point.recordedAt).toLocaleString() : '轨迹回放', color: '#ffffff', haloColor: '#0b2430', fontSize: 14, occlusion: 'overlay' },
        properties: { source: 'android-playback', recordedAt: point.recordedAt || null },
      };
      this.upsertEntity(entity);
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
      this.upsertEntity(entity);
      viewerInstance.selectEntity(LOCATION_ENTITY_ID);
      if (fly) viewerInstance.flyTo({ longitude: point.longitude, latitude: point.latitude, altitude: 4500, pitch: -58, heading: 0, duration: 900 });
    },
    destroyViewer() {
      if (!viewerInstance) return;
      viewerInstance.destroy();
      viewerInstance = null;
    },
  },
};
