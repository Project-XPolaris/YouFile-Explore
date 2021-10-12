import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel from './model'
import useFileModel from '../../models/file'
import AddSMBDialog from '../../components/AddSMBDialog'
import useLayoutModel from '../../models/layout'
import 'react-virtualized/styles.css'
import HomeTitleBar from './titlebar'
import ExploreView from './views/explore'
import StartView from './views/start'
import StartToolbar from './views/start/toolbar'

const useStyles = makeStyles((theme) => ({
  main: {

  },

  nav: {
    width: '100%',
    height: theme.spacing(4),
    backgroundColor: '#FFFFFF',
    borderLeft: '1px #EEEEEE solid',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: 'sticky',
    top: 0,
    zIndex: 1
  },
  navDivider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  reload: {

  },

  pathBreadcrumbs: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflowX: 'auto'
  },
  searchFile: {
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginLeft: theme.spacing(1)
  },
  searchInput: {
    width: theme.spacing(20)
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    paddingTop: theme.spacing(13)
  }

}))

const HomePage = ():React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileModel = useFileModel()
  const layoutModel = useLayoutModel()
  useEffect(() => {
    homeModel.initData()
  }, [])
  return (
    <div className={classes.main}>
      <HomeTitleBar />
      {homeModel.mode === 'blank' && <StartToolbar />}
      <AddSMBDialog
        onClose={() => layoutModel.switchDialog('global/addSMB')}
        open={Boolean(layoutModel.dialogs['global/addSMB'])}
        onOk={(data) => {
          layoutModel.switchDialog('global/addSMB')
          fileModel.addSMBFolder(data)
        }}
      />

      <div className={classes.contentContainer}>
        {
          homeModel.mode === 'display' && <ExploreView />
        }
        {
          homeModel.mode === 'blank' && <StartView />
        }
      </div>

    </div>
  )
}
export default HomePage
