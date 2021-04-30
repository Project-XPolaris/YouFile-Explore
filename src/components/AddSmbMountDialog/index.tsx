import React, { ReactElement } from 'react'
import useStyles from './style'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

export interface AddSmbMountPropsType {
  open?: boolean
  onMount:(data:{username:string, address:string, password:string}) => void
  onClose:() => void
}

const AddSmbMountDialog = ({ onMount, onClose, open = false }: AddSmbMountPropsType):ReactElement => {
  const classes = useStyles()
  const { control, handleSubmit } = useForm()

  const onSubmit = (data:{username:string, address:string, password:string}) => {
    onMount(data)
  }
  return (
    <Dialog open={open} maxWidth='xl' onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Mount smb directory</DialogTitle>
        <DialogContent>
          <div className={classes.content}>

            <Controller
              name='address'
              control={control}
              defaultValue=''
              render={({ onChange, value }) =>
                <TextField
                  fullWidth
                  label={'address'}
                  size={'small'}
                  className={classes.input}
                  onChange={onChange}
                  value={value}
                />}
            />

            <Controller
              name='username'
              control={control}
              defaultValue=''
              render={({ onChange, value }) =>
                <TextField
                  fullWidth
                  label={'username'}
                  size={'small'}
                  className={classes.input}
                  onChange={onChange}
                  value={value} />
              }
            />

            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({ onChange, value }) =>
                <TextField
                  fullWidth
                  type="password"
                  label={'password'}
                  size={'small'}
                  className={classes.input}
                  onChange={onChange}
                  value={value} />
              }
            />

          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus>
            Cancel
          </Button>
          <Button type='submit' autoFocus>
            Mount
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddSmbMountDialog
