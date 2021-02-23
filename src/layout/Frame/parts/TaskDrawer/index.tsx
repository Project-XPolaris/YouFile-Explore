import React from 'react'
import useStyles from './style'
import { Drawer } from '@material-ui/core'
import useTasksModel from '../../../../models/tasks'
import { TaskCard } from '../../../../components/TaskCard/base'
import { stopTask } from '../../../../api/task'

interface TaskDrawerPropsType {
  open?:boolean
  onClose: () => void
}

const TaskDrawer = ({ open = false, onClose }: TaskDrawerPropsType):React.ReactElement => {
  const classes = useStyles()
  const taskModel = useTasksModel()
  const renderEmptyView = () => {
    return (
      <div className={classes.empty} onClick={onClose}>
        <p className={classes.emptyHint}>
          No tasks
        </p>
      </div>
    )
  }
  return (
    <Drawer
      className={classes.root}
      open={open}
      onClose={onClose}
      title={'Tasks'}
      anchor='right'
      PaperProps={{ className: classes.paper, elevation: 0 }}
      BackdropProps={{ className: classes.modal }}
    >
      <div className={classes.content}>
        <header className={classes.header}>
          {
            taskModel.tasks.length !== 0 && <div className={classes.title}>
              Tasks
            </div>
          }
        </header>
        {
          taskModel.tasks.map(task => (
            <TaskCard key={task.id} task={task} className={classes.item} cardProps={{ onStop: () => stopTask(task.id) }}/>
          ))
        }
        {
          taskModel.tasks.length === 0 && renderEmptyView()
        }
      </div>
    </Drawer>
  )
}
export default TaskDrawer
