import React from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { RicardianContract } from '@eoscostarica/eoscr-components'

import { mainConfig } from '../../config'
import TitlePage from '../../components/PageTitle'
import styles from './styles'

const useStyles = makeStyles(styles)

const TermsOfUse = () => {
  const classes = useStyles()
  const { t } = useTranslation('termsOfUse')

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <TitlePage title={t('tabTitle')} />
        <RicardianContract
          contractName={mainConfig.contract}
          httpEndpoint='https://eos.edenia.cloud'
        />
      </div>
    </div>
  )
}

export default TermsOfUse
