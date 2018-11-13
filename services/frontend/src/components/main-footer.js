import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import SendIcon from '@material-ui/icons/Send'

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
      <IconButton color='inherit'>
        <ShareIcon />
      </IconButton>
      <IconButton color='inherit'>
        <SendIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
)

MainFooter.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(MainFooter)
