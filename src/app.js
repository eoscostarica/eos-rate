import React from 'react'
import { Redux } from 'redux-render'
import { Router } from '@reach/router'

import Layout from './components/layout'
import AllBps from './routes/block-producers'
import NotFound from './routes/not-found'
// import Rate from './routes/rate'
import Settings from './routes/settings'
import Account from './routes/account'
import Home from './routes/home'

const App = () => (
  <Redux selector={state => state.session}>
    {(session, dispatch) => {
      return (
        <Layout>
          <Router>
            <NotFound default />
            <Home path='/' />
            <AllBps path='/block-producers' />
            <Settings path='/settings' />
            <Account path='/account' />
          </Router>
        </Layout>
      )
    }}
  </Redux>
)

export default App
