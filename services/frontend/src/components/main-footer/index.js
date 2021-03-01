import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'

import TelegramIcon from 'components/telegram-icon'
import GithubIcon from 'components/github-icon'

import styles from './styles'

const useStyles = makeStyles(styles)

const MainFooter = () => {
  const { t } = useTranslation('footer')
  const classes = useStyles()

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <a
          href='https://eoscostarica.io'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src='/eoscostarica-logo.png'
            alt='eoscostarica logo'
            className={classes.eoscostaricaLogo}
          />
        </a>
        <div className={classes.grow} />
        <Typography
          variant='overline'
          className={classes.legend}
          align='justify'
        >
          {t('legend')}
        </Typography>
        <IconButton
          href='https://github.com/eoscostarica'
          target='_blank'
          color='inherit'
        >
          <GithubIcon />
        </IconButton>
        <IconButton href='https://t.me/eoscr' target='_blank' color='inherit'>
          <TelegramIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MainFooter
