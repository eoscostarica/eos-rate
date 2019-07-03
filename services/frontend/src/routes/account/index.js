import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { withNamespaces } from 'react-i18next'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { useWalletState } from 'hooks/wallet'

const style = () => ({
  container: {
    padding: 11,
    color: '#ffffff'
  },
  account: {
    padding: '20px 32px'
  },
  title: {
    textAlign: 'center'
  },
  box: {
    padding: '20px 0'
  },
  bold: {
    fontWeight: 'bold',
    wordBreak: 'break-all'
  }
})

const Account = ({ classes, t }) => {
  const walletState = useWalletState()

  if (!walletState.wallet) {
    navigate('/')
    return null
  }

  const entries = walletState.wallet.accountInfo
    ? Object.entries(walletState.wallet.accountInfo)
    : []

  return (
    <Grid container spacing={16} className={classes.container}>
      <Grid item xs={12}>
        <Paper className={classes.account}>
          <Typography
            variant='h5'
            className={classnames(classes.title, classes.bold)}
          >
            {t('title')}
          </Typography>
          <Grid className={classes.box}>
            {entries.map(entry => (
              <Typography
                key={entry[0]}
                variant='subtitle1'
                className={classes.bold}
              >{`${t(entry[0])}: ${entry[1]}`}</Typography>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

Account.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func.isRequired
}

export default withStyles(style)(withNamespaces('account')(Account))
