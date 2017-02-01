const electron = require('electron')
const contextMenu = require('./electron/context-menu')
const createTray = require('./electron/tray-icon')
const messaging = require('./electron/messaging-example')
const {app, BrowserWindow, Menu, ipcMain, dialog} = electron
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
  Menu.setApplicationMenu(Menu.buildFromTemplate(contextMenu(app, 'develop-full')))
}

// Basic events handling
app.on('ready', () => {
  createTray(app, context, createWindow)()
  messaging(app, ipcMain, dialog, context)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
