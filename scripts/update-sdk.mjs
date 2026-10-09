import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, mkdir, realpath } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// Explicit update only. Never runs engine build, launches a service or creates a consumer.
const app = fileURLToPath(new URL('../', import.meta.url));
const engine = resolve(process.env.SDK_ENGINE_DIR ?? 'E:/SpringAndAutumnGIS/SpringAndAutumnGIS');
const manifest = JSON.parse(await readFile(join(engine, 'package.json'), 'utf8'));
assert.equal(manifest.name, 'spring-and-autumn-gis');
const built = await readFile(join(engine, 'dist/spring-and-autumn-gis.es.js'));
const vendor = join(app, 'vendor'); await mkdir(vendor, { recursive: true });
assert.ok(process.env.npm_execpath, 'Run this updater through npm run sdk:update');
function npm(args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [process.env.npm_execpath, ...args], { cwd, windowsHide: true, stdio: 'pipe' });
    let output = '', error = '';
    child.stdout.on('data', data => { output += data; }); child.stderr.on('data', data => { error += data; });
    child.on('error', reject); child.on('exit', code => code === 0 ? resolve(output) : reject(new Error(`npm failed (${code}): ${error}`)));
  });
}
const packed = JSON.parse(await npm(['pack', '--ignore-scripts', '--json', '--pack-destination', vendor], engine))[0];
assert.ok(packed.files.some(file => file.path === 'dist/sdk/Viewer.d.ts'));
assert.ok(packed.files.every(file => !/^(src|examples|scripts|public)\//.test(file.path) && !/(^|\/)token\.json$/.test(file.path)), 'SDK package must contain only built library and public documentation');
const dependency = `file:vendor/${packed.filename}`;
console.log(await npm(['install', dependency, '--no-audit', '--no-fund'], app));
const installed = await realpath(join(app, 'node_modules/spring-and-autumn-gis'));
assert.ok(installed.startsWith(await realpath(join(app, 'node_modules'))), 'SDK must be installed, not linked to the engine source repository');
assert.ok(built.equals(await readFile(join(installed, 'dist/spring-and-autumn-gis.es.js'))), 'Installed SDK differs from the engine dist snapshot');
const require = createRequire(join(app, 'package.json'));
assert.equal(typeof require('spring-and-autumn-gis').Viewer.create, 'function');
console.log(`SDK dist installed: ${manifest.version}; ${dependency}. Daily dev/build/preview do not read the engine repository.`);
