import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../../page/Home'
import FstabPage from '../../page/Fstab'
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
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </Router>
  )
}
export default RouterLayout
