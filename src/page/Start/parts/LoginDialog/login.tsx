import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './style';

export interface LoginDialogPropsType {
  onLogin:(username:string,password:string) => void
  onCancel:() => void
  open?:boolean
}

const LoginDialog = ({open = false,onCancel,onLogin}: LoginDialogPropsType) => {
  const classes = useStyles();
  const [username,setUsername] = useState<string>()
  const [password,setPassword] = useState<string>()
  useEffect(() => {
    setUsername(undefined)
    setPassword(undefined)
  },[open])
  const okHandler = () => {
    if (!username || !password) {
      return
    }
    onLogin(username,password)
  }
  return (
    <Dialog open={open} maxWidth={'lg'} onClose={onCancel}>
      <DialogTitle>
        Login To YouPlus
      </DialogTitle>
      <DialogContent>
        <div className={classes.input}>
          <TextField label="username" size='small' fullWidth onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className={classes.input}>
          <TextField label="password" size='small' fullWidth type="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={okHandler}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
