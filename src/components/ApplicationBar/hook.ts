import React from 'react'
export interface ApplicationBarController {
  anchorEl:null | HTMLElement
  handleMenuClick:(event: React.MouseEvent<HTMLElement>) => void
  handleMenuClose:() => void
}
const useApplicationBarController = ():ApplicationBarController => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  return {
    anchorEl, handleMenuClick, handleMenuClose
  }
}
export default useApplicationBarController
