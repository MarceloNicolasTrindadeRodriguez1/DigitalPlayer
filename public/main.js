const { Alert } = require('@mui/material');
const { app, BrowserWindow } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize();

console.log('__dirname', __dirname);
const createWindow = async() =>{
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    fullscreen: true,
    icon: path.join(__dirname, 'public', 'icon.png'), 
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true, 
    },
  });
  let isDev = (await import('electron-is-dev')).default;
  
  win.loadURL(
    isDev
    
    ? 'http://localhost:3000'
    
    : `file://${path.join(__dirname, '../build/index.html')}`
    
    );
  
  }

app.whenReady().then(createWindow);

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
