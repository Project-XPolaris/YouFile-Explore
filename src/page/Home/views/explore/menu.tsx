import React, { ReactElement } from 'react'
import { Divider, Menu, MenuItem } from '@material-ui/core'
import { Delete, Edit, ExitToApp, FileCopy, Folder, LinkOff, Refresh, SelectAll, Unarchive } from '@material-ui/icons'
import clsx from 'clsx'
import { FileContext, FileContextMenuController } from '../../hooks/fileContentMenu'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import useHomeModel from '../../model'
import { FileNode } from '../../tree'
import useMountModel from '../../../../models/mount'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../../../../electron/channels'
import useFileModel from '../../../../models/file'

const ExtractExtensions = [
  'zip', 'rar', 'tar', 'bz', 'bz2', 'gz', '7z'
]
export interface FileContextMenuPropsType {
  controller: FileContextMenuController,
  onRename: (file: FileNode) => void,
  onCopy: (file: FileContext) => void
  onMove: (file: FileContext) => void
  onDelete: (file: FileContext) => void
  onExtract: (file: FileContext) => void
  onClipboardTo:(file:FileContext, action: 'Copy' | 'Move') => void
  onSelectAll: () => void
  onReverseSelect: () => void
  onAsMountPoint: () => void
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
const FileContextMenu = ({
  controller,
  onRename,
  onCopy,
  onDelete,
  onSelectAll,
  onAsMountPoint,
  onReverseSelect,
  onClipboardTo,
  onMove,
  onExtract
}: FileContextMenuPropsType): ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const mountModel = useMountModel()
  const fileModel = useFileModel()
  const handleContextClose = () => {
    controller.closeMenu()
  }
  const mountPoint = mountModel.mountList.find(it => it.file === controller.file?.path)

  const icon = {
    Copy: <FileCopy className={clsx(classes.menuIcon, classes.copyIcon)} />,
    Move: <ExitToApp className={clsx(classes.menuIcon, classes.copyIcon)} />
  }
  const menuText = {
    Copy: 'Paste to directory',
    Move: 'Move to directory'
  }
  const renderClipboardTargetMenu = () => {
    if (controller.file?.type !== 'Directory' || (fileModel.clipboardFile?.length ?? 0) === 0) {
      return null
    }
    return (
      <MenuItem onClick={() => {
        if (!controller.file) {
          return
        }
        onClipboardTo(controller.file, fileModel.clipboardAction)
        handleContextClose()
      }}>{ icon[fileModel.clipboardAction] }{ menuText[fileModel.clipboardAction] }</MenuItem>
    )
  }
  const renderArchiveFileContext = () => {
    if (!controller.file) {
      return null
    }
    let extensionFlag = false
    for (const extension of ExtractExtensions) {
      if (controller.file.name.endsWith(extension)) {
        extensionFlag = true
      }
    }
    if (!extensionFlag) {
      return null
    }
    return (
      <MenuItem onClick={() => {
        if (controller.file) {
          onExtract(controller.file)
        }
        handleContextClose()
      }}><Unarchive className={clsx(classes.menuIcon, classes.copyIcon)} />Extract here</MenuItem>
    )
  }
  return (
    <Menu
      keepMounted
      open={controller.open}
      onClose={handleContextClose}
      anchorReference='anchorPosition'
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
      }}><Delete className={clsx(classes.menuIcon, classes.deleteIcon)} />Delete</MenuItem>
      <MenuItem onClick={() => {
        handleContextClose()
        if (!controller.file) {
          return
        }
        const target = homeModel.currentContent.find(item => item.path === controller.file?.path)
        if (target) {
          onRename(target)
        }
      }}><Edit className={clsx(classes.menuIcon, classes.copyIcon)} />Rename</MenuItem>
      <MenuItem onClick={() => {
        handleContextClose()
        if (!controller.file) {
          return
        }
        onMove(controller.file)
      }}><ExitToApp className={clsx(classes.menuIcon, classes.copyIcon)} />Move</MenuItem>
      <Divider />
      <MenuItem onClick={() => {
        onSelectAll()
        handleContextClose()
      }}><SelectAll className={clsx(classes.menuIcon, classes.copyIcon)} />Select all</MenuItem>
      <MenuItem onClick={() => {
        onReverseSelect()
        handleContextClose()
      }}><Refresh className={clsx(classes.menuIcon, classes.copyIcon)} />Reverse select</MenuItem>
      <Divider />
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
          : null
      }
      {
        controller.file?.type === 'Directory' &&
        <MenuItem onClick={() => {
          if (controller.file) {
            ipcRenderer.send(ChannelNames.openNewWindowWithPath, { loadPath: controller.file.path })
          }
          handleContextClose()
        }}><Folder className={clsx(classes.menuIcon, classes.copyIcon)} />Open in new window</MenuItem>
      }
      {
        renderClipboardTargetMenu()
      }
      {
        renderArchiveFileContext()
      }
    </Menu>
  )
}

export default FileContextMenu
