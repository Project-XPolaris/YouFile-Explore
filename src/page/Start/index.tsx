import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { AppBar, Fab, List, ListItem, ListItemAvatar, ListItemText, Toolbar, Typography } from '@material-ui/core'
import { DefaultConfigManager } from '../../store/config'
import { Add, Link, Settings } from '@material-ui/icons'
import { useUpdate } from 'ahooks'
import ConfigContent from '../../components/ConfigContent'
import { useHistory } from 'react-router-dom'

export interface StartPagePropsType {

}

const StartPage = ({}: StartPagePropsType):React.ReactElement => {
  const classes = useStyles()
  const update = useUpdate()
  const [currentConfigId, setCurrentConfigId] = useState<string | undefined>()
  const history = useHistory()
  useEffect(() => {
    DefaultConfigManager.loadData()
    if (DefaultConfigManager.configs.length > 0) {
      setCurrentConfigId(DefaultConfigManager.configs[0].id)
    }
  }, [])
  const newConfig = () => {
    DefaultConfigManager.newConfig()
    update()
  }
  const switchConfig = (id:string) => {
    setCurrentConfigId(id)
  }
  const onApply = () => {
    if (currentConfigId) {
      DefaultConfigManager.applyConfig(currentConfigId)
    }
    history.replace('/home')
  }
  console.log(DefaultConfigManager.configs)
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Start
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <div className={classes.side}>
          <List>
            {
              DefaultConfigManager && DefaultConfigManager.configs.map(config => (
                <ListItem button key={config.id} selected={currentConfigId === config.id} onClick={() => switchConfig(config.id)}>
                  <ListItemAvatar>
                    <Settings />
                  </ListItemAvatar>
                  <ListItemText primary={config.name} secondary={config.apiUrl ?? 'no service'}/>
                </ListItem>
              ))
            }
            <ListItem button onClick={() => newConfig()}>
              <ListItemAvatar>
                <Add />
              </ListItemAvatar>
              <ListItemText primary={'Add new config'}/>
            </ListItem>
          </List>
        </div>
        <div className={classes.main}>
          {
            currentConfigId &&
              <>
                <ConfigContent
                  config={DefaultConfigManager.getConfigWithId(currentConfigId)}
                  onConfigUpdate={(newConfig) => {
                    DefaultConfigManager.updateConfig(newConfig)
                    update()
                  }}
                />
                <Fab variant="extended" color={'primary'} className={classes.fab} onClick={() => onApply()}>
                  <Link className={classes.fabIcon} />
              Connect
                </Fab>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default StartPage
