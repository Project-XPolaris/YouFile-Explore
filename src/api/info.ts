import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export type RootPath = {
  path: string
  name: string,
  type: string
}
export type SystemInfo = {
  sep: string
  root_paths: RootPath[]
}
export const fetchInfo = async (): Promise<SystemInfo> => {
  return apiRequest.get(ApplicationConfig.apiPaths.info, {})
}

export type ServiceInfo = {
  'auth': boolean,
  'name': string,
  'success': boolean,
  'youPlusPath': boolean
}
export const fetchServiceInfo = async ():Promise<ServiceInfo> => {
  return apiRequest.get(ApplicationConfig.apiPaths.serviceInfo, {})
}
