import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useDispatch } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/styles'
import { Link } from '@reach/router'

import InputAutocomplete from 'components/input-autocomplete'
import MobileSearch from 'components/mobile-search'
import LanguageSelect from 'components/language-select'

import styles from './styles'

const useStyles = makeStyles((theme) => styles(theme, fade))

const MainTopBar = ({
  isSearchOpen,
  handleDrawerToggle,
  handleSearchDialogOpen,
  handleSearchDialogClose,
  ual
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation('translations')

  const handleSetUser = () => dispatch.user.removeBlockProducersVotedByUser()

  useEffect(() => {
    const getData = async () => {
      if (ual.activeUser) {
        await dispatch.user.getUserChainData({ ual })
      } else {
        handleSetUser()
      }
    }

    getData()
  }, [ual.loading, ual, handleSetUser])

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
        <LanguageSelect />
        {ual.activeUser ? (
          <>
            <Link to='/account' className={classes.link}>
              <IconButton color='inherit'>
                <AccountCircleIcon />
                <Typography className={classes.sessionText} variant='subtitle1'>
                  {ual.activeUser.accountName}
                </Typography>
              </IconButton>
            </Link>
            <IconButton
              color='inherit'
              onClick={() => {
                ual.logout()
                handleSetUser()
              }}
            >
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton color='inherit' onClick={() => ual.showModal()}>
              {ual.loading ? (
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
            </IconButton>
          </>
        )}
      </Toolbar>
      <MobileSearch onClose={handleSearchDialogClose} isOpen={isSearchOpen} />
    </AppBar>
  )
}

MainTopBar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  handleSearchDialogOpen: PropTypes.func,
  handleSearchDialogClose: PropTypes.func,
  isSearchOpen: PropTypes.bool,
  ual: PropTypes.object
}

export default MainTopBar
