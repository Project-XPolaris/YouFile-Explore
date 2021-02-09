import useHomeModel from '../../model'
import { FlexGrid } from '../../../../components/FlexGrid'
import FileItemMedium from '../../../../components/FileItemMedium'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, MenuItem } from '@material-ui/core'
import { Delete, FileCopy } from '@material-ui/icons'
import clsx from 'clsx'
import { FileNode } from '../../tree'
import useFileModel from '../../../../models/file'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%', height: '100%'
  },
  mediumItem: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    padding: theme.spacing(2)
  },
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
type ContextMenuState = {
  x : number
  y : number
  file:FileNode
}
export const SearchFileMediumView = () => {
  const homeMode = useHomeModel()
  const fileModel = useFileModel()
  const classes = useStyles()
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState | undefined>(undefined)
  const handleContextClose = () => {
    setContextMenuState(undefined)
  }
  return (
    <div className={classes.main}>
      <Menu
        keepMounted
        open={Boolean(contextMenuState)}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenuState?.y !== null && contextMenuState?.x !== null
            ? { top: contextMenuState?.y, left: contextMenuState?.x }
            : undefined
        }
      >
        <MenuItem >{contextMenuState?.file.name ?? ' '}</MenuItem>
        <MenuItem
          onClick={() => {
            handleContextClose()
            fileModel.setCopyFile({
              name: contextMenuState?.file.name,
              path: contextMenuState?.file.path
            })
          }}><FileCopy className={clsx(classes.menuIcon, classes.copyIcon)} />Copy</MenuItem>

        <MenuItem onClick={() => {
          handleContextClose()
          fileModel.deleteFile([contextMenuState?.file.path])
        }}><Delete className={clsx(classes.menuIcon, classes.deleteIcon)}/>Delete</MenuItem>

      </Menu>
      {
        homeMode.searchResult &&
         <FlexGrid dataSource={homeMode.searchResult} rowWidth={120} columnHeight={120} itemRender={(it) => {
           return (
             <FileItemMedium
               file={it}
               key={it.id}
               className={classes.mediumItem}
               onDoubleClick={() => {

               }}
               onContextClick={(x, y) => {
                 setContextMenuState({ x, y, file: it })
               }}
             />
           )
         }}/>
      }
    </div>
  )
}
