import React, { useEffect, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from '@reach/router'
import Error from '@material-ui/icons/Error'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'
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
    marginBottom: 5,
    marginTop: 5
  },
  subTitle: {
    fontSize: 14
  },
  longSubTitle: {
    margin: '7px 0',
    fontSize: 14
  },
  longValue: {
    marginLeft: 4,
    marginTop: 7,
    fontWeight: 500
  },
  value: {
    marginLeft: 4,
    fontWeight: 500
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
  },
  errorBox: {
    padding: '10px 0px'
  },
  votingTextProgress: {
    display: 'flex'
  },
  slogan: {
    margin: '10px 0 0 0',
    fontStyle: 'italic',
    '&:before': { content: 'open-quote' },
    '&:after': { content: 'close-quote' }
  }
})

const ProxyProfile = ({
  classes,
  account,
  proxies,
  getProxy,
  proxy,
  isContentLoading,
  getProxies,
  ual,
  ...props
}) => {
  const { t } = useTranslation('profile')
  const [showMessage, setShowMessage] = useState(false)
  const [ratingState, setRatingState] = useState({
    processing: false,
    txError: null,
    txSuccess: false
  })
  const logo = _get(proxy, 'logo_256', null)
  const ProxyTitle = _get(proxy, 'name', _get(proxy, 'owner', 'No Data'))
  const accountName = _get(ual, 'activeUser.accountName', null)
  const slogan = _get(proxy, 'slogan', null)
  const producers = _get(proxy, 'voter_info.producers', [])

  console.log({ proxy })

  const sendVoteProxy = async proxy => {
    if (!accountName) {
      setShowMessage(true)

      return
    }

    const transaction = {
      actions: [
        {
          account: 'eosio',
          name: 'voteproducer',
          authorization: [
            {
              actor: accountName,
              permission: 'active'
            }
          ],
          data: {
            voter: accountName,
            proxy,
            producers: []
          }
        }
      ]
    }

    try {
      setRatingState({
        ...ratingState,
        txError: null,
        processing: true,
        txSuccess: false
      })

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      setRatingState({
        ...ratingState,
        processing: false,
        txSuccess: true
      })

      setTimeout(() => {
        setRatingState({
          ...ratingState,
          txError: null,
          txSuccess: false
        })
      }, 2000)
      setShowMessage(false)
    } catch (error) {
      console.warn(error)
      setRatingState({
        ...ratingState,
        processing: false,
        txError: error.message ? error.message : error
      })
    }
  }

  useEffect(() => {
    async function getData () {
      await getProxies()
      await getProxy(account)
    }

    if (accountName) setShowMessage(false)

    getData()
  }, [account, accountName])

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
                    {slogan && (
                      <Typography variant='subtitle1'>
                        <blockquote className={classes.slogan}>
                          {slogan}
                        </blockquote>
                      </Typography>
                    )}
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
                <GeneralInformation
                  classes={classes}
                  proxy={proxy}
                  onClick={sendVoteProxy}
                  disabled={!proxy || ratingState.processing}
                />
                <div className={classes.errorBox}>
                  {showMessage && (
                    <Chip
                      avatar={
                        <Avatar>
                          <Error />
                        </Avatar>
                      }
                      color='secondary'
                      label={t('voteWithoutLogin')}
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
                    <div className={classes.votingTextProgress}>
                      <CircularProgress color='secondary' size={20} />
                      <Typography
                        variant='subtitle1'
                        className={classNames(classes.subTitle, classes.bpName)}
                      >
                        voting ...
                      </Typography>
                    </div>
                  )}
                </div>
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
      {proxy && Boolean(producers.length) && (
        <CompareTool
          removeBP={() => console.log('remove')}
          className={classes.compareTool}
          list={[proxy]}
          selected={[account]}
          isProxy
          useOnlySliderView
          optionalLabel={`${ProxyTitle} ${t('labelTool')}:`}
        />
      )}
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
  getProxies: PropTypes.func,
  ual: PropTypes.object
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
