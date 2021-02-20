import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import HomeSide from './side'
import useHomeModel from '../../model'
import MediumView from './medium'
import { FileNode } from '../../tree'
import ExploreListView from './list'

const useStyles = makeStyles({
  main: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    display: 'flex'
  },
  fileContent: {
    width: '100%',
    flex: '1 1'
  },
  container: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  side: {
    backgroundColor: 'white',
    height: '100%',
    width: 240,
    overflowY: 'auto'
  }
})

interface ExploreViewPropsType {
  onRename:(file:FileNode) => void
}

const ExploreView = ({ onRename }: ExploreViewPropsType):React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const renderDisplayMode = () => {
    return (
      <>
        {
          homeModel.viewType === 'List' &&
          <ExploreListView onRename={onRename} />
        }
        {
          homeModel.viewType === 'Medium' &&
          <MediumView onRename={onRename} />
        }
      </>
    )
  }
  return (
    <div className={classes.main}>
      <Paper elevation={2}>
        <div className={classes.side}>
          <HomeSide />
        </div>
      </Paper>
      <div className={classes.container}>
        <div className={classes.fileContent}>
          {homeModel.mode === 'display' && renderDisplayMode()}
        </div>
      </div>
    </div>
  )
}
export default ExploreView
