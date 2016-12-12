const electron = require('electron');
const {app, BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

/**
 * Creates a window pointing to an HTML inside your project
 * @returns {void}
 */
let createWindow = () => {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/app/index.html`);

  win.on('closed', () => {
    win = null;
  });
}

// Basic events handling
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
