import { createModel } from 'hox'
import { FileItem, readDir } from '../../api/dir'
import { useState } from 'react'
export interface File {
  name:string
  path:string
  type:string
  children:File[] | undefined
}
const HomeModel = () => {
  const [fileTree, setFileTree] = useState<File|undefined>(undefined)
  const [fileList, setFileList] = useState<File[]>([])
  const [currentPath, setCurrentPath] = useState<string>('/')
  const initData = async (dirPath = '/') => {
    const result = await readDir(dirPath)
    const root = {
      name: 'root',
      path: '/',
      type: 'Directory',
      children: result.filter(it => it.type === 'Directory').map((it:FileItem) => ({
        name: it.name,
        path: it.path,
        children: undefined,
        type: it.type
      }))
    }
    setFileTree(root)
    setFileList(result.map(it => ({
      name: it.name,
      path: it.path,
      children: undefined,
      type: it.type
    })))
  }

  const loadFile = async (node:File) => {
    if (node && node.type === 'File') {
      return
    }

    if (node) {
      if (node.type === 'Directory' && node.children === undefined) {
        const result = await readDir(node.path)
        console.log(result)
        node.children = result.map(it => ({
          name: it.name,
          path: it.path,
          children: undefined,
          type: it.type
        }))
        setFileTree(Object.assign({}, fileTree))
      }
      setFileList(node?.children ?? [])
      setCurrentPath(node.path)
    }
  }
  const getExpandNode = () => {
    const parts = currentPath.split('/')
    let cur = '/'
    const result:string[] = []
    for (const part of parts) {
      cur = cur + part
      result.push('' + cur)
    }
    return result
  }
  return {
    initData, fileTree, loadFile, fileList, currentPath
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
