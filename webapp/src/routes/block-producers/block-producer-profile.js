import React, { useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from '@reach/router'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Divider from '@material-ui/core/Divider'
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
    <Grid container justifyContent='center' className={classes.container}>
      <TitlePage title={`${t('title')} ${BlockProducerTitle} - EOS Rate`} />
      <Grid item xs={12}>
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
                  <Grid item sm={12} lg={4}>
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
                      <ProfileTitle
                        classes={classes}
                        hasInformation={bpHasInformation}
                        producer={producer}
                        t={t}
                        bpTitle={BlockProducerTitle}
                        isContentLoading={isContentLoading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.wrapperBox}>
              <Grid item sm={12} lg={4}>
                <Grid
                  item
                  xs={12}
                  className={classNames(
                    classes.BlockProducerRadarBox,
                    classes.showOnlySm
                  )}
                >
                  <Radar
                    bpData={{
                      datasets: producer ? [{ ...producer.data }] : []
                    }}
                  />
                </Grid>
                <GeneralInformation classes={classes} producer={producer} />
                <SocialNetworks
                  classes={classes}
                  overrideClass={classes.showOnlyLg}
                  producer={bpHasInformation && producer.bpjson}
                />
              </Grid>

              <Grid item sm={12} lg={8}>
                <Grid container direction='column'>
                  <Grid
                    item
                    xs={12}
                    className={classNames(
                      classes.BlockProducerRadarBox,
                      classes.showOnlyLg
                    )}
                  >
                    <Radar
                      bpData={{
                        datasets: producer ? [{ ...producer.data }] : []
                      }}
                    />
                  </Grid>
                  <WebsiteLegend classes={classes} webInfo={webInfo} />
                  <Divider variant='middle' className={classes.showOnlySm} />
                  <SocialNetworks
                    classes={classes}
                    overrideClass={classes.showOnlySm}
                    producer={bpHasInformation && producer.bpjson}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Paper>
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
