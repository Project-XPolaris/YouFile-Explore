import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useHomeModel from '../../model'
import FileItemMedium from '../../../../components/FileItemMedium'
import { FileNode } from '../../tree'
import { red } from '@material-ui/core/colors'
import { FlexGrid } from '../../../../components/FlexGrid'
import { FileContext, FileContextMenuController } from '../../hooks/fileContentMenu'
import { allowOpenImage, allowOpenVideo } from './index'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    height: '100%'
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
  },
  content: {
    padding: theme.spacing(2)
  }
}))

interface MediumViewPropsType {
  onRename: (file: FileNode) => void
  onItemClick: (file: FileNode) => void
  onItemClickAway: () => void
  selectPaths: string[]
  onCopy: (file: FileContext) => void
  onContextClick: (x: number, y: number, file: FileNode) => void
  fileContextMenuController: FileContextMenuController
}

export default function MediumView ({
  onItemClick,
  onItemClickAway,
  selectPaths,
  onContextClick,
  fileContextMenuController
}: MediumViewPropsType): ReactElement {
  const classes = useStyles()
  const homeModel = useHomeModel()
  return (
    <div className={classes.main} onClick={() => onItemClickAway()}>
      <FlexGrid
        dataSource={homeModel.currentContent}
        rowWidth={120}
        columnHeight={120}
        itemRender={(it:FileNode) => {
          return (
            <FileItemMedium
              file={it}
              key={it.path}
              className={classes.mediumItem}
              onDoubleClick={() => {
                if (it.type === 'Directory') {
                  homeModel.tabController.setCurrentTabFolder(it.name, it.path)
                  homeModel.setCurrentPath(it.path)
                  return
                }
                if (allowOpenImage.find(ext => it.name.toLowerCase().endsWith(ext)) !== undefined) {
                  homeModel.tabController.openImageViewTab(it.name, it.path, it.target)
                }
                if (allowOpenVideo.find(ext => it.name.toLowerCase().endsWith(ext)) !== undefined) {
                  homeModel.tabController.openVideoTab(it.name, it.path, it.target)
                }
              }}
              onContextClick={(x, y) => {
                onContextClick(x, y, it)
              }}
              onClick={() => onItemClick(it)}
              contextSelected={
                (fileContextMenuController.file?.path === it.path && fileContextMenuController.open) ||
              selectPaths.find(selected => selected === it.path) !== undefined
              }
            />
          )
        }} />
    </div>
  )
}
