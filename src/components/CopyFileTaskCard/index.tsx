import React from 'react'
import { Avatar, IconButton, LinearProgress, Menu, MenuItem, Paper } from '@material-ui/core'
import clsx from 'clsx'
import { FileCopy, MoreVert } from '@material-ui/icons'
import { CopyFileOutput, Task } from '../../api/task'
import { fileSize } from 'humanize-plus'
import { getPathBasename } from '../../utils/path'
import useStyles from './style'

interface CopyFileTaskCardPropsType {
  className?: string
  task:Task<CopyFileOutput>
  onStop:() => void
}

const CopyFileTaskCard = ({ className, task, onStop }: CopyFileTaskCardPropsType): React.ReactElement => {
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
      return getPathBasename(task.output.files[0].source.name)
    } else {
      return `${getPathBasename(task.output.files[0].source.name)} and other ${task.output.files.length - 1} tasks`
    }
  }
  return (
    <Paper className={clsx(classes.main, className)}>
      {
        renderMoreMenu()
      }
      <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <FileCopy className={classes.icon} />
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
        <div className={classes.info}>
          <div className={classes.field}>
            <div className={classes.label}>
              Count:
            </div>
            <div className={classes.text2}>
              {task.output.complete}/{task.output.fileCount}
            </div>
          </div>

          <div className={classes.field}>
            <div className={classes.label}>
              Size:
            </div>
            <div className={classes.text2}>
              {fileSize(task.output.completeLength)}/{fileSize(task.output.totalLength)}
            </div>
          </div>
          <div className={classes.field}>
            <div className={classes.label}>
              Speed:
            </div>
            <div className={classes.text2}>
              {fileSize(task.output.speed)}/s
            </div>
          </div>
        </div>
        <div className={classes.text}>
          {getPathBasename(task.output.currentCopy)}
        </div>
        <LinearProgress variant='determinate' value={task.output.progress * 100} />
      </div>
    </Paper>
  )
}
export default CopyFileTaskCard
