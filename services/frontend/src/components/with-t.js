import React from 'react'
import { useTranslation } from 'react-i18next'

// @TODO: remove this HOC implementation after migrate to use functional components only.
const withT = Component => {
  return props => {
    const { t } = useTranslation('translations')

    return <Component t={t} {...props} />
  }
}

export default withT
