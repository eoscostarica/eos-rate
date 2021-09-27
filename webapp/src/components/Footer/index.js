import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
// import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import GitHubIcon from '@mui/icons-material/GitHub'
import TelegramIcon from '@mui/icons-material/Telegram'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()
  const { t } = useTranslation('footer')

  return (
    <Box className={classes.root}>
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
        <Box className={classes.grow} />
        <Typography
          variant='overline'
          className={classes.legend}
          align='justify'
        >
          {t('legend')}
        </Typography>
        <IconButton
          href='https://github.com/eoscostarica/eos-rate'
          target='_blank'
          color='inherit'
        >
          <GitHubIcon htmlColor='#fff' />
        </IconButton>
        <IconButton href='https://t.me/eoscr' target='_blank' color='inherit'>
          <TelegramIcon htmlColor='#fff' />
        </IconButton>
      </Toolbar>
    </Box>
  )
}

export default memo(Footer)
