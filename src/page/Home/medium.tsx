import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AutoSizer, Grid } from 'react-virtualized'
import useHomeModel from './model'
import FileItemMedium from '../../components/FileItemMedium'
import { useResizeDetector } from 'react-resize-detector'
import useFileModel from '../../models/file'
import { useDebounceEffect, useUpdate } from 'ahooks'
import { chunk } from 'lodash'
import { FileNode } from './tree'
import { Menu, MenuItem } from '@material-ui/core'
import { Delete, FileCopy } from '@material-ui/icons'
import { red } from '@material-ui/core/colors'
import clsx from 'clsx'
import { FlexGrid } from '../../components/FlexGrid';

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
  row: {
    display: 'flex'
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

interface MediumViewPropsType {

}
type ContextMenuState = {
  x : number
  y : number
  file:FileNode
}
export default function MediumView ({ }: MediumViewPropsType) {
  const classes = useStyles()
  const fileModel = useFileModel()
  const homeModel = useHomeModel()
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
      <FlexGrid dataSource={homeModel.currentContent} rowWidth={120} columnHeight={120} itemRender={(it) => {
        return (
          <FileItemMedium
            file={it}
            key={it.id}
            className={classes.mediumItem}
            onDoubleClick={() => {
              if (it.type === 'Directory') {
                homeModel.setCurrentPath(it.path)
              }
            }}
            onContextClick={(x, y) => {
              setContextMenuState({ x, y, file: it })
            }}
          />
        )
      }} />
    </div>
  )
}
