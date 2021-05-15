import React, { useRef } from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import FileIcon from '../FileIcon'
import { FileNode } from '../../page/Home/tree'
import clsx from 'clsx'
import { useClickAway } from 'ahooks'
import { makeStyles } from '@material-ui/core/styles'
import { FolderIcon } from '../FileIcon/FolderIcon';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const useStyles:any = makeStyles(theme => ({
  root: {
    height: theme.spacing(8),
    width: '100%',
    position: 'relative'.split,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)'
    }
  },
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    justifyContent: 'left'
  },
  contextSelected: {
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark
  },
  info: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  filename: {
    ...theme.typography.subtitle1,
    textAlign: 'left'
  },
  actions: {
    position: 'absolute',
    right: theme.spacing(2),
    height: '100%',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon:{
    width: 64,
    height: 64,
    padding: 8
  },
}))

interface FileItemPropsType {
  file:FileNode
  onClick?:() => void
  style?:any
  contextSelected?: boolean
  onContextClick?:(x:number, y:number) => void
  onClickAway?: () => void
}

const FileItem = ({ file, onClick, style, onContextClick, contextSelected, onClickAway }: FileItemPropsType):React.ReactElement => {
  const classes = useStyles()
  const renderIcon = () => {
    if (file.type === 'Directory') {
      return <FolderIcon  className={classes.icon}/>
    }
    if (file.type === 'File') {
      return <FileIcon fileName={file.name} className={classes.icon}/>
    }
  }
  const ref : any = useRef<any>()
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
    <ListItem
      className={clsx(classes.root, contextSelected ? classes.contextSelected : undefined)}
      style={style}
      onContextMenu={handleClick}
      ref={ref}
      onClick={onClick}
      button
    >
      <ListItemAvatar>
          {renderIcon()}
      </ListItemAvatar>
      <ListItemText primary={file.name}/>
    </ListItem>

  )
}
export default FileItem
