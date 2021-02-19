import useHomeModel from '../../model'
import { FlexGrid } from '../../../../components/FlexGrid'
import FileItemMedium from '../../../../components/FileItemMedium'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import useFileContextMenu from '../../hooks/fileContentMenu'
import SearchContextMenu from './menu'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EEEEEE'
  },
  mediumItem: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    padding: theme.spacing(2)
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

export const SearchFileMediumView = () => {
  const homeMode = useHomeModel()
  const classes = useStyles()
  const fileContextMenuController = useFileContextMenu()
  return (
    <div className={classes.main}>
      <SearchContextMenu controller={fileContextMenuController} />
      <FlexGrid dataSource={homeMode.getSearchResult()} rowWidth={120} columnHeight={120} itemRender={(it) => {
        return (
          <FileItemMedium
            file={it}
            key={it.id}
            className={classes.mediumItem}
            onContextClick={(x, y) => {
              fileContextMenuController.openMenu({
                left: x, top: y, name: it.name, type: it.type, path: it.path
              })
            }}
            contextSelected={fileContextMenuController.file?.path === it.path && fileContextMenuController.open }
          />
        )
      }}/>

    </div>
  )
}
