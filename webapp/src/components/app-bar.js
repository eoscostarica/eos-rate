import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

const MainTopBar = ({ classes, handleDrawerToggle, ...props }) => (
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
      <Typography variant='title' color='inherit' className={classes.grow}>
        EOSRate
      </Typography>
    </Toolbar>
  </AppBar>
)

MainTopBar.propTypes = {
  classes: PropTypes.object,
  handleDrawerToggle: PropTypes.func
}

export default withStyles(styles)(MainTopBar)
