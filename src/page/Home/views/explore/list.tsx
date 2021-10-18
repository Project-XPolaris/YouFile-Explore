import React, { ReactElement } from 'react'
import FileItem from '../../../../components/FileItem'
import useHomeModel from '../../model'
import { AutoSizer, List } from 'react-virtualized'
import { FileNode } from '../../tree'
import { FileContext, FileContextMenuController } from '../../hooks/fileContentMenu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%'
  }
}))
export interface ExploreListViewPropsType {
  onRename:(file:FileNode) => void
  onItemClick:(file:FileNode) => void
  onItemClickAway:() => void
  selectPaths:string[]
  onCopy:(file:FileContext) => void
  onContextClick:(x:number, y:number, file:FileNode) => void
  fileContextMenuController: FileContextMenuController
}

const ExploreListView = ({ onItemClickAway, onItemClick, selectPaths, onContextClick, fileContextMenuController }: ExploreListViewPropsType) : ReactElement => {
  const homeModel = useHomeModel()
  const classes = useStyles()
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
          onContextClick(x, y, item)
        }}
        contextSelected={
          (fileContextMenuController.file?.path === item.path && fileContextMenuController.open) ||
          selectPaths.find(selected => selected === item.path) !== undefined
        }
        onClick={() => onItemClick(item)}
      />
    )
  }

  return (
    <div className={classes.main} onClick={onItemClickAway}>
      <AutoSizer>
        {({
          height,
          width
        }) => (
          <List
            style={{ outline: 'none' }}
            width={width}
            height={height}
            rowCount={homeModel.currentContent.length}
            rowHeight={64}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default ExploreListView
