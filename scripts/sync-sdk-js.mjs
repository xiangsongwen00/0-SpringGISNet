import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const app = fileURLToPath(new URL('../', import.meta.url));
const check = process.argv.includes('--check');
const banner = '// Generated from the TS playground by npm run sdk:sync-js. No TS runtime required.\n';
for (const [source, target] of [['demo.ts', 'demo-js.js'], ['demo-data.ts', 'demo-data.js'], ['demo-config.ts', 'demo-config.js']]) {
  const input = await readFile(app + 'sdk/' + source, 'utf8');
  const output = banner + ts.transpileModule(input, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }, fileName: source }).outputText
    .replace(/from '\.\/(demo-data|demo-config)'/g, "from './$1.js'");
  if (check) {
    if ((await readFile(app + 'sdk/' + target, 'utf8')).replace(/\r\n/g, '\n') !== output.replace(/\r\n/g, '\n')) throw new Error(`${target} stale; run npm run sdk:sync-js`);
  } else await writeFile(app + 'sdk/' + target, output);
}
const html = (await readFile(app + 'sdk.html', 'utf8')).replace('src="./sdk/demo.ts"', 'src="./sdk/demo-js.js"').replace('· TypeScript', '· JavaScript ES6');
if (check) {
  if ((await readFile(app + 'sdk-js.html', 'utf8')).replace(/\r\n/g, '\n') !== html.replace(/\r\n/g, '\n')) throw new Error('sdk-js.html stale');
} else await writeFile(app + 'sdk-js.html', html);
console.log(`Independent TS/ES6 playground ${check ? 'synchronized' : 'generated'}.`);
