import { is } from '@electron-toolkit/utils'
import { tabCreator } from '@main/tabs/creator'
import { BrowserWindowConstructorOptions, shell } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { AppWindow, WindowType } from './window'

export const windowCreator = {
  createNodeWindow(options: BrowserWindowConstructorOptions = {}) {
    const win = new AppWindow(WindowType.Node, {
      width: 400,
      height: 600,
      x: 20,
      y: 20,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      },
      ...options
    })

    win.on('ready-to-show', () => {
      win.show()
    })

    win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      console.log('ELECTRON_RENDERER_URL', process.env['ELECTRON_RENDERER_URL'])
      win.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/node.html')
    } else {
      win.loadFile(join(__dirname, '../renderer/node.html'))
    }
    return win
  },
  createBrowserWindow(options: BrowserWindowConstructorOptions = {}) {
    console.log('create browser window')
    // Create the browser window.
    const win = new AppWindow(WindowType.Browser, {
      width: 900,
      height: 670,
      minWidth: 600,
      minHeight: 500,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      },
      ...options
    })

    const tab = tabCreator.createTab()
    win.addTab(tab)

    win.on('ready-to-show', () => {
      win.show()
    })

    win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      console.log('ELECTRON_RENDERER_URL', process.env['ELECTRON_RENDERER_URL'])
      win.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/browser.html')
    } else {
      win.loadFile(join(__dirname, '../renderer/browser.html'))
    }

    return win
  }
}
