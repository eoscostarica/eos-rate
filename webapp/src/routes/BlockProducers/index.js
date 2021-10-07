import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import clsx from 'clsx'
import _get from 'lodash.get'

import TitlePage from '../../components/PageTitle'
import CompareTool from '../../components/CompareTool'
import Card from '../../components/Card'
import FilterBanner from '../../components/FilterBanner'
import getAverageValue from '../../utils/get-average-value'
import { useSharedState } from '../../context/state.context'

import styles from './styles'
import SelectedBpsBottomSheet from './BottomSheetSelectedBps'

const useStyles = makeStyles(styles)

const AllBps = () => {
  const { t } = useTranslation('translations')
  const [state, { setProducers, setCompareBPTool, setSelectedProducers }] =
    useSharedState()
  const classes = useStyles()
  const myRef = useRef(null)
  const [currentlyVisible, setCurrentlyVisible] = useState(30)
  const [hasMoreRows, setMoreRows] = useState(false)

  const [ratingState, setRatingState] = useState({
    txError: null,
    txSuccess: false,
    showChipMessage: false
  })

  const loadMore = async () => {
    if (!hasMoreRows) return

    await setProducers(currentlyVisible + 12)
    setCurrentlyVisible(currentlyVisible + 12)
  }

  const goToTop = () => {
    document.getElementById('childContent').scrollTo(0, 0)
  }

  const handleOnFliterChange = async filter => {
    await setProducers(currentlyVisible, filter)
  }

  const handleToggleSelected = (item, isAddItem = false) => {
    if (isAddItem) {
      setSelectedProducers([...state.selectedProducers, item])
      console.log({ selectedProducers: state?.selectedProducers })
    } else {
      const removeSelected = state.selectedProducers.filter(
        bpName => bpName !== item
      )

      setSelectedProducers(removeSelected)
    }
  }

  const handleOpenDesktopVotingTool = () => {
    goToTop()
    !state.compareBPToolVisible && setCompareBPTool(true)
  }

  const handleOnClear = () => {
    setSelectedProducers([])
    state.compareBPToolVisible && setCompareBPTool(false)
  }

  const handleOnClose = () => {
    state.compareBPToolVisible && setCompareBPTool(false)
  }

  const handleSetRatingState = () => {
    setRatingState({
      ...ratingState,
      txError: null,
      txSuccess: false,
      showChipMessage: false
    })
  }

  const sendVoteBps = async BPs => {
    if (!state.user) return

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
            proxy: '',
            producers: BPs.sort()
          }
        }
      ]
    }

    try {
      await state.ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      setRatingState({
        ...ratingState,
        txSuccess: true,
        showChipMessage: true
      })

      setTimeout(() => {
        setRatingState({
          ...ratingState,
          txError: null,
          txSuccess: false,
          showChipMessage: false
        })
      }, 2000)
    } catch (error) {
      console.warn(error)

      setRatingState({
        ...ratingState,
        txError: error && error.cause ? error.cause.message : error,
        showChipMessage: true
      })
    }
  }

  useEffect(() => {
    if (!state.user) return

    console.log('PRUEBA')
    setSelectedProducers([
      ...state.selectedProducers,
      ...state?.user?.userData?.voter_info?.producers
    ])
  }, [state.user])

  useEffect(() => {
    const getData = async () => {
      !state.blockProducers.data.length &&
        (await setProducers(currentlyVisible))
    }

    getData()
  }, [])

  useEffect(() => {
    if (!state.blockProducers.data.length) {
      return
    }

    setMoreRows(state.blockProducers.rows > state.blockProducers.data.length)
  }, [state.blockProducers])

  return (
    <Box className={classes.rootBP} ref={myRef}>
      <TitlePage title={t('bpsTitle')} />
      <Collapse
        in={state.compareBPToolVisible}
        timeout='auto'
        unmountOnExit
        className={classes.hiddenMobile}
      >
        <CompareTool
          removeBP={handleToggleSelected}
          className={clsx(classes.compareTool)}
          list={state.blockProducers.data}
          selected={state.selectedProducers || []}
          onHandleVote={() => sendVoteBps(state.selectedProducers || [])}
          userInfo={state.user}
          message={ratingState}
          setMessage={handleSetRatingState}
          handleOnClose={handleOnClose}
          handleOnClear={handleOnClear}
        />
      </Collapse>
      <FilterBanner
        title={t('blockProducers')}
        page='bp'
        onFilterChange={handleOnFliterChange}
      />
      <Box className={classes.wrapperGrid}>
        <Box className={classes.gridRow}>
          {(state.blockProducers.data || []).map(blockProducer => (
            <Box
              className={classes.gridItem}
              key={`${blockProducer.owner}-main-block-card`}
            >
              <Card
                isSelected={state?.selectedProducers?.includes(
                  blockProducer.owner
                )}
                toggleSelection={(isAdding, producerAccountName) => () => {
                  handleToggleSelected(producerAccountName, isAdding)
                }}
                data={blockProducer}
                imageURL={_get(blockProducer, 'bpjson.org.branding.logo_256')}
                owner={_get(blockProducer, 'owner')}
                title={_get(blockProducer, 'bpjson.org.candidate_name')}
                pathLink='block-producers'
                buttonLabel={t('addToVote')}
                average={getAverageValue(
                  _get(blockProducer, 'totalStats.average', 0)
                )}
                rate={_get(blockProducer, 'totalStats.ratings_cntr', 0)}
                isNewRate={
                  state.user &&
                  state.user.userData.userRates.some(
                    ({ owner }) => owner === blockProducer.owner
                  )
                }
              />
            </Box>
          ))}
        </Box>
      </Box>
      {state.selectedProducers.length > 0 && (
        <Grid container justifyContent='flex-end'>
          <Grid item md={12} className={classes.openBottomSheetContainer}>
            <Button onClick={handleOpenDesktopVotingTool} variant='contained'>
              <ThumbUpAltIcon />
              <Typography>
                {t('btnVoteBPs')} ({state.selectedProducers.length})
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )}
      <SelectedBpsBottomSheet
        open={state.compareBPToolVisible}
        classesStyle={classes.hiddenDesktop}
      >
        <CompareTool
          removeBP={handleToggleSelected}
          className={classes.compareTool}
          list={state.blockProducers.data}
          selected={state.selectedProducers || []}
          onHandleVote={() => sendVoteBps(state.selectedProducers || [])}
          userInfo={state.user}
          message={ratingState}
          setMessage={handleSetRatingState}
          handleOnClose={handleOnClose}
          handleOnClear={handleOnClear}
        />
      </SelectedBpsBottomSheet>
      <Box className={classes.loadMoreBtnBox}>
        <Button
          disabled={!hasMoreRows}
          className={classes.loadMoreButton}
          onClick={loadMore}
          variant='outlined'
          color={'primary'}
        >
          {t('loadMore')}
        </Button>
      </Box>
    </Box>
  )
}

export default AllBps
