import { readFile } from 'node:fs/promises';

const pick = (object, keys) => Object.fromEntries(keys.filter(key => object?.[key] !== undefined).map(key => [key, object[key]]));
export function sanitizeResourceConfig(source) {
  return {
    tianditu: pick(source.tianditu, ['token']), maptiler: pick(source.maptiler, ['key']),
    geovis: pick(source.geovis, ['terrainToken']), osm: pick(source.osm, ['rasterUrl', 'styleUrl', 'attribution']),
    demo: { defaultBaseMap: source.demo?.defaultBaseMap,
      basemaps: (source.demo?.basemaps ?? []).map(map => pick(map, ['id', 'name', 'type', 'url', 'style', 'scheme', 'sourceId', 'maxLevel', 'levelOffset', 'symbols', 'attribution'])),
      terrain: pick(source.demo?.terrain, ['urlTemplates', 'tileJsonUrl', 'scheme', 'encoding', 'maxLevel', 'attribution']) }
  };
}
export async function readPublicResourceConfig(path) {
  return sanitizeResourceConfig(JSON.parse(await readFile(path, 'utf8')));
}
export function resourceConfigPlugin(configPath) {
  const attach = server => { server.middlewares.use(async (request, response, next) => {
    if (request.url?.split('?')[0] !== '/token.json') { next(); return; }
    response.setHeader('Cache-Control', 'no-store'); response.setHeader('Content-Type', 'application/json; charset=utf-8');
    try { response.end(JSON.stringify(await readPublicResourceConfig(configPath))); }
    catch { response.statusCode = 404; response.end(JSON.stringify({ error: 'Please provide your own token.json; no map credentials are supplied.' })); }
  }); };
  return { name: 'runtime-public-resource-config', configureServer: attach, configurePreviewServer: attach };
}
