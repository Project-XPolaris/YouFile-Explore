import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel, { getFileTree } from './model'
import { Expandable } from 'react-virtualized-tree'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import { Folder } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    height: 'calc(100% - 64px)',
    marginTop: 64
  }
}))

const HomeSide = (): React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  // console.log(homeModel.getExpandNode())
  console.log(getFileTree().root)
  return (
    <div className={classes.main}>
      <List subheader={<ListSubheader>System</ListSubheader>}>
        {
          <ListItem id={'root'} button onClick={() => homeModel.setCurrentPath('/')}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary={'Root'} />
          </ListItem>
        }
      </List>
      <List subheader={<ListSubheader>Share Folder</ListSubheader>}>
        {
          homeModel.smbDirs.map(smbDir => (
            <ListItem id={smbDir.name} button onClick={() => homeModel.setCurrentPath(smbDir.path)}>
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
