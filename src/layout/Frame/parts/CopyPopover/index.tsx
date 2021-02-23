import React from 'react'
import {
  Avatar,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip
} from '@material-ui/core'
import useStyles from './style'
import useFileModel from '../../../../models/file'
import FolderIcon from '@material-ui/icons/Folder'
import FileIcon from '../../../../components/FileIcon'
import { useVirtualList } from 'ahooks'
import { ClearAll } from '@material-ui/icons'

export interface CopyPopoverPropsType {
  onPaste: () => void

}

const CopyPopover = ({ onPaste }: CopyPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const fileModel = useFileModel()
  const renderIcon = (name: string, type: string) => {
    if (type === 'Directory') {
      return <FolderIcon />
    }
    if (type === 'File') {
      return <FileIcon fileName={name} />
    }
  }
  const {
    list,
    containerProps,
    wrapperProps
  } = useVirtualList(fileModel.copyFile ?? [], {
    overscan: 30,
    itemHeight: 56
  })
  const clearAllHandler = () => {
    fileModel.setCopyFile([])
  }
  return (
    <Card elevation={0}>
      {
        fileModel.copyFile ? <>
          <div>
            <div className={classes.header}>
              <div className={classes.headerText}>
                  Clipboard
              </div>
              <Tooltip title='clear all'>
                <IconButton size={'small'} onClick={clearAllHandler}>
                  <ClearAll />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.container} {...containerProps}>
              <List className={classes.content} {...wrapperProps}>
                {
                  list.map(it => {
                    return (
                      <ListItem key={it.data.path}>
                        <ListItemAvatar>
                          <Avatar>
                            {renderIcon(it.data.name, it.data.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={it.data.name}
                          primaryTypographyProps={{ className: classes.primaryText }}
                        />
                      </ListItem>
                    )
                  })
                }
              </List>
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
