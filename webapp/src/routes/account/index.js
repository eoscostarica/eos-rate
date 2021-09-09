import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import MuiAlert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Snackbar from '@material-ui/core/Snackbar'
import { useMediaQuery } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import _get from 'lodash.get'

import TitlePage from 'components/title-page'
import { contract, blockExplorer } from '../../config'
import styles from './styles'
import formatNumber from '../../utils/formatNumber'

const useStyles = makeStyles(styles)

const INIT_RATING_STATE_DATA = {
  processing: false,
  txError: null,
  txSuccess: false
}

const Account = ({ ual }) => {
  const { t } = useTranslation('account')
  const dispatch = useDispatch()
  const classes = useStyles()
  const [ratingState, setRatingState] = useState(INIT_RATING_STATE_DATA)
  const [showMessage, setShowMessage] = useState(false)
  const isDesktop = useMediaQuery('(min-width:769px)')
  const { data: user } = useSelector((state) => state.user)

  const onHandleDeleteUserRate = async (bpName) => {
    try {
      if (!user) {
        setShowMessage(true)

        return
      }

      const transaction = {
        actions: [
          {
            account: contract,
            name: 'rmrate',
            authorization: [
              {
                actor: user.account_name,
                permission: 'active'
              }
            ],
            data: { user: user.account_name, bp: bpName }
          }
        ]
      }

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      await dispatch.user.deleteUserRate({
        user: user.account_name,
        bpName
      })

      await dispatch.user.getUserChainData({ ual })

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

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  useEffect(() => {
    const getAccountInfo = async () => {
      if (ual.activeUser) {
        await dispatch.user.getUserChainData({ ual })
      }
    }

    getAccountInfo()
  }, [ual.activeUser, ual])

  return (
    <Grid container className={classes.container}>
      <TitlePage title={`${t('title')} ${user ? user.account_name : ''}`} />
      <Grid item xs={12}>
        <Paper className={classes.account}>
          <Typography variant='h5' className={classes.title}>
            {t('title')}
          </Typography>
          <Grid className={classes.box}>
            <Typography variant='subtitle1' className={classes.bold}>
              {user
                ? `${user.account_name}: ${user.core_liquid_balance}`
                : 'accountName: 0'}
            </Typography>
            <Box className={classes.rateList}>
              {(user ? user.userRates : []).map((rate) => {
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
                              href={`${blockExplorer}/transaction/${rate.tx_data.transaction.transactionId}`}
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
