import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel, { getFileTree } from './model'
import { Breadcrumbs, Chip, IconButton, Paper } from '@material-ui/core'
import FileItem from '../../components/FileItem'
import useFileModel from '../../models/file'
import AddSMBDialog from '../../components/AddSMBDialog'
import useLayoutModel from '../../models/layout'
import { AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import { ArrowBack, Refresh } from '@material-ui/icons'
import { FileNode } from './tree'
import TextInputDialog from '../../components/TextInputDialog'
import AppBar from './appbar'
import AddMountDialog from '../../components/AddMoundDialog'
import mount from '../../models/mount'
import useMountModel from '../../models/mount'
import HomeSide from './side'
import SecurityLayout from '../../layout/Security'

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
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
    overflowY: 'auto'
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
  const mountModel = useMountModel()
  useEffect(() => {
    homeModel.initData()
  }, [])
  const onRefresh = async () => {
    if (homeModel.currentPath) {
      const tree = getFileTree()
      const node = await tree.reloadContent(homeModel.currentPath)
      setDirContent(node?.children ?? [])
    }
  }
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
      />
    )
  }
  const onSwitchCreateDirectoryDialog = () => {
    layoutModel.switchDialog('home/createDirectory')
  }
  const onCreateDirectory = async (value:string) => {
    await fileModel.mkdir(value)
    await onRefresh()
    onSwitchCreateDirectoryDialog()
  }
  return (
    <div className={classes.main}>
      <AddMountDialog
        onClose={() => layoutModel.switchDialog('home/addMount')}
        open={Boolean(layoutModel.dialogs['home/addMount'])}
        onOk={(data) => {
          layoutModel.switchDialog('home/addMount')
          if (homeModel.currentPath) {
            mountModel.mount({
              ...data,
              file: homeModel.currentPath
            })
          }
        }}
      />
      <AddSMBDialog
        onClose={() => layoutModel.switchDialog('global/addSMB')}
        open={Boolean(layoutModel.dialogs['global/addSMB'])}
        onOk={(data) => {
          layoutModel.switchDialog('global/addSMB')
          fileModel.addSMBFolder(data)
        }}
      />
      <TextInputDialog
        onClose={onSwitchCreateDirectoryDialog}
        onOk={onCreateDirectory}
        title="Create directory"
        label="Directory name"
        open={layoutModel.dialogs['home/createDirectory']}
      />
      <Paper elevation={2}>
        <div className={classes.side}>
          <HomeSide />
        </div>
      </Paper>
      <div className={classes.container}>
        <AppBar />
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
          <IconButton aria-label="delete" size="small" onClick={() => homeModel.refresh()} className={classes.reload}>
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
                rowCount={homeModel.currentContent.length}
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
