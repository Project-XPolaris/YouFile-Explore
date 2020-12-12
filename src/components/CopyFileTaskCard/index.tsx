import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, LinearProgress, Paper } from '@material-ui/core'
import theme from '../../theme'
import clsx from 'clsx'
import { FileCopy } from '@material-ui/icons'
import { CopyFileOutput, Task } from '../../api/task'
import {fileSize} from 'humanize-plus'
import { getPathBasename } from '../../utils/path'
const useStyles = makeStyles({
  main: {
    width: '100%',
    borderRadius: theme.spacing(1),
    height: theme.spacing(25),
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
  title: {
    ...theme.typography.subtitle1,
    marginLeft: theme.spacing(2)
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
    ...theme.typography.body1
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

interface CopyFileTaskCardPropsType {
  className?: any
  task:Task<CopyFileOutput>
}

const CopyFileTaskCard = ({ className,task }: CopyFileTaskCardPropsType): React.ReactElement => {
  const classes = useStyles()

  return (
    <Paper className={clsx(classes.main, className)}>
      <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <FileCopy className={classes.icon} />
        </Avatar>
        <div>
          <div className={classes.title}>
            Copy : {getPathBasename(task.output.src)}
          </div>
          <div className={classes.subtitle}>
            {task.status}
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.info}>
          <div className={classes.field}>
            <div className={classes.label}>
              Count:
            </div>
            <div className={classes.text2}>
              {task.output.complete}/{task.output.file_count}
            </div>
          </div>

          <div className={classes.field}>
            <div className={classes.label}>
              Size:
            </div>
            <div className={classes.text2}>
              {fileSize(task.output.complete_length)}/{fileSize(task.output.total_length)}
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
          {getPathBasename(task.output.current_copy)}
        </div>
        <LinearProgress variant='determinate' value={task.output.progress * 100} />
      </div>
    </Paper>
  )
}
export default CopyFileTaskCard
