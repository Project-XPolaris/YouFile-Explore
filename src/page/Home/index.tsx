import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HomeSide from './side'
import useHomeModel from './model'
import { Box, Paper } from '@material-ui/core'
import FileItem from '../../components/FileItem'
import useFileModel from '../../models/file'
import AddSMBDialog from '../../components/AddSMBDialog'
import useLayoutModel from '../../models/layout'
import { AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  },
  side: {
    backgroundColor: 'white',
    height: '100%',
    width: 240,
    overflowY: 'auto'
  },
  container: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    overflowX: 'hidden',
    height: '100%'
  }
}))

interface HomePagePropsType {

}

const HomePage = ({}: HomePagePropsType) => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileModel = useFileModel()
  const layoutModel = useLayoutModel()
  useEffect(() => {
    if (homeModel.fileTree === undefined) {
      homeModel.initData()
    }
  }, [])
  console.log(homeModel.currentPath)

  function rowRenderer ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) {
    const item = homeModel.fileList[index]
    return (
      <FileItem
        file={item}
        key={key}
        style={style}
        onClick={() => homeModel.loadFile(item)}
        onCopy={() => {
          fileModel.setCopyFile({
            name: item.name,
            path: item.path
          })
        }}
      />
    )
  }

  console.log(homeModel.fileList.length)
  return (
    <div className={classes.main}>
      <AddSMBDialog
        onClose={() => layoutModel.switchDialog('global/addSMB')}
        open={Boolean(layoutModel.dialogs['global/addSMB'])}
        onOk={(data) => {
          layoutModel.switchDialog('global/addSMB')
          fileModel.addSMBFolder(data)
        }}
      />
      <Paper elevation={2}>
        <div className={classes.side}>
          <HomeSide />
        </div>
      </Paper>
      <div className={classes.container}>
        <AutoSizer>
          {({
            height,
            width
          }) => (
            <List
              width={width}
              height={height}
              rowCount={homeModel.fileList.length}
              rowHeight={64}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>

      </div>
    </div>
  )
}
export default HomePage
