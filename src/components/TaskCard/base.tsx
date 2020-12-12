import { Task } from '../../api/task'
import CopyFileTaskCard from '../CopyFileTaskCard'
import React from 'react'

export const TaskCard = ({
  task,
  className
}: { task: Task<any>, className?: any }) => {
  switch (task.type) {
    case 'Copy':
      return (
        <CopyFileTaskCard task={task} className={className} />
      )
    default:
      return null
  }
}
