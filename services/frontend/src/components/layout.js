import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import classnames from 'classnames'
import MainTopBar from 'components/app-bar'
import MainDrawer from 'components/main-drawer'
import MainFooter from 'components/main-footer'
import { useWalletDispatch } from 'hooks/wallet'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  desktopDrawer: {
    width: 240,
    transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  desktopDrawerHidden: {
    width: 0
  },
  toolbar: theme.mixins.toolbar,
  content: {
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    position: 'relative'
  },
  contentWrapper: {
    minHeight: 'calc(100vh - 128px)'
  }
})

const Layout = ({ classes, children }) => {
  const { connectWallet } = useWalletDispatch()
  const [state, setState] = useState({
    isNavOpen: false,
    isSearchOpen: false
  })
  const walletProvider = localStorage.getItem('walletProvider')

  if (walletProvider) {
    connectWallet(walletProvider)
  }

  const handleDrawerToggle = () =>
    setState({ ...state, isNavOpen: !state.isNavOpen })

  const handleSearchDialogOpen = () =>
    setState({ ...state, isSearchOpen: true })

  const handleSearchDialogClose = () =>
    setState({ ...state, isSearchOpen: false })

  return (
    <div className={classes.root}>
      <MainTopBar
        isSearchOpen={state.isSearchOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleSearchDialogOpen={handleSearchDialogOpen}
        handleSearchDialogClose={handleSearchDialogClose}
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.contentWrapper}>{children}</div>
        <MainFooter />
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object
}

export default withStyles(styles, { withTheme: true })(Layout)
