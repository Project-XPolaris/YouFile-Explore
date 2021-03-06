import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { useResizeDetector } from 'react-resize-detector'
import React, { ReactElement, useEffect, useState } from 'react'
import { chunk } from 'lodash'
import { useDebounceEffect } from 'ahooks'
import { AutoSizer, Grid } from 'react-virtualized'
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
  },
  grid: {
    outline: 'none'
  }
}))
export interface FlexGridProp {
  className?:string
  dataSource:any[]
  rowWidth:number
  columnHeight: number
  itemRender:(data:any) => any
}
export const FlexGrid = ({ dataSource, rowWidth, itemRender, columnHeight, className }:FlexGridProp):ReactElement => {
  const classes = useStyles()
  const {
    width,
    ref
  } : any = useResizeDetector()
  const [gridData, setGridData] = useState<any[][]>([[]])
  const getFileGrid = () => {
    if (dataSource.length === 0) {
      return [[]]
    }
    const rowCount = Math.floor((width ?? 0) / rowWidth)
    const grid = chunk(dataSource, rowCount)
    return grid
  }

  useDebounceEffect(
    () => {
      setGridData(getFileGrid())
    },
    [width],
    {
      wait: 200
    }
  )

  useEffect(() => {
    setGridData(getFileGrid())
  }, [dataSource])

  function cellRenderer ({ columnIndex, key, rowIndex, style }:any) {
    const it = gridData[rowIndex][columnIndex]
    if (it === undefined) {
      return (
        <div key={key} style={style}>
        </div>
      )
    }
    return (
      <div key={key} style={style}>
        {itemRender(it)}
      </div>
    )
  }
  return (
    <div className={classes.main} ref={ref}>
      <AutoSizer>
        {({
          height,
          width
        }) => (
          <Grid
            cellRenderer={cellRenderer}
            columnCount={gridData[0]?.length ?? 0}
            columnWidth={rowWidth}
            height={height}
            rowCount={gridData?.length ?? 0}
            rowHeight={columnHeight}
            width={width}
            className={clsx(classes.grid, className)}
          />
        )}
      </AutoSizer>
    </div>
  )
}
