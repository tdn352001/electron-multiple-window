import { ipcMain } from 'electron'
import { windowCreator } from '../../windows/creator'
import windowManager from '../../windows/manager'
import { WindowEvents } from './events'

class WindowIpcHandler {
  handleRerenderEvents() {
    ipcMain.on(WindowEvents.OpenBrowserWindow, () => {
      const win = windowCreator.createBrowserWindow()
      windowManager.addWindow(win)
    })
  }
}

const windowIpcHandler = new WindowIpcHandler()

export default windowIpcHandler
