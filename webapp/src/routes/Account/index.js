import React, { useState, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import clsx from 'clsx'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar'
import MuiAlert from '@mui/material//Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Snackbar from '@mui/material/Snackbar'
import Link from '@mui/material/Link'
import _get from 'lodash.get'

import { DELETE_USER_RATE } from '../../gql'
import { mainConfig } from '../../config'
import TitlePage from '../../components/PageTitle'
import { useSharedState } from '../../context/state.context'
import formatNumber from '../../utils/format-number'

import styles from './styles'

const useStyles = makeStyles(styles)
const VOTE_INDICATORS = [
  'community',
  'development',
  'infrastructure',
  'transparency',
  'trustiness'
]

const INIT_RATING_STATE_DATA = {
  processing: false,
  txError: null,
  txSuccess: false
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Account = () => {
  const { t } = useTranslation('account')
  const classes = useStyles()
  const [deleteUserRate] = useMutation(DELETE_USER_RATE)
  const [state, { logout, setUser }] = useSharedState()
  const [ratingState, setRatingState] = useState(INIT_RATING_STATE_DATA)
  const [showMessage, setShowMessage] = useState(false)

  const onHandleDeleteUserRate = async bpName => {
    try {
      if (!state.user) {
        setShowMessage(true)

        return
      }

      const transaction = {
        actions: [
          {
            account: mainConfig.contract,
            name: 'rmrate',
            authorization: [
              {
                actor: state.user.accountName,
                permission: 'active'
              }
            ],
            data: { user: state.user.accountName, bp: bpName }
          }
        ]
      }

      await state.ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      await deleteUserRate({
        variables: {
          user: state.user.accountName,
          bpName
        }
      })

      await setUser()

      setRatingState({
        ...ratingState,
        txError: null,
        processing: true,
        txSuccess: true
      })
    } catch (error) {
      setRatingState({
        ...ratingState,
        processing: false,
        txError: error.cause ? error.cause.message : error
      })
    }
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowMessage(false)
    setRatingState({
      ...ratingState,
      processing: false,
      txError: null,
      txSuccess: false
    })
  }

  return (
    <Box className={classes.container}>
      <TitlePage
        title={`${t('title')} ${state.user ? state.user?.accountName : ''}`}
      />
      <Paper className={classes.account}>
        <Typography variant='h5' className={classes.title}>
          {t('title')}
        </Typography>
        <Box className={classes.box}>
          <Box>
            <Typography variant='subtitle1' className={classes.bold}>
              {state.user
                ? `${state.user.accountName}: ${
                    state.user?.userData?.core_liquid_balance || 0
                  }`
                : 'accountName: 0'}
            </Typography>
            <Box className={classes.rateList}>
              {(state.user ? state.user?.userData?.userRates || [] : []).map(
                rate => {
                  const imageURL = _get(
                    rate,
                    'bpjson.org.branding.logo_256',
                    null
                  )
                  const BPName = _get(
                    rate,
                    'bpjson.org.candidate_name',
                    rate.bp
                  )
                  const date = _get(
                    rate,
                    'tx_data.transaction.transactionDate',
                    ''
                  ).substring(0, 10)

                  return (
                    <Accordion key={`list-item-${rate.bp}`}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Box className={classes.boxWrapper}>
                          <Avatar
                            aria-label='account'
                            className={clsx({
                              [classes.avatar]: imageURL
                            })}
                          >
                            {!imageURL ? (
                              'BP'
                            ) : (
                              <img src={imageURL} alt='' width='100%' />
                            )}
                          </Avatar>
                          <Typography className={classes.accordionTitle}>
                            {date.length > 1
                              ? `${t('youRated')} ${BPName} - ${date}`
                              : `${t('youRated')} ${BPName}`}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          className={classes.yourRate}
                          variant='subtitle1'
                        >
                          {t('yourRating')}
                        </Typography>
                        {VOTE_INDICATORS.map(value => (
                          <Box key={value} className={classes.row}>
                            <Typography>{t(value)}:</Typography>
                            <Typography>
                              {formatNumber(rate.ratings[value], 0)}
                            </Typography>
                          </Box>
                        ))}
                        <Box style={{ marginTop: 20 }}>
                          {rate.tx_data && (
                            <Link
                              rel='noopener'
                              target='_blank'
                              className={classes.link}
                              href={`${mainConfig.blockExplorer}/transaction/${rate.tx_data?.transaction?.transactionId}`}
                            >
                              {rate.tx_data?.transaction?.transactionId}
                            </Link>
                          )}
                        </Box>
                        <Box>
                          <Box className={classes.remove}>
                            <IconButton
                              onClick={() => onHandleDeleteUserRate(rate.bp)}
                            >
                              <CloseIcon />
                              <Typography>{t('unpublish')}</Typography>
                            </IconButton>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  )
                }
              )}
            </Box>
          </Box>
          <Snackbar
            open={showMessage}
            autoHideDuration={4000}
            onClose={handleClose}
            className={classes.snackbarCenter}
          >
            <Alert
              onClose={handleClose}
              severity='warning'
              className={classes.alert}
            >
              {t('voteWithoutLogin')}
            </Alert>
          </Snackbar>
          <Snackbar
            open={ratingState.txError}
            onClose={handleClose}
            className={classes.snackbarCenter}
          >
            <Alert
              onClose={handleClose}
              severity='error'
              className={classes.alert}
            >
              {ratingState.txError}
            </Alert>
          </Snackbar>
          <Snackbar
            open={ratingState.txSuccess}
            autoHideDuration={4000}
            onClose={handleClose}
            className={classes.snackbarCenter}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              className={classes.alert}
            >
              {t('success')}
            </Alert>
          </Snackbar>
          <Button
            className={classes.button}
            color='secondary'
            onClick={logout}
            variant='outlined'
          >
            {t('logout')}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Account
