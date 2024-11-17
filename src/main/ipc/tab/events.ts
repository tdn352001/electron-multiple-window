export const TabEvents = {
  AddNewTab: 'add-new-tab',
  GetTabs: 'get-tabs',
  SwitchTab: 'switch-tab',
  GetSelectedTab: 'get-selected-tab',
  SubscribeTabsChangedListener: 'subscribe-tabs-changed-listener',
  UnsubscribeTabsChangedListener: 'unsubscribe-tabs-changed-listener',
  OnTabsChanged: 'on-tabs-changed',
  SubscribeSelectedTabChangedListener: 'subscribe-selected-tab-changed-listener',
  UnsubscribeSelectedTabChangedListener: 'unsubscribe-selected-tab-changed-listener',
  OnTabSelected: 'on-tab-selected',
  GoBack: 'go-back',
  GoForward: 'go-forward',
  OpenUrl: 'open-url'
} as const
