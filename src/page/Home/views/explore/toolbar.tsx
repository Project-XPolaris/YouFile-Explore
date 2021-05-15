import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../../theme';
import { Breadcrumbs, ButtonBase, Divider, IconButton, Menu, MenuItem, Paper } from '@material-ui/core';
import {
  ArrowBack,
  ArrowForwardIos,
  ExitToApp,
  Favorite,
  FileCopy,
  ListAlt,
  MoreVert,
  Notes,
  Refresh,
  Search,
  Check,
  CreateNewFolder, NavigateNext,
} from '@material-ui/icons';
import useHomeModel from '../../model';
import PopoverImageButton from '../../../../components/PopoverImageButton';
import CopyPopover from '../../../../layout/Frame/parts/CopyPopover';
import useFileModel from '../../../../models/file';
import usePopoverController from '../../../../hooks/PopoverController';
import CutPopover from '../../../../layout/Frame/parts/CutPopover';
import useLayoutModel from '../../../../models/layout';
import SearchPopover from '../../../../layout/Frame/parts/SearchPopover';
import useAppModel from '../../../../models/app';
import { MountFolderFileIcon } from '../../../../components/FileIcon/MountFolderFileIcon';
import { remountFstab } from '../../../../api/mount';
import { useSnackbar } from 'notistack';
import { useSize } from 'ahooks';
import { getCollapsePath, PathPart } from '../../../../utils/path';

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
    display: 'flex',
  },
  leading: {
    alignItems: 'center',
    display: 'flex',
    width: theme.spacing(30 - 4),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
  },
  backIcon: {
    color: theme.palette.primary.contrastText,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    flexGrow: 1,
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  part: {
    ...theme.typography.body1,
    color: '#2a2a2a',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#EEEEEE',
    },
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: 4,
  },
  sep: {
    fontSize: 10,
  },
  actionIcon: {
    color: theme.palette.primary.contrastText,
  },
  menuIcon: {
    marginRight: theme.spacing(2),
  },

});

interface HomeToolbarPropsType {
  onSelectAll: () => void
  onReverseSelect: () => void
  onCreateNewDirectory: () => void
}

const HomeToolbar = ({ onSelectAll, onReverseSelect, onCreateNewDirectory }: HomeToolbarPropsType): ReactElement => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const homeModel = useHomeModel();
  const fileModel = useFileModel();
  const layoutModel = useLayoutModel();
  const appModel = useAppModel();
  const refPath: MutableRefObject<HTMLDivElement | null> | null = useRef(null);
  const pathSize = useSize(refPath);
  const [viewTypeMenuAnchor, setViewTypeMenuAnchor] = React.useState(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = React.useState(null);
  const copyPopoverController = usePopoverController();
  const movePopoverController = usePopoverController();
  const searchPopoverController = usePopoverController();
  const handleViewTypeMenuClick = (event: any) => {
    setViewTypeMenuAnchor(event.currentTarget);
  };

  const handleViewTypeMenuClose = () => {
    setViewTypeMenuAnchor(null);
  };
  const handleMoreMenuClick = (event: any) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };
  const handlerAddToFavourite = () => {
    if (!homeModel.currentPath || !appModel.info) {
      return;
    }
    const name = homeModel.currentPath.split(appModel.info.sep).pop();
    if (!name) {
      return;
    }
    homeModel.addFavourite({
      name,
      path: homeModel.currentPath,
      type: 'Directory',
    });
  };
  const viewTypeMenu = () => {
    return (
      <Menu
        id='viewTypeMenu'
        anchorEl={viewTypeMenuAnchor}
        keepMounted
        open={Boolean(viewTypeMenuAnchor)}
        onClose={handleViewTypeMenuClose}
      >
        <MenuItem onClick={() => {
          homeModel.setViewType('List');
          handleViewTypeMenuClose();
        }}>List</MenuItem>
        <MenuItem onClick={() => {
          homeModel.setViewType('Medium');
          handleViewTypeMenuClose();
        }}>Medium Icon</MenuItem>
      </Menu>
    );
  };
  const [navChip, setNavChip] = useState<PathPart[]>([]);
  useEffect(() => {
    const elm = refPath.current;
    if (!elm) {
      return;
    }
    // setNavChip(getCollapsePath(homeModel.getBreadcrumbs().map((it,idx) => ({name:it,idx})), elm.clientWidth / 12,15))
    setNavChip(homeModel.getBreadcrumbs().map((it,idx) => ({name:it,idx})))
  }, [pathSize, homeModel.currentPath]);
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
            handlerAddToFavourite();
            onCreateNewDirectory();
          }}
        ><Favorite className={classes.menuIcon} />Add to favourite</MenuItem>
        <MenuItem
          onClick={() => {
            handleMoreMenuClose();
            onCreateNewDirectory();
          }}
        ><CreateNewFolder className={classes.menuIcon} />New directory</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleMoreMenuClose();
            onSelectAll();
          }}
        ><Check className={classes.menuIcon} />Select all</MenuItem>
        <MenuItem
          onClick={() => {
            handleMoreMenuClose();
            onReverseSelect();
          }}
        ><Refresh className={classes.menuIcon} />Reverse select</MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            handleMoreMenuClose();
            await remountFstab();
            enqueueSnackbar('Remount success', {
              variant: 'success',
              anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            });
          }}
        ><MountFolderFileIcon className={classes.menuIcon} />Remount</MenuItem>
      </Menu>
    );
  };
  return (
    <Paper className={classes.main}>
      {viewTypeMenu()}
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
          <Breadcrumbs  separator={<ArrowForwardIos className={classes.sep} />}>
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
                );
              })
            }
          </Breadcrumbs>
        </Paper>
        {
          fileModel.copyFile && fileModel.copyFile.length > 0 &&
          <PopoverImageButton icon={<FileCopy className={classes.actionIcon} />} controller={copyPopoverController}>
            <CopyPopover onPaste={() => {
              copyPopoverController.setAnchorEl(null);
              fileModel.setCopyFile(undefined);
            }} />
          </PopoverImageButton>
        }
        {
          fileModel.moveFile && fileModel.moveFile.length > 0 &&
          <PopoverImageButton icon={<ExitToApp className={classes.actionIcon} />} controller={movePopoverController}>
            <CutPopover onMove={() => {
              movePopoverController.setAnchorEl(null);
              fileModel.setMoveFile(undefined);
            }} />
          </PopoverImageButton>
        }
        <PopoverImageButton icon={<Search className={classes.actionIcon} />} controller={searchPopoverController}>
          <SearchPopover onSearch={(key: string) => {
            searchPopoverController.setAnchorEl(null);
            homeModel.searchFile(key);
          }} />
        </PopoverImageButton>
        <IconButton
          onClick={() => layoutModel.switchDialog('global/taskDrawer')}
        >
          <ListAlt className={classes.actionIcon} />
        </IconButton>
        <IconButton aria-label='delete' onClick={handleViewTypeMenuClick}>
          <Notes fontSize='inherit' className={classes.actionIcon} />
        </IconButton>
        <IconButton onClick={handleMoreMenuClick}>
          <MoreVert className={classes.actionIcon} />
        </IconButton>
      </div>
    </Paper>
  );
};
export default HomeToolbar;
