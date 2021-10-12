import React from 'react'
import { Avatar, IconButton, LinearProgress, Menu, MenuItem, Paper } from '@material-ui/core'
import clsx from 'clsx'
import { MoreVert, VerticalAlignTop } from '@material-ui/icons'
import { ExtractFileOutput, Task } from '../../api/task'
import useStyles from './style'

interface ExtractFileCardPropsType {
  className?: string
  task:Task<ExtractFileOutput>
  onStop:() => void
}

const ExtractFileCard = ({ className, task, onStop }: ExtractFileCardPropsType): React.ReactElement => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
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
      return task.output.files[0].source.name
    } else {
      return `${task.output.files[0].source.name} and other ${task.output.files.length - 1} files`
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
