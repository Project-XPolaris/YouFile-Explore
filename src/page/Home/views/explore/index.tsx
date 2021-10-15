import React, { useState } from 'react'
import { LinearProgress, Paper, Typography } from '@material-ui/core'
import HomeSide from './side'
import useHomeModel from '../../model'
import MediumView from './medium'
import { FileNode } from '../../tree'
import ExploreListView from './list'
import { useEventListener, useKeyPress } from 'ahooks'
import useFileSelect from '../../hooks/select'
import useFileContextMenu from '../../hooks/fileContentMenu'
import useFileModel, { ClipboardFile } from '../../../../models/file'
import FileContextMenu from './menu'
import HomeToolbar from './toolbar'
import TextInputDialog from '../../../../components/TextInputDialog'
import useLayoutModel from '../../../../models/layout'
import AddSmbMountDialog from '../../../../components/AddSmbMountDialog'
import useMountModel from '../../../../models/mount'
import useStyles from './style'
import RenameFileDialog from '../../../../components/RenameFileDialog'
import { useKeyHold } from '../../../../hooks/keyhold'
import ExtractArchiveFileDialog from '../../../../components/ExtractArchiveFileDialog'
import { History } from '@material-ui/icons'
import {
  CreateSnapshotDialog,
  DatasetPopup,
  DeleteSnapshotDialog,
  RollbackSnapshotDialog
} from '../../../../components'
import { createDatasetSnapshot, deleteDatasetSnapshot, rollbackDatasetSnapshot, Snapshot } from '../../../../api/dir'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../../../../../electron/channels'
import ExploreDetailListView from './detail'
import ImageViewDrawer from './parts/ImageView/ImageView'

interface ExploreViewPropsType {

}
export const allowOpenImage = ['jpg', 'png', 'jpeg']
export const allowOpenVideo = ['mp4']

const ExploreView = ({ }: ExploreViewPropsType): React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  const [selectMode, setSelectMode] = useState<boolean>(false)
  const [contextFile, setContextFile] = useState<FileNode | undefined>()
  const itemSelectController = useFileSelect({ initValue: [] })
  const fileModel = useFileModel()
  const layoutModel = useLayoutModel()
  const mountModel = useMountModel()
  const fileContextMenuController = useFileContextMenu()
  const [renameDialogOpen, switchRenameDialog] = layoutModel.useDialogController('home/rename')
  const [extractDialogOpen, switchExtractDialog] = layoutModel.useDialogController('home/extract')
  const [createSnapshotDialogOpen, setCreateSnapshotDialogOpen] = useState<boolean>(false)
  const [deleteContextSnapshot, setDeleteContextSnapshot] = useState<Snapshot | undefined>()
  const [rollbackContextSnapshot, setRollbackContextSnapshot] = useState<Snapshot | undefined>()
  const [isShiftHold] = useKeyHold('shift')
  const [datasetPopoverAnchor, setDatasetPopoverAnchor] = useState<any | null>()
  const onRename = (file:FileNode) => {
    setContextFile(file)
    switchRenameDialog()
  }

  const onRenameOk = async (name:string) => {
    switchRenameDialog()
    const file = fileContextMenuController.file
    if (!file) {
      return
    }
    if (itemSelectController.selectPaths.length > 0) {
      for (const selectPath of itemSelectController.selectPaths) {
        const parts = selectPath.split('.')
        let filename = name
        if (parts.length > 1) {
          filename = filename + '.' + parts[parts.length - 1]
        }
        await homeModel.rename(selectPath, filename)
      }
      return
    }
    homeModel.rename(file.path, name)
  }
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
    if (isShiftHold && itemSelectController.selectPaths.length !== 0) {
      const pos1 = homeModel.currentContent.findIndex(it => it.path === itemSelectController.selectPaths[0])
      if (pos1 === -1) {
        return
      }
      const pos2 = homeModel.currentContent.findIndex(it => it.path === file.path)
      if (pos2 === -1) {
        return
      }
      itemSelectController.setSelect(homeModel.currentContent.slice(Math.min(pos1, pos2), Math.max(pos2, pos1) + 1).map(it => it.path))
      return
    }
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
  const addToClipboard = (action:string) => {
    const file = fileContextMenuController.file
    const currentPath = homeModel.currentPath
    if (!file || !currentPath) {
      return
    }
    if (itemSelectController.selectPaths.length > 0) {
      const copyFile: ClipboardFile[] = []
      itemSelectController.selectPaths.forEach(selected => {
        const target = homeModel.currentContent.find(it => it.path === selected)
        if (target) {
          copyFile.push({
            name: target.name,
            path: target.path,
            type: target.type,
            directory: currentPath
          })
        }
      })
      ipcRenderer.send(ChannelNames.setClipboard, { items: copyFile, action })
      return
    }
    ipcRenderer.send(ChannelNames.setClipboard, {
      items: [
        {
          name: file.name,
          path: file.path,
          type: file.type
        }
      ],
      action
    })
  }
  const handlerCopy = () => {
    addToClipboard('Copy')
  }
  const handlerMove = () => {
    addToClipboard('Move')
  }
  const handlerDelete = () => {
    const file = fileContextMenuController.file
    if (!file) {
      return
    }
    if (itemSelectController.selectPaths.length > 0) {
      fileModel.deleteFile(itemSelectController.selectPaths)
      return
    }
    fileModel.deleteFile([file.path])
  }
  const handleSelectAll = () => {
    itemSelectController.setSelect(homeModel.currentContent.map(it => it.path))
  }
  const handleReverseSelect = () => {
    const reverseSelectList: string[] = []
    homeModel.currentContent.forEach(it => {
      const isExist = itemSelectController.selectPaths.find(selected => selected === it.path) !== undefined
      if (!isExist) {
        reverseSelectList.push(it.path)
      }
    })
    itemSelectController.setSelect(reverseSelectList)
  }
  const handleExtract = () => {
    switchExtractDialog()
  }
  const getBottomInfoText = () => {
    if (itemSelectController.selectPaths.length > 1) {
      return `select ${itemSelectController.selectPaths.length} items`
    }
    return homeModel.currentContent.find(it => it.path === itemSelectController.selectPaths[0])?.name ?? ''
  }
  const onOpenItem = (item:FileNode) => {
    if (item.type === 'Directory') {
      homeModel.openDirectory(item.path)
      return
    }
    const ext = item.path.split('.').pop()
    if (ext) {
      if (allowOpenImage.find(it => it === ext)) {
        homeModel.setImageViewUrl(item.path)
        return
      }
    }
  }
  const renderDisplayMode = () => {
    return (
      <>
        <RenameFileDialog
          onClose={switchRenameDialog}
          onOk={onRenameOk}
          open={renameDialogOpen}
          file={contextFile}
        />
        <FileContextMenu
          controller={fileContextMenuController}
          onRename={onRename}
          onCopy={handlerCopy}
          onSelectAll={handleSelectAll}
          onReverseSelect={handleReverseSelect}
          onDelete={handlerDelete}
          onMove={handlerMove}
          onExtract={handleExtract}
          onAsMountPoint={() => layoutModel.switchDialog('home/addMount')}
        />
        {
          homeModel.isContentLoading &&
          <div className={classes.centerContent}>
            <div className={classes.loadingContainer}>
              <Typography variant={'h6'}>
                Loading
              </Typography>
              <div>
                <LinearProgress />
              </div>
            </div>
          </div>
        }
        {
          !homeModel.isContentLoading && homeModel.viewType === 'DetailList' &&
          <ExploreDetailListView
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
                left: x,
                top: y,
                name: file.name,
                type: file.type,
                path: file.path
              })
            }}
            fileContextMenuController={fileContextMenuController}
            onCopy={handlerCopy}
            onOpenItem={onOpenItem}
          />
        }
        {
          !homeModel.isContentLoading && homeModel.viewType === 'List' &&
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
                left: x,
                top: y,
                name: file.name,
                type: file.type,
                path: file.path
              })
            }}
            fileContextMenuController={fileContextMenuController}
            onCopy={handlerCopy}
          />
        }
        {
          !homeModel.isContentLoading && homeModel.viewType === 'Medium' &&
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
                left: x,
                top: y,
                name: file.name,
                type: file.type,
                path: file.path
              })
            }}
            onCopy={handlerCopy}
            fileContextMenuController={fileContextMenuController}
          />
        }
      </>
    )
  }
  const onSwitchCreateDirectoryDialog = () => {
    layoutModel.switchDialog('home/createDirectory')
  }
  const onCreateDirectory = async (value: string) => {
    await fileModel.mkdir(value)
    ipcRenderer.send(ChannelNames.directoryUpdate, homeModel.currentPath)
    onSwitchCreateDirectoryDialog()
  }
  const onMount = async ({
    address,
    username,
    password
  }: { address: string, password: string, username: string }) => {
    if (!fileContextMenuController.file) {
      return
    }
    const options: { [key: string]: string } = {
      iocharset: 'utf8',
      file_mode: '0777',
      dir_mode: '0777'
    }
    if (username.length > 0) {
      options.username = username
      options.password = password
    }
    await mountModel.mount({
      device: address,
      options: options,
      file: fileContextMenuController.file.path,
      dump: '0',
      fsck: '0',
      type: 'cifs'
    })
    layoutModel.switchDialog('home/addMount')
  }
  const onCreateSnapshot = async (name:string) => {
    setCreateSnapshotDialogOpen(false)
    if (!homeModel.currentPath) {
      return
    }
    await createDatasetSnapshot(homeModel.currentPath, name)
    await homeModel.refreshDatasetInfo()
  }
  const onDeleteSnapshot = async () => {
    if (!deleteContextSnapshot) {
      return
    }
    if (!homeModel.currentPath) {
      return
    }
    await deleteDatasetSnapshot(homeModel.currentPath, deleteContextSnapshot.name)
    await homeModel.refreshDatasetInfo()
    setDeleteContextSnapshot(undefined)
  }
  const onRollbackDataset = async () => {
    if (!rollbackContextSnapshot) {
      return
    }
    if (!homeModel.currentPath) {
      return
    }
    await rollbackDatasetSnapshot(homeModel.currentPath, rollbackContextSnapshot.name)
    await homeModel.refresh()
    setRollbackContextSnapshot(undefined)
  }
  return (
    <div className={classes.main}>
      <ImageViewDrawer />
      <DatasetPopup
        open={Boolean(datasetPopoverAnchor)}
        anchorEl={datasetPopoverAnchor}
        onClose={() => setDatasetPopoverAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        className={classes.datasetPopover}
        snapshots={homeModel.datasetInfo?.snapshots ?? []}
        onCreateSnapshot={() => setCreateSnapshotDialogOpen(true)}
        onDeleteSnapshot={(snapshot) => setDeleteContextSnapshot(snapshot)}
        onRollback={snapshot => setRollbackContextSnapshot(snapshot)}
      >

      </DatasetPopup>
      <TextInputDialog
        onClose={onSwitchCreateDirectoryDialog}
        onOk={onCreateDirectory}
        title='Create directory'
        label='Directory name'
        open={layoutModel.dialogs['home/createDirectory']}
        contentClassName={classes.createDirectory}
        maxWidth={'xl'}
      />
      <AddSmbMountDialog
        open={Boolean(layoutModel.dialogs['home/addMount'])}
        onMount={onMount}
        onClose={() => layoutModel.switchDialog('home/addMount')}
      />
      <ExtractArchiveFileDialog
        open={extractDialogOpen}
        onClose={switchExtractDialog}
        onOK={({ password }) => {
          switchExtractDialog()
          if (!fileContextMenuController.file) {
            return
          }
          homeModel.unarchiveInPlace(fileContextMenuController.file.path, { password })
        }}
      />
      <CreateSnapshotDialog
        onOk={onCreateSnapshot}
        open={createSnapshotDialogOpen}
        onClose={() => setCreateSnapshotDialogOpen(false)}
      />
      <DeleteSnapshotDialog
        onDelete={onDeleteSnapshot}
        open={Boolean(deleteContextSnapshot)}
        onClose={() => setDeleteContextSnapshot(undefined)}
      />
      <RollbackSnapshotDialog
        onRollback={onRollbackDataset}
        open={Boolean(rollbackContextSnapshot)}
        onClose={() => setRollbackContextSnapshot(undefined)}
      />
      <HomeToolbar
        onSelectAll={handleSelectAll}
        onReverseSelect={handleReverseSelect}
        onCreateNewDirectory={onSwitchCreateDirectoryDialog}
      />
      <Paper elevation={2}>
        <div className={classes.side}>
          <HomeSide />
        </div>
      </Paper>
      <div className={classes.container}>
        <div className={classes.fileContent}>
          {homeModel.mode === 'display' && renderDisplayMode()}
        </div>
        <div className={classes.bottomInfo}>
          <div className={classes.fileName}>
            {getBottomInfoText()}
          </div>
          <div className={classes.bottomAction}>
            {
              homeModel.datasetInfo &&
                <span onClick={(e) => setDatasetPopoverAnchor(e.currentTarget)}>
                  <History />
                </span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default ExploreView
