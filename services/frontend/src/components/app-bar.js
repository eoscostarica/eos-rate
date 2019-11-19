import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router'

import InputAutocomplete from 'components/input-autocomplete'
import MobileSearch from 'components/mobile-search'
import SignInDialog from 'components/sign-in-dialog'
import SignInMenu from 'components/sign-in-menu'
import { useWalletDispatch, useWalletState } from 'hooks/wallet'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  linkHover: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10
    }
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
  },
  sessionText: {
    marginLeft: 5
  }
})

const MainTopBar = ({
  classes,
  isSearchOpen,
  handleDrawerToggle,
  handleSearchDialogOpen,
  handleSearchDialogClose
}) => {
  const [state, setState] = useState({
    anchorEl: null,
    selectedProvider: null
  })
  const { connectWallet, disconnectWallet } = useWalletDispatch()
  const walletState = useWalletState()
  const logout = () => {
    disconnectWallet(walletState.wallet)
  }
  const connectToWallet = (provider, providerName) => {
    setState({ anchorEl: null, selectedProvider: providerName })
    connectWallet(provider)
  }
  const { t } = useTranslation('translations')

  return (
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
        {walletState.wallet ? (
          <>
            <Link
              to='/account'
              className={classnames(classes.link, {
                [classes.linkHover]: walletState.wallet.accountInfo
              })}
            >
              <Button color='primary' variant='contained'>
                <AccountCircleIcon />
                <Typography className={classes.sessionText} variant='subtitle1'>
                  {walletState.wallet.accountInfo.account_name}
                </Typography>
              </Button>
            </Link>
            <IconButton color='inherit' onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              color='primary'
              onClick={e => setState({ ...state, anchorEl: e.currentTarget })}
              variant='contained'
            >
              {walletState.connecting ? (
                <CircularProgress color='secondary' size={20} />
              ) : (
                <>
                  <FingerprintIcon />
                  <Typography
                    className={classes.sessionText}
                    variant='subtitle1'
                  >
                    {t('appBarSignIn')}
                  </Typography>
                </>
              )}
            </Button>
            <SignInMenu
              anchorEl={state.anchorEl}
              handleClick={connectToWallet}
              handleClose={() => setState({ ...state, anchorEl: null })}
            />
            <SignInDialog
              connecting={walletState.connecting}
              error={walletState.error}
              provider={state.selectedProvider}
            />
          </>
        )}
      </Toolbar>
      <MobileSearch onClose={handleSearchDialogClose} isOpen={isSearchOpen} />
    </AppBar>
  )
}

MainTopBar.propTypes = {
  classes: PropTypes.object,
  handleDrawerToggle: PropTypes.func,
  handleSearchDialogOpen: PropTypes.func,
  handleSearchDialogClose: PropTypes.func,
  isSearchOpen: PropTypes.bool
}

export default withStyles(styles)(MainTopBar)
