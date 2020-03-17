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

import CompareTool from 'components/compare-tool'
import Radar from 'components/radar'
import {
  SocialNetworks,
  GeneralInformation
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
      flexDirection: 'row',
      width: '100%'
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

// const ProfileTitle = ({
//   classes,
//   hasInformation,
//   proxy,
//   t,
//   bpTitle,
//   isContentLoading
// }) => {
//   if (!isContentLoading && !proxy) {
//     return (
//       <Typography variant='h6' className={classes.bpName}>
//         {t('noBlockProducer')}
//       </Typography>
//     )
//   }

//   return (
//     <>
//       <Typography variant='h6' className={classes.bpName}>
//         {bpTitle}
//       </Typography>
//     </>
//   )
// }

const ProxyProfile = ({
  classes,
  account,
  proxies,
  getProxy,
  proxy,
  isContentLoading,
  getProxies,
  ...props
}) => {
  const { t } = useTranslation('profile')
  const logo = _get(proxy, 'logo_256', null)
  const ProxyTitle = _get(proxy, 'name', _get(proxy, 'owner', 'No Data'))

  useEffect(() => {
    async function getData() {
      // await getBPs()
      await getProxies()
      await getProxy(account)
    }

    getData()
  }, [account])

  return (
    <Grid container justify='center' className={classes.container}>
      <Grid item xs={12}>
        <Grid container direction='row' alignItems='center'>
          <Button
            component={forwardRef((props, ref) => (
              <Link {...props} ref={ref} to='/proxies' />
            ))}
          >
            <KeyboardArrowLeft />
            {t('allP')}
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
                      {logo ? (
                        <Avatar
                          aria-label='Block Producer'
                          className={classes.avatar}
                        >
                          <img src={logo} alt='' width='100%' />
                        </Avatar>
                      ) : (
                        <AccountCircle className={classes.accountCircle} />
                      )}
                      <Typography variant='h6' className={classes.bpName}>
                        {ProxyTitle}
                      </Typography>
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
                      datasets: proxy ? [{ ...proxy.data }] : []
                    }}
                  />
                </Grid>
                <GeneralInformation classes={classes} proxy={proxy} />
                <SocialNetworks
                  classes={classes}
                  overrideClass={classes.showOnlyLg}
                  proxy={proxy}
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
                        datasets: proxy ? [{ ...proxy.data }] : []
                      }}
                    />
                  </Grid>
                  <Divider variant='middle' className={classes.showOnlySm} />
                  <SocialNetworks
                    classes={classes}
                    overrideClass={classes.showOnlySm}
                    proxy={proxy}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Paper>
      </Grid>
      {proxy && <CompareTool
        removeBP={() => console.log('test')}
        className={classes.compareTool}
        list={[proxy]}
        selected={[account]}
        isProxy
        useOnlySliderView
      />}
    </Grid>
  )
}

ProxyProfile.propTypes = {
  classes: PropTypes.object,
  account: PropTypes.string,
  proxies: PropTypes.array,
  getProxy: PropTypes.func,
  proxy: PropTypes.object,
  isContentLoading: PropTypes.bool,
  getProxies: PropTypes.func
}

const mapStateToProps = ({
  isLoading: { isContentLoading },
  proxies: { proxies, proxy }
}) => ({
  proxies,
  proxy,
  isContentLoading
})

const mapDispatchToProps = dispatch => ({
  getProxy: dispatch.proxies.getProxyByOwner,
  getProxies: dispatch.proxies.getProxies
})

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchToProps)(ProxyProfile)
)
