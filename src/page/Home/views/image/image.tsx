import React, { ReactElement } from 'react'
import useHomeModel from '../../model'
import { makeStyles } from '@material-ui/core/styles'
import ImageToolbar from './toolbar'
const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  image: {
    width: '80vw',
    height: '80vh',
    objectFit: 'contain'
  }
}))
const ImageView = ():ReactElement => {
  const homeModel = useHomeModel()
  const classes = useStyles()
  return (
    <div className={classes.main}>
      <ImageToolbar />
      <img src={homeModel.imageViewUrl} className={classes.image} />
    </div>
  )
}

export default ImageView
