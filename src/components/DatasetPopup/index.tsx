import useStyles from './style'
import React, { ReactElement } from 'react'
import clsx from 'clsx'
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  PopoverProps
} from '@material-ui/core'
import { Add, Delete, History } from '@material-ui/icons'
import { Snapshot } from '../../api/dir'

export interface DatasetPopupPropsType {
  className?:string
  snapshots : Snapshot[]
  onCreateSnapshot:() => void
  onDeleteSnapshot:(snapshot:Snapshot) => void
  onRollback:(snapshot:Snapshot) => void
}

const DatasetPopup = ({ className, snapshots, onCreateSnapshot, onDeleteSnapshot, onRollback, ...other }: DatasetPopupPropsType & PopoverProps):ReactElement => {
  const classes = useStyles()
  return (
    <Popover { ...other }>
      <div className={clsx(className, classes.root)}>
        <div className={classes.header}>
          Dataset
        </div>
        <div>
          <List>
            {
              snapshots.map(it => {
                return (
                  <ListItem button onClick={() => onRollback(it)} key={it.name}>
                    <ListItemAvatar>
                      <History />
                    </ListItemAvatar>
                    <ListItemText primary={it.name}/>
                    <ListItemSecondaryAction onClick={() => onDeleteSnapshot(it)}>
                      <IconButton>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }
            <ListItem button onClick={onCreateSnapshot}>
              <ListItemAvatar>
                <Add />
              </ListItemAvatar>
              <ListItemText primary={'Create snapshot'} />
            </ListItem>
          </List>
        </div>

      </div>

    </Popover>
  )
}

export default DatasetPopup
