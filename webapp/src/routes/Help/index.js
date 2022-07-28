import React from 'react'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import HttpIcon from '@mui/icons-material/Http'
import TelegramIcon from '@mui/icons-material/Telegram'
import GitHubIcon from '@mui/icons-material/GitHub'

import TitlePage from '../../components/PageTitle'

import styles from './styles'

const useStyles = makeStyles(styles)

const Help = () => {
  const classes = useStyles()
  const { t } = useTranslation('help')

  return (
    <div>
      <TitlePage title={t('tabTitle')} />
      <div className={classes.wrapperContainers}>
        <Grid className={classes.firstContainer}>
          <Typography variant='h5'>{t('title')}</Typography>
          <Typography variant='body2' align='justify' paragraph>
            {t('paragraph')}
          </Typography>

          <div className={classes.boxLinks}>
            <GitHubIcon />
            <Link
              href='https://github.com/eoscostarica'
              target='_blank'
              rel='noreferrer'
            >
              <Typography variant='body1'>{t('githubEOSCR')}</Typography>
            </Link>
          </div>
          <div className={classes.boxLinks}>
            <TelegramIcon />
            <Link
              href='https://web.telegram.org/#/eoscr'
              target='_blank'
              rel='noreferrer'
            >
              <Typography variant='body1'>{t('telegramChannel')}</Typography>
            </Link>
          </div>
          <div className={classes.boxLinks}>
            <HttpIcon />
            <Link
              href='https://eoscostarica.io/'
              target='_blank'
              rel='noreferrer'
            >
              <Typography variant='body1'>{t('websiteEOSCR')}</Typography>
            </Link>
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default Help
