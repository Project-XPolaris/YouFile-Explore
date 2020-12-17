import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, ButtonBase, IconButton } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { File } from '../../page/Home/model'
import DescriptionIcon from '@material-ui/icons/Description'
import { FileCopy } from '@material-ui/icons'
import { ImageFileIcon } from '../FileIcon/ImageFileIcon'
const useStyles = makeStyles(theme => ({
  root: {
    height: theme.spacing(8),
    width: '100%',
    position: 'relative'
  },
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    justifyContent: 'left'
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
  }
}))

interface FileItemPropsType {
  file:File
  onClick:() => void
  onCopy:() => void,
  style?:any
}

const FileItem = ({ file, onClick, onCopy, style }: FileItemPropsType):React.ReactElement => {
  const classes = useStyles()
  const renderIcon = () => {
    if (file.type === 'Directory') {
      return <FolderIcon />
    }
    if (file.type === 'File') {
      return <DescriptionIcon />
    }
  }
  return (
    <div className={classes.root} style={style}>
      <ButtonBase className={classes.main} onClick={onClick}>
        <Avatar className={classes.avatar}>
          {renderIcon()}
        </Avatar>
        <div className={classes.info}>
          <div className={classes.filename}>
            {file.name}
          </div>
        </div>

      </ButtonBase>
      <div className={classes.actions}>
        <IconButton aria-label="copy" onClick={onCopy}>
          <FileCopy />
        </IconButton>
      </div>
    </div>

  )
}
export default FileItem
