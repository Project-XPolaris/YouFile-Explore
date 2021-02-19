import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel from '../../model'
import FileItemMedium from '../../../../components/FileItemMedium'
import useFileModel from '../../../../models/file'
import { FileNode } from '../../tree'
import { Menu, MenuItem } from '@material-ui/core'
import { Delete, Edit, ExitToApp, FileCopy, Tab } from '@material-ui/icons'
import { red } from '@material-ui/core/colors'
import clsx from 'clsx'
import { FlexGrid } from '../../../../components/FlexGrid'
import useFileContextMenu from '../../hooks/fileContentMenu'
import FileContextMenu from './menu'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%', height: '100%'
  },
  mediumItem: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    padding: theme.spacing(2)
  },
  row: {
    display: 'flex'
  },
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  copyIcon: {
    color: theme.palette.primary.main
  },
  deleteIcon: {
    color: red['500']
  }
}))

interface MediumViewPropsType {
  onRename:(file:FileNode) => void
}
export default function MediumView ({ onRename }: MediumViewPropsType):ReactElement {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileContextMenuController = useFileContextMenu()
  return (
    <div className={classes.main}>
      <FileContextMenu controller={fileContextMenuController} onRename={onRename} />
      <FlexGrid dataSource={homeModel.currentContent} rowWidth={120} columnHeight={120} itemRender={(it) => {
        return (
          <FileItemMedium
            file={it}
            key={it.id}
            className={classes.mediumItem}
            onDoubleClick={() => {
              if (it.type === 'Directory') {
                homeModel.tabController.setCurrentTabFolder(it.name, it.path)
                homeModel.setCurrentPath(it.path)
              }
            }}
            onContextClick={(x, y) => {
              fileContextMenuController.openMenu({
                left: x, top: y, name: it.name, type: it.type, path: it.path
              })
            }}
            contextSelected={fileContextMenuController.file?.path === it.path && fileContextMenuController.open }
          />
        )
      }} />
    </div>
  )
}
