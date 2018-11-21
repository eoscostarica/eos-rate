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
    top: 'auto',
    bottom: 0,
    flexGrow: 1,
    zIndex: 10000
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
  <AppBar position='fixed' className={classes.root}>
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
