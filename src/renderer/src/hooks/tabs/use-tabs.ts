import { useEffect, useState } from 'react'

export const useTabs = () => {
  const [listenerId, setListenerId] = useState<string | undefined>(undefined)
  const [tabs, setTabs] = useState<TabState[]>([])

  useEffect(() => {
    window.tabIPC.subscribeTabsChangedListener().then((state) => {
      if (!state) {
        return
      }
      setListenerId(state.listenerId)
      setTabs(state.tabsState)
    })
  }, [])

  useEffect(() => {
    if (listenerId) {
      const removeTabsChangedListener = window.tabIPC.onTabsChanged(listenerId, (_, tabs) => {
        setTabs(tabs)
      })

      return () => {
        removeTabsChangedListener()
      }
    }
  }, [listenerId])

  return {
    tabs
  }
}
