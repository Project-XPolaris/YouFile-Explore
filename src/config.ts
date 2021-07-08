export const ApplicationConfig = {
  apiPaths: {
    readdir: '/path/read',
    mkdir: '/path/mkdir',
    rename: '/path/rename',
    getAllTasks: '/task/all',
    copyFile: '/task/copy',
    deleteFile: '/task/delete',
    stopTask: '/task/stop',
    fstabMounts: '/fstab/mounts',
    fstabAddMount: '/fstab/mounts',
    fsRemoveMount: '/fstab/mounts',
    newSearchTask: '/task/search',
    remountFstab: '/fstab/reload',
    getTask: '/task/get',
    unarchive: '/task/unarchive',
    info: '/info',
    serviceInfo: '/service/info',
    userAuth: '/user/auth'
  },
  yousmb: {
    apiPaths: {
      addFolder: '/folders/add',
      config: '/config'
    }
  }
}
