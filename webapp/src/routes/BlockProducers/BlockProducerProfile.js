import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import MuiAlert from '@mui/material/Alert'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import _get from 'lodash.get'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import { Link as MLink } from '@mui/material'

import { mainConfig } from '../../config'
import getBPRadarData from '../../utils/get-bp-radar-data'
import TitlePage from '../../components/PageTitle'
import PolarChart from '../../components/PolarChart'
import Table from '../../components/Table'
import getAverageValue from '../../utils/get-average-value'
import { useSharedState } from '../../context/state.context'

import {
  SocialNetworks,
  GeneralInformation,
  WebsiteLegend,
  AdditionalResources
} from './GeneralInformationProfile'
import formatNumber from '../../utils/format-number'
import getMyRatingAverage from '../../utils/get-my-rating-average'
import styles from './styles'

const useStyles = makeStyles(styles)

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const ProfileTitle = ({
  classes,
  hasInformation,
  producer,
  t,
  bpTitle,
  isContentLoading
}) => {
  if (!isContentLoading && !producer) {
    return (
      <Typography variant='h6' className={classes.bpName}>
        {t('noBlockProducer')}
      </Typography>
    )
  }

  return (
    <>
      <Typography variant='h6' className={classes.bpName}>
        {bpTitle}
      </Typography>
      {!hasInformation && (
        <Typography variant='h6' className={classes.bpName}>
          {t('noBpJson')}
        </Typography>
      )}
    </>
  )
}

const BlockProducerProfile = () => {
  const { t } = useTranslation('profile')
  const { account } = useParams()
  const classes = useStyles()
  const [state, { setProducer, setLastTransaction }] = useSharedState()
  const isMobile = useMediaQuery('(max-width:768px)')
  const [isRated, setIsRated] = useState(false)
  const [bpHasInformation, setBpHasInformation] = useState(false)
  const [blockProducerLogo, setBlockProducerLogo] = useState(null)
  const [webInfo, setWebInfo] = useState(null)
  const [polarChartData, setPolarChartData] = useState([])
  const [blockProducerTitle, setBlockProducerTitle] = useState('No Title')
  const [open, setOpen] = useState(false)
  const [myRating, setMyRating] = useState({})

  const getRatingData = edenRate => ({
    community: parseFloat(formatNumber(edenRate?.community || 0, 1)),
    development: parseFloat(formatNumber(edenRate?.development || 0, 1)),
    infrastructure: parseFloat(formatNumber(edenRate?.development || 0, 1)),
    transparency: parseFloat(formatNumber(edenRate?.transparency || 0, 1)),
    trustiness: parseFloat(formatNumber(edenRate?.trustiness || 0, 1))
  })

  const setProfileData = bp => {
    const edenDataSet = getBPRadarData({
      colorString: 'edenRates',
      name: t('edenRates'),
      parameters: getRatingData(bp?.edenRate),
      visible: false
    })
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

    setMyRating(bpRated?.ratings)

    const userDataSet = getBPRadarData({
      colorString: 'myRate',
      name: t('myRate'),
      parameters: getRatingData(bpRated?.ratings)
    })

    setBpHasInformation(!!Object.values(bp?.bpjson).length)
    setBlockProducerLogo(_get(bp, 'bpjson.org.branding.logo_256', null))
    setBlockProducerTitle(
      _get(bp, 'bpjson.org.candidate_name', _get(bp, 'system.owner', 'No Data'))
    )
    setWebInfo(_get(bp, 'general_info', null))

    if (bp.total_ratings_cntr) {
      const totalStatsDataSet = getBPRadarData({
        colorString: 'totalRates',
        name: t('totalRates'),
        parameters: getRatingData({
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
        { ...bp.data, name: t('eosRates'), visible: false },
        edenDataSet,
        userDataSet,
        totalStatsDataSet
      ])
    }
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setLastTransaction(null)
  }

  useEffect(() => {
    const getBpData = async () => {
      if (state.blockProducers.data.length) {
        const bp = state.blockProducers.data.find(
          ({ owner }) => owner === account
        )

        if (!bp) {
          await setProducer(account)

          return
        }

        setProducer(bp, true)
        setProfileData(bp)

        return
      }

      await setProducer(account)
    }

    if (state.blockProducers) getBpData()
  }, [account])

  useEffect(() => {
    if (!state.blockProducer) return

    setProfileData(state?.blockProducer)
  }, [state.blockProducer, state.user])

  useEffect(() => {
    if (state.user && state.blockProducer) {
      setIsRated(
        state.user?.userData?.userRates.some(
          rate => rate.owner === state.blockProducer.owner
        )
      )
    }
  }, [state.user, state.blockProducer])

  useEffect(() => {
    setOpen(!!state.transaction)
  }, [])

  return (
    <Grid container justifyContent='center' className={classes.container}>
      <TitlePage title={`${t('title')} ${blockProducerTitle} - EOS Rate`} />
      <Grid item md={12} xs={12}>
        <Grid
          container
          direction='row'
          alignItems='center'
          className={classes.breadcrumbText}
        >
          <Button
            className={classes.backButtonStyle}
            // eslint-disable-next-line react/display-name
            component={forwardRef((props, ref) => (
              <Link {...props} ref={ref} to='/block-producers' />
            ))}
          >
            <KeyboardArrowLeft />
            {t('allBP')}
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.reliefGrid}>
        <Grid item md={12} xs={12}>
          <Box className={classes.pageTitle}>
            {blockProducerLogo ? (
              <Avatar aria-label='Block Producer' className={classes.avatar}>
                <img src={blockProducerLogo} alt='' width='100%' />
              </Avatar>
            ) : (
              <AccountCircle className={classes.accountCircle} />
            )}
            <ProfileTitle
              classes={classes}
              hasInformation={bpHasInformation}
              producer={state.blockProducer}
              t={t}
              bpTitle={blockProducerTitle}
            />
          </Box>
        </Grid>
        {!isMobile && (
          <Grid
            style={{
              borderRight: 'solid 1px rgba(0, 0, 0, 0.38)'
            }}
            item
            xs={12}
            md={6}
          >
            <Grid item md={10} xs={12}>
              <WebsiteLegend classes={classes} webInfo={webInfo} />
            </Grid>
            <GeneralInformation
              classes={classes}
              producer={state.blockProducer}
            />
            <SocialNetworks
              classes={classes}
              overrideClass={classes.showOnlyLg}
              producer={bpHasInformation && state.blockProducer}
            />
            <AdditionalResources
              classes={classes}
              overrideClass={classes.showOnlyLg}
              producer={bpHasInformation && state.blockProducer}
            />
          </Grid>
        )}
        <Grid container justifyContent='center' md={6}>
          <Grid item className={classes.profileChartWrapper} xs={12}>
            <PolarChart data={polarChartData} showLegend />
          </Grid>
          <Grid item md={4} xs={7}>
            <Button
              disabled={!state.blockProducer}
              variant={isRated ? 'outlined' : 'contained'}
              color={isRated ? 'primary' : 'secondary'}
              component={forwardRef(function linkRef(props, ref) {
                return (
                  <Link
                    {...props}
                    ref={ref}
                    to={`/block-producers/${_get(
                      state.blockProducer,
                      'owner',
                      'noBlockProducerName'
                    )}/rate`}
                  />
                )
              })}
              className={classes.btnBP}
            >
              {isRated ? t('updateRatingButton') : t('buttonRate')}
            </Button>
          </Grid>
          <Grid style={{ paddingTop: 40 }} item md={11} xs={12}>
            <Table
              rows={[
                {
                  rater: t('myRate'),
                  amount: isRated ? 1 : 0,
                  average: getMyRatingAverage({
                    community: myRating?.community,
                    development: myRating?.development,
                    infrastructure: myRating?.infrastructure,
                    transparency: myRating?.transparency,
                    trustiness: myRating?.trustiness
                  })
                },
                {
                  rater: t('eosRates'),
                  amount: _get(state.blockProducer, 'ratings_cntr', null) || 0,
                  average: getAverageValue(
                    _get(state.blockProducer, 'average', 0)
                  )
                },
                {
                  rater: t('edenRates'),
                  amount:
                    _get(state.blockProducer, 'eden_ratings_cntr', null) || 0,
                  average: getAverageValue(
                    _get(state.blockProducer, 'eden_average', 0)
                  )
                },
                {
                  rater: t('totalRates'),
                  amount:
                    _get(state.blockProducer, 'total_ratings_cntr', null) || 0,
                  average: getAverageValue(
                    _get(state.blockProducer, 'total_average', 0)
                  )
                }
              ]}
              heads={[t('raters'), t('amount'), t('average')]}
            />
          </Grid>
        </Grid>
        {isMobile && (
          <>
            <Grid item xs={12}>
              <WebsiteLegend classes={classes} webInfo={webInfo} />
              <GeneralInformation
                classes={classes}
                producer={state.blockProducer}
              />
            </Grid>
            <Grid style={{ marginTop: '-20px' }} item xs={12}>
              <SocialNetworks
                classes={classes}
                overrideClass={classes.showOnlyLg}
                producer={bpHasInformation && state.blockProducer}
              />
              <AdditionalResources
                classes={classes}
                overrideClass={classes.showOnlyLg}
                producer={bpHasInformation && state.blockProducer}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        className={classes.snackbar}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <Alert severity='success'>
            <Button
              color='secondary'
              size='small'
              className={classes.messageBtn}
            >
              <Typography className={classes.snackbarMessage}>
                {`${t('transactionComplete')}:`}
              </Typography>
              <MLink
                rel='noopener'
                target='_blank'
                className={classes.linkText}
                href={`${mainConfig.blockExplorer}/transaction/${state.transaction?.transactionId}`}
              >
                {(state.transaction?.transactionId || '').slice(0, 8)}
              </MLink>
            </Button>
            <IconButton
              aria-label='close'
              color='inherit'
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Alert>
        }
      />
    </Grid>
  )
}

BlockProducerProfile.whyDidYouRender = true

ProfileTitle.propTypes = {
  classes: PropTypes.object,
  hasInformation: PropTypes.bool,
  producer: PropTypes.object,
  t: PropTypes.any,
  bpTitle: PropTypes.string,
  isContentLoading: PropTypes.bool
}

export default BlockProducerProfile
