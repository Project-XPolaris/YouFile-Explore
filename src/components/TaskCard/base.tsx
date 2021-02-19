import { Task } from '../../api/task'
import CopyFileTaskCard from '../CopyFileTaskCard'
import React from 'react'
import DeleteFileTaskCard from '../DeleteFileTaskCard'

export const TaskCard = ({
  task,
  className,
  cardProps
}: { task: Task<any>, className?: any, cardProps:any }) => {
  switch (task.type) {
    case 'Copy':
      return (
        <CopyFileTaskCard task={task} className={className} {...cardProps} />
      )
    case 'Delete':
      return (
        <DeleteFileTaskCard task={task} className={className} {...cardProps}/>
      )
    default:
      return null
  }
}
