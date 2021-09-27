import React, { useEffect, forwardRef, useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import _get from 'lodash.get'

import TitlePage from '../../components/PageTitle'
import CompareTool from '../../components/CompareTool'
import PolarChart from '../../components/PolarChart'
import { useSharedState } from '../../context/state.context'

import { SocialNetworks, GeneralInformation } from './GeneralInformationProfile'
import styles from './styles'

const useStyles = makeStyles(styles)

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const ProxyProfile = () => {
  const { t } = useTranslation('profile')
  const classes = useStyles()
  const { account } = useParams()
  const [state, { setProxy }] = useSharedState()
  const [proxyLogo, setProxyLogo] = useState(null)
  const [proxySlogan, setProxySlogan] = useState(null)
  const [polarChartData, setPolarChartData] = useState([])
  const [producers, setProducers] = useState([])
  const [proxyTitle, setProxyTitle] = useState('No Title')
  const [showMessage, setShowMessage] = useState(false)
  const isDesktop = useMediaQuery('(min-width:767px)')
  const isMobile = useMediaQuery('(max-width:768px)')
  const [openDesktopVotingTool, setOpenDesktopVotingTool] = useState(isDesktop)
  const [ratingState, setRatingState] = useState({
    processing: false,
    txError: null,
    txSuccess: false
  })

  const sendVoteProxy = async proxy => {
    if (!state.user.accountName) {
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
              actor: state.user.accountName,
              permission: 'active'
            }
          ],
          data: {
            voter: state.user.accountName,
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

      await state.ual.activeUser.signTransaction(transaction, {
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
    if (state.proxy) {
      setProxyLogo(_get(state.proxy, 'logo_256', null))
      setProxyTitle(
        _get(state.proxy, 'name', _get(state.proxy, 'owner', 'No Data'))
      )
      setProxySlogan(_get(state.proxy, 'slogan', null))
      setProducers(_get(state.proxy, 'voter_info.producers', []))
      setPolarChartData([state.proxy.data])
    }
  }, [state.proxy])

  useEffect(() => {
    const getProxyData = async () => {
      if (state.proxies.data.length) {
        // TODO: do a double check if this is necessary
        const proxySelected = state.proxies.data.find(
          ({ owner }) => owner === account
        )

        setProxy(proxySelected, true)

        return
      }

      await setProxy(account)
    }

    getProxyData()
  }, [account])

  // useEffect(() => {
  //   setSizes(isDesktop ? 400 : '95%')
  // }, [isDesktop])

  return (
    <Grid container justifyContent='center' className={classes.container}>
      <TitlePage title={`${t('proxyProfile')} ${proxyTitle} - EOS Rate`} />
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
            {proxyLogo ? (
              <Avatar aria-label='Block Producer' className={classes.avatar}>
                <img src={proxyLogo} alt='' width='100%' />
              </Avatar>
            ) : (
              <AccountCircle className={classes.accountCircle} />
            )}
            <Typography variant='h6' className={classes.bpName}>
              {proxyTitle}
            </Typography>
          </Box>
          {proxySlogan && (
            <Typography variant='subtitle1'>
              <blockquote className={classes.slogan}>{proxySlogan}</blockquote>
            </Typography>
          )}
        </Grid>
        {isMobile && (
          <Grid container justify='center' xs={12}>
            <Grid item md={12} xs={12}>
              <PolarChart data={polarChartData} />
            </Grid>
            <Grid item md={4} xs={10}>
              <Button
                disabled={!state.proxy || ratingState.processing}
                className={classes.btnBP}
                variant={'contained'}
                color={'secondary'}
                onClick={() => sendVoteProxy(_get(state.proxy, 'owner'))}
              >
                {t('buttonVote')}
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item md={7} xs={12}>
          <GeneralInformation
            classes={classes}
            proxy={state.proxy}
            onClick={sendVoteProxy}
            disabled={!state.proxy || ratingState.processing}
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
            proxy={state.proxy}
          />
        </Grid>
        {!isMobile && (
          <Grid container justify='center' md={5}>
            <Grid style={{ height: '350px', marginTop: '-30px' }} item md={12}>
              <PolarChart data={polarChartData} />
            </Grid>
            <Grid item md={6}>
              <Button
                disabled={!state.proxy || ratingState.processing}
                className={classes.btnBP}
                onClick={() => sendVoteProxy(_get(state.proxy, 'owner'))}
              >
                {t('buttonVote')}
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          {state.proxy &&
            openDesktopVotingTool &&
            Boolean(producers.length) && (
              <CompareTool
                removeBP={() => console.log('remove')}
                className={classes.compareTool}
                list={[state.proxy]}
                selected={[account]}
                isProxy
                useOnlySliderView
                optionalLabel={`${proxyTitle} ${t('labelTool')}:`}
                handleOnClose={handleOnClose}
              />
            )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProxyProfile
