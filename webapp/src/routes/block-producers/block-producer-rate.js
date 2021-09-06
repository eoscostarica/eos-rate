/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from '@reach/router'
import {
  useMediaQuery,
  Avatar,
  Button,
  IconButton,
  Grid,
  Paper,
  CircularProgress,
  Typography,
  Link as MLink
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Close from '@material-ui/icons/Close'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import _get from 'lodash.get'
import classNames from 'classnames'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import formatNumber from 'utils/formatNumber'

import TitlePage from 'components/title-page'
import Radar from 'components/radar'
import { contract, blockExplorer } from '../../config'
import getBPRadarData from 'utils/getBPRadarData'

import SliderRatingSection from './slider-rating-section'
import styles from './styles'

const useStyles = makeStyles(styles)

const INIT_RATING_STATE_DATA = {
  community: 1,
  communityEnabled: true,
  development: 1,
  developmentEnabled: true,
  infra: 1,
  infraEnabled: true,
  transparency: 1,
  transparencyEnabled: true,
  trustiness: 1,
  trustinessEnabled: true,
  processing: false,
  txError: null,
  txSuccess: false
}

const BlockProducerRate = ({ account, ual }) => {
  const [ratingState, setRatingState] = useState(INIT_RATING_STATE_DATA)
  const [isNewRate, setIsNewRate] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const { t } = useTranslation('bpRatePage')
  const dispatch = useDispatch()
  const { producer, userRate } = useSelector((state) => state.blockProducers)
  const { data: user } = useSelector((state) => state.user)
  const classes = useStyles()
  const accountName = _get(ual, 'activeUser.accountName', null)
  const bpData = _get(producer, 'data', {})
  const [lastTransactionId, setLastTransactionId] = useState(undefined)
  const isDesktop = useMediaQuery('(min-width:767px)')
  const [sizes, setSizes] = useState()

  const handleStateChange = (parameter) => (event, value) => {
    setRatingState({ ...ratingState, [parameter]: value })
  }

  const bPLogo = _get(producer, 'bpjson.org.branding.logo_256', null)

  useEffect(() => {
    setSizes(isDesktop ? 400 : '100%')
  }, [isDesktop])

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
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

  const handleSetLastTransactionId = (event, reason) => {
    setLastTransactionId(undefined)
    window.open(
      window.location.href.substring(0, window.location.href.length - 5),
      '_self'
    )
  }

  useEffect(() => {
    const getData = async () => {
      if (account) {
        dispatch.blockProducers.getBlockProducerByOwner(account)
      }

      if (accountName) {
        await dispatch.user.getUserChainData({ ual })

        dispatch.blockProducers.getBlockProducerRatingByOwner({
          bp: account,
          userAccount: accountName
        })
        setShowMessage(false)
      }
    }

    getData()
  }, [accountName, account, ual, setShowMessage])

  useEffect(() => {
    if (userRate) {
      setRatingState({
        ...ratingState,
        community: accountName ? userRate.community : 1,
        development: accountName ? userRate.development : 1,
        infra: accountName ? userRate.infrastructure : 1,
        transparency: accountName ? userRate.transparency : 1,
        trustiness: accountName ? userRate.trustiness : 1
      })
      setIsNewRate(false)
    } else {
      setRatingState(INIT_RATING_STATE_DATA)
    }
  }, [userRate, accountName, setRatingState])

  useEffect(() => {
    dispatch.blockProducers.setShowSortSelected(false)
  }, [])

  useEffect(() => {
    if (user && (user.hasProxy || user.producersCount >= 21)) {
      setShowAlert(false)
    } else {
      user && setShowAlert(true)
    }
  }, [user, setShowAlert])

  const getRatingData = (useString = false) => {
    const {
      community,
      communityEnabled,
      development,
      developmentEnabled,
      infra,
      infraEnabled,
      transparency,
      transparencyEnabled,
      trustiness,
      trustinessEnabled
    } = ratingState

    if (useString) {
      return {
        community: formatNumber(communityEnabled ? community : 0, 0).toString(),
        development: formatNumber(
          developmentEnabled ? development : 0,
          0
        ).toString(),
        infrastructure: formatNumber(infraEnabled ? infra : 0, 0).toString(),
        transparency: formatNumber(
          transparencyEnabled ? transparency : 0,
          0
        ).toString(),
        trustiness: formatNumber(
          trustinessEnabled ? trustiness : 0,
          0
        ).toString()
      }
    }

    return {
      community: communityEnabled ? community : 0,
      development: developmentEnabled ? development : 0,
      infrastructure: infraEnabled ? infra : 0,
      transparency: transparencyEnabled ? transparency : 0,
      trustiness: trustinessEnabled ? trustiness : 0
    }
  }

  const userDataSet = getBPRadarData({
    name: t('myRate'),
    parameters: getRatingData()
  })

  const transact = async () => {
    try {
      if (!accountName) {
        setShowMessage(true)

        return
      }

      const transaction = {
        actions: [
          {
            authorization: [
              {
                actor: accountName,
                permission: 'active'
              }
            ],
            account: contract,
            name: 'rate',
            data: { user: accountName, bp: account, ...getRatingData(true) }
          }
        ]
      }

      setRatingState({
        ...ratingState,
        txError: null,
        processing: true,
        txSuccess: false
      })

      const result = await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      await dispatch.blockProducers.saveLastTransaction({
        transacction: {
          transacctionId: result.transaction.transaction_id,
          transacctionDate: result.transaction.processed.block_time
        }
      })
      setLastTransactionId(result.transactionId)

      await dispatch.blockProducers.mutationInsertUserRating({
        ual,
        user: accountName,
        bp: account,
        ...getRatingData(false),
        result
      })

      setRatingState({
        ...ratingState,
        processing: false,
        txSuccess: true
      })
    } catch (err) {
      setRatingState({
        ...ratingState,
        processing: false,
        txError: err.cause ? err.cause.message : err
      })
    }
  }

  return (
    <Grid container justifyContent='center' className={classes.container}>
      <TitlePage
        title={`${t('title')} ${
          _get(producer, 'bpjson.org.candidate_name') ||
          _get(producer, 'system.owner', t('noBlockProducer'))
        } - EOS Rate`}
      />
      <Grid item xs={12}>
        <Grid
          container
          direction='row'
          alignItems='center'
          className={classes.breadcrumbText}
        >
          <Button
            component={forwardRef((props, ref) => (
              <Link {...props} ref={ref} to='/block-producers' />
            ))}
          >
            <KeyboardArrowLeft />
            {t('allBPs')}
          </Button>
          <Button
            component={forwardRef((props, ref) => (
              <Link
                {...props}
                ref={ref}
                to={`/block-producers/${_get(producer, 'owner', account)}`}
              />
            ))}
          >
            <KeyboardArrowLeft />
            {_get(producer, 'owner', account)}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Grid
            container
            direction='row'
            alignItems='center'
            className={classes.box}
          >
            <Grid container direction='row' alignItems='center'>
              <Grid item xs={12}>
                <Grid container direction='row' alignItems='center'>
                  {bPLogo ? (
                    <Avatar
                      aria-label='Block Producer'
                      className={classes.avatar}
                    >
                      <img src={bPLogo} alt='' width='100%' />
                    </Avatar>
                  ) : (
                    <AccountCircle className={classes.accountCircle} />
                  )}
                  <Typography variant='h6' className={classes.bpName}>
                    {_get(producer, 'bpjson.org.candidate_name') ||
                      _get(producer, 'system.owner', t('noBlockProducer'))}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction='row' style={{ marginTop: 10 }}>
              <Grid item xs={12} sm={5}>
                <Typography variant='subtitle1' className={classes.title}>
                  {t('subTitle')}
                </Typography>
                <Typography paragraph> {t('subText')} </Typography>
                <Typography paragraph> {t('helpText')} </Typography>
                <Typography paragraph> {t('rateText')} </Typography>
                {!isDesktop && (
                  <Grid style={{ paddingTop: 20 }} item xs={12}>
                    <Radar
                      height={sizes}
                      width={sizes}
                      showLabel
                      bpData={{
                        datasets: [
                          { ...bpData, label: t('globalRate') },
                          userDataSet
                        ]
                      }}
                    />
                  </Grid>
                )}
                <SliderRatingSection
                  t={t}
                  handleStateChange={handleStateChange}
                  ratingState={ratingState}
                  producer={producer}
                />
                <Grid
                  className={classNames(
                    classes.ctasWrapper,
                    classes.showOnlyLg
                  )}
                  style={{ margin: '10px 0 10px 0' }}
                  item
                  xs={12}
                >
                  <Grid
                    alignItems='center'
                    container
                    justifyContent='flex-end'
                    style={{ marginTop: 10 }}
                  >
                    <Snackbar
                      open={showMessage}
                      autoHideDuration={4000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity='warning'>
                        {t('rateWithoutLogin')}
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
                    <Button
                      disabled={!producer}
                      component={forwardRef((props, ref) => (
                        <Link
                          {...props}
                          ref={ref}
                          to={`/block-producers/${_get(
                            producer,
                            'owner',
                            null
                          )}`}
                        />
                      ))}
                      variant='contained'
                      size='small'
                    >
                      {t('cancelRatingButton')}
                    </Button>
                    <Button
                      className='textPrimary'
                      disabled={
                        showAlert || !producer || ratingState.processing
                      }
                      color='secondary'
                      onClick={transact}
                      size='small'
                      style={{ margin: '0 10px' }}
                      variant='contained'
                    >
                      {isNewRate
                        ? t('publishRatingButton')
                        : t('updateRatingButton')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Grid
                  container
                  direction='column'
                  className={classes.radarActionsWrapper}
                >
                  {isDesktop && (
                    <Grid className={classes.radarWrapper} item xs={12}>
                      <Radar
                        height={sizes}
                        width={sizes}
                        showLabel
                        bpData={{
                          datasets: [
                            { ...bpData, label: t('globalRate') },
                            userDataSet
                          ]
                        }}
                      />
                    </Grid>
                  )}
                  <Grid
                    className={classNames(
                      classes.ctasWrapper,
                      classes.showOnlySm
                    )}
                    item
                    style={{ margin: '10px 0 15px 0' }}
                    xs={12}
                  >
                    <Grid
                      alignItems='center'
                      container
                      justifyContent='center'
                      style={{ marginTop: 10 }}
                    >
                      <Snackbar
                        open={showMessage}
                        autoHideDuration={4000}
                        onClose={handleClose}
                      >
                        <Alert onClose={handleClose} severity='warning'>
                          {t('rateWithoutLogin')}
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
                      {ratingState.processing && (
                        <CircularProgress color='secondary' size={20} />
                      )}
                      <Button
                        disabled={!producer}
                        component={forwardRef((props, ref) => (
                          <Link
                            {...props}
                            ref={ref}
                            to={`/block-producers/${_get(
                              producer,
                              'owner',
                              null
                            )}`}
                          />
                        ))}
                        variant='contained'
                        size='small'
                      >
                        {t('cancelRatingButton')}
                      </Button>
                      <Button
                        className='textPrimary'
                        disabled={
                          showAlert || !producer || ratingState.processing
                        }
                        color='secondary'
                        onClick={transact}
                        size='small'
                        style={{ margin: '0 10px' }}
                        variant='contained'
                      >
                        {isNewRate
                          ? t('publishRatingButton')
                          : t('updateRatingButton')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {lastTransactionId && (
              <Grid item md={4} xs={12} lg={2} style={{ margin: 'auto' }}>
                <Alert show className={classes.alert} severity='success'>
                  <Grid
                    container
                    className={classes.alertBody}
                    justifyContent='space-between'
                  >
                    <Typography>{t('success')}</Typography>
                    <Grid
                      className={classes.alertActionsContainer}
                      container
                      justifyContent='space-evenly'
                    >
                      <Button
                        variant='contained'
                        disableElevation
                        className={classes.detailsIconButton}
                        color='primary'
                      >
                        <MLink
                          rel='noopener'
                          target='_blank'
                          style={{ color: 'white' }}
                          href={`${blockExplorer}/transaction/${lastTransactionId}`}
                        >
                          {t('details')}
                        </MLink>
                      </Button>
                      <IconButton
                        className={classes.closeIconButton}
                        onClick={() => handleSetLastTransactionId()}
                      >
                        <Close />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Alert>
              </Grid>
            )}
            {showAlert && (
              <Grid container>
                <Alert className={classes.alert} severity='warning'>
                  {t('infoMessage')}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

BlockProducerRate.propTypes = {
  account: PropTypes.string,
  ual: PropTypes.object
}

export default BlockProducerRate
