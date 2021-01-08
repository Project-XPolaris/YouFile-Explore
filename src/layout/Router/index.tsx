import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../../page/Home'
import FstabPage from '../../page/Fstab'
import AppBar from '../../page/Home/AppBar'
import SecurityLayout from '../Security'
import LoginPage from '../../page/Login'
import StartPage from '../../page/Start'

const RouterLayout = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/fstab">
          <FstabPage />
        </Route>
        <Route path="/start">
          <StartPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}
export default RouterLayout
