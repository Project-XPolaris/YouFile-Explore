import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import HomeSide from '../../side'
import SearchView from '../search/search'
import useHomeModel from '../../model'
import { AutoSizer, List } from 'react-virtualized'
import MediumView from './medium'
import FileItem from '../../../../components/FileItem'
import useFileModel from '../../../../models/file'
import { FileNode } from '../../tree'

const useStyles = makeStyles({
  main: {
    width:"100%",
    backgroundColor: '#EEEEEE',
    display: 'flex'
  },
  fileContent: {
    width: '100%',
    flex: '1 1'
  },
  container: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  side: {
    backgroundColor: 'white',
    height: '100%',
    width: 240,
    overflowY: 'auto'
  }
})

interface ExploreViewPropsType {
  onRename:(file:FileNode) => void
}

export default function ExploreView ({onRename}: ExploreViewPropsType) {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileModel = useFileModel()
  const rowRenderer = ({ key, index, style }:{key:string, index:number, style:any}) => {
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
        onCopy={() => {
          fileModel.setCopyFile({
            name: item.name,
            path: item.path
          })
        }}
        onDelete={() => {
          fileModel.deleteFile([item.path])
        }}
        onRename={() => onRename(item)}
      />
    )
  }
  const renderDisplayMode = () => {
    return (
      <>
        {
          homeModel.viewType === 'List' &&
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
        }
        {
          homeModel.viewType === 'Medium' &&
          <MediumView onRename={onRename} />
        }
      </>
    )
  }
  return (
    <div className={classes.main}>
      <Paper elevation={2}>
        <div className={classes.side}>
          <HomeSide />
        </div>
      </Paper>
      <div className={classes.container}>
        <div className={classes.fileContent}>
          {homeModel.mode === 'display' && renderDisplayMode()}
          {homeModel.mode === 'search' && <SearchView />}
        </div>
      </div>
    </div>
  )
}
