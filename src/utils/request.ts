import { extend } from 'umi-request'
import { ApplicationConfig } from '../config'

const apiRequest = extend({
  timeout: 10000,
  credentials: 'omit'
})
export const yousmbRequest = extend({
  timeout: 10000,
  credentials: 'omit'
})

apiRequest.use(async (ctx, next) => {
  const req = ctx.req
  req.url = localStorage.getItem('ServiceUrl') + req.url
  console.log(req.url)
  await next()
})

yousmbRequest.use(async (ctx, next) => {
  const req = ctx.req
  req.url = localStorage.getItem('YouSmbUrl') + req.url
  console.log(req.url)
  await next()
})
export default apiRequest
