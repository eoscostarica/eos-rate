import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { alpha } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { Link } from '@reach/router'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'

import InputAutocomplete from 'components/input-autocomplete'
import MobileSearch from 'components/mobile-search'
import LanguageSelect from 'components/language-select'

import styles from './styles'

const useStyles = makeStyles((theme) => styles(theme, alpha))

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
  const { data: user } = useSelector((state) => state.user)
  const [mayVote, setMayVote] = useState(false)

  const handleSetUser = () => dispatch.user.removeBlockProducersVotedByUser()

  const StyleTooltip = makeStyles((theme) => ({
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
    const getData = async () => {
      if (ual.activeUser) {
        await dispatch.user.getUserChainData({ ual })
      } else {
        handleSetUser()
      }
    }

    if (ual) getData()
  }, [ual])

  useEffect(async () => {
    if (!user) setMayVote(false)
    else if (
      user.voter_info.producers.length > 20 ||
      user.voter_info.proxy.length > 0
    )
      setMayVote(true)
  }, [user])

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
        <Link to='/block-producers' className={classes.link}>
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
        <Box style={{ marginRight: '10px', marginTop: '5px' }}>
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
        </Box>
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
