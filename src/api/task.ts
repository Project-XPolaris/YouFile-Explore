import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface CopyFileOutput {
  // eslint-disable-next-line camelcase
  total_length: number
  // eslint-disable-next-line camelcase
  file_count: number
  complete: number
  // eslint-disable-next-line camelcase
  complete_length: number
  list:Array<{
    src:string,
    dest:string
  }>
  // eslint-disable-next-line camelcase
  current_copy: string
  progress: number
  speed: number
}
export interface DeleteFileOutput {
  // eslint-disable-next-line camelcase
  file_count: number;
  complete: number;
  src: string[];
  progress: number;
  speed: number;
  // eslint-disable-next-line camelcase
  current_delete: string;
}

export interface SearchFileResult {
  name:string
  path:string
  type:string
  size:number
}
export interface SearchFileOutput {
  result:SearchFileResult[]
}
export interface Task<T> {
  id :string
  type: 'Copy' | 'Delete' | 'Search'
  status: 'Running' | 'Complete' | 'Error' | 'Analyze'
  output: T
}
export const getTaskList = ():Promise<{result:Task<any>[]}> => {
  return apiRequest.get(ApplicationConfig.apiPaths.getAllTasks)
}

export const stopTask = async (id:string):Promise<any> => {
  return apiRequest.post(ApplicationConfig.apiPaths.stopTask, {
    params: {
      taskId: id
    }
  })
}

export const newSearchFileTask = async (rootPath : string, searchKey:string) :Promise<Task<SearchFileOutput>> => {
  return apiRequest.post(ApplicationConfig.apiPaths.newSearchTask, {
    params: {
      searchPath: rootPath,
      searchKey,
      limit: 0
    }
  })
}

export const fetchTaskById = async (id:string) :Promise<Task<any>> => {
  return apiRequest.post(ApplicationConfig.apiPaths.getTask, {
    params: {
      taskId: id
    }
  })
}
