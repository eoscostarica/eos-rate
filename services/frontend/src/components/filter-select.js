import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FilterListIcon from '@material-ui/icons/FilterList'

const useStyles = makeStyles(theme => ({
  wrapper: {
    color: 'inherit'
  },
  sortText: {
    fontSize: '1rem',
    marginLeft: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  iconFilter: {
    width: 24,
    height: 24
  }
}))

const FilterSelect = ({ style, alt, onHandleApplySortBy }) => {
  const { t, i18n } = useTranslation('sortInput')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [sort, setSort] = useState(t('sortby'))

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = item => {
    setAnchorEl(null)

    if (typeof item === 'string') {
      setSort(t(item))
      onHandleApplySortBy(item)
    }
  }

  const filters = [
    { value: 'alphabetical', label: t('alphabetical') },
    { value: 'generalRate', label: t('generalRate') },
    { value: 'infrastructure', label: t('infrastructure') },
    { value: 'community', label: t('community') },
    { value: 'trustiness', label: t('trustiness') },
    { value: 'development', label: t('development') },
    { value: 'transparency', label: t('transparency') },
    { value: 'vote', label: t('vote') },
    { value: 'ratings', label: t('ratings') }
  ]

  useEffect(() => {
    setSort(t(sort))
  }, [i18n.language])

  return (
    <>
      <IconButton aria-label='Sort list' className={classes.wrapper} onClick={handleClick}>
        <FilterListIcon
          alt={alt}
          className={classes.iconFilter}
        />
        <Typography variant='h5' className={classes.sortText}>
          {sort || ''}
        </Typography>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {filters.length &&
          filters.map(item => (
            <MenuItem
              key={`filter-menu-${item.value}`}
              onClick={() => handleClose(item.value)}
            >
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

FilterSelect.propTypes = {
  alt: PropTypes.string,
  style: PropTypes.any,
  onHandleApplySortBy: PropTypes.func
}

export default FilterSelect
