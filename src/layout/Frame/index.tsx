import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Card, CardContent, IconButton, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core'
import MinimizeSharpIcon from '@material-ui/icons/MinimizeSharp'
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import { electronApp, electronRemote } from '../../remote'
import { CreateNewFolder, FileCopy, Launch, MoreVert } from '@material-ui/icons'
import PopoverImageButton from '../../components/PopoverImageButton'
import CopyPopover from './parts/CopyPopover'
import usePopoverController from '../../hooks/PopoverController'
import useFileModel from '../../models/file'
import useLayoutModel from '../../models/layout'
import TaskDrawer from './parts/TaskDrawer'
import AssignmentIcon from '@material-ui/icons/Assignment'
const useStyles = makeStyles((theme) => ({
  main: {},
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
    alignItems: 'center',
    zIndex: 1500
  },
  windowTitle: {
    color: theme.palette.primary.contrastText
  },
  dragZone: {
    '-webkit-app-region': 'drag',
    flexGrow: 1,
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
  content: {
    paddingTop: theme.spacing(12),
    height: '100vh',
    width: '100vw'
  },
  header: {
    position: 'fixed'
  },
  actionButton: {
    color: theme.palette.primary.contrastText
  },
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '*::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#b7b7b7'
    }
  }
}))

interface FrameLayoutPropsType {
  children?: any
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
  const copyPopoverController = usePopoverController()
  const fileModel = useFileModel()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const layoutModel = useLayoutModel()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const moreMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <MenuItem onClick={() => {
        handleClose()
        layoutModel.switchDialog('global/addSMB')
      }}><Launch className={classes.menuIcon}/> Set As SMB Directory</MenuItem>
      <MenuItem onClick={() => {
        handleClose()
        layoutModel.switchDialog('home/createDirectory')
      }}><CreateNewFolder className={classes.menuIcon}/>New directory</MenuItem>
    </Menu>
  )
  return (
    <div className={classes.main}>
      <TaskDrawer
        onClose={() => layoutModel.switchDialog('global/taskDrawer')}
        open={layoutModel.dialogs['global/taskDrawer']}
      />
      <div className={classes.header}>
        <div className={classes.status}>
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
        <AppBar elevation={0} position='static'>
          <Toolbar>
            <Typography variant='h6' className={classes.title} component='div'>
              YouFile
            </Typography>
            {
              fileModel.copyFile &&
              <PopoverImageButton icon={<FileCopy className={classes.actionButton} /> } controller={copyPopoverController}>
                <CopyPopover onPaste={() => {
                  copyPopoverController.setAnchorEl(null)
                  fileModel.setCopyFile(undefined)
                }} />
              </PopoverImageButton>
            }
            <IconButton
              onClick={() => layoutModel.switchDialog('global/taskDrawer')}
            >
              <AssignmentIcon className={classes.actionButton}/>
            </IconButton>
            <IconButton
              onClick={handleClick}
              aria-controls="demo-positioned-menu"
              aria-haspopup="true"
            >
              <MoreVert className={classes.actionButton}/>
            </IconButton>
            {moreMenu}
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
