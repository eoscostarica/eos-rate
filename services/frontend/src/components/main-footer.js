import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

import TelegramIcon from 'components/telegram-icon'
import GithubIcon from 'components/github-icon'

const styles = theme => ({
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
  }
})

const MainFooter = ({ classes, ...props }) => (
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

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-151600466-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-151600466-1');
      </script>
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

MainFooter.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(MainFooter)
