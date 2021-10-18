import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../../../theme'
import { Breadcrumbs, Divider, IconButton, Menu, MenuItem, Paper } from '@material-ui/core'
import {
  Apps,
  ArrowBack,
  ArrowDownward,
  ArrowForwardIos,
  ArrowUpward,
  Check,
  CreateNewFolder, Description,
  ExitToApp,
  Favorite,
  FileCopy,
  ListAlt,
  MoreVert,
  Refresh,
  Reorder,
  Storage,
  TextRotateUp,
  TextRotationDown, Texture,
  ViewList,
} from '@material-ui/icons'
import useHomeModel from '../../model'
import PopoverImageButton from '../../../../components/PopoverImageButton'
import CopyPopover from '../../../../layout/Frame/parts/CopyPopover'
import useFileModel from '../../../../models/file'
import usePopoverController from '../../../../hooks/PopoverController'
import CutPopover from '../../../../layout/Frame/parts/CutPopover'
import useLayoutModel from '../../../../models/layout'
import { remountFstab } from '../../../../api/mount'
import { useSnackbar } from 'notistack'
import { useSize } from 'ahooks'
import { getCollapsePath, PathPart } from '../../../../utils/path'
import { createDataset, deleteDataset } from '../../../../api/dir'
import { DefaultWindowShare } from '../../../../window'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../../../../electron/channels'

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
  },
  menuIcon: {
    marginRight: theme.spacing(2),
    color: 'rgba(0,0,0,0.6)'
  }

})

interface HomeToolbarPropsType {
  onSelectAll: () => void
  onReverseSelect: () => void
  onCreateNewDirectory: () => void
}

const HomeToolbar = ({
  onSelectAll,
  onReverseSelect,
  onCreateNewDirectory
}: HomeToolbarPropsType): ReactElement => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const homeModel = useHomeModel()
  const fileModel = useFileModel()
  const layoutModel = useLayoutModel()
  const refPath: MutableRefObject<HTMLDivElement | null> | null = useRef(null)
  const pathSize = useSize(refPath)
  const [viewTypeMenuAnchor, setViewTypeMenuAnchor] = React.useState(null)
  const [moreMenuAnchor, setMoreMenuAnchor] = React.useState(null)
  const copyPopoverController = usePopoverController()
  const movePopoverController = usePopoverController()
  const handleViewTypeMenuClick = (event: any) => {
    setViewTypeMenuAnchor(event.currentTarget)
  }

  const handleViewTypeMenuClose = () => {
    setViewTypeMenuAnchor(null)
  }
  const handleMoreMenuClick = (event: any) => {
    setMoreMenuAnchor(event.currentTarget)
  }

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null)
  }
  const handlerAddToFavourite = () => {
    const info = DefaultWindowShare.getSystemInfo()
    if (!homeModel.currentPath || !info) {
      return
    }
    const name = homeModel.currentPath.split(info.sep).pop()
    if (!name) {
      return
    }
    homeModel.addFavourite({
      name,
      path: homeModel.currentPath,
      type: 'Directory'
    })
  }
  const handlerAsDataset = async () => {
    if (!homeModel.currentPath) {
      return
    }
    await createDataset(homeModel.currentPath)
    await homeModel.refresh()
  }
  const handlerRemoveDataset = async () => {
    if (!homeModel.currentPath) {
      return
    }
    await deleteDataset(homeModel.currentPath)
    await homeModel.refresh()
  }
  const getBreadcrumbs = () => {
    const info = DefaultWindowShare.getSystemInfo()
    if (info === undefined) {
      return []
    }
    if (homeModel.currentPath) {
      const parts = homeModel.currentPath.split(info.sep)
      if (parts[parts.length - 1] === '') {
        parts.pop()
      }
      return parts
    }
    return []
  }
  const [navChip, setNavChip] = useState<PathPart[]>([])
  useEffect(() => {
    const elm = refPath.current
    if (!elm) {
      return
    }
    setNavChip(getCollapsePath(getBreadcrumbs().map((it, idx) => ({
      name: it,
      idx
    })), (elm.clientWidth / 8.2539) - 1, (42 / 8.2539) - 1))
    // setNavChip(homeModel.getBreadcrumbs().map((it,idx) => ({name:it,idx})))
  }, [pathSize, homeModel.currentPath])
  const renderMoreMenu = () => {
    return (
      <Menu
        anchorEl={moreMenuAnchor}
        keepMounted
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMoreMenuClose()
            handlerAddToFavourite()
          }}
        ><Favorite className={classes.menuIcon} />Add to favourite</MenuItem>
        <MenuItem
          onClick={() => {
            handleMoreMenuClose()
            onCreateNewDirectory()
          }}
        ><CreateNewFolder className={classes.menuIcon} />New directory</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleMoreMenuClose()
            onSelectAll()
          }}
        ><Check className={classes.menuIcon} />Select all</MenuItem>
        <MenuItem
          onClick={() => {
            handleMoreMenuClose()
            onReverseSelect()
          }}
        ><Refresh className={classes.menuIcon} />Reverse select</MenuItem>
        <Divider />
        <MenuItem
          selected={homeModel.contentOrder === 'Name asc'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setOrder('Name asc')
          }}
        ><TextRotateUp className={classes.menuIcon} />Name asc</MenuItem>
        <MenuItem
          selected={homeModel.contentOrder === 'Name desc'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setOrder('Name desc')
          }}
        ><TextRotationDown className={classes.menuIcon} />Name desc</MenuItem>
        <MenuItem
          selected={homeModel.contentOrder === 'Size asc'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setOrder('Size asc')
          }}
        ><ArrowUpward className={classes.menuIcon} />Size asc</MenuItem>
        <MenuItem
          selected={homeModel.contentOrder === 'Size desc'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setOrder('Size desc')
          }}
        ><ArrowDownward className={classes.menuIcon} />Size desc</MenuItem>
        <MenuItem
          selected={homeModel.contentOrder === 'Modify asc'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setOrder('Modify asc')
          }}
        ><ArrowUpward className={classes.menuIcon} />Modify time oldest</MenuItem>
        <MenuItem
          selected={homeModel.contentOrder === 'Modify desc'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setOrder('Modify desc')
          }}
        ><ArrowDownward className={classes.menuIcon} />Modify time newest</MenuItem>
        <Divider />
        <MenuItem
          selected={homeModel.contentGroupBy === 'NoGroup'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setGroupBy('NoGroup')
          }}
        ><Texture className={classes.menuIcon} />No group</MenuItem>
        <MenuItem
          selected={homeModel.contentGroupBy === 'Type'}
          onClick={() => {
            handleMoreMenuClose()
            homeModel.setGroupBy('Type')
          }}
        ><Description className={classes.menuIcon} />File type group</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            homeModel.setViewType('List')
            handleViewTypeMenuClose()
          }}
          selected={homeModel.viewType === 'List'}
        >
          <ViewList className={classes.menuIcon} />
          List
        </MenuItem>
        <MenuItem
          onClick={() => {
            homeModel.setViewType('Medium')
            handleViewTypeMenuClose()
          }}
          selected={homeModel.viewType === 'Medium'}
        >
          <Apps className={classes.menuIcon} />
          Medium Icon
        </MenuItem>
        <MenuItem
          onClick={() => {
            homeModel.setViewType('DetailList')
            handleViewTypeMenuClose()
          }}
          selected={homeModel.viewType === 'DetailList'}
        >
          <Reorder className={classes.menuIcon} />
          Detail
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            handleMoreMenuClose()
            await remountFstab()
            enqueueSnackbar('Remount success', {
              variant: 'success',
              anchorOrigin: {
                horizontal: 'right',
                vertical: 'bottom'
              }
            })
          }}
        ><Refresh className={classes.menuIcon} />Remount</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleMoreMenuClose()
            if (!homeModel.datasetInfo) {
              handlerAsDataset()
            } else {
              handlerRemoveDataset()
            }
          }}
        ><Storage className={classes.menuIcon} />{homeModel.datasetInfo ? 'Remove dataset' : 'As dataset'}</MenuItem>
      </Menu>
    )
  }
  return (
    <Paper className={classes.main}>
      {renderMoreMenu()}
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
        <Paper className={classes.nav} ref={refPath}>
          <Breadcrumbs separator={<ArrowForwardIos className={classes.sep} />}>
            {
              navChip.map((it, idx) => {
                return (
                  <div
                    key={idx}
                    className={classes.part}
                    onClick={() => homeModel.onNavChipClick(it.idx)}
                  >

                    {it.name}
                  </div>
                )
              })
            }
          </Breadcrumbs>
        </Paper>
        {
          fileModel.clipboardFile && fileModel.clipboardFile.length > 0 && fileModel.clipboardAction === 'Copy' &&
          <PopoverImageButton icon={<FileCopy className={classes.actionIcon} />} controller={copyPopoverController}>
            <CopyPopover
              onPaste={() => {
                fileModel.pasteFile({})
                copyPopoverController.setAnchorEl(null)
              }}
              onClearAll={() => {
                ipcRenderer.send(ChannelNames.setClipboard, {
                  items: [],
                  action: 'Copy'
                })
                copyPopoverController.setAnchorEl(null)
              }}
            />
          </PopoverImageButton>
        }
        {
          fileModel.clipboardFile && fileModel.clipboardFile.length > 0 && fileModel.clipboardAction === 'Move' &&
          <PopoverImageButton icon={<ExitToApp className={classes.actionIcon} />} controller={movePopoverController}>
            <CutPopover
              onMove={() => {
                movePopoverController.setAnchorEl(null)
                fileModel.move({})
              }}
              onClearAll={() => {
                ipcRenderer.send(ChannelNames.setClipboard, {
                  items: [],
                  action: 'Copy'
                })
                copyPopoverController.setAnchorEl(null)
              }}
            />
          </PopoverImageButton>
        }
        {/* <PopoverImageButton icon={<Search className={classes.actionIcon} />} controller={searchPopoverController}> */}
        {/*  <SearchPopover onSearch={(key: string) => { */}
        {/*    searchPopoverController.setAnchorEl(null) */}
        {/*    homeModel.searchFile(key) */}
        {/*  }} /> */}
        {/* </PopoverImageButton> */}
        <IconButton
          onClick={() => layoutModel.switchDialog('global/taskDrawer')}
        >
          <ListAlt className={classes.actionIcon} />
        </IconButton>
        <IconButton onClick={handleMoreMenuClick}>
          <MoreVert className={classes.actionIcon} />
        </IconButton>
      </div>
    </Paper>
  )
}
export default HomeToolbar
