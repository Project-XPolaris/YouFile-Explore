import { createModel } from 'hox'
import { addFstabMount, fetchFstabMounts, Mount, remountFstab, removeFstabMount } from '../api/mount';
import { useEffect, useState } from 'react';

const MountModel = () => {
  const [mountList, setMountList] = useState<Mount[]>([])
  const mount = async ({
    device,
    options,
    dump,
    fsck,
    file,
    type
  }: { device: string, options: { [key:string]:string }, dump: string, fsck: string, file: string, type: string }) => {
    await addFstabMount({
      spec: device,
      mnt_ops: options,
      vfs_type: type,
      freq: Number(dump),
      pass_no: Number(fsck),
      file
    })
    await loadMounts()
  }
  const removeMount = async (dirPath:string) => {
    await removeFstabMount(dirPath)
    await loadMounts()
  }
  const loadMounts = async () => {
    const mounts = await fetchFstabMounts()
    setMountList(mounts)
  }
  const remount = async () => {
    await remountFstab()
  }
  useEffect(() => {
    loadMounts()
  },[])
  return {
    mount, loadMounts, mountList, removeMount, remount
  }
}

const useMountModel = createModel(MountModel)
export default useMountModel
