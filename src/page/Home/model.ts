import { createModel } from 'hox'
import { FileItem, readDir } from '../../api/dir'
import { useEffect, useState } from 'react'
import { convertSlash } from '../../utils/path'
import { Node } from 'react-virtualized-tree'
import { FileNode, FileTree } from './tree'
import { fetchSmbConfig } from '../../api/yousmb'
import { useUpdate } from 'ahooks'

export interface File {
  id: string
  name: string
  path: string
  type: string
  children: File[] | undefined
}

const fTree = new FileTree()
export const getFileTree = (): FileTree => {
  return fTree
}
const ignoreSmbSectionNames = ['global', 'printers', 'print$']
const HomeModel = () => {
  const [currentPath, setCurrentPath] = useState<string>('/')
  const [smbDirs, setSmbDirs] = useState<{ name: string, path: string }[]>([])
  const [currentContent, setCurrentContent] = useState<FileNode[]>([])
  const update = useUpdate()
  const initData = async (dirPath = '/') => {
    // await fTree.loadByPath(dirPath)
    await loadSmbDirs()
  }
  const generateNode = (source: FileItem): FileNode => {
    return {
      id: source.path,
      name: source.name,
      path: convertSlash(source.path),
      children: undefined,
      parent: undefined,
      type: source.type,
    }
  }
  const loadContent = async () => {
    const response = await readDir(currentPath)
    setCurrentContent(response.map(it => generateNode(it)))
  }
  useEffect(() => {
    loadContent()
  }, [currentPath])
  const refresh = () => {
    loadContent()
  }
  const loadFile = async (path: string) => {
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
  const onNavChipClick = (index: number) => {
    const parts = getBreadcrumbs().slice(1, index + 1)
    setCurrentPath('/' + parts.join('/'))
  }
  const getBreadcrumbs = () => {
    if (currentPath === '/') {
      return ['root']
    }
    return ['root', ...currentPath.split('/').slice(1)]
  }

  const loadSmbDirs = async () => {
    const response = await fetchSmbConfig()
    console.log(response)
    const dirs: { name: string, path: string }[] = response.sections.filter(it => ignoreSmbSectionNames.find(ignoreName => ignoreName === it.name) === undefined).map(dir => ({
      name: dir.name,
      path: dir.fields.path,
    }))
    setSmbDirs(dirs)
    update()
  }
  return {
    initData,
    loadFile,
    currentPath,
    getBreadcrumbs,
    onBack,
    onNavChipClick,
    loadSmbDirs,
    currentContent,
    smbDirs,
    setCurrentPath,
    refresh
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
