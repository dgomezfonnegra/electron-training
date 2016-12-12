module.exports = (app, mode) => {

  /**
   * Creates a base menu with just a way to quit the app
   * @returns {Array} With the new context menu template
   */
  let buildBase = () => [
    {
      label: 'Application',
      submenu: [
        { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
      ]
    }
  ]

  /**
   * Creates a base version of the normal keyboard helpers like copy, paste, select all
   * @returns {Array} With the new context menu template
   */
  let buildHelpers = () => {
    contextMenu.push({
      label: 'Helpers',
      submenu: [
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
      ]
    })
  }

  /**
   * Creates a complex version for some helpers that helps the dev process
   * @returns {Array} With the new context menu template
   */
  let buildDevHelpers = () => {
    contextMenu.push({
      label: 'Helpers',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          }
        },
        {
          type: 'separator'
        },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
      ]
    })
  }

  /**
   * Adds a custom menu
   * @returns {void}
   */
  let attachCustomMenu = () => {
    contextMenu.push({
      label: 'Custom',
      submenu: [
        {
          label: 'Open Electron Documentation',
          accelerator: 'CmdOrCtrl+G',
          click: () => require('electron').shell.openExternal('http://electron.atom.io/docs')
        }
      ]
    })
  }

  let contextMenu = buildBase()

  switch (mode) {
  case 'base-with-helpers':
    buildHelpers()
    break
  case 'base-with-custom':
    attachCustomMenu()
    break
  case 'base-full':
    buildHelpers()
    attachCustomMenu()
    break
  case 'develop':
    buildDevHelpers()
    break
  case 'develop-full':
    buildDevHelpers()
    attachCustomMenu()
    break
  }

  return contextMenu;
}
