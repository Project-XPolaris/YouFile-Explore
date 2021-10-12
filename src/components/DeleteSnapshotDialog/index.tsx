import useStyles from './style'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from '@material-ui/core'
import React from 'react'

export interface DeleteSnapshotDialogPropsType {
  onDelete:() => void
}

const DeleteSnapshotDialog = ({ onDelete, ...other }: DeleteSnapshotDialogPropsType & DialogProps) => {
  const classes = useStyles()
  return (
    <Dialog { ...other }>
      <DialogTitle>
        Delete snapshot
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          will remove snapshot
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}>
          Delete
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

export default DeleteSnapshotDialog
