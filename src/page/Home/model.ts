import { createModel } from 'hox'
import { FileItem, readDir } from '../../api/dir'
import { useState } from 'react'
import { convertSlash } from '../../utils/path'
import { Node } from 'react-virtualized-tree'
import { FileTree } from './tree'

export interface File {
  id : string
  name: string
  path: string
  type: string
  children: File[] | undefined
}
const fTree = new FileTree()
export const getFileTree = ():FileTree => {
  return fTree
}
const HomeModel = () => {
  const [currentPath, setCurrentPath] = useState<string>('/')
  const [expanded, setExpanded] = useState<string[]>(['/'])
  const initData = async (dirPath = '/') => {
    await fTree.loadByPath(dirPath)
  }
  const switchExpandNode = (key:string) => {
    if (expanded.find(it => it === key) !== undefined) {
      setExpanded(expanded.filter(it => it !== key))
    } else {
      setExpanded([...expanded, key])
    }
  }
  const loadFile = async (path:string) => {
    setCurrentPath(path)
  }
  const onBack = async () => {
    const parts = currentPath.split('/')
    parts.pop()
    if (parts.length === 1) {
      setCurrentPath('/')
    } else {
      setCurrentPath(parts.join('/'))
    }
  }
  const getExpandNode = () => {
    const parts = currentPath.split('/')
    const result: string[] = []
    while (parts.length !== 2) {
      parts.pop()
      result.push(parts.join('/'))
    }
    result.push('/')
    expanded.forEach(it => {
      if (result.find(exist => exist === it) === undefined) {
        result.push(it)
      }
    })
    return result
  }
  const getBreadcrumbs = () => {
    return currentPath.split('/')
  }
  return {
    initData,
    loadFile,
    currentPath,
    getExpandNode,
    switchExpandNode,
    getBreadcrumbs,
    onBack
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
