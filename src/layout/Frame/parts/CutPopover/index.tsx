import React from 'react'
import useFileModel from '../../../../models/file'
import { Button } from '@material-ui/core'
import useStyles from './style'
import FileItemListPopover from '../../../../components/FileItemListPopover'

export interface CutPopoverPropsType {
  onMove: () => void
  onClearAll: () => void
}
const CutPopover = ({ onMove, onClearAll }: CutPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const renderActions = () => {
    return (
      <Button color={'primary'} fullWidth className={classes.button} onClick={async () => {
        onMove()
      }}>
        Move to here
      </Button>
    )
  }
  return (
    <FileItemListPopover
      actions={renderActions()}
      items={fileModel.clipboardFile}
      onClearAll={onClearAll}
    />
  )
}

export default CutPopover
