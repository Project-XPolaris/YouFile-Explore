import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
  main: {},
  textInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}))

interface AddMountDialogPropsType {
  open?:boolean,
  onClose:() => void
  onOk:(data:any) => void
}

const AddMountDialog = ({ open = false, onClose, onOk }: AddMountDialogPropsType):React.ReactElement => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const onSubmit = (data:any) => {
    onOk(data)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={classes.main}

    >
      <DialogTitle id="alert-dialog-title">
          As mount point
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div>
            <TextField
              name="device"
              label="device"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="type"
              label="type"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="options"
              label="options"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="dump"
              label="dump"
              inputRef={register}
              size={'small'}
              fullWidth
              defaultValue={0}
              className={classes.textInput}
            />
            <TextField
              name="fsck"
              label="fsck"
              inputRef={register}
              size={'small'}
              fullWidth
              defaultValue={0}
              className={classes.textInput}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type='submit' autoFocus>
            Mount
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default AddMountDialog
