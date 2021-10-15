import { createModel } from 'hox'
import { DatasetInfo, FileItem, getDatasetInfo, readDir } from '../../api/dir'
import { useEffect, useState } from 'react'
import { FileNode } from './tree'
import { fetchSmbConfig } from '../../api/yousmb'
import { useUpdate } from 'ahooks'
import {
  CopyFileOutput,
  DeleteFileOutput, ExtractFileOutput,
  fetchTaskById, MoveFileOutput,
  newSearchFileTask,
  newUnarchiveTask,
  SearchFileOutput,
  SearchFileResult,
  Task
} from '../../api/task'
import { DefaultApiWebsocket } from '../../api/websocket/client'
import { NotificationMessage } from '../../api/websocket/event'
import { renameFile } from '../../api/file'
import { FavouriteItem, FavouriteManager } from '../../favourite'
import { DefaultWindowShare } from '../../window'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../../electron/channels'

export interface SearchResult {
  id: string;
  result: SearchFileResult[];
}

export type ViewType = 'List' | 'Medium' | 'DetailList';
export type Mode = 'display' | 'search' | 'blank' | 'image' | 'video'
const ignoreSmbSectionNames = ['global', 'printers', 'print$']
export type ContentOrder = 'Name asc' | 'Name desc' | 'Size asc' | 'Size desc'
const HomeModel = () => {
  const [currentPath, setCurrentPath] = useState<string | undefined>(DefaultWindowShare.getLoadPath())
  const [smbDirs, setSmbDirs] = useState<{ name: string, path: string }[]>([])
  const [currentContent, setCurrentContent] = useState<FileNode[]>([])
  const [viewType, setViewType] = useState<ViewType>('DetailList')
  const [mode, setMode] = useState<Mode>(DefaultWindowShare.getLoadPath() ? 'display' : 'blank')
  const [contentOrder, setContentOrder] = useState<ContentOrder>('Name asc')
  const [searchResult, setSearchResult] = useState<SearchResult[]>([])
  const [searchId, setSearchId] = useState<string | undefined>()
  const [favorite, setFavourite] = useState<FavouriteItem[]>()
  const [imageViewUrl, setImageViewUrl] = useState<string | undefined>()
  const [videoViewUrl, setVideoViewUrl] = useState<string | undefined>()
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo>()
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false)
  const update = useUpdate()
  const getOrderContent = (content:FileNode[], order:ContentOrder):FileNode[] => {
    console.log(order)
    if (order === 'Name asc') {
      return content.sort((left, right) => left.name.localeCompare(right.name))
    } else if (order === 'Name desc') {
      return content.sort((left, right) => (left.name.localeCompare(right.name)) * -1)
    } else if (order === 'Size asc') {
      return content.sort((left, right) => left.size > right.size ? 1 : -1)
    } else if (order === 'Size desc') {
      return content.sort((left, right) => left.size < right.size ? 1 : -1)
    }
    return content
  }
  const onSearchCompleteHandler = async (event: NotificationMessage) => {
    const id = event.id
    if (!id) {
      return
    }
    const task: Task<SearchFileOutput> = await fetchTaskById(id)
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
  const openDirectory = (openPath: string) => {
    setCurrentPath(openPath)
    if (mode !== 'display') {
      setMode('display')
    }
  }
  const onCopyFileCompleteHandler = async (event: NotificationMessage) => {
    const id = event.id
    if (!id) {
      return
    }
    const task: Task<CopyFileOutput> = await fetchTaskById(id)
    if (!currentPath) {
      return
    }
    for (const copyOption of task.output.files) {
      if (copyOption.dest.directory === currentPath) {
        loadContent()
        break
      }
    }
  }
  const onMoveFileCompleteHandler = async (event: NotificationMessage) => {
    const id = event.id
    if (!id) {
      return
    }
    const task: Task<MoveFileOutput> = await fetchTaskById(id)
    if (!currentPath) {
      return
    }
    for (const moveOption of task.output.files) {
      if (moveOption.dest.directory === currentPath) {
        loadContent()
        return
      }
    }
    for (const moveOption of task.output.files) {
      if (moveOption.source.directory === currentPath) {
        loadContent()
        return
      }
    }
  }
  const onDeleteFileDoneHandler = async (event: NotificationMessage) => {
    const id = event.id
    if (!id) {
      return
    }
    const task: Task<DeleteFileOutput> = await fetchTaskById(id)
    if (!currentPath) {
      return
    }
    for (const deleteSrc of task.output.files) {
      if (deleteSrc.directory === currentPath) {
        loadContent()
        break
      }
    }
  }
  const onUnarchiveFileDoneHandler = async (event: NotificationMessage) => {
    const id = event.id
    if (!id) {
      return
    }
    const task: Task<ExtractFileOutput> = await fetchTaskById(id)
    if (!currentPath) {
      return
    }
    for (const file of task.output.files) {
      if (file.destDirectory === currentPath) {
        await loadContent()
        break
      }
    }
  }
  const onGenerateThumbnailsDoneHandler = async (event: NotificationMessage & { path: string }) => {
    if (currentPath) {
      if (event.path.startsWith(currentPath)) {
        loadContent('0')
      }
    }
  }
  // DefaultApiWebsocket.connect()
  DefaultApiWebsocket.addListener('homeModel', {
    onMessage (data: string) {
      const event: NotificationMessage & any = JSON.parse(data)
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
      if (event.event === 'UnarchiveFileComplete') {
        onUnarchiveFileDoneHandler(event)
      }
      if (event.event === 'GenerateThumbnailComplete') {
        onGenerateThumbnailsDoneHandler(event)
      }
    }
  })

  useEffect(() => {
    ipcRenderer.on(ChannelNames.notificationCopyTaskComplete, (event, payload) => {
      onCopyFileCompleteHandler(payload)
    })
    ipcRenderer.on(ChannelNames.notificationDeleteTaskComplete, (event, payload) => {
      onDeleteFileDoneHandler(payload)
    })
    ipcRenderer.on(ChannelNames.notificationExtractTaskComplete, (event, payload) => {
      onUnarchiveFileDoneHandler(payload)
    })
    ipcRenderer.on(ChannelNames.directoryUpdated, (event, { dirPath }) => {
      if (currentPath && currentPath === dirPath) {
        refresh()
      }
    })
    ipcRenderer.on(ChannelNames.notificationMoveTaskComplete, (event, payload) => {
      onMoveFileCompleteHandler(payload)
    })
  }, [currentPath])
  const initData = async () => {
    // await fTree.loadByPath(dirPath)
    // await appModel.loadInfo()
    await loadSmbDirs()
  }
  const generateNode = (source: FileItem): FileNode => {
    return new FileNode({
      name: source.name,
      path: source.path,
      children: undefined,
      parent: undefined,
      type: source.type,
      thumbnail: source.getThumbnailsUrl(),
      target: source.getTarget(),
      size: source.size
    })
  }
  const loadContent = async (thumbnail = '1') => {
    if (currentPath === undefined) {
      return
    }
    setIsContentLoading(true)
    const response = await readDir(currentPath, thumbnail)
    setIsContentLoading(false)
    setCurrentContent(getOrderContent(response.map(it => generateNode(it)), contentOrder))
  }
  const refreshDatasetInfo = async () => {
    if (!currentPath) {
      return
    }
    const dataset: any = await getDatasetInfo(currentPath)
    if (dataset.status && dataset.status !== 200) {
      setDatasetInfo(undefined)
      return
    }
    if (dataset.success) {
      setDatasetInfo(dataset)
    }
  }
  const refreshContent = async () => {
    if (!currentPath) {
      return
    }
    await loadContent()
  }
  useEffect(() => {
    console.log(currentPath)
    refreshContent()
  }, [currentPath])
  const refresh = () => {
    refreshContent()
  }
  const loadFile = async (path: string) => {
    setCurrentPath(path)
  }
  const onBack = async () => {
    const info = DefaultWindowShare.getSystemInfo()
    if (info?.sep === undefined || currentPath === undefined) {
      return
    }
    const parts = getBreadcrumbs()
    if (parts.length === 1) {
      // root path
      return
    }
    parts.pop()
    let targetPath = parts.join(info.sep)
    if (!targetPath.endsWith(info.sep)) {
      targetPath += info.sep
    }
    setCurrentPath(targetPath)
  }
  const onNavChipClick = (index: number) => {
    const info = DefaultWindowShare.getSystemInfo()
    if (info?.sep === undefined) {
      return
    }
    const parts = getBreadcrumbs().slice(0, index + 1)
    let targetPath = parts.join(info.sep)
    if (!targetPath.endsWith(info.sep)) {
      targetPath += info.sep
    }
    setCurrentPath(targetPath)
  }
  const getBreadcrumbs = () => {
    const info = DefaultWindowShare.getSystemInfo()
    if (info === undefined) {
      return []
    }
    if (currentPath) {
      const parts = currentPath.split(info.sep)
      if (parts[parts.length - 1] === '') {
        parts.pop()
      }
      return parts
    }
    return []
  }
  const loadSmbDirs = async () => {
    const response = await fetchSmbConfig()
    if (!response.sections) {
      setSmbDirs([])
      return
    }
    const dirs: { name: string, path: string }[] = response.sections.filter(it => ignoreSmbSectionNames.find(ignoreName => ignoreName === it.name) === undefined).map(dir => ({
      name: dir.name,
      path: dir.fields.path
    }))
    setSmbDirs(dirs)
    update()
  }
  const searchFile = async (searchKey: string) => {
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
    // tabController.newSearchTab(getBreadcrumbs().pop() ?? '', response.id)
  }
  const rename = async (path: string, name: string) => {
    const info = DefaultWindowShare.getSystemInfo()
    const renamePath = [currentPath, name].join(info?.sep)
    await renameFile(path, renamePath)
    ipcRenderer.send(ChannelNames.directoryUpdate, currentPath)
  }
  const getSearchResult = (): SearchFileResult[] => {
    if (!searchId) {
      return []
    }
    const result = searchResult.find(it => it.id === searchId)
    if (result) {
      return result.result
    }
    return []
  }
  const addFavourite = (item: { name: string, path: string, type: string }) => {
    FavouriteManager.getInstance().addFavourite(item)
    setFavourite([...FavouriteManager.getInstance().items])
  }
  const removeFavourite = (path: string) => {
    FavouriteManager.getInstance().removeFavourite(path)
    setFavourite([...FavouriteManager.getInstance().items])
  }
  const unarchiveInPlace = async (source: string, { password }: { password?: string }) => {
    await newUnarchiveTask([
      {
        input: source,
        inPlace: true,
        password
      }
    ])
  }
  const setOrder = (order:ContentOrder) => {
    setCurrentContent([...getOrderContent(currentContent, order)])
    setContentOrder(order)
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
    searchId,
    getSearchResult,
    addFavourite,
    removeFavourite,
    unarchiveInPlace,
    imageViewUrl,
    videoViewUrl,
    datasetInfo,
    refreshDatasetInfo,
    openDirectory,
    isContentLoading,
    contentOrder,
    setOrder,
    setImageViewUrl
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
