const fs = require('node:fs');
const path = require('node:path');
const { app, BrowserWindow } = require('electron');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function captureTheme(win, theme, width) {
  await win.webContents.executeJavaScript(`localStorage.setItem('depthmap-studio-theme', '${theme}')`);
  await win.webContents.reload();
  await delay(300);
  win.setContentSize(width, 820);
  await delay(150);
  const image = await win.webContents.capturePage();
  const outDir = path.join(__dirname, '..', 'qa');
  fs.mkdirSync(outDir, { recursive: true });
  const output = path.join(outDir, `${theme}-${width}.png`);
  fs.writeFileSync(output, image.toPNG());
  process.stdout.write(`${output}\n`);
}

async function run() {
  const win = new BrowserWindow({
    width: 1440,
    height: 860,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  await win.loadFile(path.join(__dirname, '..', 'index.html'));
  await captureTheme(win, 'dark', 1440);
  await captureTheme(win, 'light', 1440);
  await captureTheme(win, 'dark', 1180);
  win.destroy();
  app.quit();
}

app.whenReady().then(run).catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  app.exit(1);
});
