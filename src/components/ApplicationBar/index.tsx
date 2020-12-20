import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar as MAppBar, IconButton, Menu, Toolbar, Typography } from '@material-ui/core'
import PopoverImageButton from '../PopoverImageButton'
import { ArrowBack, FileCopy, ListAlt, MoreVert } from '@material-ui/icons'
import CopyPopover from '../../layout/Frame/parts/CopyPopover'
import useFileModel from '../../models/file'
import useLayoutModel from '../../models/layout'
import { useHistory } from 'react-router-dom'
import { ApplicationBarController } from './hook'

const useStyles = makeStyles((theme) => ({
  main: {},
  actionButton: {
    color: theme.palette.primary.contrastText
  },
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navButton: {
    marginRight: theme.spacing(2)
  }
}))

interface ApplicationBarPropsType {
  title?:any
  actions?:any
  moreMenu?:any
  controller:ApplicationBarController
  onBack?:() => void,
  className?:any
}

const ApplicationBar = ({ actions, moreMenu, title = 'YouFile', controller, onBack, className }: ApplicationBarPropsType):React.ReactElement => {
  const classes = useStyles()
  const { anchorEl, handleMenuClick, handleMenuClose } = controller
  let clonedMenu
  if (moreMenu) {
    clonedMenu = React.cloneElement(
      moreMenu,
      {
        anchorEl: anchorEl,
        keepMounted: true,
        open: Boolean(anchorEl),
        onClose: handleMenuClose,
        getContentAnchorEl: null
      }
    )
  }
  return (
    <MAppBar elevation={0} position='fixed' className={className}>
      <Toolbar>
        {
          onBack &&
          <IconButton
            onClick={() => onBack()}
            aria-haspopup="true"
            className={classes.navButton}
          >
            <ArrowBack className={classes.actionButton}/>
          </IconButton>
        }
        <Typography variant='h6' className={classes.title} component='div'>
          {title}
        </Typography>
        {actions}
        {
          clonedMenu &&
            <>
              <IconButton
                onClick={handleMenuClick}
                aria-haspopup="true"
              >
                <MoreVert className={classes.actionButton}/>
              </IconButton>
              {clonedMenu}
            </>
        }
      </Toolbar>
    </MAppBar>
  )
}
export default ApplicationBar
