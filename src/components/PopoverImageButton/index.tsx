import React from 'react'
import { IconButton, Popover } from '@material-ui/core'
import useStyles from './style'

export interface PopoverImageButtonPropsType {
  children?:any
  icon:any
  controller:any
}

const PopoverImageButton = ({ children, icon,controller }: PopoverImageButtonPropsType) => {
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    controller.setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    controller.setAnchorEl(null)
  }

  const open = Boolean(controller.anchorEl)
  const id = open ? 'popover' : undefined

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        {icon}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={controller.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {children}
      </Popover>
    </div>
  )
}

export default PopoverImageButton
