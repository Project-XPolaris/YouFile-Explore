import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TreeItem, TreeView } from '@material-ui/lab'
import HomeSide from './side'
import useHomeModel from './model'
import { Box, Paper } from '@material-ui/core'
import FileItem from '../../components/FileItem'
import useFileModel from '../../models/file'

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
    flex: 1,
    overflowX: 'hidden'
  }
}))

interface HomePagePropsType {

}

const HomePage = ({}: HomePagePropsType) => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileModel = useFileModel()
  useEffect(() => {
    if (homeModel.fileTree === undefined) {
      homeModel.initData()
    }
  }, [])
  console.log(homeModel.currentPath)
  return (
    <div className={classes.main}>
      <Paper elevation={2}>
        <div className={classes.side}>
          <HomeSide />
        </div>
      </Paper>
      <div className={classes.container}>
        {
          homeModel.fileList.map((item) => (
            <FileItem
              file={item}
              key={item.path}
              onClick={() => homeModel.loadFile(item)}
              onCopy={() => {
                fileModel.setCopyFile({
                  name: item.name,
                  path: item.path
                })
              }}
            />
          ))
        }
      </div>
    </div>
  )
}
export default HomePage
