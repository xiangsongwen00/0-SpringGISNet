import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { readPublicResourceConfig } from './public-resource-config.mjs';

const app = fileURLToPath(new URL('../', import.meta.url));
await readFile(app + 'dist/sdk.html'); // Build first; never writes into another directory.
const config = await readPublicResourceConfig(app + 'token.json');
await writeFile(app + 'dist/token.json', JSON.stringify(config, null, 2));
console.log('Your browser-only resource config deployed to dist/token.json. Server fields omitted. Do not publish your local configuration as a shared SDK sample.');
