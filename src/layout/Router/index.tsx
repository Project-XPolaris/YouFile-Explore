import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Home } from '@material-ui/icons'
import HomePage from '../../page/Home'

const RouterLayout = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}
export default RouterLayout
