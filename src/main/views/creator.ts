import { WebContentsView } from 'electron'

export const viewCreator = {
  createView() {
    const view = new WebContentsView({})
    view.webContents.loadURL('https://www.google.com')
    return view
  }
}
