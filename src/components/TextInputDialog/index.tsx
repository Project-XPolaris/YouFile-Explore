import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'

export interface TextInputDialogPropsType {
  open?:boolean
  onClose:() => void
  description?:string,
  onOk:(value:string) => void
  label?:string
  title:string
}

const TextInputDialog = ({ open = false, onClose, description, onOk, label = '', title }: TextInputDialogPropsType):React.ReactElement => {
  const [text, setText] = useState<string | undefined>()
  const onDialogOk = () => {
    if (text) {
      onOk(text)
    }
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {
          description &&
          <DialogContentText>
            {description}
          </DialogContentText>

        }
        <TextField
          autoFocus
          margin="dense"
          label={label}
          fullWidth
          variant="standard"
          onChange={(e:any) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDialogOk}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TextInputDialog
