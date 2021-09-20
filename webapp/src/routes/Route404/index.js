import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

import styles from './styles'

const useStyles = makeStyles(styles)

const Route404 = () => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Helmet title='404 Error' />
      <Typography component='h1' variant='h1' align='center' gutterBottom>
        404
      </Typography>
      <Typography component='h2' variant='h5' align='center' gutterBottom>
        Page not found.
      </Typography>
      <Typography component='h2' variant='body1' align='center' gutterBottom>
        The page you are looking for might have been removed.
      </Typography>

      <Button
        component={Link}
        to='/'
        variant='contained'
        color='primary'
        mt={2}
      >
        Return to website
      </Button>
    </div>
  )
}

export default Route404
