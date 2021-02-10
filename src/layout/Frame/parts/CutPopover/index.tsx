import React from 'react'
import useFileModel from '../../../../models/file'
import { Avatar, Button, Card } from '@material-ui/core'
import { Description } from '@material-ui/icons'
import useStyles from './style'

export interface CutPopoverPropsType {
  onMove: () => void
}
const CutPopover = ({ onMove }: CutPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  return (
    <Card elevation={0}>
      {
        fileModel.moveFile ? <>
          <div>
            <div className={classes.content}>
              <Avatar>
                <Description />
              </Avatar>
              <div className={classes.filename}>
                {fileModel.moveFile?.name}
              </div>
            </div>
            <Button color={'primary'} fullWidth className={classes.button} onClick={async () => {
              await fileModel.move()
              onMove()
            }}>
                Move to here
            </Button>
          </div>
        </>
          : <div className={classes.noContent}>
            no file to move
          </div>
      }
    </Card>
  )
}

export default CutPopover
