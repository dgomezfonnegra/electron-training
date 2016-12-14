module.exports = (app, context, createWindow) => {
  const electron = require('electron')
  const {Menu, Tray} = electron

  /**
   * Builds the Tray menu
   * @returns {void}
   */
  let createTray = () => {
    context.tray = new Tray(`${__dirname}/../tray-icon.png`)

    const trayMenu = Menu.buildFromTemplate([
      {
        label: 'Main Window',
        click () {
          if (!context.win) {
            createWindow()
          } else {
            context.win.isVisible() ? context.win.hide() : context.win.show()
          }
        }
      },
      {
        label: 'Open Help',
        click () { electron.shell.openExternal('http://electron.atom.io') }
      }
    ])
    context.tray.setToolTip('Electron Examples.')
    context.tray.setContextMenu(trayMenu)
  }

  return createTray
}
