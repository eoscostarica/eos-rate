import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Language as LanguageIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  wrapper: { 
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer' 
  },
  languageText: { 
    fontSize: '1rem',
    marginLeft: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  iconLanguage: { 
    width: 24,
    height: 24
  }
})

const LanguageSelect = ({ classes, style, alt }) => {
  const { i18n } = useTranslation('translations')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = item => {
    setAnchorEl(null)
    i18n.changeLanguage(item.value)
  }

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

  return (
    <>
      <div className={classes.wrapper}>
        <LanguageIcon
          onClick={handleClick}
          alt={alt}
          className={classes.iconLanguage}
        />
        <Typography variant='h5' className={classes.languageText}>
          {(i18n.language || '').toLocaleUpperCase().substring(0, 2)}
        </Typography>
      </div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.length &&
          languages.map(item => (
            <MenuItem
              key={`language-menu-${item.label}`}
              onClick={() => handleClose(item)}
            >
              {`${item.label} - ${(item.value || '').toLocaleUpperCase()}`}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

LanguageSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  alt: PropTypes.string,
  style: PropTypes.any
}

export default withStyles(styles)(LanguageSelect)
