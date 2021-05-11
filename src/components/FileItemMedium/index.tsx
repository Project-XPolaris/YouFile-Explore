import { makeStyles } from '@material-ui/core/styles'
import FileIcon from '../FileIcon'
import React, { useRef } from 'react'
import clsx from 'clsx'
import { FileNode } from '../../page/Home/tree'
import FolderIcon from '@material-ui/icons/Folder'
import { yellow } from '@material-ui/core/colors'
import { useDoubleClick } from '../../hooks/DoubleClick'
import { DiskFileIcon } from '../FileIcon/DiskFileIcon'
import { useClickAway } from 'ahooks'
import { MountFolderFileIcon } from '../FileIcon/MountFolderFileIcon'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: '0.3s',
    cubicBezier: '(.17,.67,.83,.67)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)'
    },
    borderRadius: theme.spacing(2)
  },
  contextSelected: {
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark
  },
  icon: {
    fontSize: 52,
    width: 52,
    height: 52
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
    height: '2rem'
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

  return (
    <div
      className={clsx(classes.root, className, contextSelected ? classes.contextSelected : undefined)}
      onContextMenu={handleClick}
      onClick={hybridClick}
      ref={ref}
    >
      {
        file.type === 'File' && <FileIcon fileName={file.name} className={clsx(classes.icon, classes.file)} />
      }
      {
        file.type === 'Directory' && <FolderIcon className={clsx(classes.icon, classes.folder)} />
      }
      {
        file.type === 'MountDirectory' && <MountFolderFileIcon className={clsx(classes.icon, classes.folder)} />
      }
      {
        file.type === 'Parted' && <DiskFileIcon className={clsx(classes.icon)} />
      }
      <div className={classes.name}>
        {file.name}
      </div>

    </div>
  )
}

export default FileItemMedium
