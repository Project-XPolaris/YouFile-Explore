import { createModel } from 'hox'
import { useState } from 'react'
import { copyFile as copyFileService, deleteFile as deleteFileService, renameFile } from '../api/file'
import useHomeModel from '../page/Home/model'
import { createSMBFolder } from '../api/yousmb'
import { undefinedOrString } from '../utils/string'
import { booleanToYesNo } from '../utils/boolean'
import { createDirectory } from '../api/dir'
import { convertPath } from '../utils/path'
import useAppModel from './app'
export interface CopyFile {
  name : string
  path:string
  type:string
}
const FileModel = () => {
  const [copyFile, setCopyFile] = useState<CopyFile[] | undefined>()
  const [moveFile, setMoveFile] = useState<CopyFile | undefined>()
  const homeModel = useHomeModel()
  const appModel = useAppModel()
  const pasteFile = () => {
    if (copyFile && homeModel.currentPath) {
      copyFileService(copyFile.map(it => ({
        src: it.path,
        dest: `${homeModel.currentPath}/${it.name}`
      })))
    }
  }
  const move = async () => {
    if (moveFile && homeModel.currentPath && appModel.info) {
      const movePath = [homeModel.currentPath, moveFile.name].join(appModel.info.sep)
      await renameFile(moveFile.path, movePath)
      await homeModel.loadContent()
    }
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
    copyFile, setCopyFile, pasteFile, addSMBFolder, mkdir, deleteFile, moveFile, setMoveFile, move
  }
}

const useFileModel = createModel(FileModel)
export default useFileModel
