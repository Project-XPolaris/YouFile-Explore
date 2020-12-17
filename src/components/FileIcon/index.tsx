import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  main: {},
})

interface FileIconPropsType {
  fileName:string
}

export default function FileIcon ({}: FileIconPropsType) {
  const classes = useStyles()

  return (
    <div className={classes.main}>

    </div>
  )
}
