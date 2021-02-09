export const ApplicationConfig = {
  apiPaths: {
    readdir: '/path/read',
    mkdir: '/path/mkdir',
    getAllTasks: '/task/all',
    copyFile: '/task/copy',
    deleteFile: '/task/delete',
    stopTask: '/task/stop',
    fstabMounts: '/fstab/mounts',
    fstabAddMount: '/fstab/mounts',
    fsRemoveMount: '/fstab/mounts',
    newSearchTask: '/task/search',
    getTask: '/task/get',
    info: '/info'
  },
  yousmb: {
    apiUrl: 'http://192.168.99.101:8200',
    apiPaths: {
      addFolder: '/folders/add',
      config: '/config'
    }
  }
}
