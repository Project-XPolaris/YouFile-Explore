import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from '@material-ui/core'
import React, { ReactElement } from 'react'

export interface RollbackSnapshotDialogPropsType {
  onRollback:() => void
}

const RollbackSnapshotDialog = ({ onRollback, ...other }: RollbackSnapshotDialogPropsType & DialogProps):ReactElement => {
  return (
    <Dialog { ...other }>
      <DialogTitle>
        Rollback snapshot
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          will rollback snapshot,all data will be deleted
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRollback}>
          Rollback
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

export default RollbackSnapshotDialog
