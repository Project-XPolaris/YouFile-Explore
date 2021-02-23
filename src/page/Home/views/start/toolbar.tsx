import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../../../theme'
import { IconButton, Paper, Typography } from '@material-ui/core'
import { ListAlt } from '@material-ui/icons'
import useLayoutModel from '../../../../models/layout'

const useStyles = makeStyles({
  main: {
    backgroundColor: theme.palette.primary.main,
    width: '100vw',
    height: theme.spacing(8),
    position: 'fixed',
    top: theme.spacing(5),
    zIndex: 1200,
    borderRadius: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    alignItems: 'center',
    display: 'flex'
  },
  leading: {
    alignItems: 'center',
    display: 'flex',
    width: theme.spacing(30 - 4),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText
  },
  backIcon: {
    color: theme.palette.primary.contrastText
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  actionIcon: {
    color: theme.palette.primary.contrastText
  }

})

interface StartToolbarPropsType {

}

export default function StartToolbar ({}: StartToolbarPropsType) {
  const classes = useStyles()

  const layoutModel = useLayoutModel()
  return (
    <Paper className={classes.main}>
      <div className={classes.leading}>
        <Typography variant={'h6'}>
          Start
        </Typography>
      </div>
      <div className={classes.content}>
        <IconButton
          onClick={() => layoutModel.switchDialog('global/taskDrawer')}
        >
          <ListAlt className={classes.actionIcon} />
        </IconButton>
      </div>
    </Paper>
  )
}
