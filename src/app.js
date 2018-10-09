import React from 'react'
import { Redux } from 'redux-render'
import { Router } from '@reach/router'

import Layout from 'components/layout'
import NotFound from 'routes/not-found'
import routes from 'routes'

const App = () => (
  <Redux selector={state => state.session}>
    {(session, dispatch) => {
      return (
        <Layout>
          <Router>
            <NotFound default />
            {routes.map(({ path, Component }) => (
              <Component path={path} />
            ))}
          </Router>
        </Layout>
      )
    }}
  </Redux>
)

export default App
