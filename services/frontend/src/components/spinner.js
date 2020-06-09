import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  blockContainer: {
    '&:focus': {
      outline: 'none'
    },
    bottom: 0,
    cursor: 'wait',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 99999
  },
  blockOverlay: {
    backgroundColor: '#fff',
    height: '100%',
    opacity: 0.3,
    width: '100%'
  },
  circularProgressContainer: {
    alignContent: 'center',
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: theme.spacing(10),
    width: '100%',
    zIndex: 999999
  }
}))

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
