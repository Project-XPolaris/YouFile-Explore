import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export const copyFile = async (list:Array<{src:string, dest:string}>):Promise<any> => {
  return apiRequest.post(ApplicationConfig.apiPaths.copyFile, {
    data: {
      list
    }
  })
}
export const deleteFile = async (list:Array<string>):Promise<any> => {
  return apiRequest.post(ApplicationConfig.apiPaths.deleteFile, {
    data: {
      list
    }
  })
}

export const renameFile = async (old : string, newName : string):Promise<void> => {
  return apiRequest.post(ApplicationConfig.apiPaths.rename, {
    params: {
      old, new: newName
    }
  })
}
