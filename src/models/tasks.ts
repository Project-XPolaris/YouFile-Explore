import { createModel } from 'hox'
import { useState } from 'react'
import { useInterval } from 'ahooks'
import { getTaskList, Task } from '../api/task'

const TasksModel = () => {
  const [tasks, setTasks] = useState<Task<any>[]>([])
  useInterval(async () => {
    if (localStorage.getItem('ServiceUrl') !== null) {
      const response = await getTaskList()
      setTasks(response.result)
    }
  }, 1000)
  return {
    tasks,
    setTasks
  }
}

const useTasksModel = createModel(TasksModel)
export default useTasksModel
