import { createModel } from 'hox'
import { FileItem, readDir } from '../../api/dir'
import { useEffect, useState } from 'react'
import { FileNode } from './tree'
import { fetchSmbConfig } from '../../api/yousmb'
import { useUpdate } from 'ahooks'
import useAppModel from '../../models/app'
import {
  CopyFileOutput,
  DeleteFileOutput,
  fetchTaskById,
  newSearchFileTask,
  SearchFileOutput,
  SearchFileResult,
  Task
} from '../../api/task'
import { DefaultApiWebsocket } from '../../api/websocket/client'
import { NotificationMessage } from '../../api/websocket/event'
import { renameFile } from '../../api/file'
import { useTabsController } from './hooks/tab'
import { FavouriteItem, FavouriteManager } from '../../favourite'

export interface SearchResult {
  id:string
  result:SearchFileResult[]
}
export type ViewType = 'List' | 'Medium';
export type Mode = 'display' | 'search' | 'blank'
const ignoreSmbSectionNames = ['global', 'printers', 'print$']
const HomeModel = () => {
  const appModel = useAppModel()
  const [currentPath, setCurrentPath] = useState<string | undefined>()
  const [smbDirs, setSmbDirs] = useState<{ name: string, path: string }[]>([])
  const [currentContent, setCurrentContent] = useState<FileNode[]>([])
  const [viewType, setViewType] = useState<ViewType>('Medium')
  const [mode, setMode] = useState<Mode>('blank')
  const [searchResult, setSearchResult] = useState<SearchResult[]>([])
  const [searchId, setSearchId] = useState<string | undefined>()
  const [favorite, setFavourite] = useState<FavouriteItem[]>()
  const tabController = useTabsController({
    onTabChange: (tab) => {
      console.log(tab)
      switch (tab.type) {
        case 'Explore':
          setMode('display')
          setCurrentPath(tab.path)
          break
        case 'Search':
          setMode('search')
          setSearchId(tab.id)
          break
        case 'Start':
          setMode('blank')
      }
    },
    onEmptyTab: () => {
      setMode('blank')
    }
  })
  const update = useUpdate()
  const onSearchCompleteHandler = async (event:NotificationMessage) => {
    const id = event.id
    if (!id) {
      return
    }
    const task :Task<SearchFileOutput> = await fetchTaskById(id)
    setSearchResult(searchResult.map(it => {
      if (it.id === task.id) {
        return {
          ...it,
          result: task.output.result
        }
      }
      return it
    }))
  }
  const onCopyFileCompleteHandler = async (event:NotificationMessage) => {
    const id = event.id
    console.log(event.id)
    if (!id) {
      return
    }
    const task :Task<CopyFileOutput> = await fetchTaskById(id)
    if (!currentPath) {
      return
    }
    task.output.list.forEach(item => {
      if (item.dest.indexOf(currentPath) !== -1) {
        console.log('refresh content')
        loadContent()
      }
    })
  }
  const onDeleteFileDoneHandler = async (event:NotificationMessage) => {
    const id = event.id
    console.log(event.id)
    if (!id) {
      return
    }
    const task :Task<DeleteFileOutput> = await fetchTaskById(id)
    if (!currentPath) {
      return
    }
    task.output.src.forEach(item => {
      if (item.indexOf(currentPath) !== -1) {
        console.log('refresh content')
        loadContent()
      }
    })
  }
  DefaultApiWebsocket.connect()
  DefaultApiWebsocket.addListener('homeModel', {
    onMessage (data: string) {
      const event : NotificationMessage & any = JSON.parse(data)
      console.log(event)
      if (event.event === 'SearchTaskComplete') {
        onSearchCompleteHandler(event)
      }
      if (event.event === 'CopyTaskComplete') {
        onCopyFileCompleteHandler(event)
      }
      if (event.event === 'DeleteTaskDone') {
        onDeleteFileDoneHandler(event)
      }
    }
  })
  const initData = async () => {
    // await fTree.loadByPath(dirPath)
    await appModel.loadInfo()
    await loadSmbDirs()
  }
  const generateNode = (source: FileItem): FileNode => {
    return {
      name: source.name,
      path: source.path,
      children: undefined,
      parent: undefined,
      type: source.type
    }
  }
  const loadContent = async () => {
    if (currentPath === undefined) {
      setCurrentContent([])
      return
    }
    const response = await readDir(currentPath)
    setCurrentContent(response.map(it => generateNode(it)))
  }
  useEffect(() => {
    loadContent()
    const root = appModel?.info?.root_paths.find(it => it.path === currentPath)
    if (root) {
      tabController.setCurrentTabFolder(root.name, currentPath)
    } else {
      const parts = getBreadcrumbs()
      tabController.setCurrentTabFolder(parts.pop() ?? 'new tab', currentPath)
    }
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
    const parts = getBreadcrumbs().slice(0, index + 1)
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
    const dirs: { name: string, path: string }[] = response.sections.filter(it => ignoreSmbSectionNames.find(ignoreName => ignoreName === it.name) === undefined).map(dir => ({
      name: dir.name,
      path: dir.fields.path
    }))
    setSmbDirs(dirs)
    update()
  }
  const searchFile = async (searchKey : string) => {
    if (!currentPath) {
      return
    }
    const response = await newSearchFileTask(currentPath, searchKey)
    console.log(response)
    searchResult.push({
      id: response.id,
      result: []
    })
    setSearchResult([...searchResult])
    tabController.newSearchTab(getBreadcrumbs().pop() ?? '', response.id)
  }
  const rename = async (file:FileNode, name:string) => {
    const renamePath = [currentPath, name].join(appModel.info?.sep)
    await renameFile(file.path, renamePath)
    await loadContent()
  }
  const getSearchResult = ():SearchFileResult[] => {
    if (!searchId) {
      return []
    }
    const result = searchResult.find(it => it.id === searchId)
    if (result) {
      return result.result
    }
    return []
  }
  useEffect(() => {
    console.log(searchResult)
  }, [searchResult])

  const addFavourite = (item :FavouriteItem) => {
    FavouriteManager.getInstance().addFavourite(item)
    setFavourite([...FavouriteManager.getInstance().items])
  }
  const removeFavourite = (path:string) => {
    FavouriteManager.getInstance().removeFavourite(path)
    setFavourite([...FavouriteManager.getInstance().items])
  }
  return {
    initData,
    loadFile,
    loadContent,
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
    setViewType,
    mode,
    setMode,
    searchResult,
    searchFile,
    rename,
    tabController,
    searchId,
    getSearchResult,
    addFavourite,
    removeFavourite
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
