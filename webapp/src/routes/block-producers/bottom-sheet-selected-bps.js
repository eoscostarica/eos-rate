import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const SelectedBpsBottomSheet = ({ open, setOpen, children }) => {
  return (
    <Drawer anchor='bottom' open={open}>
      <Grid container justify='flex-end'>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Grid>
      {children}
    </Drawer>
  )
}

SelectedBpsBottomSheet.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.node
}

export default SelectedBpsBottomSheet
