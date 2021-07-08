import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import TextInputOption from './conponents/TextInputOption'
import { ConnectionConfig } from '../../store/config'
import { Language, Settings } from '@material-ui/icons'
import useStyles from './style'

export type fieldName = 'apiUrl'

export interface ConfigContentPropsType {
  config?: ConnectionConfig
  onConfigUpdate: (config: ConnectionConfig) => void
}

const ConfigContent = ({
  config,
  onConfigUpdate
}: ConfigContentPropsType): React.ReactElement => {
  const classes = useStyles()
  return (
    <div>
      {
        config &&
        <>
          <div className={classes.title}>
            <Typography variant={'subtitle1'} >
              Config
            </Typography>
          </div>

          <Paper>
            <List>
              <TextInputOption
                label={'Config name'}
                value={config.name}
                icon={<Settings />}
                onOk={(value) => {
                  onConfigUpdate({
                    ...config,
                    name: value
                  })
                }}
              />
            </List>

          </Paper>
          <div className={classes.title}>
            <Typography variant={'subtitle1'} >
            Core
            </Typography>
          </div>
          <Paper>
            <List>
              <TextInputOption
                label={'Service url'}
                value={config.apiUrl}
                icon={<Language />}
                onOk={(value) => {
                  onConfigUpdate({
                    ...config,
                    apiUrl: value
                  })
                }}
              />
              <TextInputOption
                label={'YouSmb api (empty for not use)'}
                value={config.smbUrl}
                icon={<Language />}
                onOk={(value) => {
                  onConfigUpdate({
                    ...config,
                    smbUrl: value
                  })
                }}
              />
            </List>
          </Paper>
          {
            config.token &&
              <>
                <div className={classes.title}>
                  <Typography variant={'subtitle1'} >
                    YouPlus
                  </Typography>
                </div>
                <Paper>
                  <List>
                    <ListItem>
                      <ListItemText primary={config.username} secondary={"username"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"******"} secondary={"token"} />
                    </ListItem>
                  </List>
                </Paper>
              </>
          }
        </>
      }
    </div>
  )
}

export default ConfigContent
