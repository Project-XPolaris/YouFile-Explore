import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel from '../../model'
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import { Delete, Eject, Folder } from '@material-ui/icons'
import useAppModel from '../../../../models/app'
import { DiskFileIcon } from '../../../../components/FileIcon/DiskFileIcon'
import FolderIcon from '@material-ui/icons/Folder'
import { FavouriteManager } from '../../../../favourite'
import useMountModel from '../../../../models/mount'
import { MountFolderFileIcon } from '../../../../components/FileIcon/MountFolderFileIcon'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: 'calc(100% - 64px)'
  }
}))

const HomeSide = (): React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const appModel = useAppModel()
  const mountModel = useMountModel()
  return (
    <div className={classes.main}>
      {
        FavouriteManager.getInstance().items.length > 0 &&
        <List subheader={<ListSubheader>Favourite</ListSubheader>} dense>
          {
            FavouriteManager.getInstance().getItems().map(item => (
              <ListItem button onClick={() => homeModel.setCurrentPath(item.path)} key={item.path}>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    size={'small'}
                    onClick={() => {
                      homeModel.removeFavourite(item.path)
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      }
      <List subheader={<ListSubheader>System</ListSubheader>} dense>
        {
          appModel.info?.root_paths?.map(it => {
            return (
              <ListItem
                id={it.path}
                key={it.path}
                button onClick={() => {
                  homeModel.setCurrentPath(it.path)
                  homeModel.tabController.setCurrentTabFolder(it.name, it.path)
                }}
              >
                <ListItemIcon>
                  {
                    it.type === 'Parted' && <DiskFileIcon />
                  }
                  {
                    it.type === 'Directory' && <FolderIcon />
                  }
                </ListItemIcon>
                <ListItemText primary={it.name} />
              </ListItem>
            )
          })
        }
      </List>
      {
        homeModel.smbDirs.length > 0 &&
        <List subheader={<ListSubheader>Share Folder</ListSubheader>} dense>
          {
            homeModel.smbDirs.map(smbDir => (
              <ListItem id={smbDir.name} button onClick={() => homeModel.setCurrentPath(smbDir.path)} key={smbDir.name}>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={smbDir.name} />
              </ListItem>
            ))
          }
        </List>
      }
    </div>
  )
}
export default HomeSide
