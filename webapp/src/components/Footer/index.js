import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { useHistory, Link } from 'react-router-dom'
import clsx from 'clsx'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TelegramIcon from '@mui/icons-material/Telegram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/material/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('footer')

  if (history?.location?.pathname === '/')
    return (
      <Box className={classes.root}>
        <Toolbar className={classes.boxToolbar}>
          <Box className={classes.footerHome}>
            <Box className={classes.linksBox}>
              <Link className={classes.linkHome} to='/block-producers'>
                {t('home')}
              </Link>
              <Link className={classes.linkHome} to='/block-producers'>
                {t('blockProducers')}
              </Link>
              <Link className={classes.linkHome} to='/block-producers'>
                {t('proxies')}
              </Link>
              <Link className={classes.linkHome} to='/block-producers'>
                {t('about')}
              </Link>
              <Link className={classes.linkHome} to='/block-producers'>
                {t('ricardianContract')}
              </Link>
              <Link className={classes.linkHome} to='/block-producers'>
                {t('help')}
              </Link>
              <a
                href='https://eoscostarica.io'
                target='_blank'
                rel='noopener noreferrer'
                className={clsx(classes.linkHome, classes.network)}
              >
                {t('networkMonitor')}
              </a>
            </Box>
            <Box className={classes.socialBox}>
              <Typography className={classes.socialText}>
                {t('legend')}
              </Typography>
              <Typography className={classes.socialText}>
                {t('legend2')}
              </Typography>
              <Box className={classes.socialIconBox}>
                <IconButton
                  href='https://t.me/eoscr'
                  target='_blank'
                  color='inherit'
                >
                  <FacebookRoundedIcon htmlColor='#fff' />
                </IconButton>
                <IconButton
                  href='https://t.me/eoscr'
                  target='_blank'
                  color='inherit'
                >
                  <InstagramIcon htmlColor='#fff' />
                </IconButton>
                <IconButton
                  href='https://t.me/eoscr'
                  target='_blank'
                  color='inherit'
                >
                  <TwitterIcon htmlColor='#fff' />
                </IconButton>
                <IconButton
                  href='https://t.me/eoscr'
                  target='_blank'
                  color='inherit'
                >
                  <GitHubIcon htmlColor='#fff' />
                </IconButton>
                <IconButton
                  href='https://t.me/eoscr'
                  target='_blank'
                  color='inherit'
                >
                  <TelegramIcon htmlColor='#fff' />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box className={classes.footerText}>
            <Typography className={classes.centerFooterText}>
              {t('madeBy')}
            </Typography>
            <Typography className={classes.centerFooterText}>
              {t('eosRate')}
            </Typography>
          </Box>
        </Toolbar>
      </Box>
    )

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
          {`${t('legend')} ${t('legend2')}`}
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
