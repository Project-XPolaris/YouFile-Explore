import React, { useEffect, useState } from 'react'
import useStyles from './style'
import {
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import { DefaultConfigManager } from '../../store/config'
import { Add, Delete, Link, Settings } from '@material-ui/icons'
import { useUpdate } from 'ahooks'
import ConfigContent from '../../components/ConfigContent'
import { useHistory } from 'react-router-dom'
import StartTitleBar from './titlebar'
import { fetchServiceInfo } from '../../api/info'
import LoginDialog from './parts/LoginDialog/login'
import { checkUserAuth, fetchUserAuth } from '../../api/auth'
import { useSnackbar } from 'notistack'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../../electron/channels'

const StartPage = (): React.ReactElement => {
  const classes = useStyles()
  const update = useUpdate()
  const [currentConfigId, setCurrentConfigId] = useState<string | undefined>()
  const [showLogin, setShowLogin] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
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
  const switchConfig = (id: string) => {
    setCurrentConfigId(id)
  }
  const checkLogin = async (token?: string, url: string) => {
    if (token) {
      const response = await checkUserAuth(token)
      if (!response.success) {
        enqueueSnackbar('Connect to YouPlus failed,try to login again!', { variant: 'error' })
        setShowLogin(true)
        return
      }
    }
    if (token) {
      localStorage.setItem('token', token)
    }
    // await appModel.loadInfo()
    // DefaultApiWebsocket.connect()
    ipcRenderer.send(ChannelNames.loginSuccess, {
      token,
      url
    })
  }
  const onApply = async () => {
    if (currentConfigId) {
      DefaultConfigManager.applyConfig(currentConfigId)
      const config = DefaultConfigManager.getConfigWithId(currentConfigId)
      if (!config) {
        return
      }
      const serviceInfo = await fetchServiceInfo()
      enqueueSnackbar('Connect to YouFile success', { variant: 'success' })
      if (serviceInfo.auth && !config.token) {
        setShowLogin(true)
        return
      }

      checkLogin(config.token, config.apiUrl ?? '')
    }
  }
  const deleteConfig = (id: string) => {
    DefaultConfigManager.deleteConfig(id)
    update()
  }

  const onLogin = async (username: string, password: string) => {
    const response = await fetchUserAuth(username, password)
    console.log(response)
    if (!response.success || !currentConfigId) {
      enqueueSnackbar(`Login to YouPlus failed,reason: ${response.reason}`, { variant: 'error' })
      return
    }
    enqueueSnackbar('Login to YouPlus success', { variant: 'success' })
    setShowLogin(false)
    const config = DefaultConfigManager.getConfigWithId(currentConfigId)
    if (!config) {
      return
    }
    config.username = username
    config.token = response.token
    DefaultConfigManager.updateConfig(config)
    checkLogin(config.token, config.apiUrl ?? '')
  }

  return (
    <div className={classes.root}>
      <LoginDialog
        open={showLogin}
        onCancel={() => setShowLogin(false)}
        onLogin={onLogin}
      />
      <StartTitleBar />
      <div className={classes.content}>
        <div className={classes.side}>
          <List>
            {
              DefaultConfigManager && DefaultConfigManager.configs.map(config => (
                <ListItem button key={config.id} selected={currentConfigId === config.id}
                  onClick={() => switchConfig(config.id)}>
                  <ListItemAvatar>
                    <Settings />
                  </ListItemAvatar>
                  <ListItemText primary={config.name} secondary={config.apiUrl ?? 'no service'} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        deleteConfig(config.id)
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
            <ListItem button onClick={() => newConfig()}>
              <ListItemAvatar>
                <Add />
              </ListItemAvatar>
              <ListItemText primary={'Add new config'} />
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
              <Fab variant='extended' color={'primary'} className={classes.fab} onClick={() => onApply()}>
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
