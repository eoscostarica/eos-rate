import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from '@reach/router'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Box, useMediaQuery } from '@material-ui/core'
import _get from 'lodash.get'

import getBPRadarData from 'utils/getBPRadarData'
import TitlePage from 'components/title-page'
import Radar from 'components/radar'

import {
  SocialNetworks,
  GeneralInformation,
  WebsiteLegend
} from './general-information-profile'
import styles from './styles'

const useStyles = makeStyles(styles)

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

const BlockProducerProfile = ({ account, ual, ...props }) => {
  const { t } = useTranslation('profile')
  const classes = useStyles()
  const dispatch = useDispatch()
  const isDesktop = useMediaQuery('(min-width:767px)')
  const isMobile = useMediaQuery('(max-width:768px)')
  const accountName = _get(ual, 'activeUser.accountName', null)
  const [sizes, setSizes] = useState()
  const [isNewRate, setIsNewRate] = useState(true)
  const {
    list: blockProducers,
    producer,
    edenRate,
    userRate
  } = useSelector((state) => state.blockProducers)
  const { isContentLoading } = useSelector((state) => state.isLoading)
  const bpHasInformation = Boolean(
    producer && Object.values(producer.bpjson).length
  )
  const bPLogo =
    bpHasInformation && _get(producer, 'bpjson.org.branding.logo_256', null)

  const BlockProducerTitle = _get(
    producer,
    'bpjson.org.candidate_name',
    _get(producer, 'system.owner', 'No Data')
  )

  const webInfo = _get(producer, 'general_info', null)

  const getRatingData = () => {
    if (edenRate) {
      return {
        community: edenRate.community,
        development: edenRate.development,
        infrastructure: edenRate.development,
        transparency: edenRate.transparency,
        trustiness: edenRate.trustiness
      }
    }
    return {
      community: 0,
      development: 0,
      infrastructure: 0,
      transparency: 0,
      trustiness: 0
    }
  }

  const userDataSet = getBPRadarData({
    name: t('edenRates'),
    parameters: getRatingData()
  })

  useEffect(() => {
    setSizes(isDesktop ? 400 : '100%')
  }, [isDesktop])

  useEffect(() => {
    const getData = async () => {
      !blockProducers.length && (await dispatch.blockProducers.getBPs())
      dispatch.blockProducers.getBlockProducerByOwner(account)
      dispatch.blockProducers.getBlockProducerEdenRating({
        bp: account
      })
      dispatch.blockProducers.getBlockProducerRatingByOwner({
        bp: account,
        userAccount: accountName
      })
    }

    getData()
  }, [account, blockProducers.length])

  useEffect(() => {
    dispatch.blockProducers.setShowSortSelected(false)
  }, [])

  useEffect(() => {
    if (userRate) setIsNewRate(false)
    else setIsNewRate(true)
  }, [userRate])

  return (
    <Grid container justify='center' className={classes.container}>
      <TitlePage title={`${t('title')} ${BlockProducerTitle} - EOS Rate`} />
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
          <Box style={{ display: 'flex' }}>
            {bPLogo ? (
              <Avatar aria-label='Block Producer' className={classes.avatar}>
                <img src={bPLogo} alt='' width='100%' />
              </Avatar>
            ) : (
              <AccountCircle className={classes.accountCircle} />
            )}
            <ProfileTitle
              classes={classes}
              hasInformation={bpHasInformation}
              producer={producer}
              t={t}
              bpTitle={BlockProducerTitle}
              isContentLoading={isContentLoading}
            />
          </Box>
        </Grid>
        {!isMobile && (
          <Grid item xs={12} md={7}>
            <GeneralInformation
              classes={classes}
              producer={producer}
              edenRate={edenRate}
            />
            <SocialNetworks
              classes={classes}
              overrideClass={classes.showOnlyLg}
              producer={bpHasInformation && producer}
            />
          </Grid>
        )}
        <Grid container justify='center' md={5}>
          <Grid item md={12} xs={12}>
            <Radar
              height={sizes}
              width={sizes}
              showLabel
              bpData={{
                datasets: producer
                  ? [{ ...producer.data, label: t('eosRates') }, userDataSet]
                  : []
              }}
            />
          </Grid>
          <Grid item md={4} xs={7}>
            <Button
              disabled={!producer}
              // eslint-disable-next-line react/display-name
              component={forwardRef((props, ref) => (
                <Link
                  {...props}
                  ref={ref}
                  to={`/block-producers/${_get(
                    producer,
                    'owner',
                    'noBlockProducerName'
                  )}/rate`}
                />
              ))}
              className={classes.btnBP}
            >
              {isNewRate ? t('buttonRate') : t('updateRatingButton')}
            </Button>
          </Grid>
        </Grid>
        {isMobile && (
          <Grid item xs={12}>
            <GeneralInformation
              classes={classes}
              producer={producer}
              edenRate={edenRate}
            />
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          <WebsiteLegend classes={classes} webInfo={webInfo} />
        </Grid>
        {isMobile && (
          <Grid style={{ marginTop: '-20px' }} item xs={12}>
            <SocialNetworks
              classes={classes}
              overrideClass={classes.showOnlyLg}
              producer={bpHasInformation && producer}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

BlockProducerProfile.propTypes = {
  account: PropTypes.string,
  ual: PropTypes.object
}

ProfileTitle.propTypes = {
  classes: PropTypes.object,
  hasInformation: PropTypes.bool,
  producer: PropTypes.object,
  t: PropTypes.any,
  bpTitle: PropTypes.string,
  isContentLoading: PropTypes.bool
}

export default BlockProducerProfile
