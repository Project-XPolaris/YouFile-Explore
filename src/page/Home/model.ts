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
import { flatMap, groupBy } from 'lodash'
import { DefaultFileContentStorage } from '../../store/content';

export interface SearchResult {
  id: string;
  result: SearchFileResult[];
}

export type ViewType = 'List' | 'Medium' | 'DetailList';
export type Mode = 'display' | 'search' | 'blank' | 'image' | 'video'
const ignoreSmbSectionNames = ['global', 'printers', 'print$']
export type ContentOrder = 'Name asc' | 'Name desc' | 'Size asc' | 'Size desc' | 'Modify asc' | 'Modify desc'
export type ContentGroupBy = 'Type' | 'NoGroup'
const HomeModel = () => {
  const [currentPath, setCurrentPath] = useState<string | undefined>(DefaultWindowShare.getLoadPath())
  const [smbDirs, setSmbDirs] = useState<{ name: string, path: string }[]>([])
  const [currentContent, setCurrentContent] = useState<FileNode[]>([])
  const [viewType, setViewType] = useState<ViewType>('DetailList')
  const [mode, setMode] = useState<Mode>(DefaultWindowShare.getLoadPath() ? 'display' : 'blank')
  const [contentOrder, setContentOrder] = useState<ContentOrder>('Name asc')
  const [imageViewUrl, setImageViewUrl] = useState<string | undefined>()
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo>()
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false)
  const [contentGroupBy, setContentGroupBy] = useState<ContentGroupBy>('NoGroup')
  const update = useUpdate()
  const getOrderContent = (content:FileNode[], order:ContentOrder, group:ContentGroupBy):FileNode[] => {
    let groups:{[key:string]:FileNode[]} = {}
    switch (group) {
      case 'Type':
        groups = groupBy<FileNode>(content, (node) => {
          if (node.type === 'Directory') {
            return 'Directory'
          }
          const ext = node.name.split('.').pop()
          if (!ext) {
            return ''
          }
          return ext
        })
        break
      default:
        groups = {
          '': content
        }
    }

    Object.getOwnPropertyNames(groups).forEach(groupName => {
      if (order === 'Name asc') {
        groups[groupName] = groups[groupName].sort((left, right) => left.name.localeCompare(right.name))
      } else if (order === 'Name desc') {
        groups[groupName] = groups[groupName].sort((left, right) => (left.name.localeCompare(right.name)) * -1)
      } else if (order === 'Size asc') {
        groups[groupName] = groups[groupName].sort((left, right) => left.size > right.size ? 1 : -1)
      } else if (order === 'Size desc') {
        groups[groupName] = groups[groupName].sort((left, right) => left.size < right.size ? 1 : -1)
      } else if (order === 'Modify asc') {
        groups[groupName] = groups[groupName].sort((left, right) => left.modifyTime.unix() > right.modifyTime.unix() ? 1 : -1)
      } else if (order === 'Modify desc') {
        groups[groupName] = groups[groupName].sort((left, right) => left.modifyTime.unix() < right.modifyTime.unix() ? 1 : -1)
      }
    })
    return flatMap(groups)
  }

  const loadContent = async ({ force,targetDirectory = currentPath }:{ force:boolean,targetDirectory?:string }) => {
    if (targetDirectory === undefined) {
      return
    }
    setIsContentLoading(true)
    const response = await DefaultFileContentStorage.readFileContent(targetDirectory,force)
    setIsContentLoading(false)
    setCurrentContent(getOrderContent(response.map(it => generateNode(it)), contentOrder,contentGroupBy))
  }
  const refresh = () => {
    loadContent({force:true})
  }
  const openDirectory = (openPath: string) => {
    setCurrentPath(openPath)
    loadContent({force:false,targetDirectory:openPath})
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
        refresh()
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
        refresh()
        return
      }
    }
    for (const moveOption of task.output.files) {
      if (moveOption.source.directory === currentPath) {
        refresh()
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
        refresh()
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
        refresh()
        break
      }
    }
  }


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
    // await loadSmbDirs()
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
      size: source.size,
      modifyTime: source.modifyTime
    })
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


  // useEffect(() => {
  //   refreshContent()
  // }, [currentPath])

  // const loadFile = async (path: string) => {
  //   setCurrentPath(path)
  // }
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
    openDirectory(targetPath)
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
    openDirectory(targetPath)
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
    // const response = await newSearchFileTask(currentPath, searchKey)
  }
  const rename = async (path: string, name: string) => {
    const info = DefaultWindowShare.getSystemInfo()
    const renamePath = [currentPath, name].join(info?.sep)
    await renameFile(path, renamePath)
    ipcRenderer.send(ChannelNames.directoryUpdate, currentPath)
  }
  const addFavourite = (item: { name: string, path: string, type: string }) => {
    FavouriteManager.getInstance().addFavourite(item)
  }
  const removeFavourite = (path: string) => {
    FavouriteManager.getInstance().removeFavourite(path)
  }
  const unarchiveInPlace = async (sources: string[], { password }: { password?: string }) => {
    await newUnarchiveTask(sources.map(it => ({
      input: it,
      inPlace: true,
      password
    })));
  }
  const setOrder = (order:ContentOrder) => {
    setCurrentContent([...getOrderContent(currentContent, order, contentGroupBy)])
    setContentOrder(order)
  }
  const setGroupBy = (groupBy:ContentGroupBy) => {
    setCurrentContent([...getOrderContent(currentContent, contentOrder, groupBy)])
    setContentGroupBy(groupBy)
  }
  return {
    initData,
    loadContent,
    currentPath,
    getBreadcrumbs,
    onBack,
    onNavChipClick,
    loadSmbDirs,
    currentContent,
    smbDirs,
    refresh,
    viewType,
    setViewType,
    mode,
    setMode,
    searchFile,
    rename,
    addFavourite,
    removeFavourite,
    unarchiveInPlace,
    imageViewUrl,
    datasetInfo,
    refreshDatasetInfo,
    openDirectory,
    isContentLoading,
    contentOrder,
    setOrder,
    setImageViewUrl,
    contentGroupBy,
    setGroupBy
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
