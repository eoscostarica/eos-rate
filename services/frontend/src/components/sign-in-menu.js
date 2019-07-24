import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import walletProviders from 'config/wallet-providers'

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
    >
      {walletProviders.map(provider => (
        <MenuItem
          key={provider.id}
          onClick={() => handleClick(provider.id, provider.name)}
        >
          {provider.name}
        </MenuItem>
      ))}
    </Menu>
  )
}

SignInMenu.propTypes = {
  anchorEl: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default SignInMenu
