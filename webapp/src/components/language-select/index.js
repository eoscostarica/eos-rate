import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Language as LanguageIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import styles from './styles'

const useStyles = makeStyles(styles)

const LanguageSelect = ({ style, alt }) => {
  const { i18n } = useTranslation('translations')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (item) => {
    setAnchorEl(null)
    if (typeof item === 'string') i18n.changeLanguage(item)
  }

  const languages = [
    {
      value: 'en',
      label: 'English'
    },
    {
      value: 'es',
      label: 'Español'
    },
    {
      value: 'kr',
      label: '한국인'
    }
  ]

  return (
    <>
      <IconButton className={classes.wrapper} onClick={handleClick}>
        <LanguageIcon alt={alt} className={classes.iconLanguage} />
        <Typography variant='h5' className={classes.languageText}>
          {(i18n.language || '').toLocaleUpperCase().substring(0, 2)}
        </Typography>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.length &&
          languages.map((item) => (
            <MenuItem
              key={`language-menu-${item.label}`}
              onClick={() => handleClose(item.value)}
            >
              {`${item.label} - ${(item.value || '').toLocaleUpperCase()}`}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

LanguageSelect.propTypes = {
  alt: PropTypes.string,
  style: PropTypes.any
}

export default LanguageSelect
