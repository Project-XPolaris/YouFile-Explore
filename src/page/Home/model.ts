import { createModel } from 'hox'
import { FileItem, readDir } from '../../api/dir'
import { useState } from 'react'

export interface File {
  name: string
  path: string
  type: string
  children: File[] | undefined
}

const HomeModel = () => {
  const [fileTree, setFileTree] = useState<File | undefined>(undefined)
  const [fileList, setFileList] = useState<File[]>([])
  const [currentPath, setCurrentPath] = useState<string>('/')
  const [expanded, setExpanded] = useState<string[]>(['/'])
  const initData = async (dirPath = '/') => {
    const result = await readDir(dirPath)
    const root = {
      name: 'root',
      path: '/',
      type: 'Directory',
      children: result.filter(it => it.type === 'Directory').map((it: FileItem) => ({
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
  const switchExpandNode = (key:string) => {
    if (expanded.find(it => it === key) !== undefined) {
      setExpanded(expanded.filter(it => it !== key))
    } else {
      setExpanded([...expanded, key])
    }
  }
  const loadFile = async (node: File) => {
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
  return {
    initData,
    fileTree,
    loadFile,
    fileList,
    currentPath,
    getExpandNode,
    switchExpandNode
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
