import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import Language from '@material-ui/icons/Language'
import NotificationsIcon from '@material-ui/icons/Notifications'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  }
})

class Settings extends Component {
  state = {
    checked: ['language']
  }

  handleToggle = (value, currentValue) => () => {
    const { i18n, setSettings } = this.props

    if (value === 'language') {
      const lang = currentValue === 'en' ? 'es' : 'en'
      i18n.changeLanguage(lang)
      setSettings({ key: value, value: lang })
    } else if (value === 'notifications') {
      setSettings({ key: value, value: !currentValue })
    }
  }

  render () {
    const { classes, t, language, notifications } = this.props

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
                onChange={this.handleToggle('language', language)}
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
                onChange={this.handleToggle('notifications', notifications)}
                checked={notifications}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    )
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  notifications: PropTypes.bool.isRequired,
  setSettings: PropTypes.func.isRequired
}

const mapStateToProps = ({ settings: { language, notifications } }) => ({
  language,
  notifications
})

const mapDispatchToProps = ({ settings: { setSettings } }) => ({
  setSettings
})

export default withStyles(styles)(
  withNamespaces('translations')(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Settings)
  )
)
