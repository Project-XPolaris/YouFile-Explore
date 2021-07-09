import useStyles from './style'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import clsx from 'clsx'

export interface ExtractArchiveFileDialogPropsType {
  className?: string
  open?:boolean
  onClose:() => void
  onOK:({ password }:{password?:string}) => void
}

const ExtractArchiveFileDialog = ({ className, onOK, onClose, open = false }: ExtractArchiveFileDialogPropsType): React.ReactElement => {
  const classes = useStyles()
  const [password, setPassword] = useState<string>()
  const onDialogOk = () => {
    onOK({ password })
  }
  return (
    <Dialog className={clsx(className, classes.root)} open={open} maxWidth='xl' onClose={onClose}>
      <DialogTitle>
        Extract
      </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <TextField
            placeholder={'password (optional)'}
            size={'small'}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogOk}>
          OK
        </Button>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExtractArchiveFileDialog
