import useStyles from './style'
import clsx from 'clsx'
import { fileSize } from 'humanize-plus'
import React, { useRef } from 'react'
import { useDoubleClick } from '../../hooks/DoubleClick'
import { FileNode } from '../../page/Home/tree'
import { FolderIcon } from '../FileIcon/FolderIcon'
import FileIcon from '../FileIcon'
import { DataField } from '../../page/Home/views/explore/detail'
import { DefaultWindowShare, WindowShare } from '../../window'

export interface FileDetailItemPropsType {
  className?: string
  style?:any
  item:FileNode
  fields:DataField[]
  onDoubleClick?: () => void
  onContextClick?: (x: number, y: number) => void
  contextSelected?: boolean
  onClick?: () => void
  onClickAway?: () => void
}

const FileDetailItem = ({ className, style, item, fields, onContextClick, onDoubleClick, onClick, contextSelected }: FileDetailItemPropsType): React.ReactElement => {
  const classes = useStyles()
  const getFieldByName = (key:string) => {
    return fields.find(it => it.key === key)
  }
  const renderIcon = (file:FileNode) => {
    if (file.type === 'Directory') {
      return <FolderIcon className={classes.icon}/>
    }
    if (file.type === 'File') {
      return <FileIcon fileName={file.name} className={classes.icon}/>
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onContextClick) {
      onContextClick(
        event.clientX - 2,
        event.clientY - 4
      )
    }
  }
  const getTypeText = () => {
    if (item.type === 'Directory') {
      return 'Directory'
    }
    const ext = item.path.split('.').pop()
    return `${ext} File`
  }
  const hybridClick = useDoubleClick(
    onDoubleClick, onClick)
  const ref = useRef<any>()
  return (
    <div
      className={clsx(className, classes.root, contextSelected ? classes.selected : undefined)}
      style={style}
      onClick={hybridClick}
      ref={ref}
      onContextMenu={handleClick}
    >
      {
        renderIcon(item)
      }
      {
        getFieldByName('name') &&
        <div className={classes.valueField} style={{ flex: 1 }}>
          <div className={classes.value}>
            { item.name }
          </div>
        </div>
      }
      {
        getFieldByName('type') &&
        <div className={classes.valueField} style={{ width: getFieldByName('type')?.width }}>
          <div className={classes.value}>
            { getTypeText() }
          </div>
        </div>
      }
      {
        getFieldByName('size') &&
        <div className={classes.valueField} style={{ width: getFieldByName('size')?.width }}>
          <div className={classes.value}>
            { fileSize((item.size)) }
          </div>
        </div>
      }
    </div>
  )
}

export default FileDetailItem
