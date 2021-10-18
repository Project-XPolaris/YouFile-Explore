import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
import { BaseResponse } from './base'

export class FileItem {
  name:string
  type:string
  path:string
  size:number
  thumbnail?:string
  isDataset:boolean
  modifyTime:string
  constructor (raw:any) {
    this.name = raw.name
    this.type = raw.type
    this.path = raw.path
    this.size = raw.size
    this.thumbnail = raw.thumbnail
    this.isDataset = raw.isDataset
    this.modifyTime = raw.modifyTime
  }

  getThumbnailsUrl ():string | undefined {
    if (!this.thumbnail) {
      return undefined
    }
    const url = localStorage.getItem('ServiceUrl')
    return `${url}/thumbnails?name=${this.thumbnail}`
  }

  getTarget ():string {
    const url = localStorage.getItem('ServiceUrl')
    return `${url}/files?target=${this.path}`
  }
}
export const readDir = async (dirPath:string, thumbnail = '1'):Promise<FileItem[]> => {
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
export interface Snapshot {
  name:string
}
export interface DatasetInfo {
  snapshots:Snapshot[]
}
export const getDatasetInfo = async (path:string):Promise<BaseResponse & DatasetInfo> => {
  const response = await apiRequest.get(ApplicationConfig.apiPaths.datasetInfo, {
    params: {
      path
    }
  })
  return response
}
export const createDatasetSnapshot = async (path:string, name:string):Promise<BaseResponse> => {
  const response = await apiRequest.post(ApplicationConfig.apiPaths.snapshots, {
    params: {
      path, name
    }
  })
  return response
}
export const deleteDatasetSnapshot = async (path:string, name:string):Promise<BaseResponse> => {
  const response = await apiRequest.delete(ApplicationConfig.apiPaths.snapshots, {
    params: {
      path, name
    }
  })
  return response
}

export const rollbackDatasetSnapshot = async (path:string, name:string):Promise<BaseResponse> => {
  const response = await apiRequest.post(ApplicationConfig.apiPaths.datasetRollback, {
    params: {
      path, name
    }
  })
  return response
}

export const createDataset = async (path:string):Promise<BaseResponse> => {
  const response = await apiRequest.post(ApplicationConfig.apiPaths.datasetInfo, {
    params: {
      path
    }
  })
  return response
}

export const deleteDataset = async (path:string):Promise<BaseResponse> => {
  const response = await apiRequest.delete(ApplicationConfig.apiPaths.datasetInfo, {
    params: {
      path
    }
  })
  return response
}
