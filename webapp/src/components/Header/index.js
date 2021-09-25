import React, { memo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import ExitIcon from '@mui/icons-material/ExitToApp'

import { useSharedState } from '../../context/state.context'
import MobileSearch from '../../components/MobileSearch'

import InputAutocomplete from '../InputAutocomplete'
import LanguageSelector from '../LanguageSelector'

import styles from './styles'

const useStyles = makeStyles(styles)

const AuthButton = memo(({ user, onLogin, onSignOut }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <>
      {user && (
        <Button
          className={classes.onSignOut}
          startIcon={<ExitIcon />}
          onClick={onSignOut}
        >
          <Typography className={classes.textBtn}>{t('signOut')}</Typography>
        </Button>
      )}
      {!user && (
        <IconButton
          aria-label='Open drawer'
          className={classes.onLogin}
          onClick={onLogin}
        >
          <FingerprintIcon className={classes.iconLanguage} />
          <Typography className={classes.textBtn}>
            {t('appBarSignIn')}
          </Typography>
        </IconButton>
      )}
    </>
  )
})

AuthButton.displayName = 'AuthButton'

AuthButton.propTypes = {
  user: PropTypes.any,
  onLogin: PropTypes.func,
  onSignOut: PropTypes.func
}

const Header = memo(({ onDrawerToggle }) => {
  const classes = useStyles()
  const history = useHistory()
  const [state, { login, logout }] = useSharedState()
  const [isSearchOpen, setIsSearchOpen] = useState()

  const stage = 'false' // TODO: add to context

  const handleLogin = () => {
    login()
  }

  const handleSignOut = () => {
    logout()
    history.push('/')
  }

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
  }

  return (
    <AppBar className={classes.appBar} position='sticky'>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.boxLogo}>
          <IconButton aria-label='Open drawer' onClick={onDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Link to='/block-producers' className={classes.link}>
            <img
              src={stage === 'true' ? '/logo-mainnet.svg' : '/logo-testnet.svg'}
              alt='EOS Rate'
              className={classes.logoStyle}
            />
          </Link>
        </Box>
        <Box className={classes.boxSearch}>
          <InputAutocomplete />
        </Box>
        <Box className={classes.desktopSection}>
          <LanguageSelector />
          <AuthButton
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </Box>
        <Box className={classes.mobileSection}>
          <IconButton
            className={classes.mobileSearch}
            disabled={isSearchOpen}
            onClick={handleOpenSearch}
          >
            <SearchIcon />
          </IconButton>
          <LanguageSelector />
          <AuthButton
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </Box>
      </Toolbar>
      <MobileSearch onClose={handleCloseSearch} isOpen={isSearchOpen} />
    </AppBar>
  )
})

Header.displayName = 'Header'

Header.propTypes = {
  onDrawerToggle: PropTypes.func
}

export default Header
