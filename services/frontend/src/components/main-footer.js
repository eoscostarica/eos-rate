import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'

import TelegramIcon from 'components/telegram-icon'
import GithubIcon from 'components/github-icon'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'static',
    bottom: 0,
    top: 'auto'
  },
  grow: {
    flexGrow: 1
  },
  eoscostaricaLogo: {
    height: 36,
    width: 'auto'
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  legend: {
    display: 'flex',
    width: 148,
    lineHeight: 1.33,
    fontSize: 8,
    fontWeight: 500,
    fontStretch: 'normal',
    letterSpacing: 1,
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.6)',
    paddingRight: theme.spacing(2)
  }
}))

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
