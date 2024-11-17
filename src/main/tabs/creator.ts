import { Tab } from '@main/tabs/tab'
import { viewCreator } from '@main/views/creator'

const tabCreator = {
  createTab() {
    const view = viewCreator.createView()
    return new Tab({ view })
  }
}

export { tabCreator }
