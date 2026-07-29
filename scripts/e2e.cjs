const fs = require('node:fs');
const path = require('node:path');
const { app, BrowserWindow } = require('electron');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitFor(win, expression, timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await win.webContents.executeJavaScript(expression)) return;
    await delay(500);
  }
  throw new Error(`Timed out after ${timeoutMs}ms: ${expression}`);
}

async function run() {
  const samplePath = path.join(__dirname, '..', 'tests', 'fixtures', 'sample.mp4');
  const sample = fs.readFileSync(samplePath).toString('base64');
  const win = new BrowserWindow({
    width: 1180,
    height: 800,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });

  await win.loadFile(path.join(__dirname, '..', 'index.html'));
  await win.webContents.executeJavaScript(`(() => {
    const bytes = Uint8Array.from(atob('${sample}'), c => c.charCodeAt(0));
    const file = new File([bytes], 'studio-e2e.mp4', { type: 'video/mp4' });
    const transfer = new DataTransfer();
    transfer.items.add(file);
    const input = document.getElementById('fileInput');
    input.files = transfer.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('fps').value = '8';
    document.getElementById('maxSide').value = '512';
  })()`);

  await waitFor(win, `!document.getElementById('startBtn').disabled`, 15_000);
  await win.webContents.executeJavaScript(`document.getElementById('startBtn').click()`);
  await waitFor(win, `document.querySelectorAll('#downloadBtns .dl-btn').length > 0 || document.getElementById('log').textContent.includes('오류') || document.getElementById('log').textContent.includes('Error')`, 240_000);

  const result = await win.webContents.executeJavaScript(`(() => ({
    status: document.getElementById('statusLine').textContent,
    progress: document.getElementById('progressText').textContent,
    downloads: document.querySelectorAll('#downloadBtns .dl-btn').length,
    log: document.getElementById('log').textContent
  }))()`);

  if (!result.downloads || result.progress !== '100%') throw new Error(`E2E failed: ${JSON.stringify(result)}`);
  process.stdout.write(`${JSON.stringify({ status: result.status, progress: result.progress, downloads: result.downloads }, null, 2)}\n`);
  win.destroy();
  app.quit();
}

app.whenReady().then(run).catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  app.exit(1);
});
