import { WebContents } from 'electron'
import { AppWindow } from './window'

class WindowManager {
  private windows: AppWindow[] = []

  addWindow(window: AppWindow) {
    window.on('closed', () => {
      this.removeWindow(window)
    })
    this.windows.push(window)
  }

  removeWindow(window: AppWindow) {
    this.windows = this.windows.filter((w) => w !== window)
  }
  windowFromContents(contents: WebContents) {
    return this.windows.find((w) => w.webContents.id === contents.id)
  }
}

const windowManager = new WindowManager()

export default windowManager
