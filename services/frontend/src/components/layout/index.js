import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Hidden from '@material-ui/core/Hidden'
import classnames from 'classnames'

import MainTopBar from 'components/app-bar'
import MainDrawer from 'components/main-drawer'
import MainFooter from 'components/main-footer'
import { InitGA, LogPageView } from 'config/google-analitycs-module'

import styles from './styles'

const useStyles = makeStyles(styles)

const Layout = ({ children, ual }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    isNavOpen: false,
    isSearchOpen: false
  })

  const handleDrawerToggle = () =>
    setState({ ...state, isNavOpen: !state.isNavOpen })

  const handleSearchDialogOpen = () =>
    setState({ ...state, isSearchOpen: true })

  const handleSearchDialogClose = () =>
    setState({ ...state, isSearchOpen: false })

  useEffect(() => {
    InitGA()
    LogPageView()
  }, [])

  return (
    <div className={classes.root}>
      <MainTopBar
        isSearchOpen={state.isSearchOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleSearchDialogOpen={handleSearchDialogOpen}
        handleSearchDialogClose={handleSearchDialogClose}
        ual={ual}
      />
      <Hidden mdUp>
        <MainDrawer
          variant='mobile'
          open={state.isNavOpen}
          onClose={handleDrawerToggle}
        />
      </Hidden>
      <Hidden
        className={classnames(classes.desktopDrawer, {
          [classes.desktopDrawerHidden]: !state.isNavOpen
        })}
        smDown
        implementation='css'
      >
        <MainDrawer open={state.isNavOpen} onClose={handleDrawerToggle} />
      </Hidden>
      <main className={classes.content} id='mainContent'>
        <div className={classes.toolbar} />
        <div className={classes.contentWrapper}>{children}</div>
        <MainFooter />
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
  ual: PropTypes.object
}

export default Layout
