import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import _get from 'lodash.get'

import { useSharedState } from '../../context/state.context'
import TitlePage from '../../components/PageTitle'
import FilterBanner from '../../components/FilterBanner'
import Card from '../../components/Card'
import CompareTool from '../../components/CompareTool'
import SelectedBpsBottomSheet from './../BlockProducers/BottomSheetSelectedBps'

import styles from './styles'

const useStyles = makeStyles(styles)

const AllProxies = ({ ual = {} }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [state, { setProxies, setCompareProxyTool, setSelectedProxies }] =
    useSharedState()
  const [currentlyVisible, setCurrentlyVisible] = useState(30)
  const [hasMoreRows, setMoreRows] = useState(false)
  const [ratingState, setRatingState] = useState({
    processing: false,
    txError: null,
    txSuccess: false
  })

  const loadMore = async () => {
    if (!hasMoreRows) return

    await setProxies(currentlyVisible + 12)
    setCurrentlyVisible(currentlyVisible + 12)
  }

  const handleToggleCompareTool = () => {
    setCompareProxyTool(!state.compareProxyToolVisible)
  }

  const handleToggleSelected = () => {
    setSelectedProxies([])
  }

  const handleOpenDesktopVotingTool = (isAdding, producerAccountName) => {
    setSelectedProxies([producerAccountName])
    setCompareProxyTool(true)
  }

  const handleSetRatingState = () => {
    setRatingState({
      ...ratingState,
      txError: null,
      txSuccess: false,
      showChipMessage: false
    })
  }

  const sendVoteProxy = async () => {
    if (!state.user.accountName) return

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
            proxy: state.proxy,
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
    const getProxiesData = async () => {
      !state.proxies.data.length && (await setProxies(currentlyVisible))
    }

    getProxiesData()
  }, [])

  useEffect(() => {
    if (!state.proxies.data.length) {
      return
    }

    setMoreRows(state.proxies.rows > state.proxies.data.length)
  }, [state.proxies])

  return (
    <Box className={classes.root}>
      <TitlePage title={t('proxiesTitle')} />
      <Collapse
        in={state.compareProxyToolVisible}
        timeout='auto'
        unmountOnExit
        className={classes.hiddenMobile}
      >
        <CompareTool
          removeBP={handleToggleSelected}
          className={classes.compareTool}
          list={state.proxies.data || []}
          selected={state.selectedProxies || []}
          onHandleVote={sendVoteProxy}
          isProxy
          message={ratingState}
          setMessage={handleSetRatingState}
          userInfo={state.user}
          handleOnClose={() => {
            handleToggleCompareTool()
            handleToggleSelected()
          }}
        />
      </Collapse>
      <FilterBanner title={t('proxies')} page='proxy' hideFilter />
      <Box className={classes.wrapperGrid}>
        <Box className={classes.gridRow}>
          {(state.proxies.data || []).map(proxy => (
            <Box
              key={`${proxy.owner}-main-block-card`}
              className={classes.gridItem}
            >
              <Card
                isSelected={state.selectedProxies.includes(proxy.owner)}
                toggleSelection={handleOpenDesktopVotingTool}
                data={proxy}
                imageURL={_get(proxy, 'logo_256')}
                owner={_get(proxy, 'owner')}
                title={_get(proxy, 'name')}
                useRateButton={false}
                pathLink='proxies'
                showOptions={false}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <SelectedBpsBottomSheet
        open={state.compareProxyToolVisible}
        classesStyle={classes.hiddenDesktop}
      >
        <CompareTool
          removeBP={handleToggleSelected}
          className={classes.compareTool}
          list={state.proxies.data || []}
          selected={state.selectedProxies || []}
          onHandleVote={sendVoteProxy}
          isProxy
          message={ratingState}
          setMessage={handleSetRatingState}
          userInfo={state.user}
          handleOnClose={() => {
            handleToggleCompareTool()
            handleToggleSelected()
          }}
        />
      </SelectedBpsBottomSheet>
      <Box className={classes.loadMoreBtnBox}>
        <Button
          disabled={!hasMoreRows}
          className={classes.loadMoreButton}
          onClick={() => hasMoreRows && loadMore()}
          variant='outlined'
          color={'primary'}
        >
          {t('loadMore')}
        </Button>
      </Box>
    </Box>
  )
}

AllProxies.propTypes = {
  ual: PropTypes.object
}

export default AllProxies
