const { app, BrowserWindow, Menu } = require('electron');
const {join} = require("path");

// 禁止显示默认菜单
Menu.setApplicationMenu(null);
process.env.DIST = join(__dirname, '../../')
const indexHtml = join(process.env.DIST, 'dist/index.html')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  if (process.env.NODE_ENV == 'production') {
     win.loadFile(indexHtml);
  }
  else{
    win.loadURL('http://127.0.0.1:5173/')
    win.webContents.openDevTools()  // 打开控制台
  }
 
  
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});