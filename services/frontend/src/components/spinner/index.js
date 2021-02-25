import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './styles'

const useStyles = makeStyles(styles)

const IsLoading = ({ isLoading }) => {
  const classes = useStyles()

  return isLoading ? (
    <div>
      <div className={classes.blockContainer}>
        <div className={classes.blockOverlay} />
        <div className={classes.circularProgressContainer}>
          <CircularProgress
            className={classes.circularProgress}
            disableShrink
          />
        </div>
      </div>
    </div>
  ) : null
}

IsLoading.propTypes = {
  isLoading: PropTypes.bool
}

export default IsLoading
