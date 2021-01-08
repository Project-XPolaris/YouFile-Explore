import React, { ReactElement, useState } from 'react'
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField
} from '@material-ui/core'
import { Title } from '@material-ui/icons'

export interface TextInputOptionPropsType {
  label: string
  value?: string
  icon?: any,
  onOk: (value:string) => void
}

const TextInputOption = ({
  label,
  value,
  icon,
  onOk
}: TextInputOptionPropsType): ReactElement => {
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | undefined>()
  const switchDialog = () => {
    setOpen(!open)
  }
  const onDialogOk = () => {
    if (inputValue) {
      onOk(inputValue)
    }
    switchDialog()
  }
  return (
    <>
      <Dialog open={open} onClose={switchDialog}>
        <DialogTitle>
          {label}
        </DialogTitle>
        <DialogContent>
          <TextField label={label} defaultValue={value} fullWidth onChange={(e) => setInputValue(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={switchDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={onDialogOk} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem button onClick={() => setOpen(true)}>
        {
          icon && <ListItemAvatar>{icon}</ListItemAvatar>
        }
        <ListItemText primary={value} secondary={label} />
      </ListItem>
    </>
  )
}

export default TextInputOption
