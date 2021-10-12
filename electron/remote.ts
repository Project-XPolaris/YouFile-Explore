import remoteRequest from './utils/request'
import { ApplicationConfig } from '../src/config'
import { SystemInfo } from '../src/api/info'
import { ipcMain } from 'electron'
import { ChannelNames } from './channels'

class Remote {
  apiUrl:string | undefined
  token:string | undefined
  systemInfo?:SystemInfo
  async setServiceInfo ({ url, token }:{url?:string, token?:string}) {
    this.apiUrl = url
    this.token = token
    const response:SystemInfo = await remoteRequest.get(ApplicationConfig.apiPaths.info)
    console.log(response)
    this.systemInfo = response
  }
}

export const DefaultRemote = new Remote()

ipcMain.on(ChannelNames.getRemoteInfo, event => {
  event.returnValue = DefaultRemote.systemInfo
})
