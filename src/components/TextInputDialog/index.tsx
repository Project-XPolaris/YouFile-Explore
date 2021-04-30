import React, { ChangeEvent, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  TextField
} from '@material-ui/core'

export interface TextInputDialogPropsType {
  open?:boolean
  onClose:() => void
  description?:string,
  onOk:(value:string) => void
  label?:string
  title:string
  contentClassName?:string
}

const TextInputDialog = ({ open = false, onClose, description, onOk, contentClassName, title, label = '', ...other }: TextInputDialogPropsType & DialogProps):React.ReactElement => {
  const [text, setText] = useState<string | undefined>()
  const onDialogOk = () => {
    if (text) {
      onOk(text)
    }
  }
  return (
    <Dialog open={open} onClose={onClose} {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={contentClassName}>
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
          onChange={(e:ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
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
