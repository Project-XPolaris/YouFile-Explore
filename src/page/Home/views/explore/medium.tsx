import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel from '../../model'
import FileItemMedium from '../../../../components/FileItemMedium'
import { FileNode } from '../../tree'
import { red } from '@material-ui/core/colors'
import { FlexGrid } from '../../../../components/FlexGrid'
import useFileContextMenu, { FileContext } from '../../hooks/fileContentMenu'
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
  onItemClick:(file:FileNode) => void
  onItemClickAway:(file:FileNode) => void
  selectPaths:string[]
  onCopy:(file:FileContext) => void
}
export default function MediumView ({ onRename, onItemClick, onItemClickAway, selectPaths, onCopy }: MediumViewPropsType):ReactElement {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const fileContextMenuController = useFileContextMenu()
  return (
    <div className={classes.main}>
      <FileContextMenu
        controller={fileContextMenuController}
        onRename={onRename}
        onCopy={onCopy}
      />
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
            onClick={() => onItemClick(it)}
            contextSelected={
              (fileContextMenuController.file?.path === it.path && fileContextMenuController.open) ||
                selectPaths.find(selected => selected === it.path) !== undefined
            }
            onClickAway={() => onItemClickAway(it)}
          />
        )
      }} />
    </div>
  )
}
