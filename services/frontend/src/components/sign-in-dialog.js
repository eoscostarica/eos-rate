import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import Avatar from '@material-ui/core/Avatar'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import red from '@material-ui/core/colors/red'
import Typography from '@material-ui/core/Typography'

import supportedWallets from 'config/supported-wallets'

const styles = {
  errorMsg: {
    color: red[500],
    paddingLeft: 5
  },
  errorWrapper: {
    padding: 10
  },
  walletIcon: {
    width: '100%'
  },
  wrapper: {
    padding: '10px 30px'
  }
}

const SignInDialog = ({ classes, connectWallet, onClose, open, t }) => {
  const [error, setError] = useState()
  const [connecting, setConnecting] = useState(false)
  const handleClose = () => onClose()

  const handleListItemClick = value => {
    setConnecting(true)
    setError(null)
    connectWallet()
    // onClose(value)
  }

  // const onError = err => {
  //   setConnecting(false)
  //   setError(err)
  // }

  // const onSuccess = () => {
  //   setConnecting(false)
  //   onClose()
  // }

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
      {error && (
        <Typography className={classes.errorWrapper}>
          Error:
          <span className={classes.errorMsg}>{error}</span>
        </Typography>
      )}
      {connecting && <LinearProgress />}
    </Dialog>
  )
}

const mapStateToProps = ({ session }) => ({
  session
})

const mapDispatchToProps = ({ session: { connectWallet } }) => ({
  connectWallet
})

SignInDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  connectWallet: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(styles)(
  withNamespaces('translations')(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignInDialog)
  )
)
