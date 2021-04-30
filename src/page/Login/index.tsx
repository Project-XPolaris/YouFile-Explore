import React, { ReactElement, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100vw',
    height: 'calc(100vh - 32px)',
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  content: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: theme.spacing(40)
  },
  actionButton: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end'
  }
}))

const LoginPage = ():ReactElement => {
  const classes = useStyles()
  const [apiUrl, setApiUrl] = useState<string>()
  const history = useHistory()
  const onConfirmClick = () => {
    if (apiUrl) {
      localStorage.setItem('ServiceUrl', apiUrl)
    }
    history.replace('/')
  }
  return (
    <div className={classes.main}>
      <div>
        <Typography variant={'h4'}>
          Set up
        </Typography>
        <Paper elevation={1} className={classes.content}>
          <TextField
            label='Service api'
            className={classes.input}
            fullWidth
            onChange={(e) => setApiUrl(e.target.value)}
          />
          <Button className={classes.actionButton} onClick={onConfirmClick}>
            Confirm
          </Button>
        </Paper>

      </div>
    </div>
  )
}

export default LoginPage
