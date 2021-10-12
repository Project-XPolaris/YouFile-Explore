import { Task } from '../src/api/task'
import remoteRequest from './utils/request'
import { ApplicationConfig } from '../src/config'
import { ipcMain } from 'electron'
import { ChannelNames } from './channels'

export class TaskManager {
  tasks:Task<any>[] = []
  startRefresh () {
    this.refresh()
  }

  async refresh () {
    // console.log('refresh task')
    try {
      const response = await remoteRequest.get(ApplicationConfig.apiPaths.getAllTasks)
      this.tasks = response.result
    } catch (e) {

    }
    setTimeout(() => {
      this.refresh()
    }, 3000)
  }
}
ipcMain.on(ChannelNames.getTasks, (event) => {
  event.returnValue = DefaultTaskManager.tasks
})
export const DefaultTaskManager = new TaskManager()
