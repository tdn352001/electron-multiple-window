import { tabIPC } from '@main/ipc/tab/preload'
import { windowIPC } from '@main/ipc/window/preload'
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('windowIPC', windowIPC)
contextBridge.exposeInMainWorld('tabIPC', tabIPC)
