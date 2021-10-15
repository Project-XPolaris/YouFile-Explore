import useStyles from './style'
import React from 'react'
import { Drawer } from '@material-ui/core'
import useHomeModel from '../../../../model'
import clsx from 'clsx'

export interface ImageViewDrawerPropsType {
  className?: string
}

const ImageViewDrawer = ({ className }: ImageViewDrawerPropsType): React.ReactElement => {
  const classes = useStyles()
  const homeModel = useHomeModel()
  return (
    <Drawer
      anchor={'right'}
      open={Boolean(homeModel.imageViewUrl)}
      onClose={() => homeModel.setImageViewUrl(undefined)}
    >
      <div className={clsx(classes.root, className)}>
        <img src={homeModel.imageViewUrl} className={classes.image} />
      </div>
    </Drawer>
  )
}

export default ImageViewDrawer
