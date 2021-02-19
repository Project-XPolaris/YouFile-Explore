import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../../../theme'
import { Breadcrumbs, IconButton, Menu, MenuItem, Paper } from '@material-ui/core'
import { ArrowBack, ArrowForwardIos, ExitToApp, FileCopy, ListAlt, Notes, Refresh, Search } from '@material-ui/icons'
import useHomeModel from '../../model'
import PopoverImageButton from '../../../../components/PopoverImageButton'
import CopyPopover from '../../../../layout/Frame/parts/CopyPopover'
import useFileModel from '../../../../models/file'
import usePopoverController from '../../../../hooks/PopoverController'
import CutPopover from '../../../../layout/Frame/parts/CutPopover'
import useLayoutModel from '../../../../models/layout'
import SearchPopover from '../../../../layout/Frame/parts/SearchPopover'

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
    marginRight: theme.spacing(2)
  },
  backIcon: {
    color: theme.palette.primary.contrastText
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  nav: {
    flexGrow: 1,
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  part: {
    ...theme.typography.body1,
    color: '#2a2a2a',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#EEEEEE'
    },
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: 4
  },
  sep: {
    fontSize: 10
  },
  actionIcon: {
    color: theme.palette.primary.contrastText
  }

})

interface HomeToolbarPropsType {

}

const HomeToolbar = ({}: HomeToolbarPropsType):ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileModel = useFileModel()
  const layoutModel = useLayoutModel()
  const [viewTypeMenuAnchor, setViewTypeMenuAnchor] = React.useState(null)
  const copyPopoverController = usePopoverController()
  const movePopoverController = usePopoverController()
  const searchPopoverController = usePopoverController()
  const handleViewTypeMenuClick = (event:any) => {
    setViewTypeMenuAnchor(event.currentTarget)
  }

  const handleViewTypeMenuClose = () => {
    setViewTypeMenuAnchor(null)
  }
  const viewTypeMenu = () => {
    return (
      <Menu
        id="viewTypeMenu"
        anchorEl={viewTypeMenuAnchor}
        keepMounted
        open={Boolean(viewTypeMenuAnchor)}
        onClose={handleViewTypeMenuClose}
      >
        <MenuItem onClick={() => {
          homeModel.setViewType('List')
          handleViewTypeMenuClose()
        }}>List</MenuItem>
        <MenuItem onClick={() => {
          homeModel.setViewType('Medium')
          handleViewTypeMenuClose()
        }}>Medium Icon</MenuItem>
      </Menu>
    )
  }
  return (
    <Paper className={classes.main}>
      {viewTypeMenu()}
      <div className={classes.leading}>
        <IconButton
          onClick={() => homeModel.onBack()}
        >
          <ArrowBack className={classes.backIcon} />
        </IconButton>
        <IconButton
          onClick={() => homeModel.loadContent()}
        >
          <Refresh className={classes.backIcon} />
        </IconButton>
      </div>
      <div className={classes.content}>
        <Paper className={classes.nav}>
          <Breadcrumbs separator={<ArrowForwardIos className={classes.sep} />} >
            {
              homeModel.getBreadcrumbs().map((it, idx) => {
                return (
                  <div
                    key={it}
                    className={classes.part}
                    onClick={() => homeModel.onNavChipClick(idx)}
                  >
                    {it}
                  </div>
                )
              })
            }
          </Breadcrumbs>
        </Paper>
        {
          fileModel.copyFile &&
          <PopoverImageButton icon={<FileCopy className={classes.actionIcon} />} controller={copyPopoverController}>
            <CopyPopover onPaste={() => {
              copyPopoverController.setAnchorEl(null)
              fileModel.setCopyFile(undefined)
            }} />
          </PopoverImageButton>
        }
        {
          fileModel.moveFile &&
          <PopoverImageButton icon={<ExitToApp className={classes.actionIcon} />} controller={movePopoverController}>
            <CutPopover onMove={() => {
              movePopoverController.setAnchorEl(null)
              fileModel.setMoveFile(undefined)
            }} />
          </PopoverImageButton>
        }
        <PopoverImageButton icon={<Search className={classes.actionIcon} />} controller={searchPopoverController}>
          <SearchPopover onSearch={(key:string) => {
            searchPopoverController.setAnchorEl(null)
            homeModel.searchFile(key)
          }}/>
        </PopoverImageButton>
        <IconButton
          onClick={() => layoutModel.switchDialog('global/taskDrawer')}
        >
          <ListAlt className={classes.actionIcon} />
        </IconButton>
        <IconButton aria-label='delete' size='small' onClick={handleViewTypeMenuClick} className={classes.actionIcon}>
          <Notes fontSize='inherit' />
        </IconButton>
      </div>
    </Paper>
  )
}
export default HomeToolbar
