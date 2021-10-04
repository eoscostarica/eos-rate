import React from 'react'
import Box from '@mui/material/Box'
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
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <TitlePage title={t('tabTitle')} />
        <RicardianContract
          contractName={mainConfig.contract}
          httpEndpoint='https://api.eosio.cr'
        />
      </Box>
    </Box>
  )
}

export default TermsOfUse
