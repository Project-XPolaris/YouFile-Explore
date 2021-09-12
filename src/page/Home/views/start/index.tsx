import React, { ReactElement } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useAppModel from '../../../../models/app'
import FileItemMedium from '../../../../components/FileItemMedium'
import useHomeModel from '../../model'
import { FavouriteManager } from '../../../../favourite'
import useMountModel from '../../../../models/mount'
import useStyles from './style';


const StartView = ():ReactElement => {
  const classes = useStyles()
  const appModel = useAppModel()
  const homeModel = useHomeModel()
  const mountModel = useMountModel()
  const getParted = () => {
    return (appModel.info?.root_paths ?? []).filter(it => it.type === 'Parted')
  }
  const getDirectory = () => {
    return (appModel.info?.root_paths ?? []).filter(it => it.type === 'Directory')
  }
  return (
    <div className={classes.root}>
      {
        FavouriteManager.getInstance().items.length > 0 &&
        <>
          {
            FavouriteManager.getInstance().getItems().length > 0 ??
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

        </>
      }
      {
        getParted().length > 0 &&
          <>
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
          </>
      }
      {
        getDirectory().length > 0 &&
          <>
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
          </>
      }
      {
        mountModel.mountList.length > 0 &&
          <>
            <div className={classes.label}>
              Mounts
            </div>
            <div className={classes.itemContainer}>
              {
                mountModel.mountList.map(item => {
                  return (
                    <FileItemMedium
                      file={{
                        name: item.mountName ?? '',
                        path: item.file,
                        type: 'MountDirectory',
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
          </>
      }
    </div>
  )
}

export default StartView
