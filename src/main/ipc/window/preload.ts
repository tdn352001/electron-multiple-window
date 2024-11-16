import { ipcRenderer } from 'electron'
import { WindowEvents } from './events'

const windowIPC = {
  openBrowserWindow: () => ipcRenderer.send(WindowEvents.OpenBrowserWindow)
}

type WindowIPC = typeof windowIPC

export { windowIPC, type WindowIPC }
