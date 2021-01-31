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
  const {
    width,
    ref
  } = useResizeDetector()
  const fileModel = useFileModel()
  const homeModel = useHomeModel()
  const update = useUpdate()
  const [gridData, setGridData] = useState<FileNode[][]>([[]])
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState | undefined>(undefined)
  const getFileGrid = () => {
    if (homeModel.currentContent.length === 0) {
      return [[]]
    }
    const rowCount = Math.floor((width ?? 0) / 120)
    console.log(rowCount)
    const grid = chunk(homeModel.currentContent, rowCount)
    console.log('grid = ')
    console.log(grid)
    return grid
  }

  useDebounceEffect(
    () => {
      console.log(width)
      setGridData(getFileGrid())
    },
    [width],
    {
      wait: 1000
    }
  )

  useEffect(() => {
    setGridData(getFileGrid())
  }, [homeModel.currentContent])

  function cellRenderer ({ columnIndex, key, rowIndex, style }) {
    const it = gridData[rowIndex][columnIndex]
    if (it === undefined) {
      return (
        <div key={key} style={style}>
        </div>
      )
    }
    return (
      <div key={key} style={style}>
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
      </div>
    )
  }
  const handleContextClose = () => {
    setContextMenuState(undefined)
  }
  return (
    <div className={classes.main} ref={ref}>
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
      <AutoSizer>
        {({
          height,
          width
        }) => (
          // <List
          //   width={width}
          //   height={height}
          //   overscanRowCount={1}
          //   rowCount={getFileGrid().length}
          //   rowHeight={120}
          //   rowRenderer={rowRenderer}
          // />
          <Grid
            cellRenderer={cellRenderer}
            columnCount={gridData[0]?.length ?? 0}
            columnWidth={120}
            height={height}
            rowCount={gridData?.length ?? 0}
            rowHeight={120}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  )
}
