import { extend } from 'umi-request'
import { ApplicationConfig } from '../config'

const apiRequest = extend({
  timeout: 1000,
  credentials: 'omit'
})
export const yousmbRequest = extend({
  prefix: ApplicationConfig.yousmb.apiUrl,
  timeout: 1000,
  credentials: 'omit'
})

apiRequest.use(async (ctx, next) => {
  const req = ctx.req
  req.url = localStorage.getItem('ServiceUrl') + req.url
  console.log(req.url)
  await next()
})
export default apiRequest
