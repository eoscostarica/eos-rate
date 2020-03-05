import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router } from '@reach/router'

import Spinner from 'components/spinner'
import Layout from 'components/layout'
import NotFound from 'routes/not-found'
import routes from 'routes'

const App = ({ isContentLoading, ual }) => (
  <>
    <Spinner isLoading={isContentLoading} />
    <Layout ual={ual}>
      <Router>
        {routes.map(({ path, Component }) => (
          <Component key={`path-${path}`} path={path} ual={ual} />
        ))}
        <NotFound default />
      </Router>
    </Layout>
  </>
)

App.propTypes = {
  isContentLoading: PropTypes.bool,
  ual: PropTypes.object
}

App.defaultProps = {
  isContentLoading: false
}

const mapStateToProps = state => ({
  isContentLoading: state.isLoading.isContentLoading
})

export default connect(mapStateToProps, null)(App)
