import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = ({ spacing }) => ({
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
    top: spacing(10),
    width: '100%',
    zIndex: 999999
  }
})

const IsLoading = ({ classes, isLoading }) =>
  isLoading ? (
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

IsLoading.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
}

export default withStyles(styles)(IsLoading)
