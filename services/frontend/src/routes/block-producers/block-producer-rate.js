import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from '@reach/router'
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Switch,
  Tooltip,
  Typography
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Error from '@material-ui/icons/Error'
import HelpOutline from '@material-ui/icons/HelpOutline'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import { withStyles } from '@material-ui/core/styles'

import BlockProducerRadar from 'components/block-producer-radar'
import RateSlider from 'components/rate-slider'
import bpParameters from 'config/comparison-parameters'
import config from 'config'
import getBPRadarData from 'utils/getBPRadarData'
import { useWalletState } from 'hooks/wallet'

const style = theme => ({
  container: {
    padding: 10
  },
  bpName: {
    marginLeft: 6
  },
  parameterTitleDisabled: {
    color: '#bdbdbd'
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
  topicIcon: {
    color: 'rgba(255, 255, 255, 0.38)',
    verticalAlign: 'middle'
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
  userRate
}) => {
  const walletState = useWalletState()
  const [ratingState, setRatingState] = useState(INIT_RATING_STATE_DATA)
  const [showMessage, setShowMessage] = useState(false)
  const { t } = useTranslation('bpRatePage')
  const wallet = walletState.wallet
  const marks = [
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 }
  ]
  const accountName = wallet && wallet.auth.accountName

  useEffect(() => {
    if (accountName) {
      getBPRating({ bp: account, userAccount: accountName })
      setShowMessage(false)
    }
  }, [accountName])

  useEffect(() => {
    if (userRate) {
      setRatingState({
        ...ratingState,
        community: accountName ? userRate.community : 0,
        development: accountName ? userRate.development : 0,
        infra: accountName ? userRate.infrastructure : 0,
        transparency: accountName ? userRate.transparency : 0,
        trustiness: accountName ? userRate.trustiness : 0
      })
    } else {
      setRatingState(INIT_RATING_STATE_DATA)
    }
  }, [userRate])

  const getRatingData = () => ({
    community: ratingState.communityEnabled ? ratingState.community : 0,
    development: ratingState.developmentEnabled ? ratingState.development : 0,
    infrastructure: ratingState.infraEnabled ? ratingState.infra : 0,
    transparency: ratingState.transparencyEnabled
      ? ratingState.transparency
      : 0,
    trustiness: ratingState.trustinessEnabled ? ratingState.trustiness : 0
  })

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

      const dataJson = { user: accountName, bp: account, ...getRatingData() }
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
            data: dataJson
          }
        ]
      }

      setRatingState({
        ...ratingState,
        processing: true,
        txError: null,
        txSuccess: false
      })

      await wallet.eosApi.transact(transaction, {
        blocksBehind: 3,
        expireSeconds: 30
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

      addUserRating(dataJson)
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

  const bPLogo = producer && producer.bpjson ? producer.bpjson.org.branding.logo_256 : null

  return (
    <Grid container justify='center' spacing={16} className={classes.container}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={16}
          direction='row'
          alignItems='center'
          className={classes.breadcrumbText}
        >
          <Button
            component={props => <Link {...props} to='/block-producers' />}
          >
            <KeyboardArrowLeft />
            {t('allBP')}
          </Button>
          <Button
            component={props => (
              <Link {...props} to={`/block-producers/${producer.owner}`} />
            )}
          >
            <KeyboardArrowLeft />
            {producer.owner || ''}
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
                    {producer.bpjson.org.candidate_name ||
                      producer.system.owner}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              spacing={16}
              style={{ marginTop: 10 }}
            >
              <Grid item xs={12} sm={5}>
                <Typography variant='subtitle1' className={classes.title}>
                  {t.subTitle}
                </Typography>
                <Typography paragraph> {t('subText')} </Typography>
                <Typography paragraph> {t('helpText')} </Typography>
                <Typography paragraph> {t('rateText')} </Typography>
                {/* TODO: Iterate over bpParameters */}
                <Grid container style={{ marginTop: 30 }}>
                  <Grid item xs={12}>
                    <Typography
                      paragraph
                      style={{ margin: 0 }}
                      className={
                        ratingState.communityEnabled
                          ? ''
                          : classes.parameterTitleDisabled
                      }
                    >
                      {t('community')}{' '}
                      <Tooltip title={t('communityTooltip')} placement='right'>
                        <HelpOutline
                          fontSize='inherit'
                          className={classes.topicIcon}
                        />
                      </Tooltip>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RateSlider
                        disabled={!ratingState.communityEnabled}
                        onChange={handleStateChange('community')}
                        value={ratingState.community}
                        marks={marks}
                        valueLabelDisplay='on'
                        min={0}
                        step={1}
                        max={10}
                      />
                      <Switch
                        onChange={handleStateChange('communityEnabled')}
                        checked={ratingState.communityEnabled}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      paragraph
                      style={{ margin: 0 }}
                      className={
                        ratingState.developmentEnabled
                          ? ''
                          : classes.parameterTitleDisabled
                      }
                    >
                      {t('development')}{' '}
                      <Tooltip
                        title={t('developmentTooltip')}
                        placement='right'
                      >
                        <HelpOutline
                          fontSize='inherit'
                          className={classes.topicIcon}
                        />
                      </Tooltip>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RateSlider
                        disabled={!ratingState.developmentEnabled}
                        onChange={handleStateChange('development')}
                        value={ratingState.development}
                        marks={marks}
                        valueLabelDisplay='on'
                        min={0}
                        step={1}
                        max={10}
                      />
                      <Switch
                        onChange={handleStateChange('developmentEnabled')}
                        checked={ratingState.developmentEnabled}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      paragraph
                      style={{ margin: 0 }}
                      className={
                        ratingState.infraEnabled
                          ? ''
                          : classes.parameterTitleDisabled
                      }
                    >
                      {t('infrastructure')}{' '}
                      <Tooltip
                        title={t('infrastructureTooltip')}
                        placement='right'
                      >
                        <HelpOutline
                          fontSize='inherit'
                          className={classes.topicIcon}
                        />
                      </Tooltip>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RateSlider
                        disabled={!ratingState.infraEnabled}
                        onChange={handleStateChange('infra')}
                        value={ratingState.infra}
                        marks={marks}
                        valueLabelDisplay='on'
                        min={0}
                        step={1}
                        max={10}
                      />
                      <Switch
                        onChange={handleStateChange('infraEnabled')}
                        checked={ratingState.infraEnabled}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      paragraph
                      style={{ margin: 0 }}
                      className={
                        ratingState.transparencyEnabled
                          ? ''
                          : classes.parameterTitleDisabled
                      }
                    >
                      {t('transparency')}{' '}
                      <Tooltip
                        title={t('transparencyTooltip')}
                        placement='right'
                      >
                        <HelpOutline
                          fontSize='inherit'
                          className={classes.topicIcon}
                        />
                      </Tooltip>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RateSlider
                        disabled={!ratingState.transparencyEnabled}
                        onChange={handleStateChange('transparency')}
                        value={ratingState.transparency}
                        marks={marks}
                        valueLabelDisplay='on'
                        min={0}
                        step={1}
                        max={10}
                      />
                      <Switch
                        onChange={handleStateChange('transparencyEnabled')}
                        checked={ratingState.transparencyEnabled}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      paragraph
                      style={{ margin: 0 }}
                      className={
                        ratingState.trustinessEnabled
                          ? ''
                          : classes.parameterTitleDisabled
                      }
                    >
                      {t('trustiness')}{' '}
                      <Tooltip title={t('trustinessTooltip')} placement='right'>
                        <HelpOutline
                          fontSize='inherit'
                          className={classes.topicIcon}
                        />
                      </Tooltip>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RateSlider
                        disabled={!ratingState.trustinessEnabled}
                        onChange={handleStateChange('trustiness')}
                        value={ratingState.trustiness}
                        marks={marks}
                        valueLabelDisplay='on'
                        min={0}
                        step={1}
                        max={10}
                      />
                      <Switch
                        onChange={handleStateChange('trustinessEnabled')}
                        checked={ratingState.trustinessEnabled}
                      />
                    </div>
                  </Grid>
                </Grid>
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
                        labels: bpParameters,
                        datasets: [
                          { ...producer.data, label: t('globalRate') },
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
                        color='secondary'
                        disabled={ratingState.processing}
                        onClick={transact}
                        size='small'
                        style={{ margin: '0 10px' }}
                        variant='contained'
                      >
                        {t('publishRatingButton')}
                      </Button>
                      <Button
                        component={props => (
                          <Link
                            {...props}
                            to={`/block-producers/${producer.bpjson.producer_account_name}`}
                          />
                        )}
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
  userRate: PropTypes.object
}

const mapStateToProps = ({ blockProducers: { producer, userRate } }) => ({
  producer,
  userRate
})

const mapDispatchToProps = dispatch => ({
  getBPRating: dispatch.blockProducers.getBlockProducerRatingByOwner,
  addUserRating: dispatch.blockProducers.mutationInsertUserRating
})

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchToProps)(BlockProducerRate)
)
