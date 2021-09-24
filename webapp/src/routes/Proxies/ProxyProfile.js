import React, { useEffect, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
// import { useDispatch, useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Box, useMediaQuery } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import AccountCircle from '@material-ui/icons/AccountCircle'
import _get from 'lodash.get'

import TitlePage from '../../components/PageTitle'
import { GET_PROXY_BY_OWNER } from '../../gql'
import CompareTool from '../../components/CompareTool'
import Radar from '../../components/Radar'
import { useSharedState } from '../../context/state.context'

import { SocialNetworks, GeneralInformation } from './GeneralInformationProfile'
import styles from './styles'

const useStyles = makeStyles(styles)

const ProxyProfile = ({ ual, ...props }) => {
  const { t } = useTranslation('profile')
  const classes = useStyles()
  const { account } = useParams()
  const [state, { setProxy }] = useSharedState()

  // const dispatch = useDispatch()
  // const { proxy } = useSelector(state => state.proxies)

  const [showMessage, setShowMessage] = useState(false)
  const isDesktop = useMediaQuery('(min-width:767px)')
  const isMobile = useMediaQuery('(max-width:768px)')
  const [openDesktopVotingTool, setOpenDesktopVotingTool] = useState(isDesktop)
  const [sizes, setSizes] = useState()
  const [ratingState, setRatingState] = useState({
    processing: false,
    txError: null,
    txSuccess: false
  })

  const [getProxyByOwner, { loading, data: { proxy } = {} }] = useLazyQuery(
    GET_PROXY_BY_OWNER,
    { fetchPolicy: 'network-only' }
  )

  const logo = _get(proxy, 'logo_256', null)
  const ProxyTitle = _get(proxy, 'name', _get(proxy, 'owner', 'No Data'))
  const accountName = _get(ual, 'activeUser.accountName', null)
  const slogan = _get(proxy, 'slogan', null)
  const producers = _get(proxy, 'voter_info.producers', [])

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

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowMessage(false)
    setRatingState({
      ...ratingState,
      processing: false,
      txError: null,
      txSuccess: false
    })
  }

  const handleOnClose = () => {
    setOpenDesktopVotingTool(false)
  }

  useEffect(() => {
    const getData = async () => {
      // await dispatch.proxies.getProxies()
      // await dispatch.proxies.getProxyByOwner(account)
    }

    if (accountName) setShowMessage(false)

    getData()
  }, [account, accountName, setShowMessage])

  useEffect(() => {
    const getBpData = async () => {
      if (state.proxies.length) {
        // TODO: do a double check if this is necessary
        const proxySelected = state.proxies.find(
          ({ owner }) => owner === account
        )

        setProxy(proxySelected, false)

        return
      }

      await getProxyByOwner({
        variables: {
          account
        }
      })
    }

    getBpData()
  }, [account])

  useEffect(() => {
    if (loading || !proxy) {
      return
    }

    proxy.length && setProxy(proxy[0])
  }, [loading, proxy])

  useEffect(() => {
    setSizes(isDesktop ? 400 : '95%')
  }, [isDesktop])

  console.log({ state })

  return (
    <Grid container justifyContent='center' className={classes.container}>
      <TitlePage title={`${t('proxyProfile')} ${ProxyTitle} - EOS Rate`} />
      <Grid item xs={12}>
        <Grid container direction='row' alignItems='center'>
          <Button
            // eslint-disable-next-line react/display-name
            component={forwardRef((props, ref) => (
              <Link {...props} ref={ref} to='/proxies' />
            ))}
          >
            <KeyboardArrowLeft />
            {t('allP')}
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.reliefGrid}>
        <Grid item md={12}>
          <Box style={{ display: 'flex' }}>
            {logo ? (
              <Avatar aria-label='Block Producer' className={classes.avatar}>
                <img src={logo} alt='' width='100%' />
              </Avatar>
            ) : (
              <AccountCircle className={classes.accountCircle} />
            )}
            <Typography variant='h6' className={classes.bpName}>
              {ProxyTitle}
            </Typography>
          </Box>
          {slogan && (
            <Typography variant='subtitle1'>
              <blockquote className={classes.slogan}>{slogan}</blockquote>
            </Typography>
          )}
        </Grid>
        {isMobile && (
          <Grid container justify='center' xs={12}>
            <Grid item md={12} xs={12}>
              <Radar
                height={sizes}
                width={sizes}
                bpData={{
                  datasets: proxy ? [{ ...proxy.data }] : []
                }}
              />
            </Grid>
            <Grid item md={4} xs={10}>
              <Button
                disabled={!proxy || ratingState.processing}
                className={classes.btnBP}
                onClick={() => sendVoteProxy(_get(proxy, 'owner'))}
              >
                {t('buttonVote')}
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item md={7} xs={12}>
          <GeneralInformation
            classes={classes}
            proxy={proxy}
            onClick={sendVoteProxy}
            disabled={!proxy || ratingState.processing}
          />
          <Box className={classes.wrapperBox}>
            <Snackbar
              open={showMessage}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity='warning'>
                {t('voteWithoutLogin')}
              </Alert>
            </Snackbar>
            <Snackbar
              open={ratingState.txError}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity='error'>
                {ratingState.txError}
              </Alert>
            </Snackbar>
            <Snackbar
              open={ratingState.txSuccess}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity='success'>
                {t('success')}
              </Alert>
            </Snackbar>
            {ratingState.processing && (
              <div className={classes.votingTextProgress}>
                <CircularProgress color='secondary' size={20} />
                <Typography
                  variant='subtitle1'
                  className={classNames(classes.subTitle, classes.bpName)}
                >
                  {t('voting')} ...
                </Typography>
              </div>
            )}
          </Box>
          <SocialNetworks
            classes={classes}
            overrideClass={classes.showOnlySm}
            proxy={proxy}
          />
        </Grid>
        {!isMobile && (
          <Grid container justify='center' md={5}>
            <Grid style={{ height: '350px', marginTop: '-30px' }} item md={12}>
              <Radar
                height={sizes}
                width={sizes}
                bpData={{
                  datasets: proxy ? [{ ...proxy.data }] : []
                }}
              />
            </Grid>
            <Grid item md={6}>
              <Button
                disabled={!proxy || ratingState.processing}
                className={classes.btnBP}
                onClick={() => sendVoteProxy(_get(proxy, 'owner'))}
              >
                {t('buttonVote')}
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          {proxy && openDesktopVotingTool && Boolean(producers.length) && (
            <CompareTool
              removeBP={() => console.log('remove')}
              className={classes.compareTool}
              list={[proxy]}
              selected={[account]}
              isProxy
              useOnlySliderView
              optionalLabel={`${ProxyTitle} ${t('labelTool')}:`}
              handleOnClose={handleOnClose}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

ProxyProfile.propTypes = {
  ual: PropTypes.object
}

export default ProxyProfile
