import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Account extends Component {
  componentDidMount () {
    this.props.getUserEOSAccount()
  }

  render () {
    const { t, session } = this.props

    return (
      <React.Fragment>
        <h1>{t('accountTitle')}</h1>
        <p>Your EOS Account Info</p>
        <pre>{JSON.stringify(session.account)}</pre>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ session }) => ({
  session
})

const mapDispatchToProps = ({ session: { getUserEOSAccount } }) => ({
  getUserEOSAccount
})

Account.propTypes = {
  t: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  getUserEOSAccount: PropTypes.func.isRequired
}

export default withNamespaces('translations')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
)
