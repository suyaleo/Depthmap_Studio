const path = require('node:path');
const { app, BrowserWindow } = require('electron');

async function run() {
  const win = new BrowserWindow({
    width: 1180,
    height: 800,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });

  await win.loadFile(path.join(__dirname, '..', 'index.html'));
  const result = await win.webContents.executeJavaScript(`(() => {
    const required = ['startBtn', 'cancelBtn', 'syncPlayBtn', 'inStage', 'outStage', 'mode', 'depthModel', 'progressBar', 'log', 'themeSelect'];
    const missing = required.filter(id => !document.getElementById(id));
    const select = document.getElementById('themeSelect');
    select.value = 'light';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    const light = document.documentElement.dataset.theme;
    select.value = 'dark';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    const dark = document.documentElement.dataset.theme;
    return {
      missing,
      light,
      dark,
      title: document.title,
      startDisabled: document.getElementById('startBtn').disabled,
      hasAppSwitcher: !!document.querySelector('[data-app-switcher], .app-switcher, .global-sidebar'),
      bodyOverflow: getComputedStyle(document.body).overflow,
      secureContext: window.isSecureContext,
      directoryPicker: typeof window.showDirectoryPicker === 'function',
      savePicker: typeof window.showSaveFilePicker === 'function'
    };
  })()`);

  if (result.missing.length || result.light !== 'light' || result.dark !== 'dark' || result.title !== 'Depthmap Studio' || !result.startDisabled || result.hasAppSwitcher || !result.secureContext || !result.directoryPicker || !result.savePicker) {
    throw new Error(`Smoke check failed: ${JSON.stringify(result)}`);
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  win.destroy();
  app.quit();
}

app.whenReady().then(run).catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  app.exit(1);
});
