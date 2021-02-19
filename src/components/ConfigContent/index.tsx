import React from 'react'
import { List, Paper, Typography } from '@material-ui/core'
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
            </List>
          </Paper>
        </>
      }
    </div>
  )
}

export default ConfigContent
