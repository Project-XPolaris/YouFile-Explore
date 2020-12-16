import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HomeSide from './side'
import useHomeModel, { getFileTree } from './model'
import { Box, Breadcrumbs, Chip, IconButton, Paper } from '@material-ui/core'
import FileItem from '../../components/FileItem'
import useFileModel from '../../models/file'
import AddSMBDialog from '../../components/AddSMBDialog'
import useLayoutModel from '../../models/layout'
import { AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import { ArrowBack, Refresh } from '@material-ui/icons'
import { FileNode } from './tree'
import { useUpdate } from 'ahooks'

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  nav: {
    width: '100%',
    height: theme.spacing(4),
    backgroundColor: '#FFFFFF',
    borderLeft: '1px #EEEEEE solid',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  reload: {

  },
  fileContent: {
    width: '100%',
    flex: '1 1'
  },
  pathBreadcrumbs: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const HomePage = ():React.ReactElement => {
  const [dirContent, setDirContent] = useState<FileNode[]>([])
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileModel = useFileModel()
  const layoutModel = useLayoutModel()

  useEffect(() => {
    homeModel.initData()
  }, [])
  useEffect(() => {
    const tree = getFileTree()
    tree.loadByPath(homeModel.currentPath).then(node => {
      setDirContent(node?.children ?? [])
    })

    // update expand node
    const parts = homeModel.currentPath.split('/')
    const result: string[] = []
    while (parts.length !== 2) {
      parts.pop()
      result.push(parts.join('/'))
    }
    result.push('/')
    homeModel.setExpanded([...result, ...homeModel.expanded])
  }, [homeModel.currentPath])
  const onRefresh = async () => {
    if (homeModel.currentPath) {
      const tree = getFileTree()
      const node = await tree.reloadContent(homeModel.currentPath)
      setDirContent(node?.children ?? [])
    }
  }
  function rowRenderer ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style // Style object to be applied to row (to position it)
  }:{key:string, index:number, style:any}) {
    const item = dirContent[index]
    return (
      <FileItem
        file={item}
        key={key}
        style={style}
        onClick={() => {
          if (item.type === 'Directory') {
            homeModel.loadFile(item.path)
          }
        }}
        onCopy={() => {
          fileModel.setCopyFile({
            name: item.name,
            path: item.path
          })
        }}
      />
    )
  }

  // console.log(homeModel.fileList.length)
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
        <div className={classes.nav}>
          <IconButton aria-label="delete" size="small" onClick={() => homeModel.onBack()}>
            <ArrowBack fontSize="inherit" />
          </IconButton>
          <Breadcrumbs className={classes.pathBreadcrumbs}>
            {
              homeModel.getBreadcrumbs().map((it, index) => (
                <Chip
                  size="small"
                  label={it}
                  key={it}
                  onClick={() => homeModel.onNavChipClick(index)}
                />
              ))
            }
          </Breadcrumbs>
          <IconButton aria-label="delete" size="small" onClick={() => onRefresh()} className={classes.reload}>
            <Refresh fontSize="inherit" />
          </IconButton>
        </div>
        <div className={classes.fileContent}>
          <AutoSizer>
            {({
              height,
              width
            }) => (
              <List
                width={width}
                height={height}
                rowCount={dirContent.length}
                rowHeight={64}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  )
}
export default HomePage
