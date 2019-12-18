import React from 'react'
import { TextField, InputAdornment, MenuItem } from '@material-ui/core'
import { Language as LanguageIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

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

function LanguageSelect () {
  const { t, i18n } = useTranslation('translations')
  return (
    <TextField
      select
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
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default LanguageSelect
