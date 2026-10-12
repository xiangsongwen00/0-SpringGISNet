import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, sep, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

// Serves THIS application's existing dist. No engine source, pack/install step,
// temporary consumer or external tile service is used by the smoke tests.
const app = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(app, 'dist');
await readFile(join(dist, 'sdk.html'));
const server = createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(dist, path.slice(1) || 'index.html');
    assert.ok(file.startsWith(dist + sep));
    if (path === '/token.json') throw new Error('Credentials not served in automated tests');
    const data = await readFile(file);
    response.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' })[extname(file)] ?? 'application/octet-stream');
    response.end(data);
  } catch { response.writeHead(404); response.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function checkPage(path, expectedStatus) {
  const profile = await mkdtemp(join(tmpdir(), 'springgis-browser-'));
  const url = base + path;
  const child = spawn(chrome, ['--headless', '--no-first-run', '--disable-extensions', '--window-size=1440,900',
    '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox',
    '--disable-background-networking', '--remote-debugging-port=0', `--user-data-dir=${profile}`, url], { windowsHide: true, stdio: 'ignore' });
  let launchError, socket;
  child.on('error', error => { launchError = error; });
  const deadline = Date.now() + 60000;
  try {
    let port;
    while (!port && Date.now() < deadline) {
      if (launchError) throw launchError;
      try { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; } catch { await pause(100); }
    }
    assert.ok(port, 'Chrome did not start; set CHROME_PATH');
    let page;
    while (!page && Date.now() < deadline) {
      page = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(target => target.type === 'page' && target.url === url);
      if (!page) await pause(100);
    }
    assert.ok(page, 'Built SDK page did not open');
    socket = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    const pending = new Map(); let id = 0;
    socket.onmessage = ({ data }) => { const message = JSON.parse(data); if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id); } };
    const evaluate = expression => new Promise(resolve => { const callId = ++id; pending.set(callId, resolve); socket.send(JSON.stringify({ id: callId, method: 'Runtime.evaluate', params: { expression, returnByValue: true, awaitPromise: true } })); });
    let state;
    do {
      state = (await evaluate('(()=>{const frame=document.querySelector(".sdk-frame iframe");const doc=frame?.contentDocument??document;return {status:doc.querySelector("#result")?.dataset.status,text:doc.querySelector("#result")?.textContent,canvases:doc.querySelectorAll("#map canvas").length,iframes:document.querySelectorAll(".sdk-frame iframe").length};})()')).result?.result?.value;
      if (['passed', 'failed', 'blocked'].includes(state?.status)) break;
      await pause(100);
    } while (Date.now() < deadline);
    assert.equal(state?.status, expectedStatus, state?.text ?? 'Page timed out');
    assert.equal(state.canvases, expectedStatus === 'passed' ? 1 : 0);
    if (path === '/') assert.equal(state.iframes, 1, 'Existing Vue website must embed the independent SDK page');
    if (expectedStatus === 'passed') {
      const toolbar = (await evaluate(`(async()=>{const frame=document.querySelector('.sdk-frame iframe');const doc=frame?.contentDocument??document;const buttons=[...doc.querySelectorAll('.sag-tools button')];const opened=[];for(const button of buttons){button.click();await Promise.resolve();const panel=[...doc.querySelectorAll('.sag-tool-panel')].find(item=>!item.hidden&&getComputedStyle(item).display!=='none');if(panel)opened.push(button.getAttribute('aria-label')||button.title||'?');button.click();await Promise.resolve();}return{buttons:buttons.length,opened:[...new Set(opened)]};})()`)).result?.result?.value;
      assert.ok(toolbar?.buttons >= 7, 'SDK toolbar buttons missing');
      assert.ok(toolbar?.opened.length >= 3, `SDK toolbar popups did not open: ${JSON.stringify(toolbar)}`);
    }
    console.log(`${path}: ${state.text}`);
  } finally {
    socket?.close();
    if (child.exitCode === null && !launchError) { const exited = new Promise(resolve => child.once('exit', resolve)); child.kill(); await exited; }
    // Exact owned Chrome profile only, no user browser data.
    await rm(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 250 });
  }
}
try {
  await checkPage('/sdk.html?smoke=1', 'passed');
  await checkPage('/sdk-js.html?smoke=1', 'passed');
  await checkPage('/sdk.html', 'blocked');
  await checkPage('/sdk-js.html', 'blocked');
  await checkPage('/', 'blocked');
  console.log('Independent application dist: TS/ES6 controls, real Worker, persistent globe and missing-config gating passed.');
} finally { await new Promise(resolve => server.close(resolve)); }
