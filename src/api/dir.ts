import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface FileItem {
  name:string
  type:string
  path:string
  size:number
}
export const readDir = async (dirPath:string):Promise<FileItem[]> => {
  const response:any = await apiRequest.get(ApplicationConfig.apiPaths.readdir, {
    params: {
      readPath: dirPath
    }
  })
  return response.result
}
export const createDirectory = async (dirPath:string) => {
  const response:any = await apiRequest.get(ApplicationConfig.apiPaths.mkdir, {
    params: {
      dirPath,
      perm: 755
    }
  })
  return response.result
}
