import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
export interface CopyFileOutput {
  total_length: number
  file_count: number
  complete: number
  complete_length: number
  src: string
  dest: string
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
