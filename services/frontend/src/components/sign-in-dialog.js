import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
// import Avatar from '@material-ui/core/Avatar'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import red from '@material-ui/core/colors/red'
import Typography from '@material-ui/core/Typography'

import walletProviders from 'config/wallet-providers'
import { useWalletDispatch, useWalletState } from 'hooks/wallet'

const styles = {
  errorMsg: {
    color: red[500],
    padding: 10,
    textAlign: 'center'
  },
  walletIcon: {
    width: '100%'
  },
  wrapper: {
    padding: '10px 30px'
  }
}

const SignInDialog = ({ classes, onClose, open, t }) => {
  const { connectWallet } = useWalletDispatch()
  const walletState = useWalletState()

  return (
    <Dialog
      aria-labelledby='sign-in-dialog-title'
      onClose={() => onClose()}
      open={open}
    >
      <DialogTitle id='sign-in-dialog-title'>
        {t('connectToWallet')}
      </DialogTitle>
      <List className={classes.wrapper}>
        {walletProviders.map(provider => (
          <ListItem
            button
            disabled={walletState.connecting}
            key={provider.id}
            onClick={() => connectWallet(provider.id)}
          >
            {/* <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <img
                  alt={provider.name}
                  className={classes.walletIcon}
                  src={`/images/wallets/${provider.id}.svg`}
                />
              </Avatar>
            </ListItemAvatar> */}
            <ListItemText primary={provider.name} />
          </ListItem>
        ))}
      </List>
      {walletState.error && (
        <Typography className={classes.errorMsg}>
          Error connecting to wallet.
        </Typography>
      )}
      {walletState.connecting && <LinearProgress />}
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
