import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, '../electron/preload.js'), // Ajusta la ruta aquí
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  ipcMain.on('print', (event, options) => {
    win.webContents.print(options, (success, errorType) => {
      if (!success) console.log(errorType);
    });
  });

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.on('ready', () => {
  session.defaultSession.setCertificateVerifyProc((request, callback) => {
    callback(0); // 0 significa que el certificado es válido
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
