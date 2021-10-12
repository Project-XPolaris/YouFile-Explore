import { BrowserWindow } from 'electron'

export const sendToAllWindow = <T>({ name, payload }:{name:string, payload?:T}):void => {
  BrowserWindow.getAllWindows().forEach(win => win.webContents.send(name, payload))
}
