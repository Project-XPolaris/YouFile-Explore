import React, { ReactElement } from 'react'
import FileItem from '../../../../components/FileItem'
import useHomeModel from '../../model'
import { AutoSizer, List } from 'react-virtualized'
import { FileNode } from '../../tree'
import useFileContextMenu from '../../hooks/fileContentMenu'
import FileContextMenu from './menu'

export interface ExploreListViewPropsType {
  onRename:(file:FileNode) => void
}

const ExploreListView = ({ onRename }: ExploreListViewPropsType) : ReactElement => {
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
        onClick={() => {
          if (item.type === 'Directory') {
            homeModel.setCurrentPath(item.path)
          }
        }}
        onContextClick={(x, y) => {
          fileContextMenuController.openMenu({
            left: x, top: y, name: item.name, type: item.type, path: item.path
          })
        }}
      />
    )
  }
  return (
    <>
      <FileContextMenu controller={fileContextMenuController} onRename={onRename} />
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
