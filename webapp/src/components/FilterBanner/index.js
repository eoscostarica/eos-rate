import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { filtersConfig } from '../../config'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const FilterBanner = ({ title, page, onFilterChange, hideFilter }) => {
  const { t } = useTranslation('sortInput')
  const classes = useStyles()
  const [state, { setSortBy }] = useSharedState()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = filter => {
    if (filter.value) {
      setSortBy(filter, page)
      onFilterChange(filter.sort)
    }

    setAnchorEl(null)
  }

  return (
    <Box className={classes.filterBanner}>
      <Typography className={classes.pageTitle}>{title}</Typography>
      <Button
        id='filter-button'
        aria-controls='filter-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        startIcon={<FilterListIcon />}
        onClick={handleClick}
        className={clsx({ [classes.visibilityHidden]: hideFilter })}
      >
        {`${t('sortBy')}: ${t(state.sortBlockProducersBy.value)}`}
      </Button>
      <Menu
        id='filter-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'filter-button'
        }}
      >
        {filtersConfig.filters.map(filter => (
          <MenuItem key={filter.value} onClick={() => handleClose(filter)}>
            {t(filter.value)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

FilterBanner.propTypes = {
  title: PropTypes.string,
  page: PropTypes.string,
  onFilterChange: PropTypes.func,
  hideFilter: PropTypes.bool
}

FilterBanner.defaultProps = {
  onFilterChange: () => {},
  hideFilter: false
}

export default FilterBanner
