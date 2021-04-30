import React, { ReactElement, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { electronApp, electronRemote } from '../../remote'
import useLayoutModel from '../../models/layout'
import TaskDrawer from './parts/TaskDrawer'

const useStyles = makeStyles((theme) => ({
  main: {},
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  status: {
    width: '100vw',
    height: theme.spacing(4),
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1500
  },
  windowTitle: {
    color: theme.palette.primary.contrastText
  },
  dragZone: {
    '-webkit-app-region': 'drag',
    flexGrow: 1,
    height: '100%'
  },
  statusRight: {},
  windowAction: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(1)
  },
  actionIcon: {
    fontSize: theme.spacing(2)
  },
  content: {
    height: '100vh',
    width: '100vw'
  },
  header: {
    position: 'fixed'
  },
  actionButton: {
    color: theme.palette.primary.contrastText
  },
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '*::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#b7b7b7'
    }
  }
}))

interface FrameLayoutPropsType {
  children?: ReactNode
}

const FrameLayout = ({ children }: FrameLayoutPropsType):ReactElement => {
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  return (
    <div className={classes.main}>
      <TaskDrawer
        onClose={() => layoutModel.switchDialog('global/taskDrawer')}
        open={layoutModel.dialogs['global/taskDrawer']}
      />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}
export default FrameLayout
