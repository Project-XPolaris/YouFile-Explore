import { createModel } from 'hox'
import { useState } from 'react'
import { copyFile as copyFileService } from '../api/file'
import useHomeModel from '../page/Home/model'
import { createSMBFolder } from '../api/yousmb'
import { undefinedOrString } from '../utils/string'
import { booleanToYesNo } from '../utils/boolean'
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
  const addSMBFolder = (data:any) => {
    if (homeModel.currentPath) {
      createSMBFolder({
        name: data.name,
        properties: {
          path: homeModel.currentPath,
          comment: undefinedOrString(data.comment),
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
  return {
    copyFile, setCopyFile, pasteFile,addSMBFolder
  }
}

const useFileModel = createModel(FileModel)
export default useFileModel
