import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export const copyFile = async (src:string, dest:string):Promise<any> => {
  return apiRequest.post(ApplicationConfig.apiPaths.copyFile, {
    params: {
      src, dest
    }
  })
}
