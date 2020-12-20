import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Menu, MenuItem, Toolbar, Typography, AppBar as MAppBar, Divider } from '@material-ui/core'
import PopoverImageButton from '../../components/PopoverImageButton'
import { CreateNewFolder, FileCopy, FlashOn, Launch, ListAlt, MoreVert, Storage } from '@material-ui/icons'
import CopyPopover from '../../layout/Frame/parts/CopyPopover'
import AssignmentIcon from '@material-ui/icons/Assignment'
import useFileModel from '../../models/file'
import useLayoutModel from '../../models/layout'
import usePopoverController from '../../hooks/PopoverController'
import { useHistory } from 'react-router-dom'
import ApplicationBar from '../../components/ApplicationBar'
import useApplicationBarController from '../../components/ApplicationBar/hook'

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

interface AppBarPropsType {

}

const AppBar = ({}: AppBarPropsType):ReactElement => {
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
  const actions = (
    <>
      {
        fileModel.copyFile &&
        <PopoverImageButton icon={<FileCopy className={classes.actionButton} />} controller={copyPopoverController}>
          <CopyPopover onPaste={() => {
            copyPopoverController.setAnchorEl(null)
            fileModel.setCopyFile(undefined)
          }} />
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
