import React, { ReactElement } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import StartPage from '../../page/Start'
import HomePage from '../../page/Home'
import FrameLayout from '../Frame'

const RouterLayout = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path='/home'>
          <FrameLayout>
            <HomePage />
          </FrameLayout>
        </Route>
        <Route path='/'>
          <StartPage />
        </Route>
      </Switch>
    </Router>
  )
}
export default RouterLayout
