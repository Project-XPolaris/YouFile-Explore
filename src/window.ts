import { Intent } from '../electron/window'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../electron/channels'
import { SystemInfo } from './api/info'

export class WindowShare {
  id?: string | null = undefined
  intent?: Intent | null = undefined

  parseId ():string | undefined {
    if (this.id) {
      return
    }
    const urlSearchParams: URLSearchParams = new URLSearchParams(window.location.search)
    this.id = urlSearchParams.get('id')
  }

  getIntent () {
    this.parseId()
    if (!this.id) {
      return undefined
    }
    if (this.intent === undefined) {
      const { intent } = ipcRenderer.sendSync(ChannelNames.getWindowIntent, { id: this.id })
      if (!intent) {
        return undefined
      }
      this.intent = intent
    }
    return this.intent
  }

  getLoadPath () {
    const urlSearchParams: URLSearchParams = new URLSearchParams(window.location.search)
    const loadPath = urlSearchParams.get('loadPath')
    if (!loadPath || loadPath === '') {
      return undefined
    }
    return loadPath
  }

  getSystemInfo ():SystemInfo|undefined {
    return ipcRenderer.sendSync(ChannelNames.getRemoteInfo)
  }
}

export const DefaultWindowShare = new WindowShare()
