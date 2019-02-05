import React from 'react'
import { Router } from '@reach/router'

import Layout from 'components/layout'
import NotFound from 'routes/not-found'
import routes from 'routes'

const App = () => (
  <Layout>
    <Router>
      {routes.map(({ path, Component }) => (
        <Component key={`path-${path}`} path={path} />
      ))}
      <NotFound default />
    </Router>
  </Layout>
)

export default App
