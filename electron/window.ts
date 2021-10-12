import { BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'
import { ChannelNames } from './channels'
import { v4 as uuidv4 } from 'uuid'

export class Intent {
  loadPath = 'start'
}
export class ExploreWindow {
  id = uuidv4().toString()
  window:BrowserWindow | null = null
  intent:Intent | null = null
}
export class WindowManager {
  windows:ExploreWindow[] = []
  public async newWindow (intent:Intent | null):Promise<void> {
    const exploreWindow = new ExploreWindow()
    exploreWindow.intent = intent
    exploreWindow.window = new BrowserWindow({
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
    exploreWindow.window.setTitle('YouFile')
    if (process.env.NODE_ENV === 'development') {
      await exploreWindow.window.loadURL(`http://localhost:4000/?id=${exploreWindow.id}&loadPath=${exploreWindow.intent?.loadPath ?? ''}#/home`)
    } else {
      await exploreWindow.window.loadURL(
        url.format({
          pathname: path.join(__dirname, 'renderer/index.html'),
          protocol: 'file:',
          slashes: true,
          hash: '/home',
          query: {
            id: exploreWindow.id
          }
        })
      )
    }
    this.windows.push(exploreWindow)
    console.log(exploreWindow.id)
    exploreWindow.window.webContents.send(ChannelNames.initWindow, { id: exploreWindow.id })
  }

  public getWindowById (id:string):ExploreWindow | undefined {
    return this.windows.find(it => it.id === id)
  }
}
export const DefaultWindowManager = new WindowManager()
