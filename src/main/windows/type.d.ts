import { BrowserWindow } from 'electron'

class CustomWindow implements BrowserWindow {
  on(event: 'tabs-changed', listener: (event: Event, command: string) => void): this
  off(event: 'tabs-changed', listener: (event: Event, command: string) => void): this
  once(event: 'tabs-changed', listener: (event: Event, command: string) => void): this
  addListener(event: 'tabs-changed', listener: (event: Event, command: string) => void): this
  removeListener(event: 'tabs-changed', listener: (event: Event, command: string) => void): this
}
