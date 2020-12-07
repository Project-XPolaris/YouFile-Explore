import React from 'react'
import { Avatar, Button, Card, CardContent } from '@material-ui/core'
import PopoverImageButton from '../../../../components/PopoverImageButton'
import useStyles from './style'
import { Description } from '@material-ui/icons'
import useFileModel from '../../../../models/file'

export interface CopyPopoverPropsType {
  onPaste: () => void

}
const CopyPopover = ({ onPaste }: CopyPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  return (
    <Card elevation={0}>
      {
        fileModel.copyFile ? <>
          <div>
            <div className={classes.content}>
              <Avatar>
                <Description />
              </Avatar>
              <div className={classes.filename}>
                {fileModel.copyFile.name}
              </div>
            </div>
            <Button color={'primary'} fullWidth className={classes.button} onClick={() => {
              fileModel.pasteFile()
              onPaste()
            }}>
                  Paste
            </Button>
          </div>
        </>
          : <div className={classes.noContent}>
              no file to copy
          </div>
      }
    </Card>
  )
}

export default CopyPopover
