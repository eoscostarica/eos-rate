import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import LinearProgress from '@material-ui/core/LinearProgress'
import red from '@material-ui/core/colors/red'

const styles = {
  errorMsg: {
    color: red[500]
  }
}

const SignInDialog = ({ classes, connecting, error, provider, t }) => {
  const [errorDialogOpen, setErrorDialogOpen] = useState(Boolean(error))
  useEffect(() => setErrorDialogOpen(Boolean(error)), [error])

  return (
    <>
      <Dialog aria-labelledby='sign-in-dialog-title' open={Boolean(connecting)}>
        <DialogTitle id='sign-in-dialog-title'>
          {provider ? `${t('connectingWith')} ${provider}` : t('connecting')}
        </DialogTitle>
        <DialogContent>
          <LinearProgress />
        </DialogContent>
      </Dialog>
      <Dialog aria-labelledby='error-dialog-title' open={errorDialogOpen}>
        <DialogTitle id='sign-in-dialog-title'>
          {t('connectingErrorTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.errorMsg}>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)}>
            {t('connectingErrorActionBtn')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

SignInDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  connecting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  provider: PropTypes.string,
  t: PropTypes.func.isRequired
}

export default withStyles(styles)(withNamespaces('translations')(SignInDialog))
