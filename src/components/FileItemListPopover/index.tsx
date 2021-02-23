import React, { ReactElement } from 'react'
import useStyles from '../../layout/Frame/parts/CopyPopover/style'
import useFileModel from '../../models/file'
import FolderIcon from '@material-ui/icons/Folder'
import FileIcon from '../FileIcon'
import { useVirtualList } from 'ahooks'
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
import { ClearAll } from '@material-ui/icons'

export interface FileItemListPopoverItem {
  name: string
  type: string
  path: string
}

export interface FileItemListPopoverPropsType {
  items?: FileItemListPopoverItem[]
  onClearAll?:() => void
  actions?:ReactElement
  emptyHint?:string
}

const FileItemListPopover = ({ items, onClearAll, actions, emptyHint = 'Empty' }: FileItemListPopoverPropsType) : ReactElement => {
  const classes = useStyles()
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
  } = useVirtualList(items ?? [], {
    overscan: 30,
    itemHeight: 56
  })
  const clearAllHandler = () => {
    if (onClearAll) {
      onClearAll()
    }
  }
  return (
    <Card elevation={0}>
      {
        items ? <>
          <div>
            <div className={classes.header}>
              <div className={classes.headerText}>
                  Clipboard
              </div>
              {
                onClearAll &&
                <Tooltip title='clear all'>
                  <IconButton size={'small'} onClick={clearAllHandler}>
                    <ClearAll />
                  </IconButton>
                </Tooltip>
              }
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
            {actions}
          </div>
        </>
          : <div className={classes.noContent}>
            {emptyHint}
          </div>
      }
    </Card>
  )
}

export default FileItemListPopover
