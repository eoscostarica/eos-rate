import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import ShippingIcon from '@material-ui/icons/ControlPoint'
import { useTranslation } from 'react-i18next'
import SettingsIcon from '@material-ui/icons/Settings'
import { navigate } from '@reach/router'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    background: '#fafafa',
    position: 'fixed',
    bottom: 0,
    left: 0
  }
}))

const SimpleBottomNavigation = () => {
  const [value] = useState(0)
  const classes = useStyles()
  const { t } = useTranslation('translations')

  const handleChange = (event, valueRoute) => {
    event.preventDefault()
    const routes = ['/recents', '/', '/settings']

    navigate(routes[valueRoute])
  }

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={handleChange}
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
    </>
  )
}

export default SimpleBottomNavigation
