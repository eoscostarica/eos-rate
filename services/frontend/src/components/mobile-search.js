import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import InputAutocomplete from 'components/input-autocomplete'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
})

const Transition = props => <Slide direction='up' {...props} />

class MobileSearch extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
  }

  render () {
    const { classes, isOpen, onClose } = this.props

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
}

export default withStyles(styles)(MobileSearch)
