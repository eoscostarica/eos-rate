import React from 'react'
import { translate } from 'react-i18next'

const Home = ({ t }) => <h1>{t('homeTitle')}</h1>

export default translate('translations')(Home)
