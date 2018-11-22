import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redux } from 'redux-render'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'

import ProfilePage from 'components/block-producer-profile-page'
import store from 'store'

const { dispatch } = store

const style = theme => ({})

class ProfilePageComponent extends Component {
  componentDidMount () {
    const { account } = this.props
    dispatch.blockProducers.getBP(account)
  }

  render () {
    return (
      <Redux selector={state => ({ blockProducers: state.blockProducers })}>
        {({ blockProducers }) => (
          <ProfilePage currentBP={blockProducers.currentBP} />
        )}
      </Redux>
    )
  }
}

ProfilePageComponent.propTypes = {
  account: PropTypes.string
}

export default withStyles(style)(
  withNamespaces('bpProfilePage')(ProfilePageComponent)
)
