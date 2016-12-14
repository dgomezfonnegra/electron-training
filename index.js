const electron = require('electron')
const {app, BrowserWindow} = electron
const context = {
  win: null,
  tray: null
}

/**
 * Creates a window pointing to an HTML inside your project
 * @returns {void}
 */
let createWindow = () => {
  context.win = new BrowserWindow({width: 800, height: 600})
  context.win.loadURL(`file://${__dirname}/app/index.html`)

  context.win.on('closed', () => {
    context.win = null
  })
}

const createTray = require('./electron/tray-icon')(app, context, createWindow)

// Basic events handling
app.on('ready', () => {
  createTray()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
