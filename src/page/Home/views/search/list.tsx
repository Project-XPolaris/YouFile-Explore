import { makeStyles } from '@material-ui/core/styles'
import useHomeModel from '../../model'
import React from 'react'
import FileItem from '../../../../components/FileItem'
import { AutoSizer, List } from 'react-virtualized'
import useFileContextMenu from '../../hooks/fileContentMenu'
import SearchContextMenu from './menu'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%', height: '100%'
  },
  mediumItem: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    padding: theme.spacing(2)
  }
}))
export const SearchFileListView = () => {
  const homeModel = useHomeModel()
  const classes = useStyles()
  const fileContextMenuController = useFileContextMenu()
  const rowRenderer = ({ key, index, style }:{key:string, index:number, style:any}) => {
    const item : any = homeModel.getSearchResult()[index]
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
      />
    )
  }
  return (
    <div className={classes.main}>
      <SearchContextMenu controller={fileContextMenuController} />
      <AutoSizer>
        {({
          height,
          width
        }) => (
          <List
            width={width}
            height={height}
            rowCount={homeModel.getSearchResult()?.length ?? 0}
            rowHeight={64}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}
