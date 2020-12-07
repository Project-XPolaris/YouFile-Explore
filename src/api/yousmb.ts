import { yousmbRequest } from '../utils/request'
import { ApplicationConfig } from '../config'

export const createSMBFolder = async ({ name, properties }):Promise<any> => {
  const response = await yousmbRequest.post(ApplicationConfig.yousmb.apiPaths.addFolder, {
    data: {
      name, properties
    }
  })
  return response
}
