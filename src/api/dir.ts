import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
import { BaseResponse } from './base'

export class FileItem {
  name:string
  type:string
  path:string
  size:number
  thumbnail?:string
  constructor(raw:any) {
    this.name = raw["name"]
    this.type = raw["type"]
    this.path = raw["path"]
    this.size = raw["size"]
    this.thumbnail = raw["thumbnail"]
  }
  getThumbnailsUrl():string | undefined{
    if (!this.thumbnail) {
      return undefined
    }
    const url = localStorage.getItem('ServiceUrl')
    return `${url}/thumbnails?name=${this.thumbnail}`
  }
  getTarget():string {
    const url = localStorage.getItem('ServiceUrl')
    return `${url}/files?target=${this.path}`
  }
}
export const readDir = async (dirPath:string,thumbnail = "1"):Promise<FileItem[]> => {
  const response:{ result:FileItem[] } = await apiRequest.get(ApplicationConfig.apiPaths.readdir, {
    params: {
      readPath: dirPath,
      thumbnail
    }
  })
  return response.result.map(it => new FileItem(it))
}
export const createDirectory = async (dirPath:string):Promise<BaseResponse> => {
  const response = await apiRequest.get(ApplicationConfig.apiPaths.mkdir, {
    params: {
      dirPath,
      perm: 755
    }
  })
  return response.result
}
