import { Tab } from '@main/tabs/tab'
import { BrowserWindow, BrowserWindowConstructorOptions, Rectangle } from 'electron'
import EventEmitter from 'events'

export enum WindowType {
  Node = 'node',
  Browser = 'browser'
}

export interface WindowState {}

interface WindowEvents {
  'tabs-changed': [tabs: TabState[]]
  'selected-tab-changed': [tab: TabState]
}

export class AppWindow extends BrowserWindow {
  state: WindowState
  private readonly _type: WindowType
  private _selectedTab: Tab | undefined
  private _tabs: Tab[]
  private _tabEvents: EventEmitter<WindowEvents>

  constructor(type: WindowType, options: BrowserWindowConstructorOptions) {
    super(options)
    this._type = type
    this.state = {}
    this._tabs = []
    this._tabEvents = new EventEmitter()

    this.on('resize', this.handleWindowResize)
  }

  get type() {
    return this._type
  }

  get tabs() {
    if (this.type === WindowType.Node) {
      throw new Error('Node window does not support tabs')
    }
    return this._tabs
  }

  get tabStates() {
    return this.tabs.map((tab) => tab.state)
  }

  get selectedTab() {
    return this._selectedTab
  }

  get tabEvents() {
    return this._tabEvents
  }

  private handleWindowResize() {
    const selectedTab = this.selectedTab
    if (selectedTab) {
      this.setTabBounds(selectedTab)
    }
  }

  setSelectedTab(tabId: string) {
    const currentTab = this.selectedTab
    if (currentTab && currentTab.id === tabId) {
      return
    }

    const selectedTab = this.tabs.find((tab) => tab.id === tabId)
    this._selectedTab = selectedTab

    if (selectedTab) {
      this.setTabBounds(selectedTab)
      selectedTab.view.setVisible(true)
      this.contentView.addChildView(selectedTab.view)
      this.emitSelectedTabChanged()
    }

    currentTab?.view.setVisible(false)
  }

  emitTabsChanged() {
    this._tabEvents.emit('tabs-changed', this.tabStates)
  }

  emitSelectedTabChanged() {
    const selectedTab = this.selectedTab
    if (selectedTab) {
      this._tabEvents.emit('selected-tab-changed', selectedTab.state)
    }
  }

  addTab(tab: Tab, selected: boolean = true) {
    this._tabs.push(tab)
    tab.view.setVisible(false)
    this.contentView.addChildView(tab.view)
    this.emitTabsChanged()
    tab.on('state-changed', () => {
      this.emitTabsChanged()
      if (tab === this.selectedTab) {
        this.emitSelectedTabChanged()
      }
    })

    if (selected) {
      this.setTabBounds(tab)
      this.setSelectedTab(tab.id)
    }
  }

  // removeTab(tabId: string) {
  //   const tab = this.tabs.find((tab) => tab.id === tabId)
  //   if (tab) {
  //     this._tabs = this._tabs.filter((tab) => tab.id !== tabId)
  //   }
  // }

  private setTabBounds(tab: Tab, bounds?: Rectangle) {
    const { width, height } = this.getContentBounds()
    const sideBarWidth = 280
    const navbarHeight = 64
    tab.setBounds(
      bounds || {
        x: sideBarWidth,
        y: navbarHeight,
        width: width - sideBarWidth,
        height: height - navbarHeight
      }
    )
  }
}
