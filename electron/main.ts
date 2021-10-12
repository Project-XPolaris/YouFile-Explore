import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import { ChannelNames } from './channels'
import { DefaultWindowManager, Intent } from './window'
import { DefaultRemote } from './remote'
import './clipboard'
import { DefaultTaskManager } from './task'
import { DefaultNotificationManager } from './notification'
import { sendToAllWindow } from './utils/window'

const newLoginWindow = () => {
  const loginWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    frame: false,
    icon: path.join(__dirname, '/icon.png'),
    title: 'YouFile'

  })
  loginWindow.setTitle('YouFile - Login')

  if (process.env.NODE_ENV === 'development') {
    loginWindow.loadURL('http://localhost:4000')
  } else {
    loginWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }
}

app.on('ready', () => {
  newLoginWindow()
})
  .whenReady()
  .then(() => {
    // if (process.env.NODE_ENV === 'development') {
    //   installExtension(REACT_DEVELOPER_TOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err))
    //   installExtension(REDUX_DEVTOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err))
    // }
  })
app.allowRendererProcessReuse = true

ipcMain.on(ChannelNames.loginSuccess, (event, { token, url }) => {
  DefaultRemote.setServiceInfo({ token, url })
  DefaultTaskManager.startRefresh()
  DefaultNotificationManager.connect(url, token)
  const currentWindow = BrowserWindow.getFocusedWindow()
  if (currentWindow) {
    currentWindow.close()
  }
  DefaultWindowManager.newWindow(null)
})

ipcMain.on(ChannelNames.closeWindow, (event, { id }) => {
  let currentWindow : BrowserWindow | undefined | null
  if (id) {
    currentWindow = DefaultWindowManager.getWindowById(id)?.window
  }
  if (!currentWindow) {
    currentWindow = BrowserWindow.getFocusedWindow()
  }

  if (currentWindow) {
    currentWindow.close()
  }
})

ipcMain.on(ChannelNames.switchWindowsSize, (event, { id }) => {
  let currentWindow : BrowserWindow | undefined | null
  if (id) {
    currentWindow = DefaultWindowManager.getWindowById(id)?.window
  }
  if (!currentWindow) {
    currentWindow = BrowserWindow.getFocusedWindow()
  }
  if (currentWindow) {
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize()
    } else {
      currentWindow.maximize()
    }
  }
})

ipcMain.on(ChannelNames.hideWindow, (event, { id }) => {
  let currentWindow : BrowserWindow | undefined | null
  if (id) {
    currentWindow = DefaultWindowManager.getWindowById(id)?.window
  }
  if (!currentWindow) {
    currentWindow = BrowserWindow.getFocusedWindow()
  }
  if (currentWindow) {
    currentWindow.minimize()
  }
})

ipcMain.on(ChannelNames.openNewWindow, () => {
  DefaultWindowManager.newWindow(null)
})
ipcMain.on(ChannelNames.openNewWindowWithPath, (event, { loadPath }: { loadPath: string }) => {
  const intent = new Intent()
  intent.loadPath = loadPath
  DefaultWindowManager.newWindow(intent)
})
ipcMain.on(ChannelNames.getWindowIntent, (event, { id }: { id: string }) => {
  const exploreWindow = DefaultWindowManager.getWindowById(id)
  if (!exploreWindow) {
    event.returnValue = {
      intent: undefined
    }
    return
  }
  event.returnValue = {
    intent: exploreWindow.intent
  }
})

ipcMain.on(ChannelNames.getFileDir, (event, filePath) => {
  event.returnValue = path.dirname(filePath)
})

ipcMain.on(ChannelNames.directoryUpdate, (event, dirPath) => {
  sendToAllWindow({
    name: ChannelNames.directoryUpdated,
    payload: {
      dirPath
    }
  })
})

ipcMain.on(ChannelNames.favouriteUpdate, () => {
  sendToAllWindow({
    name: ChannelNames.favouriteUpdated,
    payload: {}
  })
})
