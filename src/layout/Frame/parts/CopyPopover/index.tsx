import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'
import useFileModel from '../../../../models/file'
import FileItemListPopover from '../../../../components/FileItemListPopover'

export interface CopyPopoverPropsType {
  onPaste: () => void
  onClearAll: () => void
}

const CopyPopover = ({ onPaste, onClearAll }: CopyPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const renderActions = () => {
    return (
      <>
        <Button color={'primary'} fullWidth className={classes.button} onClick={onPaste}>
          Paste
        </Button>
      </>
    )
  }
  return (
    <FileItemListPopover
      actions={renderActions()}
      onClearAll={onClearAll}
      items={fileModel.clipboardFile}
    />
  )
}

export default CopyPopover
