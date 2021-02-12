import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { electronApp, electronRemote } from '../../remote'
import { IconButton } from '@material-ui/core'
import MinimizeSharpIcon from '@material-ui/icons/MinimizeSharp'
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import { Folder } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  main: {},
  status: {
    width: '100vw',
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1500
  },
  windowTitle: {
    color: theme.palette.primary.contrastText
  },
  dragZone: {
    '-webkit-app-region': 'drag',
    height: '100%'
  },
  statusRight: {},
  windowAction: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(1)
  },
  actionIcon: {
    fontSize: theme.spacing(2)
  },
  header: {
    position: 'fixed',
    backgroundColor: theme.palette.primary.dark,
    width: "100vh",
    zIndex: 1200
  },
  actionButton: {
    color: theme.palette.primary.contrastText
  },
  title: {
    ...theme.typography.body1,
    color: theme.palette.primary.contrastText,

    flexGrow: 1
  },
  tabs: {
    flexGrow: 1,
    height: theme.spacing(5),
    marginRight: theme.spacing(2)
  },
  band: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    flexGrow: 1,
    '-webkit-app-region': 'drag'
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText
  }
}))

export default function StartTitleBar ():ReactElement {
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
    <div className={classes.header}>
      <div className={classes.status}>
        <div className={classes.band}>
          <Folder className={classes.icon} />
          <div className={classes.title}>
            YouFile
          </div>
        </div>
        <div className={classes.dragZone} />
        <IconButton size='small' className={classes.windowAction} onClick={onMin}>
          <MinimizeSharpIcon className={classes.actionIcon} />
        </IconButton>
        <IconButton size='small' className={classes.windowAction} onClick={onMax}>
          <CheckBoxOutlineBlankSharpIcon className={classes.actionIcon} />
        </IconButton>
        <IconButton size='small' className={classes.windowAction} onClick={onClose}>
          <ClearSharpIcon className={classes.actionIcon} />
        </IconButton>
      </div>
    </div>
  )
}
