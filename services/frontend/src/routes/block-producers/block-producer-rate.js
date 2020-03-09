import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from '@reach/router'
import {
  Avatar,
  Button,
  Chip,
  Grid,
  Paper,
  CircularProgress,
  Typography
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Error from '@material-ui/icons/Error'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import _get from 'lodash.get'
import { withStyles } from '@material-ui/core/styles'

import BlockProducerRadar from 'components/block-producer-radar'
import config from 'config'
import getBPRadarData from 'utils/getBPRadarData'

import SliderRatingSection from './slider-rating-section'

const style = theme => ({
  container: {
    padding: 10
  },
  bpName: {
    marginLeft: 6
  },
  accountCircle: {
    color: theme.palette.secondary.light
  },
  radarActionsWrapper: {
    height: '100%',
    justifyContent: 'space-between'
  },
  radarWrapper: {
    flexBasis: 0,
    background: '#000',
    padding: '30px 0'
  },
  ctasWrapper: {
    flexBasis: 0
  },
  box: {
    padding: 20
  },
  title: {
    color: '#5cf68a',
    marginBottom: 10
  },
  subTitle: {
    fontWeight: 'bold'
  },
  value: {
    marginLeft: 4
  },
  category: {
    marginTop: 10
  },
  breadcrumbText: {
    color: '#fff',
    textTransform: 'uppercase'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
})

const INIT_RATING_STATE_DATA = {
  community: 0,
  communityEnabled: true,
  development: 0,
  developmentEnabled: true,
  infra: 0,
  infraEnabled: true,
  transparency: 0,
  transparencyEnabled: true,
  trustiness: 0,
  trustinessEnabled: true,
  processing: false,
  txError: null,
  txSuccess: false
}

const BlockProducerRate = ({
  classes,
  account,
  producer,
  getBPRating,
  addUserRating,
  userRate,
  getBlockProducer,
  ual
}) => {
  const [ratingState, setRatingState] = useState(INIT_RATING_STATE_DATA)
  const [showMessage, setShowMessage] = useState(false)
  const { t } = useTranslation('bpRatePage')
  const accountName = _get(ual, 'activeUser.accountName', null)
  const bpData = _get(producer, 'data', {})

  useEffect(() => {
    if (account) {
      getBlockProducer(account)
    }

    if (accountName) {
      getBPRating({ bp: account, userAccount: accountName })
      setShowMessage(false)
    }
  }, [accountName, account])

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
    } else {
      setRatingState(INIT_RATING_STATE_DATA)
    }
  }, [userRate])

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
        community: (communityEnabled ? community : 0).toString(),
        development: (developmentEnabled ? development : 0).toString(),
        infrastructure: (infraEnabled ? infra : 0).toString(),
        transparency: (transparencyEnabled ? transparency : 0).toString(),
        trustiness: (trustinessEnabled ? trustiness : 0).toString()
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
            account: config.contract,
            name: 'rate',
            authorization: [
              {
                actor: accountName,
                permission: 'active'
              }
            ],
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

      await addUserRating({
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

      setTimeout(() => {
        setRatingState({
          ...ratingState,
          txSuccess: false
        })
      }, 2000)
    } catch (err) {
      setRatingState({
        ...ratingState,
        processing: false,
        txError: err.message ? err.message : err
      })
    }
  }

  const handleStateChange = parameter => (event, value) =>
    setRatingState({ ...ratingState, [parameter]: value })

  const bPLogo = _get(producer, 'bpjson.org.branding.logo_256', null)

  return (
    <Grid container justify='center' className={classes.container}>
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
                to={`/block-producers/${_get(producer, 'owner', null)}`}
              />
            ))}
          >
            <KeyboardArrowLeft />
            {_get(producer, 'owner', null)}
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
                      _get(producer, 'system.owner', 'No name')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction='row' style={{ marginTop: 10 }}>
              <Grid item xs={12} sm={5}>
                <Typography variant='subtitle1' className={classes.title}>
                  {t.subTitle}
                </Typography>
                <Typography paragraph> {t('subText')} </Typography>
                <Typography paragraph> {t('helpText')} </Typography>
                <Typography paragraph> {t('rateText')} </Typography>
                <SliderRatingSection
                  t={t}
                  handleStateChange={handleStateChange}
                  ratingState={ratingState}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <Grid
                  container
                  direction='column'
                  className={classes.radarActionsWrapper}
                >
                  <Grid className={classes.radarWrapper} item xs={12}>
                    <BlockProducerRadar
                      showLabel
                      bpData={{
                        datasets: [
                          { ...bpData, label: t('globalRate') },
                          userDataSet
                        ]
                      }}
                    />
                  </Grid>
                  <Grid className={classes.ctasWrapper} item xs={12}>
                    <Grid
                      alignItems='center'
                      container
                      justify='flex-end'
                      style={{ marginTop: 10 }}
                    >
                      {showMessage && (
                        <Chip
                          avatar={
                            <Avatar>
                              <Error />
                            </Avatar>
                          }
                          color='secondary'
                          label={t('rateWithoutLogin')}
                          variant='outlined'
                        />
                      )}
                      {ratingState.txError && (
                        <Chip
                          avatar={
                            <Avatar>
                              <Error />
                            </Avatar>
                          }
                          color='secondary'
                          label={ratingState.txError}
                          variant='outlined'
                        />
                      )}
                      {ratingState.txSuccess && (
                        <Chip
                          avatar={
                            <Avatar>
                              <CheckCircle />
                            </Avatar>
                          }
                          color='secondary'
                          label='Success!'
                          variant='outlined'
                        />
                      )}
                      {ratingState.processing && (
                        <CircularProgress color='secondary' size={20} />
                      )}
                      <Button
                        className='textPrimary'
                        disabled={ratingState.processing}
                        color='secondary'
                        onClick={transact}
                        size='small'
                        style={{ margin: '0 10px' }}
                        variant='contained'
                      >
                        {t('publishRatingButton')}
                      </Button>
                      <Button
                        component={forwardRef((props, ref) => (
                          <Link
                            {...props}
                            ref={ref}
                            to={`/block-producers/${_get(
                              producer,
                              'bpjson.producer_account_name',
                              null
                            )}`}
                          />
                        ))}
                        variant='contained'
                        size='small'
                      >
                        {t('cancelRatingButton')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

BlockProducerRate.propTypes = {
  classes: PropTypes.object,
  account: PropTypes.string,
  producer: PropTypes.object,
  getBPRating: PropTypes.func,
  addUserRating: PropTypes.func,
  userRate: PropTypes.object,
  getBlockProducer: PropTypes.func,
  ual: PropTypes.object
}

const mapStateToProps = ({ blockProducers: { producer, userRate } }) => ({
  producer,
  userRate
})

const mapDispatchToProps = dispatch => ({
  getBPRating: dispatch.blockProducers.getBlockProducerRatingByOwner,
  addUserRating: dispatch.blockProducers.mutationInsertUserRating,
  getBlockProducer: dispatch.blockProducers.getBlockProducerByOwner
})

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchToProps)(BlockProducerRate)
)
