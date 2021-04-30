import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
import { BaseResponse } from './base'
export interface Mount {
  spec:string
  file:string
  // eslint-disable-next-line camelcase
  vfs_type:string
  // eslint-disable-next-line camelcase
  mnt_ops:{[key:string]:string}
  freq:number
  // eslint-disable-next-line camelcase
  pass_no:number
  mountName?:string
}
export const fetchFstabMounts = async ():Promise<Mount[]> => {
  return apiRequest.get(ApplicationConfig.apiPaths.fstabMounts, {})
}
export const addFstabMount = async (mount:Mount):Promise<BaseResponse> => {
  console.log(mount)
  return apiRequest.post(ApplicationConfig.apiPaths.fstabAddMount, {
    data: mount
  })
}

export const removeFstabMount = async (filePath:string):Promise<BaseResponse> => {
  return apiRequest.delete(ApplicationConfig.apiPaths.fsRemoveMount, {
    params: {
      dirPath: filePath
    }
  })
}

export const remountFstab = async ():Promise<BaseResponse> => {
  return apiRequest.get(ApplicationConfig.apiPaths.remountFstab, {})
}
