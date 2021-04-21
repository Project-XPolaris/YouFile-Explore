import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useAppModel from '../../../../models/app'
import FileItemMedium from '../../../../components/FileItemMedium'
import useHomeModel from '../../model'
import { FavouriteManager } from '../../../../favourite'
import useMountModel from '../../../../models/mount';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      width: '100%'
    },
    itemContainer: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    item: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      justifyContent: 'center'
    },
    label: {
      ...theme.typography.h6,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      fontWeight: 300
    }
  })
)

export interface StartViewPropsType {

}

const StartView = ({}: StartViewPropsType) => {
  const classes = useStyles()
  const appModel = useAppModel()
  const homeModel = useHomeModel()
  const mountModel = useMountModel()
  return (
    <div className={classes.root}>
      {
        FavouriteManager.getInstance().items.length > 0 &&
        <>
          <div className={classes.label}>
            Favourite
          </div>
          <div className={classes.itemContainer}>
            {
              FavouriteManager.getInstance().getItems().map(item => {
                return (
                  <FileItemMedium
                    file={{
                      name: item.name,
                      path: item.path,
                      type: item.type,
                      parent: undefined,
                      children: undefined
                    }}
                    key={item.path}
                    className={classes.item}
                    onDoubleClick={() => {
                      homeModel.tabController.startPageToExplore(item.path)
                    }}
                  />
                )
              })
            }
          </div>
        </>
      }
      <div className={classes.label}>
        Disks
      </div>
      <div className={classes.itemContainer}>
        {
          appModel.info?.root_paths.filter(it => it.type === 'Parted').map(item => {
            return (
              <FileItemMedium
                file={{
                  name: item.name,
                  path: item.path,
                  type: item.type,
                  parent: undefined,
                  children: undefined
                }}
                key={item.path}
                className={classes.item}
                onDoubleClick={() => {
                  homeModel.tabController.startPageToExplore(item.path)
                }}
              />
            )
          })
        }
      </div>
      <div className={classes.label}>
        Directory
      </div>
      <div className={classes.itemContainer}>
        {
          appModel.info?.root_paths.filter(it => it.type === 'Directory').map(item => {
            return (
              <FileItemMedium
                file={{
                  name: item.name,
                  path: item.path,
                  type: item.type,
                  parent: undefined,
                  children: undefined
                }}
                key={item.path}
                className={classes.item}
                onDoubleClick={() => {
                  homeModel.tabController.startPageToExplore(item.path)
                }}
              />
            )
          })
        }

      </div>
      <div className={classes.label}>
        Mounts
      </div>
      <div className={classes.itemContainer}>
        {
          mountModel.mountList.map(item => {
            return (
              <FileItemMedium
                file={{
                  name: item.mountName ?? "",
                  path: item.file,
                  type: "MountDirectory",
                  parent: undefined,
                  children: undefined
                }}
                key={item.file}
                className={classes.item}
                onDoubleClick={() => {
                  homeModel.tabController.startPageToExplore(item.file)
                }}
              />
            )
          })
        }

      </div>
    </div>
  )
}

export default StartView
