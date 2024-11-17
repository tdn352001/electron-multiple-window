import { tabCreator } from '@main/tabs/creator'
import windowManager from '@main/windows/manager'
import { ipcMain } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import { TabEvents } from './events'

class TabIpcHandler {
  initialize() {
    const tabSubscriptions = new Map<string, (...args: any[]) => void>()

    ipcMain.on(TabEvents.AddNewTab, (e) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        const tab = tabCreator.createTab()
        win.addTab(tab)
      }
    })

    ipcMain.handle(TabEvents.GetTabs, (e) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        return win.tabs.map((t) => t.state)
      }
      return []
    })

    ipcMain.handle(TabEvents.GetSelectedTab, (e) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        return win.selectedTab?.state
      }
    })

    ipcMain.on(TabEvents.SwitchTab, (e, tabId: string) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        win.setSelectedTab(tabId)
      }
    })

    ipcMain.handle(TabEvents.SubscribeTabsChangedListener, (e) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        const listenerId = uuidv4()
        const handleTabChanged = (tabs: TabState[]) => {
          e.sender.send(TabEvents.OnTabsChanged, tabs)
        }

        win.tabEvents.on('tabs-changed', handleTabChanged)

        tabSubscriptions.set(listenerId, handleTabChanged)
        return { listenerId, tabsState: win.tabStates }
      }
    })

    ipcMain.on(TabEvents.UnsubscribeTabsChangedListener, (e, listenerId: string) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        const listener = tabSubscriptions.get(listenerId)
        if (listener) {
          win.tabEvents.off('tabs-changed', listener)
          tabSubscriptions.delete(listenerId)
        }
      }
    })

    ipcMain.handle(TabEvents.SubscribeSelectedTabChangedListener, (e) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        const listenerId = uuidv4()
        const handleSelectedTabChanged = (tab: TabState) => {
          e.sender.send(TabEvents.OnTabSelected, tab)
        }

        win.tabEvents.on('selected-tab-changed', handleSelectedTabChanged)

        tabSubscriptions.set(listenerId, handleSelectedTabChanged)
        return { listenerId, tabState: win.selectedTab?.state }
      }
    })

    ipcMain.on(TabEvents.UnsubscribeSelectedTabChangedListener, (e, listenerId: string) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win) {
        const listener = tabSubscriptions.get(listenerId)
        if (listener) {
          win.tabEvents.off('selected-tab-changed', listener)
          tabSubscriptions.delete(listenerId)
        }
      }
    })

    ipcMain.on(TabEvents.GoBack, (e) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win && win.selectedTab) {
        win.selectedTab.view.webContents.goBack()
      }
    })

    ipcMain.on(TabEvents.GoForward, (e) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win && win.selectedTab) {
        win.selectedTab.view.webContents.goForward()
      }
    })

    ipcMain.on(TabEvents.OpenUrl, (e, url: string) => {
      const win = windowManager.windowFromContents(e.sender)
      if (win && win.selectedTab) {
        win.selectedTab.view.webContents.loadURL(url)
      }
    })
  }
}

const tabIpcHandler = new TabIpcHandler()

export default tabIpcHandler
