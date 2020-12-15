import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TreeItem, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import useHomeModel, { File } from './model'
import FolderIcon from '@material-ui/icons/Folder'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import Tree, { Expandable } from 'react-virtualized-tree'
const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    height: '100%'
  },
  tree: {
    width: '100%'
  },
  icon: {
    color: '#8E8E8E',
    fontSize: 20
  },
  item: {

  }
}))

const CustomTreeItem = (props: TreeItemProps & {node : File, onLoadContent:() => void, onExpand:() => void}) => {
  const useStyles = makeStyles(theme => ({
    icon: {
      color: '#8E8E8E',
      fontSize: 20
    }
  }))
  const { onLoadContent, onExpand, node, ...other } = props
  const customClasses = useStyles()
  const renderIcon = () => {
    if (node.type === 'Directory') {
      return (
        <FolderIcon className={customClasses.icon} />
      )
    }
    if (node.type === 'File') {
      return (
        <InsertDriveFileIcon className={customClasses.icon} />
      )
    }
  }
  const CustomContent = React.forwardRef(function CustomContent (
    props: TreeItemContentProps,
    ref
  ) {
    const {
      classes,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon
    } = props

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection
    } = useTreeItem(nodeId)

    const icon = iconProp || expansionIcon || displayIcon

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      preventSelection(event)
    }

    const handleExpansionClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      onExpand()
      handleExpansion(event)
    }

    const handleSelectionClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      onLoadContent()
      handleSelection(event)
    }

    return (
      <div
        className={clsx(classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled
        })}
        onMouseDown={handleMouseDown}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        {renderIcon()}
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    )
  })
  return (
    <TreeItem ContentComponent={CustomContent} {...other} />
  )
}

const HomeSide = ():React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  console.log(homeModel.getExpandNode())
  const renderFileTreeItem = (fileItem:any) => {
    return (
      <CustomTreeItem
        nodeId={fileItem.path}
        label={fileItem.name}
        collapseIcon={<ExpandMoreIcon />}
        expandIcon={<ChevronRightIcon />}
        className={classes.item}
        key={fileItem.path}
        node={fileItem}
        onLoadContent={() => homeModel.loadFile(fileItem)}
        onExpand={() => homeModel.switchExpandNode(fileItem.path)}
      >
        {
          fileItem.children &&
          fileItem.children.filter((it:File) => it.type === 'Directory').map((it:File) => renderFileTreeItem(it))
        }
      </CustomTreeItem>
    )
  }
  return (
    <div className={classes.main}>
       {
        homeModel.fileTree &&
        <TreeView
          className={classes.tree}
          defaultExpanded={['/']}
          selected={homeModel.currentPath}
          expanded={homeModel.getExpandNode()}
        >
          {renderFileTreeItem(homeModel.fileTree)}
        </TreeView>
       }
    </div>
  )
}
export default HomeSide
