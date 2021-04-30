import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import theme from '../../theme'
import { IconButton, Paper } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import useHomeModel from './model'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TabItem } from './hooks/tab'

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
    maxWidth: theme.spacing(30),
    cursor: 'default'
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
    backgroundColor: '#1769aa',
    cubicBezier: '(.17,.67,.83,.67)',
    '&:hover': {
      backgroundColor: '#1a74bd'
    }
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
    flexGrow: 1
  },
  tabContainer: {
    display: 'flex'
  }
})

interface HomeTabsPropsType {
  className?: string
}
const reorder = (list:any, startIndex:number, endIndex:number):any => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
export default function HomeTabs ({ className }: HomeTabsPropsType): ReactElement {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const onDragEnd = (result:any) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items:TabItem[] = reorder(
      homeModel.tabController.list,
      result.source.index,
      result.destination.index
    )
    homeModel.tabController.setList(items)
  }
  return (
    <div className={clsx(className, classes.main)}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={classes.tabContainer} >
              {
                homeModel.tabController.list.map((item, idx) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id } index={idx}>
                      {(provided) => (
                        <Paper
                          className={clsx(classes.tabHead, item.active ? classes.active : classes.inactive)}
                          key={idx}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
                        </Paper>)}
                    </Draggable>
                  )
                })
              }
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={classes.addHead}>
        <IconButton
          size={'small'}
          onClick={() => {
            homeModel.tabController.newTab({ type: 'Start' })
          }}
        >
          <Add className={classes.addIcon} />
        </IconButton>
      </div>
      <div className={classes.dragZone}>

      </div>
    </div>
  )
}
