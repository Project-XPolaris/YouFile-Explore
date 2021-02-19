import { useDynamicList } from 'ahooks'
import { useEffect, useState } from 'react'
export type TabType = 'Explore' | 'Search'
export interface TabItem {
  path : string | undefined
  name : string
  active:boolean,
  type : TabType,
  id?: string
}
export const useTabsController = ({ onTabChange }:{onTabChange:(tab:TabItem) => void}) => {
  const tabsListController = useDynamicList<TabItem>([{
    name: 'new tab',
    path: undefined,
    active: true,
    type: 'Explore'
  }])
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
    console.log(index)
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
      type: type
    })
    tabsListController.resetList(newList)
  }
  const openNewExploreByPath = (name:string,path:string) => {
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
      type: 'Explore'
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
    console.log(id)
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
  useEffect(() => {
    console.log(tabsListController.list)
    const tab = tabsListController.list.find(it => it.active)
    if (onTabChange && tab) {
      onTabChange(tab)
    }
  }, [tabsListController.list])
  return {
    addTab, closeTab, list: tabsListController.list, setActiveWithIndex, newTab, setCurrentTabFolder, newSearchTab, openNewExploreByPath
  }
}
