import { yousmbRequest } from '../utils/request'
import { ApplicationConfig } from '../config'

export const createSMBFolder = async ({
  name,
  properties,
}): Promise<any> => {
  const response = await yousmbRequest.post(ApplicationConfig.yousmb.apiPaths.addFolder, {
    data: {
      name,
      properties,
    },
  })
  return response
}
export type SmbSection = {
  name: string
  fields: { [key: string]: string }
}
export const fetchSmbConfig = async (): Promise<{ sections: SmbSection[] }> => {
  const response = await yousmbRequest.get(ApplicationConfig.yousmb.apiPaths.config, {})
  return await response
}
