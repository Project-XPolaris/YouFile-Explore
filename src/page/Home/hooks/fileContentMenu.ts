import { useState } from 'react'

export interface FileContext {
  left:number
  top:number
  name:string
  path:string
  type:string
}
export interface FileContextMenuController {
  openMenu:(file:FileContext) => void
  file:FileContext | undefined
  closeMenu:()=>void
  getAnchor:() => {top:number, left:number}
    open:boolean
}
const useFileContextMenu = ():FileContextMenuController => {
  const [file, setFile] = useState<FileContext | undefined>()
  const [open, setOpen] = useState<boolean>(false)
  const openMenu = (file:FileContext) => {
    setFile(file)
    setOpen(true)
  }
  const closeMenu = () => {
    setOpen(false)
  }
  const getAnchor = () : { left:number, top: number } => {
    if (file === undefined) {
      return { left: 0, top: 0 }
    }
    return { left: file.left, top: file.top }
  }
  return {
    openMenu, file, closeMenu, getAnchor, open
  }
}

export default useFileContextMenu
