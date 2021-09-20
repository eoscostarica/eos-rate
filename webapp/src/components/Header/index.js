import React, {
  memo,
  //  useEffect,
  useState
} from 'react'

import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory, Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
// import LanguageIcon from '@material-ui/icons/Language'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ExitIcon from '@material-ui/icons/ExitToApp'
import MoreIcon from '@material-ui/icons/MoreVert'

import { useSharedState } from '../../context/state.context'
import InputAutocomplete from '../InputAutocomplete'
import LanguageSelector from '../languageSelector'

import styles from './styles'

const useStyles = makeStyles(styles)

// const LanguageButton = memo(({ current, onChange }) => {
//   const [languageAnchorEl, setLanguageAnchorEl] = useState(null)
//   const languages = [
//     {
//       value: 'en',
//       label: 'EN'
//     },
//     {
//       value: 'es',
//       label: 'ES'
//     }
//   ]

//   const handleLanguajeMenuOpen = event => {
//     setLanguageAnchorEl(event.currentTarget)
//   }

//   const handleLanguajeMenuClose = language => {
//     setLanguageAnchorEl(null)
//     typeof language === 'string' && onChange && onChange(language)
//   }

//   return (
//     <>
//       <Button startIcon={<LanguageIcon />} onClick={handleLanguajeMenuOpen}>
//         {(current || '').toUpperCase()}
//       </Button>
//       <Menu
//         keepMounted
//         anchorEl={languageAnchorEl}
//         open={!!languageAnchorEl}
//         onClose={handleLanguajeMenuClose}
//       >
//         {languages.map(language => (
//           <MenuItem
//             key={`language-menu-${language.value}`}
//             onClick={() => handleLanguajeMenuClose(language.value)}
//           >
//             {language.label}
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   )
// })

// LanguageButton.propTypes = {
//   current: PropTypes.string,
//   onChange: PropTypes.func
// }

const UserButton = memo(({ user }) => (
  <>{user && <Button startIcon={<AccountIcon />}>{user.accountName}</Button>}</>
))

UserButton.displayName = 'UserButton'

UserButton.propTypes = {
  user: PropTypes.any
}

const AuthButton = memo(({ user, onLogin, onSignOut }) => {
  const { t } = useTranslation('translations')

  return (
    <>
      {user && (
        <Button startIcon={<ExitIcon />} onClick={onSignOut}>
          {t('signOut')}
        </Button>
      )}
      {!user && (
        <Button startIcon={<FingerprintIcon />} onClick={onLogin}>
          {t('appBarSignIn')}
        </Button>
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

  // const { t } = useTranslation('routes')
  const history = useHistory()
  // const location = useLocation()
  const [state, { login, logout }] = useSharedState()
  // const { i18n } = useTranslation('translations')
  // const [currentLanguaje, setCurrentLanguaje] = useState()
  const [menuAnchorEl, setMenuAnchorEl] = useState()

  const stage = 'false'

  // const handleChangeLanguage = languaje => i18n.changeLanguage(languaje)

  const handleLogin = () => {
    login()
  }

  const handleSignOut = () => {
    logout()
    history.push('/')
  }

  const handleOpenMenu = event => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  // useEffect(() => {
  //   setCurrentLanguaje(i18n.language?.substring(0, 2) || 'en')
  // }, [i18n.language])

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
        <InputAutocomplete />
        <Box className={classes.desktopSection}>
          <LanguageSelector
          // current={currentLanguaje}
          // onChange={handleChangeLanguage}
          />
          <UserButton user={state.user} />
          <AuthButton
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </Box>
        <Box className={classes.mobileSection}>
          <IconButton
            aria-label='show more'
            aria-haspopup='true'
            onClick={handleOpenMenu}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <LanguageSelector
          // current={currentLanguaje}
          // onChange={handleChangeLanguage}
          />
        </MenuItem>
        {state.user && (
          <MenuItem>
            <UserButton user={state.user} />
          </MenuItem>
        )}
        <MenuItem>
          <AuthButton
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </MenuItem>
      </Menu>
    </AppBar>
  )
})

Header.displayName = 'Header'

Header.propTypes = {
  onDrawerToggle: PropTypes.func
}

export default Header
