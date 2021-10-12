import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface CopyFileOutput {
  totalLength: number
  fileCount: number
  complete: number
  completeLength: number
  files: Array<{
    source: {
      name:string,
      path:string,
      directory:string
    },
    dest: {
      name:string,
      path:string,
      directory:string
    }
  }>
  currentCopy: string
  progress: number
  speed: number
}
export interface MoveFileOutput {
  totalLength: number
  fileCount: number
  complete: number
  completeLength: number
  files: Array<{
    source: {
      name:string,
      path:string,
      directory:string
    },
    dest: {
      name:string,
      path:string,
      directory:string
    }
  }>
  currentMove: string
  progress: number
  speed: number
}
export interface DeleteFileOutput {
  fileCount: number;
  complete: number;
  files: {
    name:string,
    path:string,
    directory:string
  }[];
  progress: number;
  speed: number;
  currentDelete: string;
}

export interface SearchFileResult {
  name: string
  path: string
  type: string
  size: number
}

export interface SearchFileOutput {
  result: SearchFileResult[]
}

export interface ExtractFileOutput {
  total: number;
  complete: number;
  files: {
    source:{
      path: string;
      name: string;
      directory: string;
    },
    dest:string
    destDirectory:string
  }[];
}
export type TaskOutput = ExtractFileOutput | CopyFileOutput | MoveFileOutput | SearchFileOutput | DeleteFileOutput
export interface Task<T> {
  id: string
  type: 'Copy' | 'Delete' | 'Search' | 'Unarchive' | 'Move'
  status: 'Running' | 'Complete' | 'Error' | 'Analyze'
  output: T
}

export const getTaskList = (): Promise<{ result: Task<any>[] }> => {
  return apiRequest.get(ApplicationConfig.apiPaths.getAllTasks)
}

export const stopTask = async (id: string): Promise<any> => {
  return apiRequest.post(ApplicationConfig.apiPaths.stopTask, {
    params: {
      taskId: id
    }
  })
}

export const newSearchFileTask = async (rootPath: string, searchKey: string): Promise<Task<SearchFileOutput>> => {
  return apiRequest.post(ApplicationConfig.apiPaths.newSearchTask, {
    params: {
      searchPath: rootPath,
      searchKey,
      limit: 0
    }
  })
}

export const fetchTaskById = async (id: string): Promise<Task<any>> => {
  return apiRequest.post(ApplicationConfig.apiPaths.getTask, {
    params: {
      taskId: id
    }
  })
}

export interface ExtractArchiveFileInput {
  input: string
  output?: string
  inPlace: boolean
  password?: string
}

export const newUnarchiveTask = (input: ExtractArchiveFileInput[]) => {
  return apiRequest.post(ApplicationConfig.apiPaths.unarchive, {
    data: {
      input
    }
  })
}

export interface MoveFileTaskInput {
  src: string
  dest: string
}
export const newMoveFileTask = (inputs:MoveFileTaskInput[]) => {
  console.log('send move request')

  return apiRequest.post(ApplicationConfig.apiPaths.moveTask, {
    data: {
      list: inputs
    }
  })
}
