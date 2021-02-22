import { useState } from 'react'

export interface FileSelect {
  selectPaths: string[]
  switchSelect: (path: string) => void
  setSelect:(paths:string[]) => void
  getSelected:(path:string) => boolean
}

const useFileSelect = ({ initValue } :{initValue : string[] | undefined}):FileSelect => {
  const [selectPaths, setSelectPaths] = useState<string[]>(initValue ?? [])
  const switchSelect = (path: string) => {
    const isExist = selectPaths.find(it => it === path) !== undefined
    if (isExist) {
      setSelectPaths([...selectPaths.filter(it => it !== path)])
    } else {
      setSelectPaths([...selectPaths, path])
    }
  }
  const setSelect = (paths : string[]) => {
    setSelectPaths(paths)
  }
  const getSelected = (path:string) => {
    return selectPaths.find(it => it === path) !== undefined
  }
  return {
    selectPaths,
    switchSelect,
    setSelect,
    getSelected
  }
}
export default useFileSelect
