import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { Link } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TelegramIcon from '@mui/icons-material/Telegram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'

import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)
const currentYear = new Date().getFullYear()

const Footer = () => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('footer')

  if (history?.location?.pathname === '/')
    return (
      <div className={classes.root}>
        <Toolbar className={classes.boxToolbar}>
          <div className={classes.footerHome}>
            <div className={classes.linksBox}>
              <Link className={classes.linkHome} href='/'>
                {t('home')}
              </Link>
              <Link className={classes.linkHome} href='/block-producers'>
                {t('blockProducers')}
              </Link>
              <Link className={classes.linkHome} href='/proxies'>
                {t('proxies')}
              </Link>
              <Link className={classes.linkHome} href='/about'>
                {t('about')}
              </Link>
              <Link className={classes.linkHome} href='/ricardian-contract'>
                {t('ricardianContract')}
              </Link>
              <Link className={classes.linkHome} href='/help'>
                {t('help')}
              </Link>
              <Link
                href={mainConfig.networkMonitor}
                target='_blank'
                rel='noopener noreferrer'
                className={clsx(classes.linkHome, classes.network)}
              >
                {t('networkMonitor')}
              </Link>
            </div>
            <div className={classes.socialBox}>
              <Typography className={classes.socialText}>
                {t('legend')}
              </Typography>
              <Typography className={classes.socialText}>
                {t('legend2')}
              </Typography>
              <div className={classes.socialIconBox}>
                <IconButton
                  href='https://www.facebook.com/costaricaeos'
                  target='_blank'
                  color='inherit'
                >
                  <FacebookRoundedIcon htmlColor='#fff' />
                </IconButton>
                <IconButton
                  href='https://www.instagram.com/eoscostarica/'
                  target='_blank'
                  color='inherit'
                >
                  <InstagramIcon htmlColor='#fff' />
                </IconButton>
                <IconButton
                  href='https://twitter.com/EOSCostaRica'
                  target='_blank'
                  color='inherit'
                >
                  <TwitterIcon htmlColor='#fff' />
                </IconButton>
                <IconButton
                  href='https://github.com/eoscostarica/eos-rate'
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
              </div>
            </div>
          </div>
          <div className={classes.footerText}>
            <Typography className={classes.centerFooterText}>
              {t('madeBy')}{' '}
              <Link
                target='_blank'
                className={classes.colorLink}
                href='https://eoscostarica.io/'
              >
                {t('eoscostarica')}
              </Link>
            </Typography>
            <Typography className={classes.centerFooterText}>
              {`${t('eosRate')} ${currentYear}`}
            </Typography>
          </div>
        </Toolbar>
      </div>
    )

  return (
    <div className={classes.root}>
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
    </div>
  )
}

export default memo(Footer)
