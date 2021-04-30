import React, { ReactElement, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FileItem } from '../../api/dir'

const useStyles = makeStyles(theme => ({
  root: {

  },
  input: {
    width: theme.spacing(40)
  }
}))
const RenameFileDialog = ({
  file, onClose, onOk, open = false
}:{
  file? : any
  onClose: () => void
  onOk:(name:string) => void
  open : boolean
}):ReactElement => {
  const classes = useStyles()
  const [name, setName] = useState<string | undefined>()
  const onDialogOk = () => {
    if (!name) {
      return
    }
    onOk(name)
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Rename
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          defaultValue={file?.name}
          onChange={(e) => setName(e.target.value)}
          className={classes.input}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDialogOk} color="primary" autoFocus>
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RenameFileDialog
