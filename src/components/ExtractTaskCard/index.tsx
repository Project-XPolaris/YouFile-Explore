import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, IconButton, LinearProgress, Menu, MenuItem, Paper } from '@material-ui/core'
import theme from '../../theme'
import clsx from 'clsx'
import { FileCopy, MoreVert, VerticalAlignTop } from '@material-ui/icons'
import { CopyFileOutput, ExtractFileOutput, Task } from '../../api/task'
import { fileSize } from 'humanize-plus'
import { getPathBasename } from '../../utils/path'
const useStyles = makeStyles({
  main: {
    width: '100%',
    borderRadius: theme.spacing(1),
    // height: theme.spacing(25),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark
  },
  icon: {
    color: theme.palette.primary.contrastText
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleWrap: {
    flex: 1
  },
  title: {
    ...theme.typography.subtitle1,
    marginLeft: theme.spacing(2),
    fontSize: 14
  },
  subtitle: {
    ...theme.typography.subtitle2,
    marginLeft: theme.spacing(2)
  },
  content: {
    marginTop: theme.spacing(2),
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  info: {
    flex: 1
  },
  text: {
    ...theme.typography.body1,
    overflow: 'hidden'
  },
  field: {
    display: 'flex'
  },
  label: {
    ...theme.typography.body2,
    width: theme.spacing(12)
  },
  text2: {
    ...theme.typography.body2,
    fontSize: 12
  }
})

interface ExtractFileCardPropsType {
  className?: string
  task:Task<ExtractFileOutput>
  onStop:() => void
}

const ExtractFileCard = ({ className, task, onStop }: ExtractFileCardPropsType): React.ReactElement => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  console.log(task)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const renderMoreMenu = () => {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          handleClose()
          onStop()
        }}>Stop</MenuItem>
      </Menu>
    )
  }
  const getTaskName = () => {
    if (task.output.files.length === 1) {
      return getPathBasename(task.output.files[0])
    } else {
      return `${getPathBasename(task.output.files[0])} and other ${task.output.files.length - 1} files`
    }
  }
  return (
    <Paper className={clsx(classes.main, className)}>
      {
        renderMoreMenu()
      }
      <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <VerticalAlignTop className={classes.icon} />
        </Avatar>
        <div className={classes.titleWrap}>
          <div className={classes.title}>
            {getTaskName()}
          </div>
          <div className={classes.subtitle}>
            {task.status}
          </div>
        </div>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </div>
      <div className={classes.content}>
        <LinearProgress variant='determinate' value={task.output.complete / task.output.total * 100} />
      </div>
    </Paper>
  )
}
export default ExtractFileCard
