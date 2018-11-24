import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import classnames from 'classnames'
import MainTopBar from 'components/app-bar'
import MainDrawer from 'components/main-drawer'
import MainFooter from 'components/main-footer'

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
    overflow: 'scroll',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    position: 'relative'
  },
  contentWrapper: {
    minHeight: 'calc(100vh - 128px)'
  }
})

class Layout extends Component {
  state = {
    isNavOpen: false
  }

  handleDrawerToggle = () => this.setState({ isNavOpen: !this.state.isNavOpen })

  render () {
    const { classes, children } = this.props
    return (
      <div className={classes.root}>
        <MainTopBar handleDrawerToggle={this.handleDrawerToggle} />
        <Hidden mdUp>
          <MainDrawer
            variant='mobile'
            open={this.state.isNavOpen}
            onClose={this.handleDrawerToggle}
          />
        </Hidden>
        <Hidden
          className={classnames(classes.desktopDrawer, {
            [classes.desktopDrawerHidden]: !this.state.isNavOpen
          })}
          smDown
          implementation='css'
        >
          <MainDrawer
            open={this.state.isNavOpen}
            onClose={this.handleDrawerToggle}
          />
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.contentWrapper}>{children}</div>
          <MainFooter />
        </main>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object
}

export default withStyles(styles, { withTheme: true })(Layout)
