import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../../page/Home'
import FstabPage from '../../page/Fstab'
import AppBar from '../../page/Home/AppBar'

const RouterLayout = () => {
  return (
    <Router>
      <Switch>
        <Route path="/fstab">
          <FstabPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}
export default RouterLayout
