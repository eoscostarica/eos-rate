import React from 'react'
import { translate } from 'react-i18next'

const Account = ({ t }) => <h1>{t('accountTitle')}</h1>

export default translate('translations')(Account)
