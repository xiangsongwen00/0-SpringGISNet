// Generated from the TS playground by npm run sdk:sync-js. No TS runtime required.
import { TerrainRgbProvider } from 'spring-and-autumn-gis';
const record = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const text = (value) => typeof value === 'string' && value.trim() && !/YOUR_|REPLACE_|<YOUR/i.test(value) ? value.trim() : undefined;
const key = (value) => { const raw = text(value); return raw ? encodeURIComponent(raw) : undefined; };
export function parseDemoConfig(value) {
    const config = record(value), demo = record(config.demo);
    const maps = [], names = {}, attributions = {};
    const add = (definition, name, attribution) => { maps.push(definition); names[definition.id] = name; attributions[definition.id] = attribution; };
    const tianditu = key(record(config.tianditu).token);
    if (tianditu) {
        for (const [layer, title] of [['img', '天地图影像'], ['vec', '天地图矢量制图（栅格）']])
            add({ id: `tianditu-${layer}`, type: 'xyz',
                url: `https://t0.tianditu.gov.cn/${layer}_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${layer}&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditu}`,
                scheme: 'xyz', minLevel: 1, maxLevel: 18, levelOffset: -1.7, attribution: '天地图' }, title, '天地图');
    }
    const maptiler = key(record(config.maptiler).key);
    if (maptiler)
        add({ id: 'maptiler-vector', type: 'vector-style', style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${maptiler}`, symbols: true, levelOffset: -1.7 }, 'MapTiler Streets · 用户 Key', '© MapTiler © OpenStreetMap contributors');
    const osm = record(config.osm), osmRaster = text(osm.rasterUrl), osmStyle = text(osm.styleUrl);
    if (osmRaster)
        add({ id: 'osm-raster', type: 'xyz', url: osmRaster, maxLevel: 19, attribution: text(osm.attribution) ?? '© OpenStreetMap contributors' }, 'OSM · 用户选择的栅格服务', text(osm.attribution) ?? '© OpenStreetMap contributors');
    if (osmStyle)
        add({ id: 'osm-vector', type: 'vector-style', style: osmStyle, symbols: true }, 'OSM · 用户选择的矢量服务', text(osm.attribution) ?? '© OpenStreetMap contributors');
    if (Array.isArray(demo.basemaps))
        for (const item of demo.basemaps) {
            const map = record(item), id = text(map.id), url = text(map.url), style = text(map.style);
            if (!id)
                throw new Error('token.json: demo.basemaps 的 id 必须非空。');
            if (maps.some(existing => existing.id === id))
                throw new Error('token.json: 底图 id 必须唯一。');
            if (map.scheme !== undefined && !['xyz', 'tms'].includes(String(map.scheme)))
                throw new Error('token.json: scheme 只能是 xyz 或 tms。');
            if (map.type === 'xyz' && url)
                add({ id, type: 'xyz', url, scheme: map.scheme === 'tms' ? 'tms' : 'xyz',
                    maxLevel: typeof map.maxLevel === 'number' ? map.maxLevel : 20, levelOffset: typeof map.levelOffset === 'number' ? map.levelOffset : -1.7,
                    attribution: text(map.attribution) }, text(map.name) ?? id, text(map.attribution) ?? '用户提供服务（请补充许可署名）');
            else if (map.type === 'vector-style' && style)
                add({ id, type: 'vector-style', style, sourceId: text(map.sourceId), symbols: map.symbols !== false,
                    levelOffset: typeof map.levelOffset === 'number' ? map.levelOffset : -1.7 }, text(map.name) ?? id, text(map.attribution) ?? '用户提供服务（请补充许可署名）');
            else
                throw new Error('token.json: 自定义底图需要有效 XYZ 模板或 Style JSON URL。');
        }
    if (!maps.length)
        throw new Error('token.json 未提供可用底图。请填写自己的天地图/MapTiler Key，或 OSM/自建服务地址。');
    const terrainConfig = record(demo.terrain);
    if (terrainConfig.scheme !== undefined && !['xyz', 'tms'].includes(String(terrainConfig.scheme)))
        throw new Error('token.json: DEM scheme 只能是 xyz 或 tms。');
    if (terrainConfig.encoding !== undefined && !['mapbox', 'terrarium'].includes(String(terrainConfig.encoding)))
        throw new Error('token.json: DEM encoding 只能是 mapbox 或 terrarium。');
    const templates = Array.isArray(terrainConfig.urlTemplates) ? terrainConfig.urlTemplates.map(text).filter((url) => !!url) : [];
    let tileJsonUrl = text(terrainConfig.tileJsonUrl);
    const geovis = key(record(config.geovis).terrainToken);
    if (!templates.length && !tileJsonUrl) {
        if (maptiler)
            tileJsonUrl = `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${maptiler}`;
        else if (geovis)
            templates.push(`https://tiles1.geovisearth.com/base/v1/terrain-rgb/{z}/{x}/{y}?format=png&tmsIds=w&token=${geovis}`);
        else
            throw new Error('token.json 未提供 DEM：请配置 demo.terrain 或自己的 MapTiler/GeoVIS 凭据。普通交互 demo 不用合成地形兜底。');
    }
    const initialBaseMap = text(demo.defaultBaseMap) ?? maps[0].id;
    if (!maps.some(map => map.id === initialBaseMap))
        throw new Error('token.json: defaultBaseMap 未匹配可用底图。');
    return { basemaps: maps, initialBaseMap, names, attributions, terrain: new TerrainRgbProvider({ id: 'user-dem',
            urlTemplates: templates.length ? templates : undefined, tileJsonUrl,
            scheme: terrainConfig.scheme === 'tms' ? 'tms' : 'xyz', encoding: terrainConfig.encoding === 'terrarium' ? 'terrarium' : 'mapbox',
            maxLevel: typeof terrainConfig.maxLevel === 'number' ? terrainConfig.maxLevel : 14, attribution: text(terrainConfig.attribution) ?? '用户提供 DEM' }) };
}
export async function loadDemoResources() {
    const response = await fetch(new URL('./token.json', location.href), { cache: 'no-store' });
    if (!response.ok)
        throw new Error('未找到可用 token.json。请按 SDK使用说明填写用户资源配置；未配置前不创建地图。');
    let value;
    try {
        value = await response.json();
    }
    catch {
        throw new Error('token.json 不是有效 JSON；请勿把 HTML 错误页面当作配置。');
    }
    return parseDemoConfig(value);
}
