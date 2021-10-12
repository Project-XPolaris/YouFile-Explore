import { FileItem } from '../src/api/dir'
import { ipcMain } from 'electron'
import { ChannelNames } from './channels'
import { sendToAllWindow } from './utils/window'

export class ClipboardManager {
  list: FileItem[] = []
  action = 'Copy'
  setClipboard (items: FileItem[], action:string): void {
    this.list = items
    this.action = action
    sendToAllWindow({ name: ChannelNames.clipboardUpdated, payload: { items: this.list, action: this.action } })
  }
}
ipcMain.on(ChannelNames.setClipboard, (event, { items, action }:{ items:FileItem[], action:string }) => {
  DefaultClipboard.setClipboard(items, action)
})
ipcMain.on(ChannelNames.getClipboard, (event) => {
  event.returnValue = {
    items: DefaultClipboard.list,
    action: DefaultClipboard.action
  }
})
export const DefaultClipboard = new ClipboardManager()
