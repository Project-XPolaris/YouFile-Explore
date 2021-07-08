import { createModel } from 'hox'
import { useState } from 'react'
import { fetchInfo, SystemInfo } from '../api/info'

const AppModel = () => {
  const [info, setInfo] = useState<SystemInfo | undefined>()
  const loadInfo = async () => {
    setInfo(await fetchInfo())
  }
  return {
    info, loadInfo
  }
}
const useAppModel = createModel(AppModel)
export default useAppModel
