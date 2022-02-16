import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

import styles from './styles'
import { LightenDarkenColor } from 'lighten-darken-color'

const useStyles = makeStyles(styles)

const TableBoxColor = ({ color }) => {
  const classes = useStyles()
  return (
    <Box
      borderColor={LightenDarkenColor('#a43bca99', 80)}
      bgcolor={color}
      className={classes.boxColor}
    />
  )
}

TableBoxColor.propTypes = {
  color: PropTypes.string
}

export default TableBoxColor
