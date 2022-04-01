/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useHistory } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import _get from 'lodash.get'
import clsx from 'clsx'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Table from '../../components/Table'
import TableBoxColor from '../../components/TableBoxColor'
import TitlePage from '../../components/PageTitle'
import PolarChart from '../../components/PolarChart'
import getBPRadarData from '../../utils/get-bp-radar-data'
import { useSharedState } from '../../context/state.context'
import formatNumber from '../../utils/format-number'
import { mainConfig } from '../../config'

import SliderRatingSection from './SliderRatingSection'
import getAverageValue from '../../utils/get-average-value'
import getMyRatingAverage from '../../utils/get-my-rating-average'
import styles from './styles'

const useStyles = makeStyles(styles)

const ratingStateData = functionName => ({
  community: 1,
  communityEnabled: true,
  development: 1,
  developmentEnabled: true,
  infrastructure: 1,
  infraEnabled: true,
  transparency: 1,
  transparencyEnabled: true,
  trustiness: 1,
  trustinessEnabled: true,
  processing: false,
  txError: null,
  txSuccess: false
})
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const RadarSection = ({
  t,
  state,
  myRating,
  polarChartData,
  classes,
  isRated
}) => (
  <>
    <Grid className={classes.chartWrapperSliderView} item md={12} xs={12}>
      <PolarChart data={polarChartData} showLegend />
    </Grid>
    <Grid className={classes.tableBox} item md={11} xs={12}>
      {polarChartData.length > 0 && (
        <Table
          rows={[
            {
              box: <TableBoxColor color={polarChartData[2].color} />,
              rater: t('myRate'),
              amount: isRated ? 1 : 0,
              average: getMyRatingAverage({
                community: myRating.community,
                development: myRating.development,
                infrastructure: myRating.infrastructure,
                transparency: myRating.transparency,
                trustiness: myRating.trustiness
              })
            },
            {
              box: <TableBoxColor color={polarChartData[0].color} />,
              rater: t('globalRate'),
              amount: state.blockProducer?.ratings_cntr || 0,
              average: getAverageValue(_get(state.blockProducer, 'average', 0))
            },
            {
              box: <TableBoxColor color={polarChartData[1].color} />,
              rater: t('edenRates'),
              amount: state.blockProducer?.eden_ratings_cntr || 0,
              average: getAverageValue(
                _get(state.blockProducer, 'eden_average', 0)
              )
            },
            {
              box: <TableBoxColor color={polarChartData[3].color} />,
              rater: t('totalRates'),
              amount: state.blockProducer?.total_ratings_cntr || 0,
              average: formatNumber(
                state.blockProducer?.total_average || 0.0,
                1
              )
            }
          ]}
          heads={[t(''), t('raters'), t('amount'), t('average')]}
        />
      )}
    </Grid>
  </>
)

RadarSection.propTypes = {
  t: PropTypes.any,
  state: PropTypes.object,
  myRating: PropTypes.object,
  polarChartData: PropTypes.array,
  classes: PropTypes.object,
  isRated: PropTypes.bool
}

const BlockProducerRate = () => {
  const initialRatingState = () => ratingStateData()
  const classes = useStyles()
  const { account } = useParams()
  const history = useHistory()
  const { t } = useTranslation('bpRatePage')
  const [
    state,
    { setProducer, setLastTransaction, handleMutationInsertUserRating }
  ] = useSharedState()
  const [ratingState, setRatingState] = useState(initialRatingState)
  const [isRated, setIsRated] = useState(false)
  const [blockProducerLogo, setBlockProducerLogo] = useState(null)
  const [blockProducerTitle, setBlockProducerTitle] = useState('No Title')
  const [polarChartData, setPolarChartData] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [myRating, setMyRating] = useState({})
  const characterLimit = 500
  const [comment, setComment] = useState('')

  const handleTextAreaChange = name => event => {
    setComment(event.target.value)
  }

  const handleStateChange = parameter => (e, value) => {
    setRatingState(prevRating => ({ ...prevRating, [parameter]: value }))
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
    history.push({
      pathname: `/block-producers/${account}`
    })
  }
  const getRatingData = (useString = false) => {
    const {
      community,
      communityEnabled,
      development,
      developmentEnabled,
      infrastructure,
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
        infrastructure: formatNumber(
          infraEnabled ? infrastructure : 0,
          0
        ).toString(),
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
      infrastructure: infraEnabled ? infrastructure : 0,
      transparency: transparencyEnabled ? transparency : 0,
      trustiness: trustinessEnabled ? trustiness : 0
    }
  }

  const getSavedRatingData = rate => ({
    community: parseFloat(formatNumber(rate?.community || 0, 1)),
    development: parseFloat(formatNumber(rate?.development || 0, 1)),
    infrastructure: parseFloat(formatNumber(rate?.infrastructure || 0, 1)),
    transparency: parseFloat(formatNumber(rate?.transparency || 0, 1)),
    trustiness: parseFloat(formatNumber(rate?.trustiness || 0, 1))
  })

  const sendComment = async () => {
    try {
      if (!state.user?.accountName) {
        setShowMessage(true)

        return
      }
      const transaction = {
        actions: [
          {
            account: mainConfig.contract,
            name: 'logcomment',
            authorization: [
              {
                actor: state.user?.accountName,
                permission: 'active'
              }
            ],
            data: {
              user: state.user?.accountName,
              bp: account,
              comment
            }
          }
        ]
      }
      await state.ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })
    } catch (error) {
      console.warn(error)
    }
  }

  const transact = async () => {
    try {
      if (!state.user?.accountName) {
        setShowMessage(true)

        return
      }

      const transaction = {
        actions: [
          {
            authorization: [
              {
                actor: state.user?.accountName,
                permission: 'active'
              }
            ],
            account: mainConfig.contract,
            name: 'rate',
            data: {
              user: state.user?.accountName,
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

      await setLastTransaction({
        transactionId: result.transaction.transaction_id,
        transactionDate: result.transaction.processed.block_time
      })

      await handleMutationInsertUserRating({
        ual: state.ual,
        user: state.user?.accountName,
        bp: account,
        transaction: {
          transaction: {
            transactionId: result.transaction.transaction_id,
            transactionDate: result.transaction.processed.block_time
          }
        },
        ...getRatingData(false),
        result
      })

      setRatingState({
        ...ratingState,
        processing: false,
        txSuccess: true
      })
      sendComment()
      handleSetLastTransactionId()
    } catch (err) {
      setRatingState({
        ...ratingState,
        processing: false,
        txError: err.cause ? err.cause.message : err
      })
    }
  }

  const toNumbers = arr => arr.map(Number)

  const setProfileData = (bp, userDataSet) => {
    if (bp) {
      const edenDataSet = getBPRadarData({
        colorString: 'edenRates',
        name: t('edenRates'),
        parameters: getSavedRatingData(bp?.edenRate),
        visible: false
      })

      setBlockProducerTitle(
        `${t('title')} ${
          _get(bp, 'bpjson.org.candidate_name') ||
          _get(bp, 'system.owner', t('noBlockProducer'))
        } - EOS Rate`
      )
      setBlockProducerLogo(_get(bp, 'bpjson.org.branding.logo_256', null))
      const generalRateData = toNumbers(bp.data.data)

      if (bp.total_ratings_cntr) {
        const totalStatsDataSet = getBPRadarData({
          colorString: 'totalRates',
          name: t('totalRates'),
          parameters: getSavedRatingData({
            average: bp.total_average,
            community: bp.total_community,
            development: bp.total_development,
            infrastructure: bp.total_infrastructure,
            ratings_cntr: bp.total_ratings_cntr,
            transparency: bp.total_transparency,
            trustiness: bp.total_trustiness
          })
        })
        setPolarChartData([
          {
            ...bp.data,
            name: t('globalRate'),
            data: generalRateData,
            visible: false
          },
          edenDataSet,
          userDataSet,
          totalStatsDataSet
        ])
      }
    }
  }

  useEffect(() => {
    const getBpData = async () => {
      if (state.blockProducers?.data?.length) {
        const bp = state.blockProducers.data.find(
          ({ owner }) => owner === account
        )
        setProducer(bp, true)
        setProfileData(
          bp,
          getBPRadarData({
            colorString: 'myRate',
            name: t('myRate'),
            parameters: getSavedRatingData({})
          })
        )

        return
      }

      await setProducer(account)
    }

    getBpData()
  }, [account])

  useEffect(() => {
    if (state.blockProducer) {
      if (!state.user) {
        setProfileData(
          state.blockProducer,
          getBPRadarData({
            colorString: 'myRate',
            name: t('myRate'),
            parameters: getSavedRatingData({})
          })
        )

        return
      }

      let bpRated
      const userRates = state.user?.userData?.userRates || []

      userRates.forEach(rate => {
        if (rate?.owner === state?.blockProducer?.owner) {
          if (!bpRated) bpRated = rate
          else if (
            Date.parse(bpRated?.tx_data?.transaction.transactionDate) <
            Date.parse(rate?.tx_data?.transaction?.transactionDate)
          )
            bpRated = rate
        }
      })

      if (bpRated) {
        setMyRating(bpRated?.ratings)
        setRatingState({
          ...ratingState,
          ...getSavedRatingData(bpRated?.ratings)
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
      } else {
        setRatingState(ratingState)
      }
      setIsRated(!!bpRated)
    }
  }, [state.user, state.blockProducer])

  useEffect(() => {
    const userDataSet = getBPRadarData({
      colorString: 'myRate',
      name: t('myRate'),
      parameters: getRatingData()
    })
    setProfileData(state.blockProducer, userDataSet)
  }, [ratingState])

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
        <Grid item md={12} xs={12} style={{ marginBottom: 10 }}>
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
          <Grid item xs={12} className={classes.infoGridStyle} md={6}>
            <Typography variant='h6' className={classes.title}>
              {t('subTitle')}
            </Typography>
            <Typography paragraph style={{ padding: 10 }}>
              {' '}
              {t('helpText')}{' '}
            </Typography>
            <Grid className={classes.showMobile} item xs={12}>
              <RadarSection
                t={t}
                state={state}
                myRating={myRating}
                polarChartData={polarChartData}
                isRated={isRated}
                classes={classes}
              />
            </Grid>
            <SliderRatingSection
              t={t}
              handleStateChange={handleStateChange}
              ratingState={ratingState}
              producer={state.blockProducer}
            />
            <Grid className={classes.showMobile} item xs={12}>
              <Box
                component='form'
                noValidate
                autoComplete='off'
                className={classes.commentContainer}
              >
                <div>
                  <Typography className={classes.commentTitle} variant='h6'>
                    Add Comments
                  </Typography>
                  <TextField
                    className={classes.textField}
                    id='outlined-multiline-static'
                    multiline
                    rows={4}
                    placeholder={t('commentReasoning')}
                    inputProps={{ maxLength: characterLimit }}
                    value={comment}
                    onChange={handleTextAreaChange('name')}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          className={classes.counter}
                          position='end'
                        >{`${comment.length}/${characterLimit}`}</InputAdornment>
                      )
                    }}
                  />
                </div>
              </Box>
            </Grid>
            <Grid
              className={clsx(classes.ctasWrapper, classes.showOnlyLg)}
              style={{ margin: '10px 0 10px 0' }}
              item
              xs={12}
            >
              <Grid
                alignItems='center'
                container
                justifyContent='center'
                style={{ marginTop: 30 }}
              >
                <Grid item xs={12} md={12} className={classes.centerContent}>
                  <Snackbar
                    open={showMessage}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    className={classes.snackbarCenter}
                  >
                    <Alert onClose={handleClose} severity='warning'>
                      {t('rateWithoutLogin')}
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={ratingState.txError}
                    onClose={handleClose}
                    className={classes.snackbarCenter}
                  >
                    <Alert onClose={handleClose} severity='error'>
                      {ratingState.txError}
                    </Alert>
                  </Snackbar>
                  {ratingState.processing && (
                    <CircularProgress color='secondary' size={20} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            className={classes.showDesktop}
            justifyContent='center'
          >
            <RadarSection
              classes={classes}
              t={t}
              myRating={myRating}
              state={state}
              isRated={isRated}
              polarChartData={polarChartData}
            />
            <Box
              component='form'
              noValidate
              autoComplete='off'
              className={classes.commentContainer}
            >
              <div>
                <Typography className={classes.commentTitle} variant='h6'>
                  Add Comments
                </Typography>
                <TextField
                  className={classes.textField}
                  id='outlined-multiline-static'
                  multiline
                  rows={4}
                  placeholder={t('commentReasoning')}
                  inputProps={{ maxLength: characterLimit }}
                  value={comment}
                  onChange={handleTextAreaChange('name')}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        className={classes.counter}
                        position='end'
                      >{`${comment.length}/${characterLimit}`}</InputAdornment>
                    )
                  }}
                />
              </div>
            </Box>
            <Grid item md={12} />
            <Grid item md={12} />
            <Grid item md={12} />
          </Grid>
        </Grid>

        {showAlert && (
          <Grid container>
            <Alert className={classes.alert} severity='warning'>
              {t('infoMessage')}
            </Alert>
          </Grid>
        )}

        <Grid
          display='flex'
          justifyContent='center'
          marginTop={5}
          xs={12}
          md={12}
        >
          <Grid item className={classes.centerContent}>
            <Button
              disabled={!state.blockProducer}
              className={classes.btnOutline}
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
              variant='outlined'
            >
              {t('cancelRatingButton')}
            </Button>
          </Grid>
          <Grid item className={classes.centerContent}>
            <Button
              className={classes.raisedButton}
              disabled={
                showAlert || !state.blockProducer || ratingState.processing
              }
              color='secondary'
              onClick={transact}
              size='small'
              variant='contained'
            >
              {isRated ? t('updateRatingButton') : t('publishRatingButton')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

BlockProducerRate.whyDidYouRender = true

export default BlockProducerRate
