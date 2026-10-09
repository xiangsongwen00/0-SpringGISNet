// Generated from the TS playground by npm run sdk:sync-js. No TS runtime required.
import { Viewer, ViewerError, TerrainRgbProvider, GeoJsonLayer } from 'spring-and-autumn-gis';
import { createDemoRaster, createDemoTerrain, demoStyle, demoVectorFetch } from './demo-data.js';
import { loadDemoResources, parseDemoConfig } from './demo-config.js';
const element = (id) => document.getElementById(id);
const input = (id) => element(id);
const select = (id) => element(id);
const home = { longitude: 106.55, latitude: 29.61, altitude: 18000000, pitch: -90, heading: 0, duration: 700 };
let viewer;
let creating;
let generation = 0;
let running = false;
let latestStats;
let latestTiming;
let frames = 0, fps = 0, fpsFrames = 0, fpsStart = performance.now(), lastUi = 0;
let configured = false;
const isSmoke = new URLSearchParams(location.search).get('smoke') === '1';
let resources;
const log = (message) => {
    const target = element('log');
    target.textContent = `${new Date().toLocaleTimeString()} ${message}\n${target.textContent ?? ''}`.slice(0, 6000);
};
function errorMessage(error) {
    return error instanceof ViewerError ? `${error.code}: ${error.message}` : error instanceof Error ? error.message : String(error);
}
function requireViewer() {
    if (!viewer || viewer.isDestroyed)
        throw new Error('请先重新创建 Viewer。');
    return viewer;
}
function number(id, min = -Infinity, max = Infinity) {
    const value = Number(input(id).value);
    if (!input(id).value.trim() || !Number.isFinite(value) || value < min || value > max)
        throw new Error(`${id} 输入值无效。`);
    return value;
}
function definitions() {
    const result = isSmoke ? [
        { id: 'demo-raster', type: 'provider', provider: createDemoRaster() },
        { id: 'demo-vector-light', type: 'vector-style', style: demoStyle(false), fetcher: demoVectorFetch, symbols: true, levelOffset: -1.7 },
        { id: 'demo-vector-dark', type: 'vector-style', style: demoStyle(true), fetcher: demoVectorFetch, symbols: true, levelOffset: -1.7 }
    ] : [...(resources?.basemaps ?? [])];
    if (configured) {
        const url = input('custom-url').value.trim();
        if (url) {
            const offset = number('level-offset', -5, 0);
            result.push(select('custom-type').value === 'vector-style'
                ? { id: 'custom', type: 'vector-style', style: url, sourceId: input('source-id').value.trim() || undefined, symbols: input('symbols').checked, levelOffset: offset }
                : { id: 'custom', type: 'xyz', url, scheme: select('custom-type').value === 'tms' ? 'tms' : 'xyz', maxLevel: number('max-level', 0, 27), levelOffset: offset });
        }
    }
    return result;
}
function inspect() {
    const v = viewer;
    element('life').textContent = creating ? '正在创建配置…' : !v ? '尚无实例' : v.isDestroyed ? '已销毁（点击重新创建）' : running ? '运行中 · 持续交互' : '已暂停 · 点击 start 恢复';
    if (v && !v.isDestroyed) {
        input('terrain').checked = v.terrainEnabled;
        input('grid').checked = v.lodGridVisible;
        select('basemap').value = v.baseMap.id ?? 'none';
        if (element('result').dataset.status === 'ready') {
            const imagery = latestStats?.imagery;
            element('result').textContent = !v.baseMap.id ? '已移除底图；地图实例仍在' :
                imagery?.ready ? `已加载 ${imagery.ready} 个底图资源；高清覆盖继续更新` :
                    imagery?.errors ? '底图请求失败，尚无图片就绪；请检查自己的 Key、配额、域名、跨域与网络' :
                        'Viewer 配置已就绪；底图瓦片加载中…';
        }
    }
    element('attribution').textContent = isSmoke ? '合成测试数据 · 非真实地理数据' :
        `${resources?.attributions[v?.baseMap.id ?? ''] ?? '用户资源（请确认署名）'} · ${v?.terrainEnabled ? 'DEM: 用户授权数据' : '地形关闭'}`;
    const vector = v?.engine.imagery?.provider;
    element('metrics').textContent = `FPS ${running ? fps : '暂停'} · 可见 ${latestStats?.selected ?? '—'} · draw ${latestTiming?.drawCalls ?? '—'} · Vector Worker ${vector?.drawStats ? (vector.drawStats.worker ? '开启' : '兼容主线程') : '不适用'}`;
    element('state').textContent = JSON.stringify({ isDestroyed: v?.isDestroyed ?? null, running,
        baseMap: v ? { id: v.baseMap.id, type: v.baseMap.type, capabilities: v.baseMap.capabilities } : null,
        terrainEnabled: v?.terrainEnabled ?? false, lodGridVisible: v?.lodGridVisible ?? false,
        basemaps: v?.getBaseMaps().map(({ id, type }) => ({ id, type })),
        businessLayer: !!v?.engine.getFeatureLayer('demo-business'), frameCallbacks: frames,
        imagery: latestStats?.imagery ? { ...latestStats.imagery, lastError: latestStats.imagery.lastError ? '请求失败；详情请检查浏览器网络面板（此处不展示含凭据的URL）' : null } : undefined,
        terrain: latestStats?.terrain, performance: latestTiming }, null, 2);
}
function business(enabled) {
    const v = requireViewer();
    if (!enabled) {
        v.engine.removeFeatureLayer('demo-business');
        return;
    }
    if (v.engine.getFeatureLayer('demo-business'))
        return;
    const layer = new GeoJsonLayer(v.engine.ellipsoid, { type: 'FeatureCollection', features: [
            { type: 'Feature', properties: { name: 'demo-point' }, geometry: { type: 'Point', coordinates: [106.55, 29.61] } },
            { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[106, 29], [106.55, 29.61], [107.2, 30.3]] } },
            { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[[105.8, 28.9], [107.3, 28.9], [107.3, 30.4], [105.8, 30.4], [105.8, 28.9]]] } }
        ] }, { color: '#ffae65', pointColor: '#ffed89', pointSize: 12, heightOffset: 30, terrain: v.engine.terrain ?? undefined, order: 200 });
    v.engine.addFeatureLayer('demo-business', layer);
}
async function create(cancelImmediately = false) {
    if (!isSmoke)
        resources = await loadDemoResources();
    const maps = definitions(); // Validate UI before releasing the current instance.
    const demUrl = configured ? input('dem-url').value.trim() : '';
    const terrain = demUrl ? new TerrainRgbProvider({ id: 'custom-dem', urlTemplates: [demUrl],
        encoding: select('dem-encoding').value === 'terrarium' ? 'terrarium' : 'mapbox', scheme: select('dem-scheme').value === 'tms' ? 'tms' : 'xyz' }) : isSmoke ? createDemoTerrain() : resources.terrain;
    const epoch = ++generation;
    creating?.abort();
    viewer?.destroy();
    running = false;
    const controller = new AbortController();
    creating = controller;
    latestStats = undefined;
    latestTiming = undefined;
    fpsFrames = 0;
    fpsStart = performance.now();
    element('result').textContent = '正在创建…';
    inspect();
    try {
        const pending = Viewer.create('map', { basemaps: maps, baseMap: isSmoke ? 'demo-raster' : resources.initialBaseMap, signal: controller.signal,
            terrain: { provider: terrain, enabled: input('terrain').checked }, showLodGrid: input('grid').checked,
            autoStart: input('auto-start').checked, initialView: home, pixelRatio: Math.min(devicePixelRatio, 1.5),
            lod: { minLevel: 2, maxLevel: 24, maxTiles: 180 },
            onStats: stats => { if (epoch === generation)
                latestStats = stats; },
            onFramePerformance: timing => {
                if (epoch !== generation)
                    return;
                frames++;
                fpsFrames++;
                latestTiming = timing;
                const now = performance.now();
                if (now - fpsStart >= 500) {
                    fps = Math.round(fpsFrames * 1000 / (now - fpsStart));
                    fpsFrames = 0;
                    fpsStart = now;
                }
                if (now - lastUi >= 500) {
                    lastUi = now;
                    inspect();
                }
            } });
        if (cancelImmediately)
            controller.abort();
        const created = await pending;
        if (epoch !== generation) {
            created.destroy();
            return;
        }
        viewer = created;
        creating = undefined;
        running = input('auto-start').checked;
        const names = { 'demo-raster': '合成栅格 · Provider', 'demo-vector-light': '合成 MVT · 浅色 + 注记', 'demo-vector-dark': '合成 MVT · 深色 + 注记', custom: '自定义服务' };
        select('basemap').replaceChildren(...[...created.getBaseMaps().map(map => new Option(resources?.names[map.id] ?? names[map.id] ?? map.id, map.id)), new Option('无底图', 'none')]);
        business(input('business').checked);
        element('result').textContent = 'Viewer 配置已就绪；底图瓦片加载中…';
        element('result').dataset.status = 'ready';
        log('Viewer.create 成功；配置已就绪，不代表所有视口瓦片加载完成。');
        inspect();
    }
    catch (error) {
        if (epoch !== generation)
            return;
        creating = undefined;
        element('result').textContent = cancelImmediately && error instanceof ViewerError && error.code === 'ABORTED' ? '初始化已取消；点击重新创建恢复地图' : errorMessage(error);
        log(errorMessage(error));
        inspect();
        if (!cancelImmediately)
            throw error;
    }
}
const tasks = new Map();
function bind(id, action, event = 'click') {
    element(id).addEventListener(event, () => {
        const task = Promise.resolve().then(action).then(() => { log(id); inspect(); }, error => {
            log(`${id}: ${errorMessage(error)}`);
            if (!(error instanceof ViewerError && error.code === 'ABORTED'))
                element('result').textContent = errorMessage(error);
            inspect();
        });
        tasks.set(id, task);
    });
}
bind('basemap', () => requireViewer().setBaseMap(select('basemap').value === 'none' ? null : select('basemap').value), 'change');
bind('terrain', () => requireViewer().setTerrainEnabled(input('terrain').checked), 'change');
bind('grid', () => requireViewer().setLodGridVisible(input('grid').checked), 'change');
bind('business', () => business(input('business').checked), 'change');
bind('clear-base', () => requireViewer().setBaseMap(null));
bind('switch-race', async () => {
    const v = requireViewer();
    const maps = v.getBaseMaps();
    if (maps.length < 2)
        throw new Error('需要至少两个已配置底图才能比较快速切换。');
    const first = isSmoke ? 'demo-vector-light' : maps[1].id, last = isSmoke ? 'demo-raster' : maps[0].id;
    const old = v.setBaseMap(first).catch(error => { if (!(error instanceof ViewerError && error.code === 'ABORTED'))
        throw error; log('较早切换已 ABORTED'); });
    await v.setBaseMap(last);
    await old;
    if (v.baseMap.id !== last)
        throw new Error('最后一次请求未生效。');
});
bind('fly', () => requireViewer().flyTo({ longitude: number('longitude', -180, 180), latitude: number('latitude', -85, 85), altitude: number('altitude', 0), pitch: number('pitch', -90, 0), heading: number('heading'), duration: number('duration', 0) }));
bind('home', () => requireViewer().flyTo(home));
bind('business-focus', () => requireViewer().flyTo({ longitude: 106.55, latitude: 29.61, altitude: 250000, pitch: -65, duration: 700 }));
bind('camera-state', () => { element('camera-output').textContent = JSON.stringify(requireViewer().getCameraViewState(), null, 2); });
bind('inspect', inspect);
bind('start', () => { requireViewer().start(); running = true; fpsFrames = 0; fpsStart = performance.now(); });
bind('stop', () => { requireViewer().stop(); running = false; });
bind('destroy', () => { creating?.abort(); generation++; creating = undefined; viewer?.destroy(); running = false; element('result').textContent = '已销毁，点击重新创建恢复'; });
bind('recreate', () => create());
bind('cancel-create', () => create(true));
bind('apply-config', () => { configured = true; return create(); });
window.addEventListener('pagehide', () => { creating?.abort(); viewer?.destroy(); });
window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== window.parent)
        return;
    if (event.data?.type === 'springgis:stop')
        element('stop').click();
    if (event.data?.type === 'springgis:start')
        element('start').click();
    if (event.data?.type === 'springgis:destroy')
        element('destroy').click();
});
if (new URLSearchParams(location.search).has('embedded'))
    document.body.classList.add('embedded');
// Automated UI smoke is opt-in. Normal demo never self-destructs or auto-switches.
async function smoke() {
    const check = (ok, message) => { if (!ok)
        throw new Error(message); };
    for (const config of [{}, { tianditu: { token: 'YOUR_KEY' }, maptiler: { key: 'YOUR_KEY' } }, { tianditu: { token: 'test-public-key' } }]) {
        let rejected = false;
        try {
            parseDemoConfig(config);
        }
        catch {
            rejected = true;
        }
        check(rejected, 'Missing/placeholder credentials or missing DEM must be rejected');
    }
    const localConfig = parseDemoConfig({ demo: { basemaps: [{ id: 'self-hosted', type: 'xyz', url: '/tiles/{z}/{x}/{y}.png' }], terrain: { urlTemplates: ['/dem/{z}/{x}/{y}.png'] } } });
    check(localConfig.initialBaseMap === 'self-hosted', 'User-owned keyless services should be supported');
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const until = async (test) => { for (let i = 0; i < 250; i++) {
        if (test())
            return;
        await wait(20);
    } throw new Error('Demo readiness timed out'); };
    const click = async (id) => { element(id).click(); await tasks.get(id); };
    const change = async (id) => { element(id).dispatchEvent(new Event('change')); await tasks.get(id); };
    await until(() => (viewer?.engine.imagery?.stats.ready ?? 0) > 0);
    check(document.querySelectorAll('#map canvas').length === 1, 'Persistent canvas missing');
    await click('stop');
    const frameCount = frames;
    await wait(100);
    check(frameCount === frames, 'Stop kept rendering');
    await click('start');
    await until(() => frames > frameCount);
    input('grid').checked = true;
    await change('grid');
    check(requireViewer().lodGridVisible, 'Grid did not enable');
    input('terrain').checked = true;
    await change('terrain');
    await until(() => (viewer?.engine.terrain?.stats.ready ?? 0) > 0);
    input('business').checked = true;
    await change('business');
    check(requireViewer().engine.getFeatureLayer('demo-business'), 'Business layer missing');
    select('basemap').value = 'demo-vector-dark';
    await change('basemap');
    await until(() => (viewer?.engine.imagery?.stats.ready ?? 0) > 0);
    const vector = requireViewer().engine.imagery.provider;
    check(requireViewer().baseMap.id === 'demo-vector-dark' && vector.drawStats?.worker, 'Vector switch/Worker failed');
    check(requireViewer().engine.getFeatureLayer('demo-business'), 'Base switch removed business layer');
    await click('camera-state');
    check(element('camera-output').textContent?.includes('cameraLongitude'), 'Camera state missing');
    input('duration').value = '0';
    await click('fly');
    await click('home');
    await click('switch-race');
    check(requireViewer().baseMap.id === 'demo-raster', 'Latest-wins failed');
    await click('clear-base');
    check(requireViewer().baseMap.id === null, 'Clear failed');
    await click('destroy');
    await click('destroy');
    check(viewer?.isDestroyed && !document.querySelector('#map canvas'), 'Destroy failed');
    await click('cancel-create');
    check(!document.querySelector('#map canvas'), 'Creation cancellation leaked');
    await click('recreate');
    await until(() => (viewer?.engine.imagery?.stats.ready ?? 0) > 0);
    await wait(1000);
    check(document.querySelectorAll('#map canvas').length === 1 && !requireViewer().isDestroyed, 'Demo did not remain visible');
    element('result').dataset.status = 'passed';
    element('result').textContent = 'PASS: installed interactive SDK demo controls, Worker, cancellation, destroy/recreate; persistent canvas retained';
}
void create().then(() => isSmoke ? smoke() : undefined).catch(error => {
    element('result').dataset.status = isSmoke ? 'failed' : 'blocked';
    element('result').textContent = `${isSmoke ? 'FAIL' : '需配置资源'}: ${errorMessage(error)}`;
    log(errorMessage(error));
    element('life').textContent = '资源配置未就绪 · 尚未创建地图';
});
