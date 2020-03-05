import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'

const SignInMenu = ({ anchorEl, handleClick, handleClose }) => {
  return (
    <Menu
      id='sign-in-appbar'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      getContentAnchorEl={null}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    />
  )
}

SignInMenu.propTypes = {
  anchorEl: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default SignInMenu
