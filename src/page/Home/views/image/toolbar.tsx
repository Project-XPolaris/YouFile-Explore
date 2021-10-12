import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../../../theme'
import { Paper, Typography } from '@material-ui/core'
import useHomeModel from '../../model'

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

const ImageToolbar = ():ReactElement => {
  const classes = useStyles()
  return (
    <Paper className={classes.main}>
      <div className={classes.leading}>
        <Typography variant={'h6'}>
          Image
        </Typography>
      </div>
      <div className={classes.content}>

      </div>
    </Paper>
  )
}
export default ImageToolbar
