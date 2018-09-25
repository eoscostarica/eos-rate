import React from 'react'
import { Redux } from 'redux-render'
import { Router } from '@reach/router'

import Layout from './components/layout'
import AllBps from './routes/all-bps/AllBps'
import NotFound from './routes/not-found'
// import Rate from './routes/rate'
import Settings from './routes/settings'

const App = () => (
  <Redux selector={state => state.session}>
    {(session, dispatch) => {
      return (
        <Layout>
          <Router>
            <NotFound default />
            <AllBps path='/' />
            <Settings path='/settings' />
          </Router>
        </Layout>
      )
    }}
  </Redux>
)

export default App
