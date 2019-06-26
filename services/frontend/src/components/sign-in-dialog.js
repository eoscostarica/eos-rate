import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import Avatar from '@material-ui/core/Avatar'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'

import supportedWallets from 'config/supported-wallets'

const styles = {
  walletIcon: {
    width: '100%'
  },
  wrapper: {
    padding: '10px 30px'
  }
}

const SignInDialog = ({ classes, onClose, open, t }) => {
  const handleClose = () => onClose()

  const handleListItemClick = value => onClose(value)

  return (
    <Dialog
      aria-labelledby='sign-in-dialog-title'
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id='sign-in-dialog-title'>
        {t('connectToWallet')}
      </DialogTitle>
      <List className={classes.wrapper}>
        {supportedWallets.map(wallet => (
          <ListItem
            button
            onClick={() => handleListItemClick(wallet.id)}
            key={wallet.id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <img
                  alt={wallet.name}
                  className={classes.walletIcon}
                  src={`/images/wallets/${wallet.id}.svg`}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={wallet.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

SignInDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(styles)(withNamespaces('translations')(SignInDialog))
