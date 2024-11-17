import { viewCreator } from '@main/views/creator'
import { Rectangle, WebContentsView } from 'electron'
import { EventEmitter } from 'events'
import lodash from 'lodash'
import { BehaviorSubject } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'

export interface TabConstructorOptions {
  view?: WebContentsView
}

interface TabEvents {
  'state-changed': [state: TabState]
}

export class Tab extends EventEmitter<TabEvents> {
  private _id: string
  private _view: WebContentsView
  private _state: BehaviorSubject<TabState>

  constructor({ view }: TabConstructorOptions) {
    super()
    this._id = uuidv4()
    this._view = view || viewCreator.createView()
    this._state = new BehaviorSubject<TabState>(this.initState())
    this.listenWebEvents()
  }

  private initState() {
    const title = this._view.webContents.getTitle() || ''
    const url = this._view.webContents.getURL() || ''
    const canGoBack = this._view.webContents.canGoBack()
    const canGoForward = this._view.webContents.canGoForward()

    return {
      id: this._id,
      title,
      url,
      canGoBack,
      canGoForward
    }
  }

  private updateState() {
    const currentState = this._state.value
    const newState = this.initState()

    if (!lodash.isEqual(currentState, newState)) {
      this._state.next(newState)
      this.emit('state-changed', newState)
    }
  }

  private listenWebEvents() {
    const updateState = () => {
      this.updateState()
    }

    this._view.webContents.on('page-title-updated', updateState)

    this._view.webContents.on('did-finish-load', updateState)

    this._view.webContents.on('did-navigate', updateState)

    this._view.webContents.on('did-navigate-in-page', updateState)
  }

  get id() {
    return this._id
  }

  get view() {
    return this._view
  }

  setBounds(bounds: Rectangle) {
    this._view.setBounds(bounds)
  }

  get state(): TabState {
    return this._state.value
  }

  destroy() {
    this._view.webContents.removeAllListeners()
    this.removeAllListeners()
  }
}
