import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Help = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        variant='h5'
      >
        HELP
      </Typography>
    </div>
  )
}

Help.propTypes = {}

export default Help
