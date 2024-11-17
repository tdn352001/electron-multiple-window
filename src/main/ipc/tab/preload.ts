import { ipcRenderer, IpcRendererEvent } from 'electron'
import { TabEvents } from './events'

const tabIPC = {
  addNewTab: () => ipcRenderer.send(TabEvents.AddNewTab),
  getTabs: (): Promise<TabState[]> => ipcRenderer.invoke(TabEvents.GetTabs),
  getSelectedTab: (): Promise<TabState | undefined> => ipcRenderer.invoke(TabEvents.GetSelectedTab),
  switchTab: (tabId: string) => ipcRenderer.send(TabEvents.SwitchTab, tabId),
  subscribeTabsChangedListener: (): Promise<
    { listenerId: string; tabsState: TabState[] } | undefined
  > => ipcRenderer.invoke(TabEvents.SubscribeTabsChangedListener),
  unsubscribeTabsChangedListener: (listenerId: string) =>
    ipcRenderer.send(TabEvents.UnsubscribeTabsChangedListener, listenerId),
  onTabsChanged: (
    listenerId: string,
    listener: (e: IpcRendererEvent, tabs: TabState[]) => void
  ) => {
    ipcRenderer.on(TabEvents.OnTabsChanged, listener)
    return () => {
      ipcRenderer.removeListener(TabEvents.OnTabsChanged, listener)
      tabIPC.unsubscribeTabsChangedListener(listenerId)
    }
  },
  subscribeSelectedTabChangedListener: (): Promise<
    { listenerId: string; tabState: TabState | undefined } | undefined
  > => ipcRenderer.invoke(TabEvents.SubscribeSelectedTabChangedListener),
  unsubscribeSelectedTabChangedListener: (listenerId: string) =>
    ipcRenderer.send(TabEvents.UnsubscribeSelectedTabChangedListener, listenerId),
  onSelectedTabChanged: (
    listenerId: string,
    listener: (e: IpcRendererEvent, tab: TabState) => void
  ) => {
    ipcRenderer.on(TabEvents.OnTabSelected, listener)
    return () => {
      ipcRenderer.removeListener(TabEvents.OnTabSelected, listener)
      tabIPC.unsubscribeSelectedTabChangedListener(listenerId)
    }
  },
  goBack: () => ipcRenderer.send(TabEvents.GoBack),
  goForward: () => ipcRenderer.send(TabEvents.GoForward),
  openUrl: (url: string) => ipcRenderer.send(TabEvents.OpenUrl, url)
}

type TabIPC = typeof tabIPC

export { tabIPC, type TabIPC }
