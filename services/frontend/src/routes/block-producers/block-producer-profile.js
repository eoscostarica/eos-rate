import React, { useEffect } from 'react'
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

import BlockProducerRadar from 'components/block-producer-radar'
import bpParameters from 'config/comparison-parameters'
import {
  SocialNetworks,
  GeneralInformation,
  WebsiteLegend
} from './general-information-profile'

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
  box: {
    padding: '3%'
  },
  title: {
    color: '#ffffff',
    marginBottom: 10
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
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },

    [theme.breakpoints.up('sm')]: {
      marginRight: 10
    }
  },
  wrapperBox: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  BlockProducerRadarBox: {
    padding: '30px 0',
    backgroundColor: '#000'
  },
  showOnlySm: {
    display: 'flex',

    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  showOnlyLg: {
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  websiteLegend: {
    margin: '10px 0',
    [theme.breakpoints.up('sm')]: {
      margin: 0
    }
  }
})

const BlockProducerProfile = ({
  classes,
  account,
  blockProducers,
  getBlockProducer,
  producer,
  ...props
}) => {
  const { t } = useTranslation('bpProfile')
  const bpHasInformation = Boolean(producer && producer.bpjson)
  const bPLogo = bpHasInformation ? producer.bpjson.org.branding.logo_256 : null

  useEffect(() => {
    getBlockProducer(account)
  }, [account])

  return (
    <Grid container justify='center' spacing={16} className={classes.container}>
      <Grid item xs={12}>
        <Grid container spacing={16} direction='row' alignItems='center'>
          <Button
            component={props => <Link {...props} to='/block-producers' />}
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
                      <Typography variant='h6' className={classes.bpName}>
                        {bpHasInformation
                          ? producer.bpjson.org.candidate_name
                          : producer
                            ? producer.system.owner
                            : 'No Data'}
                      </Typography>
                      {!bpHasInformation && (
                        <Typography variant='h6' className={classes.bpName}>
                          {t('noBpJson')}
                        </Typography>
                      )}
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
                      labels: bpParameters,
                      datasets: producer ? [{ ...producer.data }] : []
                    }}
                  />
                </Grid>
                <GeneralInformation classes={classes} producer={producer} />
                <SocialNetworks
                  classes={classes}
                  overrideClass={classes.showOnlyLg}
                  producer={producer && producer.bpjson}
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
                        labels: bpParameters,
                        datasets: producer ? [{ ...producer.data }] : []
                      }}
                    />
                  </Grid>
                  <WebsiteLegend classes={classes} />
                  <Divider variant='middle' className={classes.showOnlySm} />
                  <SocialNetworks
                    classes={classes}
                    overrideClass={classes.showOnlySm}
                    producer={producer && producer.bpjson}
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
  producer: PropTypes.object
}

const mapStateToProps = ({ blockProducers: { list, producer } }) => ({
  blockProducers: list,
  producer
})

const mapDispatchToProps = dispatch => ({
  getBlockProducer: dispatch.blockProducers.getBlockProducerByOwner
})

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchToProps)(BlockProducerProfile)
)
