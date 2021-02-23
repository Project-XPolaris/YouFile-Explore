import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import HomeSide from './side'
import useHomeModel from '../../model'
import MediumView from './medium'
import { FileNode } from '../../tree'
import ExploreListView from './list'
import { useEventListener } from 'ahooks'
import useFileSelect from '../../hooks/select'
import { FileContext } from '../../hooks/fileContentMenu'
import useFileModel, { CopyFile } from '../../../../models/file'

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
  const handlerCopy = (file: FileContext) => {
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
  const renderDisplayMode = () => {
    return (
      <>
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
            onCopy={handlerCopy}
          />
        }
      </>
    )
  }
  return (
    <div className={classes.main}>
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
