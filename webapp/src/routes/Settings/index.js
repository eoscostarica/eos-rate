import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Language from '@mui/icons-material/Language'
import NotificationsIcon from '@mui/icons-material/Notifications'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Settings = ({ i18n }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  // const { language, notifications } = useSelector(state => state.settings)
  // const dispatch = useDispatch()
  // delete this
  const language = ''
  const notifications = ''
  // end delete this

  const handleToggle = (value, currentValue) => () => {
    if (value === 'language') {
      let lang = ''

      // eslint-disable-next-line no-constant-condition
      if (currentValue === 'en' || 'ko') lang = 'es'
      // eslint-disable-next-line no-constant-condition
      else if (currentValue === 'es' || 'ko') lang = 'en'

      i18n.changeLanguage(lang)
      localStorage.setItem('LANGUAGE', lang)
      // dispatch.settings.setSettings({ key: value, value: lang })
    } else if (value === 'notifications') console.log('test')
    // dispatch.settings.setSettings({ key: value, value: !currentValue })
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
