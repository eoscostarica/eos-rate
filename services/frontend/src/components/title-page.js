import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const TitlePage = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
)

TitlePage.propTypes = {
  title: PropTypes.string
}

TitlePage.defaultProps = {
  title: 'EOS RATE'
}

export default TitlePage
