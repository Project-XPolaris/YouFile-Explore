import { useDynamicList } from 'ahooks'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../../../electron/channels'

export type TabType = 'Explore' | 'Search' | 'Start' | 'Image' | 'Video'
export interface TabItem {
  path : string | undefined
  name : string
  active:boolean,
  type : TabType,
  target?:string
  id: string
}
export const useTabsController = ({
  onTabChange
}:{
  onTabChange:(tab:TabItem) => void
  onEmptyTab?:() => void
}) => {
  const getInitTab = ():TabItem[] => {
    const urlSearchParams:URLSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams.get('id')
    if (id) {
      const { intent } = ipcRenderer.sendSync(ChannelNames.getWindowIntent, { id })
      if (intent) {
        return [{
          name: name,
          path: intent.loadPath,
          active: true,
          type: 'Explore',
          id: uuidv4()
        }]
        // setMode('display')
        // setCurrentPath()
      }
      console.log(intent)
    }
    return [{
      name: 'new tab',
      path: undefined,
      active: true,
      type: 'Start',
      id: uuidv4()
    }]
  }
  const tabsListController = useDynamicList<TabItem>(getInitTab())
  const addTab = (item : TabItem) => {
    tabsListController.push(item)
  }
  const closeTab = (index:number) => {
    const tab = tabsListController.list[index]
    if (tab.active && index > 0) {
      const prevTab = tabsListController.list[index - 1]
      tabsListController.replace(index - 1, {
        ...prevTab,
        active: true
      })
    }
    if (tab.active && index === 0 && tabsListController.list.length > 1) {
      const nextTab = tabsListController.list[index + 1]
      tabsListController.replace(index + 1, {
        ...nextTab,
        active: true
      })
    }
    tabsListController.remove(index)
  }
  const setActiveWithIndex = (index:number) => {
    const newList = tabsListController.list.map((it, idx) => {
      if (idx === index) {
        return {
          ...it,
          active: true
        }
      } else {
        return {
          ...it,
          active: false
        }
      }
    })
    tabsListController.resetList(newList)
  }
  const newTab = ({ type = 'Explore' }:{type :TabType}) => {
    const newList = tabsListController.list.map(it => {
      return {
        ...it,
        active: false
      }
    })
    newList.push({
      name: 'new tab',
      path: undefined,
      active: true,
      type: type,
      id: uuidv4()
    })
    tabsListController.resetList(newList)
  }
  const openNewExploreByPath = (name:string, path:string) => {
    const newList = tabsListController.list.map(it => {
      return {
        ...it,
        active: false
      }
    })
    newList.push({
      name: name,
      path: path,
      active: true,
      type: 'Explore',
      id: uuidv4()
    })
    tabsListController.resetList(newList)
  }
  const openImageViewTab = (name:string, path:string, target:string) => {
    const newList = tabsListController.list.map(it => {
      return {
        ...it,
        active: false
      }
    })
    newList.push({
      name: name,
      path: path,
      active: true,
      type: 'Image',
      id: uuidv4(),
      target
    })
    tabsListController.resetList(newList)
  }
  const openVideoTab = (name:string, path:string, target:string) => {
    const newList = tabsListController.list.map(it => {
      return {
        ...it,
        active: false
      }
    })
    console.log(target)
    newList.push({
      name: name,
      path: path,
      active: true,
      type: 'Video',
      id: uuidv4(),
      target
    })
    tabsListController.resetList(newList)
  }
  const setCurrentTabFolder = (name:string, path?:string) => {
    tabsListController.resetList(tabsListController.list.map(it => {
      if (it.active && it.type === 'Explore') {
        return {
          ...it,
          name,
          path
        }
      }
      return {
        ...it
      }
    }))
  }

  const newSearchTab = (name:string, id:string) => {
    const newList = tabsListController.list.map(it => {
      return {
        ...it,
        active: false
      }
    })
    newList.push({
      name: `search in ${name}`,
      id: id,
      active: true,
      type: 'Search',
      path: undefined
    })
    tabsListController.resetList(newList)
  }
  const startPageToExplore = (path:string) => {
    const newList : Array<TabItem> = tabsListController.list.map((it) => {
      if (it.active) {
        return {
          ...it,
          type: 'Explore',
          path: path,
          active: true
        }
      } else {
        return {
          ...it,
          active: false
        }
      }
    })
    tabsListController.resetList(newList)
  }
  useEffect(() => {
    if (tabsListController.list.length === 0) {
      tabsListController.resetList(init)
      return
    }
    const tab = tabsListController.list.find(it => it.active)
    if (onTabChange && tab) {
      onTabChange(tab)
    }
  }, [tabsListController.list])
  return {
    list: tabsListController.list,
    addTab,
    closeTab,
    setActiveWithIndex,
    newTab,
    setCurrentTabFolder,
    newSearchTab,
    openNewExploreByPath,
    startPageToExplore,
    openImageViewTab,
    openVideoTab,
    setList: tabsListController.resetList
  }
}
