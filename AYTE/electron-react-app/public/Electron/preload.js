const { contextBridge, ipcRenderer } = require('electron');

console.log('load correctly');

contextBridge.exposeInMainWorld('electron', {
  print: (options) => ipcRenderer.send('print', options)
});
