import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import { mainConfig } from '../../config'

const PageTitle = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
)

PageTitle.propTypes = {
  title: PropTypes.string
}

PageTitle.defaultProps = {
  title: mainConfig.title
}

export default PageTitle
