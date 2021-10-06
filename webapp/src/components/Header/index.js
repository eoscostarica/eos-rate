import React, { memo, useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import ExitIcon from '@mui/icons-material/ExitToApp'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { useSharedState } from '../../context/state.context'
import MobileSearch from '../../components/MobileSearch'

import InputAutocomplete from '../InputAutocomplete'
import LanguageSelector from '../LanguageSelector'
import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const AuthButton = memo(({ user, onLogin, onSignOut }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <>
      {user && (
        <IconButton
          aria-label='sign out'
          className={classes.onSignOut}
          onClick={onSignOut}
        >
          <ExitIcon className={classes.iconLanguage} />
          <Typography className={classes.textBtn}>{t('signOut')}</Typography>
        </IconButton>
      )}
      {!user && (
        <IconButton
          aria-label='sign in'
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

const UserInformationByType = memo(({ user }) => {
  const { t } = useTranslation('translations')
  const [mayVote, setMayVote] = useState(false)

  const StyleTooltip = makeStyles(theme => ({
    arrow: {
      color: 'rgba(97, 97, 97, 0.9)',
      marginLeft: 30
    },
    tooltip: {
      boxShadow: theme.shadows[1],
      width: 140,
      fontSize: 14,
      textAlign: 'center'
    }
  }))

  function SpecialTooltip(props) {
    const classes = StyleTooltip()

    return <Tooltip arrow classes={classes} {...props} />
  }

  useEffect(() => {
    if (!user) setMayVote(false)
    else if (
      user.userData.voter_info &&
      (user.userData.voter_info.producers.length > 20 ||
        user.userData.voter_info.proxy.length > 0)
    )
      setMayVote(true)
  }, [user])

  return (
    <>
      {user && (
        <>
          {!user.userData.edenMember && (
            <>
              {mayVote && (
                <SpecialTooltip title={t('unlockedRating')}>
                  <LockOpenOutlinedIcon />
                </SpecialTooltip>
              )}
              {!mayVote && (
                <SpecialTooltip title={t('lockedRating')}>
                  <LockOutlinedIcon />
                </SpecialTooltip>
              )}
            </>
          )}
          {user.userData.edenMember && (
            <SpecialTooltip title={t('edenMemberMessage')}>
              <img
                src='/edenos.svg'
                alt='eden icon'
                style={{ width: '28px' }}
              />
            </SpecialTooltip>
          )}
        </>
      )}
    </>
  )
})

UserInformationByType.displayName = 'UserInformationByType'

UserInformationByType.propTypes = {
  user: PropTypes.object
}

const Header = memo(({ onDrawerToggle }) => {
  const classes = useStyles()
  const history = useHistory()
  const [state, { login, logout }] = useSharedState()
  const [isSearchOpen, setIsSearchOpen] = useState()

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
              src={
                mainConfig.stage === 'true'
                  ? '/logo-mainnet.svg'
                  : '/logo-testnet.svg'
              }
              alt='EOS Rate'
              className={classes.logoStyle}
            />
          </Link>
        </Box>
        <Box className={classes.boxSearch}>
          <InputAutocomplete />
        </Box>
        <Box className={classes.desktopSection}>
          <Box style={{ marginRight: '10px', marginTop: '5px' }}>
            <UserInformationByType user={state.user} />
          </Box>
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
          <Box style={{ marginTop: 8 }}>
            <UserInformationByType user={state.user} />
          </Box>
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
