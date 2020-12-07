import { extend } from 'umi-request'
import { ApplicationConfig } from '../config'

const apiRequest = extend({
  prefix: ApplicationConfig.apiUrl,
  timeout: 1000,
  credentials: 'omit'
})
export const yousmbRequest = extend({
  prefix: ApplicationConfig.yousmb.apiUrl,
  timeout: 1000,
  credentials: 'omit'
})
export default apiRequest
