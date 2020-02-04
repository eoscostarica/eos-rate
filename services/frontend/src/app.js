import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router } from '@reach/router'

import Spinner from 'components/spinner'
import Layout from 'components/layout'
import NotFound from 'routes/not-found'
import { WalletProvider } from 'hooks/wallet'
import routes from 'routes'

const App = ({ isContentLoading }) => (
  <WalletProvider>
    <>
      <Spinner isLoading={isContentLoading} />
      <Layout>
        <Router>
          {routes.map(({ path, Component }) => (
            <Component key={`path-${path}`} path={path} />
          ))}
          <NotFound default />
        </Router>
      </Layout>
    </>
  </WalletProvider>
)

App.propTypes = {
  isContentLoading: PropTypes.bool
}

App.defaultProps = {
  isContentLoading: false
}

const mapStateToProps = state => ({
  isContentLoading: state.isLoading.isContentLoading
})

export default connect(mapStateToProps, null)(App)
