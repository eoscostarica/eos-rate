import React, { useState, useEffect, forwardRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/client'
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
import { GET_PRODUCER_BY_OWNER } from '../../gql'
import getBPRadarData from '../../utils/get-bp-radar-data'
import TitlePage from '../../components/PageTitle'
import Radar from '../../components/Radar'
import Table from '../../components/Table'
import getAverageValue from '../../utils/get-average-value'
import { useSharedState } from '../../context/state.context'

import {
  SocialNetworks,
  GeneralInformation,
  WebsiteLegend,
  AdditionalResources
} from './GeneralInformationProfile'
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

const BlockProducerProfile = ({ ual }) => {
  const { t } = useTranslation('profile')
  const { account } = useParams()
  const classes = useStyles()
  const [state, { setProducer }] = useSharedState()
  // const dispatch = useDispatch()
  const isDesktop = useMediaQuery('(min-width:767px)')
  const isMobile = useMediaQuery('(max-width:768px)')
  // const accountName = _get(ual, 'activeUser.accountName', null)
  // const history = useHistory()
  const [sizes, setSizes] = useState()
  const [isNewRate, setIsNewRate] = useState(true)
  const [bpHasInformation, setBpHasInformation] = useState(false)
  const [blockProducerLogo, setBlockProducerLogo] = useState(null)
  const [webInfo, setWebInfo] = useState(null)
  const [blockProducerTitle, setBlockProducerTitle] = useState('No Title')
  const [open, setOpen] = useState(false)
  const [getBlockProducerByOwner, { loading, data: { producer: bp } = {} }] =
    useLazyQuery(GET_PRODUCER_BY_OWNER, { fetchPolicy: 'network-only' })

  // delete this
  // const blockProducers = []
  // const producer = {}
  const edenRate = {}
  const userRate = {}
  const isContentLoading = false
  const location = { state: { transactionId: 12 } }
  // const {
  //   list: blockProducers,
  //   producer,
  //   edenRate,
  //   userRate
  // } = useSelector(state => state.blockProducers)
  // const { isContentLoading } = useSelector(state => state.isLoading)

  console.log({ state })

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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  useEffect(() => {
    setSizes(isDesktop ? 400 : '100%')
  }, [isDesktop])

  useEffect(() => {
    const getBpData = async () => {
      if (state.blockProducers.length) {
        // TODO: do a double check if this is necessary
        const bp = state.blockProducers.find(({ owner }) => owner === account)

        setProducer(bp, false)

        return
      }

      await getBlockProducerByOwner({
        variables: {
          account
        }
      })
    }

    getBpData()
  }, [account])

  useEffect(() => {
    if (loading || !bp) {
      return
    }

    const [bpData] = bp

    setProducer(bpData)
    setBpHasInformation(Boolean(Object.values(bpData.bpjson).length))
    setBlockProducerLogo(_get(bpData, 'bpjson.org.branding.logo_256', null))
    setBlockProducerTitle(
      _get(
        bpData,
        'bpjson.org.candidate_name',
        _get(bpData, 'system.owner', 'No Data')
      )
    )
    setWebInfo(_get(bpData, 'general_info', null))
  }, [loading, bp])

  useEffect(() => {
    // dispatch.blockProducers.setShowSortSelected(false)
  }, [])

  useEffect(() => {
    if (userRate) setIsNewRate(false)
    else setIsNewRate(true)
  }, [userRate])

  // useEffect(() => {
  //   if (location.state.transactionId) setOpen(true)
  //   else setOpen(false)
  // }, [])

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
          <Box style={{ display: 'flex' }}>
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
              isContentLoading={isContentLoading}
            />
          </Box>
        </Grid>
        {!isMobile && (
          <Grid
            style={{ borderRight: 'solid 1px rgba(0, 0, 0, 0.38)' }}
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
          <Grid item md={12} style={{ marginTop: 20 }} xs={12}>
            <Radar
              height={sizes}
              width={sizes}
              showLabel
              bpData={{
                datasets: state.blockProducer
                  ? [
                      { ...state.blockProducer.data, label: t('eosRates') },
                      userDataSet
                    ]
                  : []
              }}
            />
          </Grid>
          <Grid item md={4} xs={7}>
            <Button
              disabled={!state.blockProducer}
              // eslint-disable-next-line react/display-name
              component={forwardRef((props, ref) => (
                <Link
                  {...props}
                  ref={ref}
                  to={`/block-producers/${_get(
                    state.blockProducer,
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
          <Grid style={{ paddingTop: 40 }} item md={11} xs={12}>
            <Table
              rows={[
                {
                  rater: t('eosRates'),
                  amount: _get(state.blockProducer, 'ratings_cntr', null) || 0,
                  average: getAverageValue(
                    _get(state.blockProducer, 'average', 0)
                  )
                },
                {
                  rater: t('edenRates'),
                  amount: _get(edenRate, 'ratings_cntr', null) || 0,
                  average: getAverageValue(_get(edenRate, 'average', 0))
                }
              ]}
              heads={['', t('amount'), t('average')]}
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
                edenRate={edenRate}
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
            <Fragment>
              <Button color='secondary' size='small'>
                <MLink
                  rel='noopener'
                  target='_blank'
                  style={{ color: 'white' }}
                  href={`${mainConfig.AdditionalResourcesblockExplorer}/transaction/${location.state.transactionId}`}
                >
                  {location.state.transactionId}
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
            </Fragment>
          </Alert>
        }
      />
    </Grid>
  )
}

BlockProducerProfile.propTypes = {
  // account: PropTypes.string,
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
