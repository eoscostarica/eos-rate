import React, { useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from '@reach/router'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Divider from '@material-ui/core/Divider'
import _get from 'lodash.get'

import BlockProducerRadar from 'components/block-producer-radar'
import {
  SocialNetworks,
  GeneralInformation,
  WebsiteLegend
} from './general-information-profile'

const style = ({ palette, breakpoints }) => ({
  container: {
    padding: 10
  },
  bpName: {
    marginLeft: 6
  },
  accountCircle: {
    color: palette.secondary.main
  },
  box: {
    padding: '3%'
  },
  title: {
    color: palette.primary.main,
    fontSize: '1.5rem',
    marginBottom: 10,
    marginTop: 5
  },
  subTitle: {
    fontSize: 14
  },
  value: {
    marginLeft: 4
  },
  category: {
    marginTop: 10
  },
  btnBP: {
    color: palette.surface.main,
    backgroundColor: palette.secondary.main,
    width: '100%',
    '&:hover': {
      backgroundColor: palette.secondary.light
    },

    [breakpoints.up('sm')]: {
      marginRight: 10
    }
  },
  wrapperBox: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  BlockProducerRadarBox: {
    padding: '30px 0',
    backgroundColor: palette.surface.main
  },
  showOnlySm: {
    display: 'flex',

    [breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  showOnlyLg: {
    display: 'flex',

    [breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  websiteLegend: {
    margin: '10px 0',
    [breakpoints.up('sm')]: {
      margin: 0
    }
  },
  links: {
    textDecoration: 'none',
    color: palette.secondary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  avatar: {
    backgroundColor: palette.surface.main
  }
})

const ProfileTitle = ({ classes, hasInformation, producer, t, bpTitle, isContentLoading }) => {
  if (!isContentLoading && !producer)
    return (
      <Typography variant='h6' className={classes.bpName}>
        {t('noBlockProducer')}
      </Typography>
    )

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

const BlockProducerProfile = ({
  classes,
  account,
  blockProducers,
  getBlockProducer,
  producer,
  isContentLoading,
  ...props
}) => {
  const { t } = useTranslation('bpProfile')
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

  useEffect(() => {
    getBlockProducer(account)
  }, [account])

  return (
    <Grid container justify='center' className={classes.container}>
      <Grid item xs={12}>
        <Grid container direction='row' alignItems='center'>
          <Button
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
                  <BlockProducerRadar
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
                    <BlockProducerRadar
                      bpData={{
                        datasets: producer ? [{ ...producer.data }] : []
                      }}
                    />
                  </Grid>
                  <WebsiteLegend classes={classes} />
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
  classes: PropTypes.object,
  account: PropTypes.string,
  blockProducers: PropTypes.array,
  getBlockProducer: PropTypes.func,
  producer: PropTypes.object,
  isContentLoading: PropTypes.bool
}

const mapStateToProps = ({
  isLoading: { isContentLoading },
  blockProducers: { list, producer }
}) => ({
  blockProducers: list,
  producer,
  isContentLoading
})

const mapDispatchToProps = dispatch => ({
  getBlockProducer: dispatch.blockProducers.getBlockProducerByOwner
})

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchToProps)(BlockProducerProfile)
)
