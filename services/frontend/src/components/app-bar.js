import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import { Link } from '@reach/router'

import InputAutocomplete from 'components/input-autocomplete'
import MobileSearch from 'components/mobile-search'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    width: 210,
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
  search: {
    position: 'relative',
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: 'auto'
    }
  },
  mobileSearch: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
})

const MainTopBar = ({
  classes,
  isSearchOpen,
  handleDrawerToggle,
  handleSearchDialogOpen,
  handleSearchDialogClose
}) => (
  <AppBar position='absolute'>
    <Toolbar>
      <IconButton
        className={classes.menuButton}
        color='inherit'
        aria-label='Menu'
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      <Link to='/' className={classes.link}>
        <img src='/logo.png' alt='EOS Rate' className={classes.title} />
      </Link>
      <div className={classes.grow} />
      <div className={classes.search}>
        <InputAutocomplete />
      </div>
      <div className={classes.grow} />
      <IconButton
        className={classes.mobileSearch}
        color='inherit'
        disabled={isSearchOpen}
        onClick={handleSearchDialogOpen}
      >
        <SearchIcon />
      </IconButton>
      <Link to='/account' className={classes.link}>
        <IconButton color='inherit'>
          <FingerprintIcon />
        </IconButton>
      </Link>
    </Toolbar>
    <MobileSearch onClose={handleSearchDialogClose} isOpen={isSearchOpen} />
  </AppBar>
)

MainTopBar.propTypes = {
  classes: PropTypes.object,
  handleDrawerToggle: PropTypes.func,
  handleSearchDialogOpen: PropTypes.func,
  handleSearchDialogClose: PropTypes.func,
  isSearchOpen: PropTypes.bool
}

export default withStyles(styles)(MainTopBar)
