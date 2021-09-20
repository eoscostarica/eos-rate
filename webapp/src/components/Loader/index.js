import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { CircularProgress } from '@material-ui/core'

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
