import { Task, TaskOutput } from '../../api/task'
import CopyFileTaskCard from '../CopyFileTaskCard'
import React, { ReactElement } from 'react'
import DeleteFileTaskCard from '../DeleteFileTaskCard'
import ExtractFileCard from '../ExtractTaskCard'
import MoveFileTaskCard from '../MoveFileTaskCard'

export const TaskCard = ({
  task,
  className,
  cardProps
}: { task: Task<TaskOutput>, className?: string, cardProps:any }):ReactElement => {
  switch (task.type) {
    case 'Copy':
      return (
        <CopyFileTaskCard task={task} className={className} {...cardProps} />
      )
    case 'Delete':
      return (
        <DeleteFileTaskCard task={task} className={className} {...cardProps}/>
      )
    case 'Unarchive':
      return (
        <ExtractFileCard task={task} className={className} {...cardProps} />
      )
    case 'Move':
      return (
        <MoveFileTaskCard task={task} className={className} {...cardProps} />
      )
    default:
      return <></>
  }
}
