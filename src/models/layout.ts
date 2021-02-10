import { useState } from 'react'
import { createModel } from 'hox'

export type DialogKey = 'global/addSMB' | 'global/taskDrawer' | 'home/createDirectory' | 'home/addMount' | 'home/rename'
const LayoutModel = () => {
  const [dialogs, setDialogs] = useState< { [key:string]:boolean }>({})
  const switchDialog = (dialogKey:DialogKey) => {
    const newDialog = {
      ...dialogs
    }
    newDialog[dialogKey] = !newDialog[dialogKey]
    setDialogs(newDialog)
  }
  const useDialogController = (key:DialogKey) : [boolean, () => void] => {
    return [Boolean(dialogs[key]), () => switchDialog(key)]
  }
  return {
    switchDialog, dialogs, useDialogController
  }
}

const useLayoutModel = createModel(LayoutModel)
export default useLayoutModel
