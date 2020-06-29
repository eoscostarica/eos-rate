import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import InputAutocomplete from 'components/input-autocomplete'

const useStyles = makeStyles(() => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
}))

const Transition = React.forwardRef((props, ref) => (
  <Slide direction='up' {...props} ref={ref} />
))

const MobileSearch = ({ isOpen, onClose }) => {
  const classes = useStyles()

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <InputAutocomplete onItemSelected={onClose} isFocused={isOpen} />
          <IconButton color='inherit' onClick={onClose} aria-label='Close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

MobileSearch.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default MobileSearch
