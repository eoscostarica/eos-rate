import React from 'react'
import { makeStyles } from '@mui/styles'
import CircularProgress from '@mui/material/CircularProgress'

import styles from './styles'

const useStyles = makeStyles(styles)

const Loader = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress m={2} color='secondary' />
    </div>
  )
}

export default Loader
