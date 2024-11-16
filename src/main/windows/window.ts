import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

export enum WindowType {
  Node = 'node',
  Browser = 'browser'
}

export interface WindowState {
  type: WindowType
}

export class AppWindow extends BrowserWindow {
  state: WindowState
  constructor(type: WindowType, options: BrowserWindowConstructorOptions) {
    super(options)
    this.state = { type }
  }
}
