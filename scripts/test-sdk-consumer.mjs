import assert from 'node:assert/strict';
import { readFile, readdir, realpath, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { sanitizeResourceConfig } from './public-resource-config.mjs';
import { Viewer, UrlTemplateRasterProvider } from 'spring-and-autumn-gis';

const app = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(app + 'package.json');
const entry = await realpath(require.resolve('spring-and-autumn-gis'));
assert.ok(entry.startsWith(await realpath(app + 'node_modules')), 'Must consume installed dist, not linked source');
assert.equal(typeof Viewer.create, 'function');
for (const method of ['setBaseMap', 'setTerrainEnabled', 'setLodGridVisible', 'flyTo', 'getCameraViewState', 'start', 'stop', 'destroy', 'getBaseMaps']) assert.equal(typeof Viewer.prototype[method], 'function');
const provider = new UrlTemplateRasterProvider({ urlTemplate: '/tiles/{z}/{x}/{-y}.png' });
assert.equal(provider.url({ level: 2, x: 1, y: 0 }), '/tiles/2/1/3.png');
const sanitized = sanitizeResourceConfig({ tianditu: { token: 'public-test', serverToken: 'private-test' }, mapbox: { serverToken: 'private-test' }, demo: {} });
assert.ok(!JSON.stringify(sanitized).includes('private-test'));
for (const html of ['index.html', 'sdk.html', 'sdk-js.html']) await access(app + 'dist/' + html);
const files = (await readdir(app + 'dist', { recursive: true })).filter(file => /\.(js|html|json)$/.test(file) && !file.endsWith('token.json'));
let localConfig;
try { localConfig = JSON.parse(await readFile(app + 'token.json', 'utf8')); } catch {}
const credentials = [];
const visit = object => { for (const [key, value] of Object.entries(object ?? {})) {
  if (typeof value === 'string' && /token|key|secret/i.test(key) && value.length > 8 && !/YOUR_|REPLACE_/i.test(value)) credentials.push(value);
  else if (value && typeof value === 'object') visit(value);
} };
visit(localConfig);
for (const file of files) {
  const contents = await readFile(app + 'dist/' + file, 'utf8');
  assert.ok(!contents.includes('E:/SpringAndAutumnGIS/') && !contents.includes('E:\\SpringAndAutumnGIS\\'), 'Application bundle must not depend on engine workspace');
  for (const credential of credentials) assert.ok(!contents.includes(credential), `Credential leaked into built file ${file} (value suppressed)`);
}
console.log('Installed SDK dist, public interfaces, XYZ/TMS, TS/JS built pages and private credential isolation passed.');
