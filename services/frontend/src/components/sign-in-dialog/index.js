import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import LinearProgress from '@material-ui/core/LinearProgress'
import red from '@material-ui/core/colors/red'

import styles from './styles'

const useStyles = makeStyles(() => styles(red))

const SignInDialog = ({ connecting, error, provider }) => {
  const [errorDialogOpen, setErrorDialogOpen] = useState(Boolean(error))
  const { t } = useTranslation('translations')
  const classes = useStyles()

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
  connecting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  provider: PropTypes.string
}

export default SignInDialog
