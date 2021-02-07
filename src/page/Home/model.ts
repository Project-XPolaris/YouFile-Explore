import { createModel } from 'hox'
import { FileItem, readDir } from '../../api/dir'
import { useEffect, useState } from 'react'
import { convertSlash } from '../../utils/path'
import { Node } from 'react-virtualized-tree'
import { FileNode, FileTree } from './tree'
import { fetchSmbConfig } from '../../api/yousmb'
import { useUpdate } from 'ahooks'
import useAppModel from '../../models/app'

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

export type ViewType = 'List' | 'Medium';
const ignoreSmbSectionNames = ['global', 'printers', 'print$']
const HomeModel = () => {
  const appModel = useAppModel()
  const [currentPath, setCurrentPath] = useState<string | undefined>()
  const [smbDirs, setSmbDirs] = useState<{ name: string, path: string }[]>([])
  const [currentContent, setCurrentContent] = useState<FileNode[]>([])
  const [viewType, setViewType] = useState<ViewType>('Medium')
  const update = useUpdate()
  const initData = async () => {
    // await fTree.loadByPath(dirPath)
    await appModel.loadInfo()
    await loadSmbDirs()
  }
  const generateNode = (source: FileItem): FileNode => {
    return {
      id: source.path,
      name: source.name,
      path: source.path,
      children: undefined,
      parent: undefined,
      type: source.type
    }
  }
  const loadContent = async () => {
    let fetchPath = currentPath
    if (fetchPath === undefined) {
      fetchPath = appModel.info?.root_paths[0].path
    }
    if (fetchPath === undefined) {
      return
    }
    const response = await readDir(fetchPath)
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
    if (appModel.info?.sep === undefined || currentPath === undefined) {
      return
    }
    const parts = getBreadcrumbs()
    if (parts.length === 1) {
      // root path
      return
    }
    parts.pop()
    let targetPath = parts.join(appModel.info.sep)
    if (!targetPath.endsWith(appModel.info.sep)) {
      targetPath += appModel.info.sep
    }
    setCurrentPath(targetPath)
  }
  const onNavChipClick = (index: number) => {
    if (appModel.info?.sep === undefined) {
      return
    }
    const parts = getBreadcrumbs().slice(0,index + 1)
    let targetPath = parts.join(appModel.info.sep)
    if (!targetPath.endsWith(appModel.info.sep)) {
      targetPath += appModel.info.sep
    }
    setCurrentPath(targetPath)
  }
  const getBreadcrumbs = () => {
    if (appModel.info === undefined) {
      return []
    }
    if (currentPath) {
      const parts = currentPath.split(appModel.info.sep)
      if (parts[parts.length - 1] === '') {
        parts.pop()
      }
      return parts
    }
    return []
  }

  const loadSmbDirs = async () => {
    const response = await fetchSmbConfig()
    console.log(response)
    const dirs: { name: string, path: string }[] = response.sections.filter(it => ignoreSmbSectionNames.find(ignoreName => ignoreName === it.name) === undefined).map(dir => ({
      name: dir.name,
      path: dir.fields.path
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
    refresh,
    viewType,
    setViewType
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
