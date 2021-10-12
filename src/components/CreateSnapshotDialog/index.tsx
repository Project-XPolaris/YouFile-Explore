import useStyles from './style'
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from '@material-ui/core'
import React, { useState } from 'react'

export interface CreateSnapshotDialogPropsType {
  className?: string;
  onOk: (name: string) => void;
}

const CreateSnapshotDialog = ({ onOk, ...other }: CreateSnapshotDialogPropsType & DialogProps) => {
  const [text, setText] = useState<string | undefined>()
  const onDialogOkHandler = () => {
    if (text) {
      onOk(text)
    }
  }
  return (
    <Dialog {...other}>
      <DialogTitle>
        New snapshot
      </DialogTitle>
      <DialogContent>
        <TextField
          label='name'
          onChange={e => setText(e.currentTarget.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogOkHandler}>
          OK
        </Button>
        <Button onClick={(e) => {
          if (other.onClose) {
            other.onClose(e, 'backdropClick')
          }
        }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateSnapshotDialog
