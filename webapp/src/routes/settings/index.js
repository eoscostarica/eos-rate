import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import Language from '@material-ui/icons/Language'
import NotificationsIcon from '@material-ui/icons/Notifications'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Settings = ({ i18n }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const { language, notifications } = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const handleToggle = (value, currentValue) => () => {
    if (value === 'language') {
      if (currentValue === 'en' || 'ko' )
        const lang = 'es'
      else if (currentValue === 'es' || 'ko')
        const lang = 'en'
        
      i18n.changeLanguage(lang)
      dispatch.settings.setSettings({ key: value, value: lang })
    } else if (value === 'notifications')
      dispatch.settings.setSettings({ key: value, value: !currentValue })
  }

  return (
    <div className={classes.root}>
      <Typography
        variant='h5'
        style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}
      >
        {t('settingsTitle')}
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Language />
          </ListItemIcon>
          <ListItemText primary={t('settingsLanguages')} />
          <ListItemSecondaryAction>
            <Switch
              onChange={() => handleToggle('language', language)}
              checked={language === 'en'}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary={t('settingsNotifications')} />
          <ListItemSecondaryAction>
            <Switch
              onChange={() => handleToggle('notifications', notifications)}
              checked={notifications}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  )
}

Settings.propTypes = {
  i18n: PropTypes.object.isRequired
}

export default Settings
