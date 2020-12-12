import React from 'react'
import useStyles from './style'
import { Drawer, List } from '@material-ui/core'
import useTasksModel from '../../../../models/tasks'
import { TaskCard } from '../../../../components/TaskCard/base'

interface TaskDrawerPropsType {
  open?:boolean
  onClose: () => void
}

const TaskDrawer = ({ open = false, onClose }: TaskDrawerPropsType):React.ReactElement => {
  const classes = useStyles()
  const taskModel = useTasksModel()
  return (
    <Drawer
      className={classes.root}
      open={open}
      onClose={onClose}
      title={'Tasks'}
      anchor='right'
      PaperProps={{ className: classes.paper, elevation: 0 }}
    >
      <div className={classes.content}>
        <header className={classes.header}>
          <div className={classes.title}>
            Tasks
          </div>
        </header>
        {
          taskModel.tasks.map(task => (
            <TaskCard key={task.id} task={task} className={classes.item}/>
          ))
        }
      </div>
    </Drawer>
  )
}
export default TaskDrawer
