import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
import { BaseResponse } from './base'

export const copyFile = async (list:Array<{src:string, dest:string}>):Promise<BaseResponse> => {
  return apiRequest.post(ApplicationConfig.apiPaths.copyFile, {
    data: {
      list
    }
  })
}
export const deleteFile = async (list:Array<string>):Promise<BaseResponse> => {
  return apiRequest.post(ApplicationConfig.apiPaths.deleteFile, {
    data: {
      list
    }
  })
}

export const renameFile = async (old : string, newName : string):Promise<BaseResponse> => {
  return apiRequest.post(ApplicationConfig.apiPaths.rename, {
    params: {
      old, new: newName
    }
  })
}
