import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'
import useFileModel from '../../../../models/file'
import FileItemListPopover from '../../../../components/FileItemListPopover'

export interface CopyPopoverPropsType {
  onPaste: () => void
}

const CopyPopover = ({ onPaste }: CopyPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const clearAllHandler = () => {
    fileModel.setCopyFile([])
  }
  const renderActions = () => {
    return (
      <>
        <Button color={'primary'} fullWidth className={classes.button} onClick={() => {
          fileModel.pasteFile()
          onPaste()
        }}>
          Paste
        </Button>
      </>
    )
  }
  return (
    <FileItemListPopover
      actions={renderActions()}
      onClearAll={clearAllHandler}
      items={fileModel.copyFile}
    />
  )
}

export default CopyPopover
