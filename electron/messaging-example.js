/**
 * Module to manage all the channels needed between the ipcMain process and the
 * ipcRenderer process
 * @param {Object} app -> with the instance of the electron app
 * @param {Object} ipcMain -> with the ipcMain process
 * @param {Object} dialog -> with the dialog helper
 * @param {Object} context -> with the instance of the application context
 * @returns {void}
 */
module.exports = (app, ipcMain, dialog, context) => {
  const fs = require('fs')
  let messages = (message, text) => context.win.webContents.send(message, text)

  ipcMain.on('file-request', (event, type) => dialog.showOpenDialog(
    context.win,
    {properties: [type]},
    (filePath) => {
      if (filePath && filePath.length) {
        messages('file-back', fs.readFileSync(filePath[0], 'utf8'))
      }
    })
  )

  ipcMain.on('file-saving', (event, text) => dialog.showSaveDialog(
    context.win,
    {buttonLabel: 'Save Text File'},
    (filePath) => {
      if (filePath) {
        fs.writeFileSync(filePath, text, 'utf8')
      }
    })
  )
}
