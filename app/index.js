/**
 * Main execution of the Trafficking Sheet:
 * 1 -> Button to load the excel file with the placement from UM
 * 2 -> Tactic id table to fill the creatives to launch
 * 3 -> Button to fill the information from the inputs and save the excel file
 * 4 -> Button to open the current version of the openOutput
 * @returns {void}
 */
(() => {
  'use strict'

  const electron = require('electron')
  const {ipcRenderer} = electron

  // Object to store all DOM elements
  let elements = {
    loadFile: document.querySelector('#load-file'),
    saveFile: document.querySelector('#save-file'),
    displayText: document.querySelector('#display-text')
  }

  // Object to store all event handlers
  let handlers = {
    /**
     * Handler to request the file load to the ipcMain process
     * @returns {void}
     */
    loadFile: () => ipcRenderer.send('file-request', 'openFile'),
    /**
     * Handler to request the file saving to the ipcMain process
     * @returns {void}
     */
    saveFile: () => ipcRenderer.send('file-saving', elements.displayText.value),
    /**
     * Opens a channel to listen the ipcMain process for a file path
     * @param {Object} event -> with the ipcMain event
     * @param {String} fileText -> with the file text
     * @returns {void}
     */
    ipcRenderer: (event, fileText) => {
      elements.displayText.value = fileText
    }
  }

  elements.loadFile.addEventListener('click', handlers.loadFile)
  elements.saveFile.addEventListener('click', handlers.saveFile)
  ipcRenderer.on('file-back', handlers.ipcRenderer)
})()
