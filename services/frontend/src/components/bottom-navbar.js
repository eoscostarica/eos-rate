import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import ShippingIcon from '@material-ui/icons/ControlPoint'
import SettingsIcon from '@material-ui/icons/Settings'
import { navigate } from '@reach/router'

const styles = {
  root: {
    width: '100%',
    background: '#fafafa',
    position: 'fixed',
    bottom: 0,
    left: 0
  }
}

class SimpleBottomNavigation extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    event.preventDefault()
    const routes = ['/recents', '/', '/settings']

    navigate(routes[value])
  }

  render () {
    const { classes, t } = this.props
    const { value } = this.state

    return (
      <React.Fragment>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label={t('navigationRecents')}
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label={t('navigationRate')}
            icon={<ShippingIcon />}
          />
          <BottomNavigationAction
            label={t('navigationSettings')}
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </React.Fragment>
    )
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(styles)(
  withNamespaces('translations')(SimpleBottomNavigation)
)
