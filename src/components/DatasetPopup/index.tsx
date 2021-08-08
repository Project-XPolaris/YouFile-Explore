import useStyles from './style';
import React from 'react';
import clsx from 'clsx';
import {
  Popover,
  PopoverProps,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import { Add, Create, Delete, History } from '@material-ui/icons';
import { Snapshot } from '../../api/dir';

export interface DatasetPopupPropsType {
  className?:string
  snapshots : Snapshot[]
  onCreateSnapshot:() => void
  onDeleteSnapshot:(snapshot:Snapshot) => void
  onRollback:(snapshot:Snapshot) => void
}

const DatasetPopup = ({ className,snapshots,onCreateSnapshot,onDeleteSnapshot,onRollback,...other }: DatasetPopupPropsType & PopoverProps) => {
  const classes = useStyles();
  return (
    <Popover   { ...other }>
      <div className={clsx(className,classes.root)}>
        <div className={classes.header}>
          Dataset
        </div>
        <div>
          <List>
            {
              snapshots.map(it => {
                return (
                  <ListItem button onClick={() => onRollback(it)}>
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
              <ListItemText primary={"Create snapshot"}  />
            </ListItem>
          </List>
        </div>

      </div>

    </Popover>
  );
};

export default DatasetPopup;
