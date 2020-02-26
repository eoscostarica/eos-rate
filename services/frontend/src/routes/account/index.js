import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { useWalletDispatch, useWalletState } from 'hooks/wallet'

const style = theme => ({
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
  },
  button: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
})

const Account = ({ classes }) => {
  const { disconnectWallet } = useWalletDispatch()
  const walletState = useWalletState()
  const { t } = useTranslation('account')

  if (!walletState.wallet) {
    navigate('/')
    return null
  }

  /* eslint-disable camelcase */
  const {
    accountInfo: { account_name },
    accountInfo: { core_liquid_balance },
    active
  } = walletState.wallet
  /* eslint-enable camelcase */
  const pickedEntries = {
    account_name,
    core_liquid_balance,
    authority: active ? t('active') : t('inactive')
  }
  const entries = pickedEntries ? Object.entries(pickedEntries) : []
  const logout = () => {
    disconnectWallet(walletState.wallet)
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Paper className={classes.account}>
          <Typography variant='h5' className={classnames(classes.title)}>
            {t('title')}
          </Typography>
          <Grid className={classes.box}>
            {entries.map(entry => (
              <Typography
                key={entry[0]}
                variant='subtitle1'
                className={classes.bold}
              >
                {t(entry[0])}: {`${entry[1]}`}
              </Typography>
            ))}
            <Button
              className={classes.button}
              color='secondary'
              onClick={logout}
              variant='outlined'
            >
              {t('logout')}
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

Account.propTypes = {
  classes: PropTypes.object
}

export default withStyles(style)(Account)
