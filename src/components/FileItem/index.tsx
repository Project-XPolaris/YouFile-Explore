import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, ButtonBase } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { File } from '../../page/Home/model'
import DescriptionIcon from '@material-ui/icons/Description'
const useStyles = makeStyles(theme => ({
  main: {
    height: theme.spacing(8),
    width: '100%',
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
    marginLeft: theme.spacing(2)
  },
  filename: {
    ...theme.typography.subtitle1
  }
}))

interface FileItemPropsType {
  file:File
  onClick:() => void
}

const FileItem = ({ file, onClick }: FileItemPropsType):React.ReactElement => {
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
  )
}
export default FileItem
