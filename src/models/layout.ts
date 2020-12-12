import { useState } from 'react'
import { createModel } from 'hox'

export type DialogKey = 'global/addSMB' | 'global/taskDrawer'
const LayoutModel = () => {
  const [dialogs, setDialogs] = useState< { [key:string]:boolean }>({})
  const switchDialog = (dialogKey:DialogKey) => {
    const newDialog = {
      ...dialogs
    }
    newDialog[dialogKey] = !newDialog[dialogKey]
    setDialogs(newDialog)
  }
  return {
    switchDialog, dialogs
  }
}

const useLayoutModel = createModel(LayoutModel)
export default useLayoutModel
