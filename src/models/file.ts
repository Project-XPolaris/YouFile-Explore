import { createModel } from 'hox'
import { useEffect, useState } from 'react'
import { copyFile as copyFileService, deleteFile as deleteFileService } from '../api/file'
import useHomeModel from '../page/Home/model'
import { createSMBFolder } from '../api/yousmb'
import { undefinedOrString } from '../utils/string'
import { booleanToYesNo } from '../utils/boolean'
import { createDirectory } from '../api/dir'
import { convertPath } from '../utils/path'
import { DefaultWindowShare } from '../window'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../electron/channels'
import { newMoveFileTask } from '../api/task'

export interface ClipboardFile {
  name : string
  path:string
  type:string
  directory:string
}
const FileModel = () => {
  const [clipboardFile, setClipboardFile] = useState<ClipboardFile[] | undefined>(ipcRenderer.sendSync(ChannelNames.getClipboard).items ?? [])
  const [clipboardAction, setClipboardAction] = useState<'Copy' | 'Move'>('Copy')
  const homeModel = useHomeModel()
  useEffect(() => {
    ipcRenderer.on(ChannelNames.clipboardUpdated, (event, { items, action }) => {
      console.log({ items, action })
      setClipboardFile(items)
      setClipboardAction(action)
    })
  }, [])
  const pasteFile = ({ targetPath = homeModel.currentPath }) => {
    if (clipboardFile && homeModel.currentPath) {
      copyFileService(clipboardFile.map(it => ({
        src: it.path,
        dest: `${targetPath}/${it.name}`
      })))
      ipcRenderer.send(ChannelNames.setClipboard, { items: [], action: 'Copy' })
    }
  }
  const move = async ({ targetPath = homeModel.currentPath }) => {
    const info = DefaultWindowShare.getSystemInfo()
    if (clipboardFile && homeModel.currentPath && info) {
      await newMoveFileTask(clipboardFile.map(it => ({
        src: it.path,
        dest: [targetPath, it.name].join(info.sep)
      })))
    }
    ipcRenderer.send(ChannelNames.setClipboard, { items: [], action: 'Move' })
  }
  const addSMBFolder = async (data:any) => {
    if (homeModel.currentPath) {
      createSMBFolder({
        name: data.name,
        properties: {
          path: homeModel.currentPath,
          comment: undefinedOrString(data.comment) ?? '',
          public: booleanToYesNo(data.public),
          writable: booleanToYesNo(data.writable),
          'directory mask': data.directory_mask,
          'create mask': data.create_mask,
          'valid users': data.valid_users,
          'write list': data.write_list,
          browseable: booleanToYesNo(data.browseable),
          available: booleanToYesNo(data.available)
        }
      })
    }
  }
  const deleteFile = async (src:string[]) => {
    await deleteFileService(src)
  }
  const mkdir = async (dirName:string) => {
    let currentPath = homeModel.currentPath
    if (currentPath) {
      if (currentPath.endsWith('\\') || currentPath.endsWith('/')) {
        currentPath = currentPath.slice(0, currentPath.length - 1)
      }
      await createDirectory(convertPath(`${currentPath}/${dirName}`))
    }
  }
  return {
    clipboardFile, setClipboardFile, pasteFile, addSMBFolder, mkdir, deleteFile, move, clipboardAction
  }
}

const useFileModel = createModel(FileModel)
export default useFileModel
