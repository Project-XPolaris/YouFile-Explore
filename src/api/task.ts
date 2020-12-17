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
