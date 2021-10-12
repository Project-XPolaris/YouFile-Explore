import URI from 'urijs'
import { DefaultRemote } from './remote'
import { NotificationMessage } from '../src/api/websocket/event'
import { sendToAllWindow } from './utils/window'
import { ChannelNames } from './channels'
import WebSocket from 'ws'

export class NotificationManager {
  websocket: WebSocket | undefined = undefined

  connect (apiUrl: string, token: string): void {
    const connectUrl = new URI(apiUrl)
    connectUrl.protocol('ws').pathname('/notification')
    console.log(DefaultRemote.token)
    if (token && token !== '') {
      connectUrl.addQuery('token', DefaultRemote.token)
    }
    console.log('connect to ' + connectUrl.toString())
    const newWebsocket = new WebSocket(connectUrl.toString())
    newWebsocket.on('message', (message: any) => {
      const rawData: NotificationMessage = JSON.parse(message)
      console.log(rawData)
      if (rawData.event === 'CopyTaskComplete') {
        sendToAllWindow({
          name: ChannelNames.notificationCopyTaskComplete,
          payload: rawData
        })
      } else if (rawData.event === 'DeleteTaskDone') {
        sendToAllWindow({
          name: ChannelNames.notificationDeleteTaskComplete,
          payload: rawData
        })
      } else if (rawData.event === 'UnarchiveFileComplete') {
        sendToAllWindow({
          name: ChannelNames.notificationExtractTaskComplete,
          payload: rawData
        })
      } else if (rawData.event === 'MoveTaskComplete') {
        sendToAllWindow({
          name: ChannelNames.notificationMoveTaskComplete,
          payload: rawData
        })
      }
    })
    newWebsocket.on('close', () => {
      setTimeout(() => {
        console.log('try to reconnect')
        this.connect(apiUrl, token)
      }, 3000)
    })
    newWebsocket.on('error', () => {
      newWebsocket.close()
    })
    this.websocket = newWebsocket
  }
}

export const DefaultNotificationManager = new NotificationManager()
