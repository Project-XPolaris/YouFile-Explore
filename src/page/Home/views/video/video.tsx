import React, { ReactElement } from 'react';
import useHomeModel from '../../model';
import { makeStyles } from '@material-ui/core/styles';
import VideoToolbar from './toolbar';

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#000000'
  },
  image:{
    width:"80vw",
    height:"80vh",
    objectFit:'contain'
  }
}))
const VideoView = ():ReactElement => {
  const homeModel = useHomeModel()
  const classes = useStyles()
  console.log(homeModel.videoViewUrl)
  return (
    <div className={classes.main}>
      <VideoToolbar />
      <iframe src={homeModel.videoViewUrl} className={classes.image}></iframe>
    </div>
  )
}

export default VideoView
