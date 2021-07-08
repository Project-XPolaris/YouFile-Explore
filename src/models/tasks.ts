import { createModel } from 'hox'
import { useState } from 'react'
import { useInterval } from 'ahooks'
import { getTaskList, Task } from '../api/task'

const TasksModel = () => {
  const [tasks, setTasks] = useState<Task<any>[]>([])
  const refreshTask = async () => {
    if (localStorage.getItem('ServiceUrl') !== null) {
      const response = await getTaskList()
      setTasks(response.result)
    }
  }
  return {
    tasks,
    setTasks,
    refreshTask
  }
}

const useTasksModel = createModel(TasksModel)
export default useTasksModel
