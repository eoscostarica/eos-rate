/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import _get from 'lodash.get'
import classNames from 'classnames'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

import TitlePage from '../../components/PageTitle'
import PolarChart from '../../components/PolarChart'
import getBPRadarData from '../../utils/get-bp-radar-data'
import { useSharedState } from '../../context/state.context'
import { mainConfig } from '../../config'

import SliderRatingSection from './SliderRatingSection'
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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const BlockProducerRate = () => {
  const classes = useStyles()
  const { account } = useParams()
  const { t } = useTranslation('bpRatePage')
  const [state, { setProducer }] = useSharedState()
  const [ratingState, setRatingState] = useState(INIT_RATING_STATE_DATA)
  const [isRated, setIsRated] = useState(true)
  const [blockProducerLogo, setBlockProducerLogo] = useState(null)
  const [blockProducerTitle, setBlockProducerTitle] = useState('No Title')
  const [polarChartData, setPolarChartData] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const linkBack = useRef(null)
  const [lastTransactionId, setLastTransactionId] = useState(undefined)

  // const isDesktop = useMediaQuery('(min-width:769px)')
  const isMobile = useMediaQuery('(max-width:767px)')
  // const [sizes, setSizes] = useState()

  const handleStateChange = parameter => (event, value) => {
    setRatingState({ ...ratingState, [parameter]: value })
  }

  // useEffect(() => {
  //   // setSizes(isDesktop ? 425 : '100%')
  // }, [isDesktop])

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
    linkComponent()
    setLastTransactionId(undefined)
  }

  const linkComponent = () => {
    linkBack.current.click()
  }

  useEffect(() => {
    // dispatch.blockProducers.setShowSortSelected(false)
  }, [])

  // const getRatingData = (useString = false) => {
  //   const {
  //     community,
  //     communityEnabled,
  //     development,
  //     developmentEnabled,
  //     infra,
  //     infraEnabled,
  //     transparency,
  //     transparencyEnabled,
  //     trustiness,
  //     trustinessEnabled
  //   } = ratingState

  //   if (useString) {
  //     return {
  //       community: formatNumber(communityEnabled ? community : 0, 0).toString(),
  //       development: formatNumber(
  //         developmentEnabled ? development : 0,
  //         0
  //       ).toString(),
  //       infrastructure: formatNumber(infraEnabled ? infra : 0, 0).toString(),
  //       transparency: formatNumber(
  //         transparencyEnabled ? transparency : 0,
  //         0
  //       ).toString(),
  //       trustiness: formatNumber(
  //         trustinessEnabled ? trustiness : 0,
  //         0
  //       ).toString()
  //     }
  //   }

  //   return {
  //     community: communityEnabled ? community : 0,
  //     development: developmentEnabled ? development : 0,
  //     infrastructure: infraEnabled ? infra : 0,
  //     transparency: transparencyEnabled ? transparency : 0,
  //     trustiness: trustinessEnabled ? trustiness : 0
  //   }
  // }

  const getRatingData = rate => ({
    community: parseFloat(rate.community || 0),
    development: parseFloat(rate.development || 0),
    infrastructure: parseFloat(rate.development || 0),
    transparency: parseFloat(rate.transparency || 0),
    trustiness: parseFloat(rate.trustiness || 0)
  })

  const transact = async () => {
    try {
      if (!state.user.accountName) {
        setShowMessage(true)

        return
      }

      const transaction = {
        actions: [
          {
            authorization: [
              {
                actor: state.user.accountName,
                permission: 'active'
              }
            ],
            account: mainConfig.contract,
            name: 'rate',
            data: {
              user: state.user.accountName,
              bp: account,
              ...getRatingData(true)
            }
          }
        ]
      }

      setRatingState({
        ...ratingState,
        txError: null,
        processing: true,
        txSuccess: false
      })

      const result = await state.ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      // await dispatch.blockProducers.saveLastTransaction({
      //   transaction: {
      //     transactionId: result.transaction.transaction_id,
      //     transactionDate: result.transaction.processed.block_time
      //   }
      // })
      setLastTransactionId(result.transactionId)

      // await dispatch.blockProducers.mutationInsertUserRating({
      //   ual,
      //   user: accountName,
      //   bp: account,
      //   ...getRatingData(false),
      //   result
      // })

      setRatingState({
        ...ratingState,
        processing: false,
        txSuccess: true
      })

      handleSetLastTransactionId()
    } catch (err) {
      setRatingState({
        ...ratingState,
        processing: false,
        txError: err.cause ? err.cause.message : err
      })
    }
  }

  const setProfileData = (bp, userDataSet) => {
    const edenDataSet = getBPRadarData({
      name: t('edenRates'),
      parameters: getRatingData(bp.edenRate)
    })

    setBlockProducerTitle(
      `${t('title')} ${
        _get(bp, 'bpjson.org.candidate_name') ||
        _get(bp, 'system.owner', t('noBlockProducer'))
      } - EOS Rate`
    )
    setBlockProducerLogo(_get(bp, 'bpjson.org.branding.logo_256', null))
    setPolarChartData([
      { ...bp.data, name: t('eosRates') },
      edenDataSet,
      userDataSet
    ])
  }

  useEffect(() => {
    const getBpData = async () => {
      if (state.blockProducers.data.length) {
        // TODO: do a double check if this is necessary
        const bp = state.blockProducers.data.find(
          ({ owner }) => owner === account
        )

        setProfileData(bp, {})

        return
      }

      await setProducer(account)
    }

    getBpData()
  }, [account])

  useEffect(() => {
    if (state.user && state.blockProducer) {
      const { userRates = [] } = state.user.userData
      const bpRated = userRates.find(
        rate => rate.owner === state.blockProducer.owner
      )
      const parameters = getRatingData(bpRated.ratings)
      const userDataSet = getBPRadarData({
        name: t('myRate'),
        parameters: getRatingData(bpRated.ratings)
      })

      if (
        state.user.userData.edenMember ||
        state.user.userData.hasProxy ||
        state.user.userData.producersCount >= 21
      ) {
        setShowAlert(false)
      } else {
        setShowAlert(true)
      }

      setProfileData(state.blockProducer, userDataSet)
      setIsRated(!!bpRated)
      setRatingState({ ...INIT_RATING_STATE_DATA, ...parameters })
    }
  }, [state.user, state.blockProducer])

  return (
    <Grid container justifyContent='center' className={classes.container}>
      <TitlePage title={blockProducerTitle} />
      <Grid item xs={12}>
        <Grid
          container
          direction='row'
          alignItems='center'
          className={classes.breadcrumbText}
        >
          <Button
            className={classes.backButtonStyle}
            component={forwardRef((props, ref) => (
              <Link {...props} ref={ref} to='/block-producers' />
            ))}
          >
            <KeyboardArrowLeft />
            {t('allBPs')}
          </Button>
          <Button
            className={classes.linkRate}
            component={forwardRef((props, ref) => (
              <Link
                {...props}
                ref={ref}
                to={`/block-producers/${_get(
                  state.blockProducer,
                  'owner',
                  account
                )}`}
              />
            ))}
          >
            <KeyboardArrowLeft />
            {_get(state.blockProducer, 'owner', account)}
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.reliefGrid}>
        <Grid item md={12} xs={12}>
          <Box style={{ display: 'flex' }}>
            {blockProducerLogo ? (
              <Avatar aria-label='Block Producer' className={classes.avatar}>
                <img src={blockProducerLogo} alt='' width='100%' />
              </Avatar>
            ) : (
              <AccountCircle className={classes.accountCircle} />
            )}
            <Typography variant='h6' className={classes.bpName}>
              {_get(state.blockProducer, 'bpjson.org.candidate_name') ||
                _get(state.blockProducer, 'system.owner', t('noBlockProducer'))}
            </Typography>
          </Box>
        </Grid>
        <Grid container direction='row' style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={5}>
            <Typography variant='subtitle1' className={classes.title}>
              {t('subTitle')}
            </Typography>
            <Typography paragraph> {t('subText')} </Typography>
            <Typography paragraph> {t('helpText')} </Typography>
            <Typography paragraph> {t('rateText')} </Typography>

            {isMobile && (
              <Grid style={{ paddingTop: 20 }} item xs={12}>
                <PolarChart data={polarChartData} />
              </Grid>
            )}

            <SliderRatingSection
              t={t}
              handleStateChange={handleStateChange}
              ratingState={ratingState}
              producer={state.blockProducer}
            />
            <Grid
              className={classNames(classes.ctasWrapper, classes.showOnlyLg)}
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
                  disabled={!state.blockProducer}
                  variant='contained'
                  size='small'
                >
                  {t('cancelRatingButton')}
                </Button>
                <Link
                  ref={linkBack}
                  style={{ display: 'none' }}
                  to={`/block-producers/${_get(
                    state.blockProducer,
                    'owner',
                    null
                  )}`}
                  state={{ transactionId: lastTransactionId }}
                />
                <Button
                  className='textPrimary'
                  disabled={
                    showAlert || !state.blockProducer || ratingState.processing
                  }
                  color='secondary'
                  onClick={transact}
                  size='small'
                  style={{ margin: '0 10px' }}
                  variant='contained'
                >
                  {isRated ? t('updateRatingButton') : t('publishRatingButton')}
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
              {!isMobile && (
                <Grid className={classes.radarWrapper} item xs={12}>
                  <PolarChart data={polarChartData} />
                </Grid>
              )}

              <Grid
                className={classNames(classes.ctasWrapper, classes.showOnlySm)}
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
                    disabled={!state.blockProducer}
                    component={forwardRef((props, ref) => (
                      <Link
                        {...props}
                        ref={ref}
                        to={`/block-producers/${_get(
                          state.blockProducer,
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
                      showAlert ||
                      !state.blockProducer ||
                      ratingState.processing
                    }
                    color='secondary'
                    onClick={transact}
                    size='small'
                    style={{ margin: '0 10px' }}
                    variant='contained'
                  >
                    {isRated
                      ? t('updateRatingButton')
                      : t('publishRatingButton')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {showAlert && (
          <Grid container>
            <Alert className={classes.alert} severity='warning'>
              {t('infoMessage')}
            </Alert>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default BlockProducerRate
