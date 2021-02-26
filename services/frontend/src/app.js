import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Router } from '@reach/router'

import Spinner from 'components/spinner'
import Layout from 'components/layout'
import NotFound from 'routes/not-found'
import routes from 'routes'

const App = ({ ual }) => {
  const { isContentLoading } = useSelector((state) => state.isLoading)

  return (
    <>
      <Spinner isLoading={isContentLoading} />
      <Layout ual={ual}>
        <Router>
          {(routes || []).map(({ path, Component }) => (
            <Component key={`path-${path}`} path={path} ual={ual} />
          ))}
          <NotFound default />
        </Router>
      </Layout>
    </>
  )
}

App.propTypes = {
  ual: PropTypes.object
}

export default App
