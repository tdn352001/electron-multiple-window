import { type TabIPC } from '../main/ipc/tab/preload'
import { type WindowIPC } from '../main/ipc/window/preload'
declare global {
  interface Window {
    windowIPC: WindowIPC
    tabIPC: TabIPC
  }
}
