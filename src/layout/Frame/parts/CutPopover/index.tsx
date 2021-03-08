import React from 'react'
import useFileModel from '../../../../models/file'
import { Button } from '@material-ui/core'
import useStyles from './style'
import FileItemListPopover from '../../../../components/FileItemListPopover'

export interface CutPopoverPropsType {
  onMove: () => void
}
const CutPopover = ({ onMove }: CutPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const clearAllHandler = () => {
    fileModel.setMoveFile([])
  }
  const renderActions = () => {
    return (
      <Button color={'primary'} fullWidth className={classes.button} onClick={async () => {
        await fileModel.move()
        onMove()
      }}>
        Move to here
      </Button>
    )
  }
  return (
    <FileItemListPopover
      actions={renderActions()}
      items={fileModel.moveFile}
      onClearAll={clearAllHandler}
    />
  )
}

export default CutPopover
