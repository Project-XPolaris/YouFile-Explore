import React, { ReactElement, useState } from 'react'
import useHomeModel from '../../model'
import { AutoSizer, List } from 'react-virtualized'
import { FileNode } from '../../tree'
import { FileContext, FileContextMenuController } from '../../hooks/fileContentMenu'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import FileDetailItem from '../../../../components/FileDetailItem'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#fcfcfc',
    display: 'flex',
    flexDirection: 'column'
  },
  item: {

  },
  dataField: {
    paddingLeft: 8
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgb(0,0,0,.0.05)'
  }

}))
export interface ExploreDetailListViewPropsType {
  onRename:(file:FileNode) => void
  onItemClick:(file:FileNode) => void
  onOpenItem:(file:FileNode) => void
  onItemClickAway:() => void
  selectPaths:string[]
  onCopy:(file:FileContext) => void
  onContextClick:(x:number, y:number, file:FileNode) => void
  fileContextMenuController: FileContextMenuController
}
export interface DataField {
  key:string,
  title:string
  width:number
}
const ExploreDetailListView = ({
  onItemClickAway,
  onItemClick,
  selectPaths,
  onContextClick,
  fileContextMenuController,
  onOpenItem
}: ExploreDetailListViewPropsType) : ReactElement => {
  const homeModel = useHomeModel()
  const classes = useStyles()
  const [fields, setFields] = useState<DataField[]>([
    {
      key: 'name',
      title: 'Name',
      width: 120
    },
    {
      key: 'type',
      title: 'Type',
      width: 120
    },
    {
      key: 'size',
      title: 'Size',
      width: 120
    }
  ])

  const rowRenderer = ({
    key,
    index,
    style
  }: { key: string, index: number, style: any }) => {
    const item = homeModel.currentContent[index]
    return (
      <FileDetailItem
        key={key}
        className={classes.item}
        style={style}
        item={item}
        fields={fields}
        onDoubleClick={() => onOpenItem(item)}
        onClick={() => onItemClick(item)}
        onContextClick={(x, y) => {
          onContextClick(x, y, item)
        }}
        contextSelected={
          (fileContextMenuController.file?.path === item.path && fileContextMenuController.open) ||
          selectPaths.find(selected => selected === item.path) !== undefined
        }
      />
    )
  }

  return (
    <div className={classes.main} onClick={onItemClickAway}>
      <div className={classes.header}>
        {
          fields.map(it => {
            if (it.key === 'name') {
              return (
                <div style={{ flex: 1, paddingLeft: 8 }} key={it.key}>
                  <Typography variant={'caption'} >
                    { it.title }
                  </Typography>
                </div>
              )
            }
            return (
              <div style={{ width: it.width }} key={it.key}>
                <Typography variant={'caption'} >
                  { it.title }
                </Typography>
              </div>
            )
          })
        }
      </div>
      <div style={{ flex: 1 }}>
        <AutoSizer >
          {({
            height,
            width
          }) => (
            <List
              style={{ outline: 'none' }}
              width={width}
              height={height}
              rowCount={homeModel.currentContent.length}
              rowHeight={32}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default ExploreDetailListView
