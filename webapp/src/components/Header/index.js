import React, { memo, useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useHistory, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import ExitIcon from '@mui/icons-material/ExitToApp'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AccountIcon from '@mui/icons-material/AccountCircle'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useSharedState } from '../../context/state.context'
import MobileSearch from '../../components/MobileSearch'

import InputAutocomplete from '../InputAutocomplete'
import LanguageSelector from '../LanguageSelector'
import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const AuthButton = memo(({ user, onLogin, onSignOut, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {user && (
        <>
          <IconButton
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountIcon className={classes.icon} />
            <Typography className={classes.textBtn}>
              {user.accountName}
            </Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem className={classes.onSignOut} onClick={onSignOut}>
              <ExitIcon className={classes.iconLanguage} />
              <Typography className={classes.signOut}>
                {t('signOut')}
              </Typography>
            </MenuItem>
          </Menu>
        </>
      )}
      {!user && (
        <IconButton
          aria-label='sign in'
          className={classes.onLogin}
          onClick={onLogin}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <AccountBalanceWalletOutlinedIcon
              className={classes.iconLanguage}
            />
          )}
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
  onSignOut: PropTypes.func,
  loading: PropTypes.bool
}

const SpecialTooltip = props => {
  const classes = useStyles()
  return (
    <Tooltip
      arrow
      classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      {...props}
    />
  )
}

const UserInformationByType = memo(({ user }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [mayVote, setMayVote] = useState(false)

  useEffect(() => {
    if (!user) setMayVote(false)
    else if (
      user.userData.voter_info &&
      (user.userData.voter_info.producers.length > 20 ||
        user.userData.voter_info.proxy.length > 0)
    )
      setMayVote(true)
  }, [user])

  if (!user) return <></>

  return (
    <>
      {!user.userData.edenMember ? (
        <SpecialTooltip title={t(mayVote ? 'unlockedRating' : 'lockedRating')}>
          {mayVote ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
        </SpecialTooltip>
      ) : (
        <SpecialTooltip title={t('edenMemberMessage')}>
          <img
            src='/edenos.svg'
            alt='eden icon'
            className={classes.logoTypeUSerSize}
          />
        </SpecialTooltip>
      )}
    </>
  )
})

UserInformationByType.displayName = 'UserInformationByType'

UserInformationByType.propTypes = {
  user: PropTypes.object
}

const Header = memo(({ onDrawerToggle, showMenubar }) => {
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

  if (history?.location?.pathname === '/' && !showMenubar)
    return (
      <AppBar className={classes.appBarHome} position='sticky'>
        <Toolbar className={classes.toolbar}>
          <div className={classes.boxLogoHome}>
            <IconButton aria-label='Open drawer' onClick={onDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography>Menu</Typography>
          </div>
          <div className={clsx(classes.homeSvgs, classes.desktopSection)}>
            <div className={classes.useInfoBox}>
              <UserInformationByType user={state.user} />
            </div>
            <LanguageSelector />
            <AuthButton
              loading={state.loadingLogin}
              user={state.user}
              onLogin={handleLogin}
              onSignOut={handleSignOut}
            />
          </div>
          <div className={clsx(classes.homeSvgs, classes.mobileSection)}>
            <div className={classes.infoBox}>
              <UserInformationByType user={state.user} />
            </div>
            <LanguageSelector />
            <AuthButton
              loading={state.loadingLogin}
              user={state.user}
              onLogin={handleLogin}
              onSignOut={handleSignOut}
            />
          </div>
        </Toolbar>
      </AppBar>
    )

  return (
    <AppBar className={classes.appBar} position='sticky'>
      <Toolbar className={classes.toolbar}>
        <div className={classes.boxLogo}>
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
        </div>
        <div className={classes.boxSearch}>
          <InputAutocomplete />
        </div>
        <div className={classes.desktopSection}>
          <div className={classes.useInfoBox}>
            <UserInformationByType user={state.user} />
          </div>
          <LanguageSelector />
          <AuthButton
            loading={state.loadingLogin}
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </div>
        <div className={classes.mobileSection}>
          <IconButton
            className={classes.mobileSearch}
            disabled={isSearchOpen}
            onClick={handleOpenSearch}
          >
            <SearchIcon />
          </IconButton>
          <div className={classes.infoBox}>
            <UserInformationByType user={state.user} />
          </div>
          <LanguageSelector />
          <AuthButton
            loading={state.loadingLogin}
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </div>
      </Toolbar>
      <MobileSearch onClose={handleCloseSearch} isOpen={isSearchOpen} />
    </AppBar>
  )
})

Header.displayName = 'Header'

Header.propTypes = {
  onDrawerToggle: PropTypes.func,
  showMenubar: PropTypes.bool
}

export default Header
