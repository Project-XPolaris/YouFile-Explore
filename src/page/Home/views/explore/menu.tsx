import React, { ReactElement } from 'react'
import { Divider, Menu, MenuItem } from '@material-ui/core'
import {
  Delete,
  Edit,
  ExitToApp,
  FileCopy,
  Folder,
  LinkOff,
  Refresh,
  SelectAll,
  Tab,
  Unarchive
} from '@material-ui/icons'
import clsx from 'clsx'
import { FileContext, FileContextMenuController } from '../../hooks/fileContentMenu'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import useFileModel from '../../../../models/file'
import useHomeModel from '../../model'
import { FileNode } from '../../tree'
import useMountModel from '../../../../models/mount'
import useAppModel from '../../../../models/app'

export interface FileContextMenuPropsType {
    controller:FileContextMenuController,
    onRename:(file:FileNode) => void,
    onCopy:(file:FileContext) => void
    onMove:(file:FileContext) => void
  onDelete:(file:FileContext) => void
    onSelectAll:() => void
    onReverseSelect:() => void
    onAsMountPoint:() => void
}
const useStyles = makeStyles(theme => ({
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  copyIcon: {
    color: theme.palette.primary.main
  },
  deleteIcon: {
    color: red['500']
  }
}))
const FileContextMenu = ({ controller, onRename, onCopy, onDelete, onSelectAll, onAsMountPoint, onReverseSelect, onMove }: FileContextMenuPropsType):ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const homeModel = useHomeModel()
  const mountModel = useMountModel()
  const appModel = useAppModel()
  const handleContextClose = () => {
    controller.closeMenu()
  }
  const mountPoint = mountModel.mountList.find(it => it.file === controller.file?.path)
  return (
    <Menu
      keepMounted
      open={controller.open}
      onClose={handleContextClose}
      anchorReference="anchorPosition"
      anchorPosition={controller.getAnchor()}>
      <MenuItem
        onClick={() => {
          handleContextClose()
          if (!controller.file) {
            return
          }
          onCopy(controller.file)
        }}><FileCopy className={clsx(classes.menuIcon, classes.copyIcon)} />Copy</MenuItem>

      <MenuItem onClick={() => {
        handleContextClose()
        if (!controller.file) {
          return
        }
        onDelete(controller.file)
      }}><Delete className={clsx(classes.menuIcon, classes.deleteIcon)}/>Delete</MenuItem>
      <MenuItem onClick={() => {
        handleContextClose()
        if (!controller.file) {
          return
        }
        const target = homeModel.currentContent.find(item => item.path === controller.file?.path)
        if (target) {
          onRename(target)
        }
      }}><Edit className={clsx(classes.menuIcon, classes.copyIcon)}/>Rename</MenuItem>
      <MenuItem onClick={() => {
        handleContextClose()
        if (!controller.file) {
          return
        }
        onMove(controller.file)
      }}><ExitToApp className={clsx(classes.menuIcon, classes.copyIcon)}/>Move</MenuItem>
      {
            controller.file?.type === 'Directory' &&
            <MenuItem onClick={() => {
              handleContextClose()
              if (!controller.file) {
                return
              }
              homeModel.tabController.openNewExploreByPath(controller.file.name, controller.file.path)
            }}><Tab className={clsx(classes.menuIcon, classes.copyIcon)}/>Open in new tab</MenuItem>
      }
      <Divider/>
      <MenuItem onClick={() => {
        onSelectAll()
        handleContextClose()
      }}><SelectAll className={clsx(classes.menuIcon, classes.copyIcon)} />Select all</MenuItem>
      <MenuItem onClick={() => {
        onReverseSelect()
        handleContextClose()
      }}><Refresh className={clsx(classes.menuIcon, classes.copyIcon)} />Reverse select</MenuItem>
      <Divider/>
      {
        controller.file?.type === 'Directory'
          ? mountPoint
            ? <MenuItem onClick={() => {
              mountModel.removeMount(mountPoint.file)
              handleContextClose()
            }}><LinkOff className={clsx(classes.menuIcon, classes.copyIcon)} />Unmount</MenuItem>
            : <MenuItem onClick={() => {
              onAsMountPoint()
              handleContextClose()
            }}><Folder className={clsx(classes.menuIcon, classes.copyIcon)} />As smb mount point</MenuItem>
          : <></>
      }
      <Divider/>
      <MenuItem onClick={() => {
        if (controller.file && appModel.info?.sep) {
          homeModel.unarchiveInPlace(controller.file.path)
        }
        handleContextClose()
      }}><Unarchive className={clsx(classes.menuIcon, classes.copyIcon)} />Extract here</MenuItem>
    </Menu>
  )
}

export default FileContextMenu
