import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
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
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from '@mui/material/Link'
import _get from 'lodash.get'

import TitlePage from '../../components/PageTitle'
import { mainConfig } from '../../config'
import { useSharedState } from '../../context/state.context'
import formatNumber from '../../utils/format-number'

import styles from './styles'

const useStyles = makeStyles(styles)

const INIT_RATING_STATE_DATA = {
  processing: false,
  txError: null,
  txSuccess: false
}

const Account = ({ ual }) => {
  const { t } = useTranslation('account')
  const [state] = useSharedState()
  const classes = useStyles()
  const [ratingState, setRatingState] = useState(INIT_RATING_STATE_DATA)
  const [showMessage, setShowMessage] = useState(false)
  const isDesktop = useMediaQuery('(min-width:769px)')

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

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      // await dispatch.user.deleteUserRate({
      //   user: state.user.accountName,
      //   bpName
      // })

      // await dispatch.user.getUserChainData({ ual })

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

  const handleClose = (event, reason) => {
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

  const Alert = props => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  return (
    <Grid container className={classes.container}>
      <TitlePage
        title={`${t('title')} ${state.user ? state.user.accountName : ''}`}
      />
      <Grid item xs={12}>
        <Paper className={classes.account}>
          <Typography variant='h5' className={classes.title}>
            {t('title')}
          </Typography>
          <Grid className={classes.box}>
            <Typography variant='subtitle1' className={classes.bold}>
              {state.user
                ? `${state.user.accountName}: ${
                    state.user.core_liquid_balance || 0
                  }`
                : 'accountName: 0'}
            </Typography>
            <Box className={classes.rateList}>
              {(state.user ? state.user.userRates || [] : []).map(rate => {
                const imageURL = _get(
                  rate,
                  'bpjson.org.branding.logo_256',
                  null
                )
                const BPName = _get(rate, 'bpjson.org.candidate_name', rate.bp)
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
                      <Box
                        style={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          aria-label='account'
                          className={classNames({
                            [classes.avatar]: imageURL
                          })}
                        >
                          {!imageURL ? (
                            'BP'
                          ) : (
                            <img src={imageURL} alt='' width='100%' />
                          )}
                        </Avatar>
                        <Typography style={{ marginLeft: 15 }}>
                          {date.length > 1
                            ? `${t('youRated')} ${BPName} - ${date}`
                            : `${t('youRated')} ${BPName}`}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid item md={12} xs={12}>
                          <Typography variant='subtitle1'>
                            {t('yourRating')}
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography>
                            {`${t('community')}: ${formatNumber(
                              rate.ratings.community,
                              0
                            )}`}
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography>
                            {`${t('development')}: ${formatNumber(
                              rate.ratings.development,
                              0
                            )}`}
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography>
                            {`${t('infrastructure')}: ${formatNumber(
                              rate.ratings.infrastructure,
                              0
                            )}`}
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography>
                            {`${t('transparency')}: ${formatNumber(
                              rate.ratings.transparency,
                              0
                            )}`}
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography>
                            {`${t('trustiness')}: ${formatNumber(
                              rate.ratings.trustiness,
                              0
                            )}`}
                          </Typography>{' '}
                        </Grid>
                        <Grid item md={9} xs={12} style={{ marginTop: 20 }}>
                          {rate.tx_data && (
                            <Link
                              rel='noopener'
                              target='_blank'
                              className={classes.link}
                              href={`${mainConfig.blockExplorer}/transaction/${rate.tx_data.transaction.transactionId}`}
                            >
                              {rate.tx_data.transaction.transactionId}
                            </Link>
                          )}
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <Box style={{ float: isDesktop ? 'right' : 'left' }}>
                            <IconButton
                              onClick={() => onHandleDeleteUserRate(rate.bp)}
                              style={{ fontSize: '1.2em', color: '#cd4729' }}
                            >
                              <CloseIcon style={{ margin: '0 10px 2px 0' }} />
                              {t('unpublish')}
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </Box>
            <Snackbar
              open={showMessage}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity='warning'>
                {t('voteWithoutLogin')}
              </Alert>
            </Snackbar>
            <Snackbar
              open={ratingState.txError}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity='error'>
                {ratingState.txError}
              </Alert>
            </Snackbar>
            <Snackbar
              open={ratingState.txSuccess}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity='success'>
                {t('success')}
              </Alert>
            </Snackbar>
            <Button
              className={classes.button}
              color='secondary'
              onClick={() => ual.logout()}
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
  ual: PropTypes.object
}

export default Account