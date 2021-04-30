import React, { ReactElement } from 'react'
import useHomeModel from '../../model'
import { SearchFileMediumView } from './medium'
import { makeStyles } from '@material-ui/core/styles'
import { SearchFileListView } from './list'
const useStyles = makeStyles(() => ({
  main: {
    width: '100%', height: '100%'
  }
}))
const SearchView = ():ReactElement => {
  const homeModel = useHomeModel()
  const classes = useStyles()
  return (
    <div className={classes.main}>
      {
        homeModel.viewType === 'List' && <SearchFileListView />
      }
      {
        homeModel.viewType === 'Medium' && <SearchFileMediumView />
      }
    </div>
  )
}

export default SearchView
