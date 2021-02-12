import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import theme from '../../theme'
import { IconButton, Paper } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { Add, Close } from '@material-ui/icons'
import useHomeModel from './model'

const useStyles = makeStyles({
  main: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  tabHead: {
    height: theme.spacing(4),
    borderRadius: '4px 4px 0 0',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    flexGrow: 1,
    maxWidth: theme.spacing(30)
  },
  addHead: {
    height: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  active: {
    backgroundColor: theme.palette.primary.main
  },
  inactive: {
    backgroundColor: theme.palette.primary.dark
  },
  title: {
    ...theme.typography.body1,
    flexGrow: 1,
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2),
    fontSize: 12,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  icon: {
    color: theme.palette.primary.contrastText,
    fontSize: 14
  },
  addIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 16
  },
  dragZone: {
    '-webkit-app-region': 'drag',
    height: '100%',
    flexGrow:1
  },
})

interface HomeTabsPropsType {
  className?: any
}

export default function HomeTabs ({ className }: HomeTabsPropsType) {
  const classes = useStyles()
  const homeModel = useHomeModel()
  return (
    <div className={clsx(className, classes.main)}>
      {
        homeModel.tabController.list.map((item, idx) => {
          return (
            <Paper
              className={clsx(classes.tabHead, item.active ? classes.active : classes.inactive)}
              key={idx}
            >
              <div className={classes.title} onClick={() => {
                homeModel.tabController.setActiveWithIndex(idx)
              }}>{item.name}</div>
              <IconButton
                size={'small'}
                onClick={() => {
                  homeModel.tabController.closeTab(idx)
                }}
              >
                <Close className={classes.icon} />
              </IconButton>
            </Paper>
          )
        })
      }
      <div className={classes.addHead}>
        <IconButton
          size={'small'}
          onClick={() => {
            homeModel.tabController.newTab({ type: 'Explore' })
          }}
        >
          <Add className={classes.addIcon}/>
        </IconButton>
      </div>
      <div className={classes.dragZone}>

      </div>
    </div>
  )
}
