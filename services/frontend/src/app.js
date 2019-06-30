import React from 'react'
import { Router } from '@reach/router'

import Layout from 'components/layout'
import NotFound from 'routes/not-found'
import { WalletProvider } from 'hooks/wallet'
import routes from 'routes'

const App = () => (
  <WalletProvider>
    <Layout>
      <Router>
        {routes.map(({ path, Component }) => (
          <Component key={`path-${path}`} path={path} />
        ))}
        <NotFound default />
      </Router>
    </Layout>
  </WalletProvider>
)

export default App
