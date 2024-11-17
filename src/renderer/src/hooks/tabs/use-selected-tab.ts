import { useEffect, useState } from 'react'

export const useSelectedTab = () => {
  const [listenerId, setListenerId] = useState<string | undefined>(undefined)
  const [tab, setTab] = useState<TabState | undefined>(undefined)

  useEffect(() => {
    window.tabIPC.subscribeSelectedTabChangedListener().then((state) => {
      console.log({ state })

      if (!state) {
        return
      }
      setListenerId(state.listenerId)
      setTab(state.tabState)
    })
  }, [])

  useEffect(() => {
    if (listenerId) {
      const removeSelectedTabChangedListener = window.tabIPC.onSelectedTabChanged(
        listenerId,
        (_, tab) => {
          setTab(tab)
        }
      )

      return () => {
        removeSelectedTabChangedListener()
      }
    }
  }, [listenerId])

  return {
    tab
  }
}
