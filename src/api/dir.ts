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
  console.log(response)
  return response.result
}
