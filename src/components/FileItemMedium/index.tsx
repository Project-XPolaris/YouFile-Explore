import { makeStyles } from '@material-ui/core/styles'
import FileIcon from '../FileIcon'
import React, { useRef } from 'react'
import clsx from 'clsx'
import { FileNode } from '../../page/Home/tree'
import { yellow } from '@material-ui/core/colors'
import { useDoubleClick } from '../../hooks/DoubleClick'
import { DiskFileIcon } from '../FileIcon/DiskFileIcon'
import { useClickAway } from 'ahooks'
import { MountFolderFileIcon } from '../FileIcon/MountFolderFileIcon'
import { FolderIcon } from '../FileIcon/FolderIcon'
import { DriveFileIcon } from '../FileIcon/DriveFileIcon';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  contextSelected: {
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark
  },
  folder: {
    color: yellow['800']
  },
  file: {
    color: theme.palette.primary.dark
  },
  name: {
    ...theme.typography.body1,
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    textAlign: 'center',
    display: '-webkit-box',
    '-webkit-line-clamp':2,
    '-webkit-box-orient':'vertical',
    overflow: 'hidden',
    fontSize: 14,
    lineHeight: undefined,
    marginTop: 4
  },
  thumbnail: {
    height: 48,
    width: '100%',
    objectFit: 'contain'
  },
  content:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: '0.3s',
    cubicBezier: '(.17,.67,.83,.67)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)'
    },
    borderRadius: theme.spacing(2),
    height:"100%",
    padding: theme.spacing(1),
  },
  icon:{
    height: 48,
  }

}))

const FileItemMedium = ({
  file,
  className,
  onDoubleClick,
  onContextClick,
  onClick,
  onClickAway,
  contextSelected = false
}: {
  file: FileNode,
  className?: string,
  onDoubleClick?: () => void
  onContextClick?: (x: number, y: number) => void
  contextSelected?: boolean
  onClick?: () => void
  onClickAway?: () => void
}): React.ReactElement => {
  const classes = useStyles()
  const hybridClick = useDoubleClick(
    onDoubleClick, onClick)
  const ref = useRef<any>()
  useClickAway(() => {
    if (onClickAway) {
      onClickAway()
    }
  }, ref)
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onContextClick) {
      onContextClick(
        event.clientX - 2,
        event.clientY - 4
      )
    }
  }
  const renderIcon = (type:string) => {
    switch (type) {
      case 'Directory':
        return (<FolderIcon className={clsx(classes.icon, classes.folder)} />)
      case 'MountDirectory':
        return (<MountFolderFileIcon className={clsx(classes.icon, classes.folder)} />)
      case 'Parted' :
        return (<DriveFileIcon className={clsx(classes.icon,classes.file)} />)
      default:
        return (<FileIcon fileName={file.name} className={clsx(classes.icon, classes.file)} />)
    }
  }
  return (
    <div
      className={clsx(classes.root, className)}
    >
      <div

        className={clsx(classes.content, contextSelected ? classes.contextSelected : undefined)}
        onContextMenu={handleClick}
        onClick={hybridClick}
        ref={ref}
      >
        <div className={classes.icon}>
          {
            file.thumbnail ? (<img src={file.thumbnail} className={classes.thumbnail}/>) : renderIcon(file.type)
          }
        </div>
        <div className={classes.name}>
          {file.name}
        </div>
      </div>


    </div>
  )
}

export default FileItemMedium
