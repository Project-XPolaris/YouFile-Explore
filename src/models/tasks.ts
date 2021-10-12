import { createModel } from 'hox'
import { useState } from 'react'
import { Task } from '../api/task'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../electron/channels'

const TasksModel = () => {
  const [tasks, setTasks] = useState<Task<any>[]>([])
  const refreshTask = async () => {
    const list = ipcRenderer.sendSync(ChannelNames.getTasks, {})
    setTasks(list)
  }
  return {
    tasks,
    setTasks,
    refreshTask
  }
}

const useTasksModel = createModel(TasksModel)
export default useTasksModel
