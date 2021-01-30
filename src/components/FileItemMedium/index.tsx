import { makeStyles } from '@material-ui/core/styles'
import FileIcon from '../FileIcon'
import { FileItem } from '../../api/dir'
import React from 'react'
import clsx from 'clsx'
import { Menu, MenuItem } from '@material-ui/core'
import { FileNode } from '../../page/Home/tree'
import FolderIcon from '@material-ui/icons/Folder'
import { red, yellow } from '@material-ui/core/colors'
import { Delete, FileCopy } from '@material-ui/icons'
import { useDoubleClick } from '../../hooks/DoubleClick'

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

const initialState = {
  mouseX: null,
  mouseY: null
}
const FileItemMedium = ({ file, className, onCopy, onDelete, onDoubleClick }:{file:FileNode, className?:any, onCopy?:() => void, onDelete?:() => void, onDoubleClick?:() => void}):React.ReactElement => {
  const classes = useStyles()
  const hybridClick = useDoubleClick(
    onDoubleClick, undefined)

  const [state, setState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialState)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event)
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    })
  }

  const handleClose = () => {
    setState(initialState)
  }
  return (
    <div className={clsx(classes.root, className)} onContextMenu={handleClick} onClick={hybridClick}>
      {
        file.type === 'File' && <FileIcon fileName={file.name} className={clsx(classes.icon, classes.file)}/>
      }
      {
        file.type === 'Directory' && <FolderIcon className={clsx(classes.icon, classes.folder)}/>
      }
      <div className={classes.name}>
        {file.name}
      </div>
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem >{file.name}</MenuItem>
        {
          onCopy && <MenuItem onClick={() => { handleClose(); onCopy() }}><FileCopy className={clsx(classes.menuIcon, classes.copyIcon)} />Copy</MenuItem>

        }
        {
          onDelete && <MenuItem onClick={() => { handleClose(); onDelete() }}><Delete className={clsx(classes.menuIcon, classes.deleteIcon)}/>Delete</MenuItem>

        }
      </Menu>
    </div>
  )
}

export default FileItemMedium
