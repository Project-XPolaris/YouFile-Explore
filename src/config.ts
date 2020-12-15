export const ApplicationConfig = {
  apiUrl: 'http://localhost:8300',
  apiPaths: {
    readdir: '/path/read',
    getAllTasks: '/task/all',
    copyFile: '/task/copy',
    stopTask: '/task/stop'
  },
  yousmb: {
    apiUrl: 'http://192.168.31.186:8200',
    apiPaths: {
      addFolder: '/folders/add'
    }
  }
}