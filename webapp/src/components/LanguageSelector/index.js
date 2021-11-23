import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import styles from './styles'

const useStyles = makeStyles(styles)

const LanguageSelector = ({ style, alt }) => {
  const { i18n } = useTranslation('translations')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = item => {
    setAnchorEl(null)
    if (typeof item === 'string') {
      localStorage.setItem('LANGUAGE', item)
      i18n.changeLanguage(item)
    }
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
      value: 'ko',
      label: '한국인'
    }
  ]

  return (
    <>
      <IconButton className={classes.wrapper} onClick={handleClick}>
        <LanguageIcon alt={alt} className={classes.iconLanguage} />
        <Typography className={classes.languageText}>
          {(i18n.language || '').toLocaleUpperCase().substring(0, 2)}
        </Typography>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.length &&
          languages.map(item => (
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

LanguageSelector.propTypes = {
  alt: PropTypes.string,
  style: PropTypes.any
}

export default memo(LanguageSelector)
