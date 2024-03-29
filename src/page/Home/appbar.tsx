import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, IconButton, Menu, MenuItem } from '@material-ui/core'
import PopoverImageButton from '../../components/PopoverImageButton'
import { CreateNewFolder, ExitToApp, FileCopy, FlashOn, Launch, ListAlt, Storage } from '@material-ui/icons'
import CopyPopover from '../../layout/Frame/parts/CopyPopover'
import useFileModel from '../../models/file'
import useLayoutModel from '../../models/layout'
import usePopoverController from '../../hooks/PopoverController'
import { useHistory } from 'react-router-dom'
import ApplicationBar from '../../components/ApplicationBar'
import useApplicationBarController from '../../components/ApplicationBar/hook'
import CutPopover from '../../layout/Frame/parts/CutPopover'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../../electron/channels'

const useStyles = makeStyles((theme) => ({
  main: {},
  actionButton: {
    color: theme.palette.primary.contrastText
  },
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appbar: {
    marginTop: theme.spacing(4)
  }
}))

const AppBar = ():ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const layoutModel = useLayoutModel()
  const history = useHistory()
  const controller = useApplicationBarController()
  const moreMenu = (
    <Menu
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open
    >
      <MenuItem onClick={() => {
        controller.handleMenuClose()
        layoutModel.switchDialog('global/addSMB')
      }}><Launch className={classes.menuIcon} /> Set As SMB Directory</MenuItem>
      <MenuItem onClick={() => {
        controller.handleMenuClose()
        layoutModel.switchDialog('home/createDirectory')
      }}><CreateNewFolder className={classes.menuIcon} />New directory</MenuItem>
      <Divider />
      <MenuItem onClick={() => {
        controller.handleMenuClose()
        history.push('/fstab')
      }}><Storage className={classes.menuIcon} />Mounts(Fstab)</MenuItem>
      <MenuItem onClick={() => {
        controller.handleMenuClose()
        layoutModel.switchDialog('home/addMount')
      }}><FlashOn className={classes.menuIcon} />As mount point</MenuItem>
    </Menu>
  )
  const copyPopoverController = usePopoverController()
  const movePopoverController = usePopoverController()
  const actions = (
    <>
      {
        fileModel.clipboardFile && fileModel.clipboardAction === 'Copy' &&
        <PopoverImageButton icon={<FileCopy className={classes.actionButton} />} controller={copyPopoverController}>
          <CopyPopover
            onPaste={() => {
              fileModel.pasteFile()
              copyPopoverController.setAnchorEl(null)
            }}
            onClearAll={() => {
              ipcRenderer.send(ChannelNames.setClipboard, { items: [], action: 'Copy' })
              copyPopoverController.setAnchorEl(null)
            }}
          />
        </PopoverImageButton>
      }
      {
        fileModel.clipboardFile && fileModel.clipboardAction === 'Move' &&
        <PopoverImageButton icon={<ExitToApp className={classes.actionButton} />} controller={movePopoverController}>
          <CutPopover onMove={() => {
            fileModel.move()
            copyPopoverController.setAnchorEl(null)
          }}
          onClearAll={() => {
            ipcRenderer.send(ChannelNames.setClipboard, { items: [], action: 'Move' })
            copyPopoverController.setAnchorEl(null)
          }}
          />
        </PopoverImageButton>
      }
      <IconButton
        onClick={() => layoutModel.switchDialog('global/taskDrawer')}
      >
        <ListAlt className={classes.actionButton} />
      </IconButton>
    </>
  )
  return (
    <ApplicationBar moreMenu={moreMenu} actions={actions} controller={controller} className={classes.appbar} />
  )
}
export default AppBar
