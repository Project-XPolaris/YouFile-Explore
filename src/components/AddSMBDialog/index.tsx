import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField
} from '@material-ui/core'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
  main: {},
  textInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}))

interface AddSMBDialogPropsType {
  open?:boolean,
  onClose:() => void
  onOk:(data:any) => void
}

const AddSMBDialog = ({ open = false, onClose, onOk }: AddSMBDialogPropsType):React.ReactElement => {
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
          Use as samba folder
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div>
            <TextField
              name="name"
              label="name"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="comment"
              label="comment"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="directory_mask"
              label="directory mask"
              inputRef={register}
              defaultValue="0755"
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="create_mask"
              label="create mask"
              defaultValue="0755"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="valid_users"
              label="valid users"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              name="write_list"
              label="write list"
              inputRef={register}
              size={'small'}
              fullWidth
              className={classes.textInput}
            />
            <FormControlLabel
              inputRef={register}
              control={<Checkbox name="public" defaultChecked/>}
              label="public"
            />
            <FormControlLabel
              inputRef={register}
              control={<Checkbox name="writable" defaultChecked/>}
              label="writable"
            />
            <FormControlLabel
              inputRef={register}
              control={<Checkbox name="browseable" defaultChecked/>}
              label="browseable"
            />
            <FormControlLabel
              inputRef={register}
              control={<Checkbox name="available" defaultChecked/>}
              label="available"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type='submit' autoFocus>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default AddSMBDialog
