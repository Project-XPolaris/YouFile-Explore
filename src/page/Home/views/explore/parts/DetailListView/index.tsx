import React, { ReactElement, useState } from 'react'
import useHomeModel from '../../../../model'
import { AutoSizer, Column, Table, TableHeaderRenderer } from 'react-virtualized'
import { FileNode } from '../../../../tree'
import { FileContext, FileContextMenuController } from '../../../../hooks/fileContentMenu'
import { FolderIcon } from '../../../../../../components/FileIcon/FolderIcon'
import FileIcon from '../../../../../../components/FileIcon'
import useStyles from './style'
import { fileSize } from 'humanize-plus'
import Draggable from 'react-draggable'

export interface ExploreDetailListViewPropsType {
  onRename:(file:FileNode) => void
  onItemClick:(file:FileNode) => void
  onOpenItem:(file:FileNode) => void
  onItemClickAway:() => void
  selectPaths:string[]
  onCopy:(file:FileContext) => void
  onContextClick:(x:number, y:number, file:FileNode) => void
  fileContextMenuController: FileContextMenuController
}
export interface DataField {
  key:string,
  title:string
  width:number
}
const ExploreDetailListView = ({
  onItemClickAway,
  onItemClick,
  selectPaths,
  onContextClick,
  fileContextMenuController,
  onOpenItem
}: ExploreDetailListViewPropsType) : ReactElement => {
  const homeModel = useHomeModel()
  const classes = useStyles()
  const [fields, setFields] = useState<DataField[]>([
    {
      key: 'name',
      title: 'Name',
      width: 0.33
    },
    {
      key: 'type',
      title: 'Type',
      width: 0.33
    },
    {
      key: 'size',
      title: 'Size',
      width: 0.33
    }
  ])
  const renderIcon = (file:FileNode) => {
    if (file.type === 'Directory') {
      return <FolderIcon className={classes.icon}/>
    }
    if (file.type === 'File') {
      return <FileIcon fileName={file.name} className={classes.icon}/>
    }
  }
  const handleContextClick = (event: React.MouseEvent<HTMLDivElement>, node:FileNode) => {
    if (onContextClick) {
      onContextClick(
        event.clientX - 2,
        event.clientY - 4,
        node
      )
    }
  }
  const getTypeText = (item:FileNode) => {
    if (item.type === 'Directory') {
      return 'Directory'
    }
    const parts = item.path.split('.')
    if (parts.length === 1) {
      return 'File'
    }
    return `${parts.pop()} File`
  }

  return (
    <div className={classes.main} >
      <AutoSizer >
        {({
          height,
          width
        }) => {
          const resizeRow = ({ dataKey, deltaX }:{ dataKey:string, deltaX:number }) => {
            const fieldIndex = fields.findIndex(it => it.key === dataKey)
            if (fieldIndex === -1) {
              return
            }
            setFields([...fields.map((it, index) => {
              const deltaWithFactor = deltaX / width
              if (index === fieldIndex) {
                return {
                  ...it,
                  width: it.width + deltaWithFactor
                }
              }
              if (index === fieldIndex + 1) {
                return {
                  ...it,
                  width: it.width - deltaWithFactor
                }
              }
              return it
            })])
          }
          const headerRenderer:TableHeaderRenderer = ({
            dataKey,
            label
          }) => {
            return (
              <React.Fragment key={dataKey}>
                <div className={classes.header}>
                  {label}
                </div>
                <Draggable
                  axis="x"
                  defaultClassName={classes.dragHandle}
                  onDrag={(event, { deltaX }) => {
                    resizeRow({
                      dataKey,
                      deltaX
                    })
                  }}
                >
                  <span className={classes.dragHandleIcon}>|</span>
                </Draggable>
              </React.Fragment>
            )
          }
          return (
            <Table
              width={width}
              height={height}
              headerHeight={32}
              rowHeight={32}
              rowClassName={classes.row}
              onRowClick={(info) => {
                const node = homeModel.currentContent[info.index]
                onItemClick(node)
              }}
              rowStyle={(info) => {
                const node = homeModel.currentContent[info.index]
                if (!node) {
                  return { }
                }
                if (selectPaths.find(it => it === node.path)) {
                  return {
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }
                }
                return { }
              }}
              onRowDoubleClick={(info) => {
                const node = homeModel.currentContent[info.index]
                onOpenItem(node)
              }}
              rowCount={homeModel.currentContent.length}
              rowGetter={({ index }) => homeModel.currentContent[index]}>
              <Column
                label="Name"
                dataKey="name"
                width={width * fields[0].width}
                headerRenderer={headerRenderer}
                headerClassName={classes.header}
                cellRenderer={({ rowIndex }) => {
                  const node = homeModel.currentContent[rowIndex]
                  return (
                    <div
                      className={classes.nameField}
                      onContextMenu={(e) => handleContextClick(e, node)}
                    >
                      {
                        renderIcon(node)
                      }
                      {
                        <div className={classes.value}>
                          {
                            node.name
                          }
                        </div>
                      }
                    </div>
                  )
                }}
              />
              <Column
                width={width * fields[1].width}
                label="Type"
                dataKey="type"
                headerRenderer={headerRenderer}
                headerClassName={classes.header}
                cellRenderer={({ rowIndex }) => {
                  const node = homeModel.currentContent[rowIndex]
                  return (
                    <div
                      className={classes.nameField}
                      onContextMenu={(e) => handleContextClick(e, node)}
                    >
                      {
                        <div className={classes.value}>
                          {
                            getTypeText(node)
                          }
                        </div>
                      }
                    </div>
                  )
                }}
              />
              <Column
                width={width * fields[2].width}
                label="Size"
                dataKey="size"
                headerClassName={classes.header}
                cellRenderer={({ rowIndex }) => {
                  const node = homeModel.currentContent[rowIndex]
                  return (
                    <div
                      className={classes.nameField}
                      onContextMenu={(e) => handleContextClick(e, node)}
                    >
                      {
                        <div className={classes.value}>
                          {
                            fileSize((node.size))
                          }
                        </div>
                      }
                    </div>
                  )
                }}
              />
            </Table>
          )
        }}
      </AutoSizer>
    </div>
  )
}

export default ExploreDetailListView
