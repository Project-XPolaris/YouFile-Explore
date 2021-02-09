import { makeStyles } from '@material-ui/core/styles'
import useHomeModel from '../../model'
import { FlexGrid } from '../../../../components/FlexGrid'
import FileItemMedium from '../../../../components/FileItemMedium'
import React from 'react'
import FileItem from '../../../../components/FileItem'
import { AutoSizer, List } from 'react-virtualized'
import useFileModel from '../../../../models/file';

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
  const fileModel = useFileModel()
  const classes = useStyles()
  const rowRenderer = ({ key, index, style }:{key:string, index:number, style:any}) => {
    if (!homeModel.searchResult){
      return
    }
    const item : any = homeModel.searchResult[index]
    return (
      <FileItem
        file={item}
        key={key}
        style={style}
        onClick={() => {

        }}
        onCopy={() => {
          fileModel.setCopyFile({
            name: item.name,
            path: item.path
          })
        }}
        onDelete={() => {
          fileModel.deleteFile([item.path])
        }}
      />
    )
  }

  return (
    <div className={classes.main}>
      {
        homeModel.searchResult &&
        <AutoSizer>
          {({
            height,
            width
          }) => (
            <List
              width={width}
              height={height}
              rowCount={homeModel.searchResult?.length ?? 0}
              rowHeight={64}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      }
    </div>
  )
}
