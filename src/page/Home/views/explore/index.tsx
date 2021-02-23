import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import HomeSide from './side'
import useHomeModel from '../../model'
import MediumView from './medium'
import { FileNode } from '../../tree'
import ExploreListView from './list'
import { useEventListener, useKeyPress } from 'ahooks'
import useFileSelect from '../../hooks/select'
import useFileContextMenu from '../../hooks/fileContentMenu'
import useFileModel, { CopyFile } from '../../../../models/file'
import FileContextMenu from './menu'
import HomeToolbar from './toolbar'

const useStyles = makeStyles({
  main: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    display: 'flex'
  },
  fileContent: {
    width: '100%',
    flex: '1 1'
  },
  container: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  side: {
    backgroundColor: 'white',
    height: '100%',
    width: 240,
    overflowY: 'auto'
  }
})

interface ExploreViewPropsType {
  onRename: (file: FileNode) => void
}

const ExploreView = ({ onRename }: ExploreViewPropsType): React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const [selectMode, setSelectMode] = useState<boolean>(false)
  const itemSelectController = useFileSelect({ initValue: [] })
  const fileModel = useFileModel()
  const fileContextMenuController = useFileContextMenu()
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      if (!selectMode) {
      }
      setSelectMode(true)
    }
  })
  useEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      if (selectMode) {
        setSelectMode(false)
      }
    }
  })
  useKeyPress('ctrl.a', () => {
    if (itemSelectController.selectPaths.length !== homeModel.currentContent.length) {
      handleSelectAll()
    }
  }, {
    events: ['keydown']
  })
  const handleItemClick = (file: FileNode) => {
    if (selectMode) {
      itemSelectController.switchSelect(file.path)
    } else {
      itemSelectController.setSelect([file.path])
    }
  }
  const handleListClick = (file: FileNode) => {
    if (selectMode) {
      itemSelectController.switchSelect(file.path)
    } else {
      if (file.type === 'Directory') {
        homeModel.setCurrentPath(file.path)
      }
    }
  }
  const handlerCopy = () => {
    const file = fileContextMenuController.file
    if (!file) {
      return
    }
    if (itemSelectController.selectPaths.length > 0) {
      const copyFile: CopyFile[] = []
      itemSelectController.selectPaths.forEach(selected => {
        const target = homeModel.currentContent.find(it => it.path === selected)
        if (target) {
          copyFile.push({
            name: target.name,
            path: target.path,
            type: target.type
          })
        }
        fileModel.setCopyFile(copyFile)
      })
      return
    }
    fileModel.setCopyFile([
      {
        name: file.name,
        path: file.path,
        type: file.type
      }
    ])
  }
  const handleSelectAll = () => {
    itemSelectController.setSelect(homeModel.currentContent.map(it => it.path))
  }
  const handleReverseSelect = () => {
    const reverseSelectList : string[] = []
    homeModel.currentContent.forEach(it => {
      const isExist = itemSelectController.selectPaths.find(selected => selected === it.path) !== undefined
      if (!isExist) {
        reverseSelectList.push(it.path)
      }
    })
    itemSelectController.setSelect(reverseSelectList)
  }
  const renderDisplayMode = () => {
    return (
      <>
        <FileContextMenu
          controller={fileContextMenuController}
          onRename={onRename}
          onCopy={handlerCopy}
          onSelectAll={handleSelectAll}
          onReverseSelect={handleReverseSelect}
        />
        {
          homeModel.viewType === 'List' &&
          <ExploreListView
            onRename={onRename}
            onItemClick={handleListClick}
            selectPaths={itemSelectController.selectPaths}
            onItemClickAway={() => {
              if (!selectMode && itemSelectController.selectPaths.length !== 0) {
                itemSelectController.setSelect([])
              }
            }}
            onContextClick={(x, y, file) => {
              fileContextMenuController.openMenu({
                left: x, top: y, name: file.name, type: file.type, path: file.path
              })
            }}
            fileContextMenuController={fileContextMenuController}
            onCopy={handlerCopy}
          />
        }
        {
          homeModel.viewType === 'Medium' &&
          <MediumView
            onRename={onRename}
            onItemClick={handleItemClick}
            selectPaths={itemSelectController.selectPaths}
            onItemClickAway={() => {
              if (!selectMode && itemSelectController.selectPaths.length !== 0) {
                itemSelectController.setSelect([])
              }
            }}
            onContextClick={(x, y, file) => {
              fileContextMenuController.openMenu({
                left: x, top: y, name: file.name, type: file.type, path: file.path
              })
            }}
            onCopy={handlerCopy}
            fileContextMenuController={fileContextMenuController}
          />
        }
      </>
    )
  }
  return (
    <div className={classes.main}>
      <HomeToolbar onSelectAll={handleSelectAll} onReverseSelect={handleReverseSelect} />
      <Paper elevation={2}>
        <div className={classes.side}>
          <HomeSide />
        </div>
      </Paper>
      <div className={classes.container}>
        <div className={classes.fileContent}>
          {homeModel.mode === 'display' && renderDisplayMode()}
        </div>
      </div>
    </div>
  )
}
export default ExploreView
