import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

import InputAutocomplete from '../../components/InputAutocomplete'

import styles from './styles'

const useStyles = makeStyles(styles)

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => (
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

MobileSearch.defaultProps = {
  isOpen: false,
  onClose: () => {}
}

export default MobileSearch
