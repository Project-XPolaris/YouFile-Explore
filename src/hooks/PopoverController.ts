import React from 'react'

const usePopoverController = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  return {
    setAnchorEl, anchorEl
  }
}
export default usePopoverController
