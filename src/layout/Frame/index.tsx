import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import MinimizeSharpIcon from '@material-ui/icons/MinimizeSharp'
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import { electronApp, electronRemote } from '../../remote'
const useStyles = makeStyles((theme) => ({
  main: {

  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  status: {
    width: '100vw',
    height: theme.spacing(4),
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center'
  },
  windowTitle: {
    color: theme.palette.primary.contrastText
  },
  dragZone: {
    '-webkit-app-region': 'drag',
    flexGrow: 1,
    height: '100%'
  },
  statusRight: {

  },
  windowAction: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(1)
  },
  actionIcon: {
    fontSize: theme.spacing(2)
  },
  content: {
    paddingTop: theme.spacing(12),
    height: '100vh',
    width: '100vw'
  },
  header: {
    position: 'fixed'
  }
}))

interface FrameLayoutPropsType {
  children?:any
}

const FrameLayout = ({ children }: FrameLayoutPropsType) => {
  const classes = useStyles()
  const onClose = () => {
    electronApp.exit()
  }
  const onMin = () => {
    electronRemote.BrowserWindow.getFocusedWindow().minimize()
  }
  const onMax = () => {
    const currentWindow = electronRemote.BrowserWindow.getFocusedWindow()
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize()
    } else {
      currentWindow.maximize()
    }
  }
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.status}>
          <div className={classes.dragZone} />
          <IconButton size="small" className={classes.windowAction} onClick={onMin}>
            <MinimizeSharpIcon className={classes.actionIcon}/>
          </IconButton>
          <IconButton size="small" className={classes.windowAction} onClick={onMax}>
            <CheckBoxOutlineBlankSharpIcon className={classes.actionIcon}/>
          </IconButton>
          <IconButton size="small" className={classes.windowAction} onClick={onClose}>
            <ClearSharpIcon className={classes.actionIcon}/>
          </IconButton>
        </div>
        <AppBar elevation={0} position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} component="div">
            YouFile
            </Typography>

          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}
export default FrameLayout
