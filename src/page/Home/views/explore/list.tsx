import React, { ReactElement } from 'react'
import FileItem from '../../../../components/FileItem'
import useHomeModel from '../../model'
import { AutoSizer, List } from 'react-virtualized'
import { FileNode } from '../../tree'
import useFileContextMenu, { FileContext } from '../../hooks/fileContentMenu'
import FileContextMenu from './menu'

export interface ExploreListViewPropsType {
  onRename:(file:FileNode) => void
  onItemClick:(file:FileNode) => void
  onItemClickAway:(file:FileNode) => void
  selectPaths:string[]
  onCopy:(file:FileContext) => void
}

const ExploreListView = ({ onRename, onItemClickAway, onItemClick, onCopy, selectPaths }: ExploreListViewPropsType) : ReactElement => {
  const homeModel = useHomeModel()
  const fileContextMenuController = useFileContextMenu()

  const rowRenderer = ({
    key,
    index,
    style
  }: { key: string, index: number, style: any }) => {
    const item = homeModel.currentContent[index]
    return (
      <FileItem
        file={item}
        key={key}
        style={style}
        onContextClick={(x, y) => {
          fileContextMenuController.openMenu({
            left: x, top: y, name: item.name, type: item.type, path: item.path
          })
        }}
        contextSelected={
          (fileContextMenuController.file?.path === item.path && fileContextMenuController.open) ||
          selectPaths.find(selected => selected === item.path) !== undefined
        }
        onClickAway={() => onItemClickAway(item)}
        onClick={() => onItemClick(item)}
      />
    )
  }

  return (
    <>
      <FileContextMenu
        controller={fileContextMenuController}
        onRename={onRename}
        onCopy={onCopy}
      />
      <AutoSizer>
        {({
          height,
          width
        }) => (
          <List
            width={width}
            height={height}
            rowCount={homeModel.currentContent.length}
            rowHeight={64}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </>
  )
}

export default ExploreListView
