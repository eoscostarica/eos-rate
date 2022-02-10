import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const TableBoxColor = ({ color }) => {
  const classes = useStyles()
  return <Box bgcolor={color} className={classes.boxColor}></Box>
}

TableBoxColor.propTypes = {
  color: PropTypes.array
}

export default TableBoxColor
