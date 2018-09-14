import React from 'react'
import { translate } from 'react-i18next'

const NotFound = ({ t }) => <h1>{t('notFound')}</h1>

export default translate('translations')(NotFound)
