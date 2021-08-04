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

const BlockProducerProfile = ({ account, ...props }) => {
  const { t } = useTranslation('profile')
  const classes = useStyles()
  const dispatch = useDispatch()
  const isDesktop = useMediaQuery('(min-width:767px)')
  const [sizes, setSizes] = useState()
  const { list: blockProducers, producer } = useSelector(
    (state) => state.blockProducers
  )
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

  useEffect(() => {
    setSizes(isDesktop ? 400 : 240)
  }, [isDesktop])

  useEffect(() => {
    const getData = async () => {
      !blockProducers.length && (await dispatch.blockProducers.getBPs())
      dispatch.blockProducers.getBlockProducerByOwner(account)
    }

    getData()
  }, [account, blockProducers.length])

  useEffect(() => {
    dispatch.blockProducers.setShowSortSelected(false)
  }, [])

  return (
    <Grid
      style={{ backgroundColor: '#22cc22' }}
      container
      justify='center'
      className={classes.container}
      spacing={5}
    >
      <TitlePage title={`${t('title')} ${BlockProducerTitle} - EOS Rate`} />
      <Grid style={{ backgroundColor: '#0ccc00' }} item md={12} xs={12}>
        <Grid container direction='row' alignItems='center'>
          <Button
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
      <Grid item md={12} style={{ backgroundColor: '#f8f8f8' }}>
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
      <Grid style={{ backgroundColor: '#0ccccc' }} item md={7}>
        <GeneralInformation classes={classes} producer={producer} />
        <SocialNetworks
          classes={classes}
          overrideClass={classes.showOnlyLg}
          producer={bpHasInformation && producer.bpjson}
        />
      </Grid>
      <Grid
        style={{ backgroundColor: '#011100' }}
        container
        justify='center'
        md={5}
      >
        <Grid item md={12}>
          <Radar
            height={sizes}
            width={sizes}
            bpData={{
              datasets: producer ? [{ ...producer.data }] : []
            }}
          />
        </Grid>
        <Grid item md={4}>
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
            {t('buttonRate')}
          </Button>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <WebsiteLegend classes={classes} webInfo={webInfo} />
      </Grid>
    </Grid>
  )
}

BlockProducerProfile.propTypes = {
  account: PropTypes.string
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
