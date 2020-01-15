import React from 'react'
import { TextField, InputAdornment, MenuItem } from '@material-ui/core'
import { Language as LanguageIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = () => ({
  root: { height: 12 },
  textField: {
    height: 45,
    '& div:last-child': {
      height: 45,
      '&:nth-child(3n)': {
        paddingTop: 0,
        '& div': {
          padding: '0 25px 0 0',
          marginTop: 13
        }
      }
    }
  }
})

const languages = [
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'es',
    label: 'Español'
  }
]

const LanguageSelect = ({ classes }) => {
  const { t, i18n } = useTranslation('translations')
  return (
    <TextField
      classes={{
        root: classes.textField
      }}
      select
      size='small'
      variant='outlined'
      fullWidth={false}
      label={t('language')}
      onChange={ev => i18n.changeLanguage(ev.target.value)}
      value={i18n.language}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <LanguageIcon />
          </InputAdornment>
        )
      }}
    >
      {languages.map(option => (
        <MenuItem
          key={option.value}
          value={option.value}
          classes={{
            root: classes.root
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

LanguageSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LanguageSelect)
