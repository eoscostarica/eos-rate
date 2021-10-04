import React from 'react'
import { makeStyles } from '@mui/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const Loader = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CircularProgress m={2} color='secondary' />
    </Box>
  )
}

export default Loader
