import { createModel } from 'hox'
import { addFstabMount, fetchFstabMounts, Mount, removeFstabMount } from '../api/mount'
import { useState } from 'react'

const MountModel = () => {
  const [mountList, setMountList] = useState<Mount[]>([])
  const mount = async ({
    device,
    options,
    dump,
    fsck,
    file,
    type
  }: { device: string, options: string, dump: string, fsck: string, file: string, type: string }) => {
    const optionsMap: { [key: string]: string } = {}
    options.split(',').forEach(optionPart => {
      const assignMarkPosition = optionPart.indexOf('=')
      if (assignMarkPosition === -1) {
        optionsMap[optionPart] = ''
      } else {
        optionsMap[optionPart.slice(0, assignMarkPosition)] = optionPart.slice(assignMarkPosition + 1, optionPart.length)
      }
    })
    await addFstabMount({
      spec: device,
      mnt_ops: optionsMap,
      vfs_type: type,
      freq: Number(dump),
      pass_no: Number(fsck),
      file
    })
  }
  const removeMount = async (dirPath:string) => {
    await removeFstabMount(dirPath)
    await loadMounts()
  }
  const loadMounts = async () => {
    const mounts = await fetchFstabMounts()
    setMountList(mounts)
  }
  return {
    mount, loadMounts, mountList, removeMount
  }
}

const useMountModel = createModel(MountModel)
export default useMountModel
