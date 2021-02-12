import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel, { getFileTree } from './model'
import { Expandable } from 'react-virtualized-tree'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import { Folder } from '@material-ui/icons'
import useAppModel from '../../models/app'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    height: 'calc(100% - 64px)'
  }
}))

const HomeSide = (): React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const appModel = useAppModel()
  return (
    <div className={classes.main}>
      <List subheader={<ListSubheader>System</ListSubheader>}>
        {
          appModel.info?.root_paths?.map(it => {
            return (
              <ListItem id={it.path} button onClick={() => {
                homeModel.setCurrentPath(it.path)
                homeModel.tabController.setCurrentTabFolder(it.name, it.path)
              }}>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={it.name} />
              </ListItem>
            )
          })
        }
      </List>
      <List subheader={<ListSubheader>Share Folder</ListSubheader>}>
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
    </div>
  )
}
export default HomeSide
