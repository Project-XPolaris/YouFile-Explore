import { extend, ResponseError } from 'umi-request'
const errorHandler = (error:ResponseError) => {
  console.log(error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.status)
    console.log(error.response.headers)
    console.log(error.data)
    console.log(error.request)
    return { status: error.response.status, data: error.data }
  } else {
    console.log(error.message)
  }
  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
}
const apiRequest = extend({
  timeout: 10000,
  credentials: 'omit',
  errorHandler
})
export const yousmbRequest = extend({
  timeout: 10000,
  credentials: 'omit'
})

apiRequest.use(async (ctx, next) => {
  const req = ctx.req
  const token = localStorage.getItem('token')
  if (token) {
    req.options.headers = {
      ...req.options.headers,
      Authorization: `Bearer ${token}`
    }
  }
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
