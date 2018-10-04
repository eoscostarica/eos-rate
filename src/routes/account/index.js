import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

const Account = ({ t }) => <h1>{t('accountTitle')}</h1>

Account.propTypes = {
  t: PropTypes.object.isRequired
}

export default translate('translations')(Account)
