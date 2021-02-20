import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export type RootPath = {
  path: string
  name: string,
  type: string
}
export type ServiceInfo = {
  sep: string
  root_paths: RootPath[]
}
export const fetchInfo = async (): Promise<ServiceInfo> => {
  return apiRequest.get(ApplicationConfig.apiPaths.info, {})
}
