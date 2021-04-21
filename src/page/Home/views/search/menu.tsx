import React, { ReactElement } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { Delete, FileCopy, Tab } from '@material-ui/icons'
import clsx from 'clsx'
import { FileContextMenuController } from '../../hooks/fileContentMenu'
import useFileModel from '../../../../models/file'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import useHomeModel from '../../model'

export interface SearchContextMenuPropsType {
    controller : FileContextMenuController
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
const SearchContextMenu = ({ controller }: SearchContextMenuPropsType) : ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const homeModel = useHomeModel()
  const handleContextClose = () => {
    controller.closeMenu()
  }
  return (
    <Menu
      keepMounted
      open={controller.open}
      onClose={handleContextClose}
      anchorReference="anchorPosition"
      anchorPosition={controller.getAnchor()}
    >
      <MenuItem
        onClick={() => {
          handleContextClose()
          if (!controller.file) {
            return
          }
          fileModel.setCopyFile([{
            name: controller.file.name,
            path: controller.file.path,
            type: controller.file.type
          }])
        }}><FileCopy className={clsx(classes.menuIcon, classes.copyIcon)} />Copy</MenuItem>

      <MenuItem onClick={() => {
        handleContextClose()
        if (!controller.file) {
          return
        }
        fileModel.deleteFile([controller.file.path])
      }}><Delete className={clsx(classes.menuIcon, classes.deleteIcon)}/>Delete</MenuItem>
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
    </Menu>
  )
}

export default SearchContextMenu
