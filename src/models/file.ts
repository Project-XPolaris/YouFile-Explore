import { createModel } from 'hox'
import { useState } from 'react'
import { copyFile as copyFileService } from '../api/file'
import useHomeModel from '../page/Home/model'
export interface CopyFile {
  name : string
  path:string
}
const FileModel = () => {
  const [copyFile, setCopyFile] = useState<CopyFile | undefined>()
  const homeModel = useHomeModel()
  const pasteFile = () => {
    if (copyFile && homeModel.currentPath) {
      copyFileService(copyFile?.path, `${homeModel.currentPath}/${copyFile.name}`)
    }
  }
  return {
    copyFile, setCopyFile,pasteFile
  }
}

const useFileModel = createModel(FileModel)
export default useFileModel
