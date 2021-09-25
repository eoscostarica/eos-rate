import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { useLazyQuery } from '@apollo/client'
// import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import classNames from 'classnames'
import _get from 'lodash.get'
import useMediaQuery from '@mui/material/useMediaQuery'

import TitlePage from '../../components/PageTitle'
import CompareTool from '../../components/CompareTool'
import Card from '../../components/Card'
import getAverageValue from '../../utils/get-average-value'
import { useSharedState } from '../../context/state.context'
import { GET_BLOCK_PRODUCERS } from '../../gql'

// import applySortBy from '../../utils/sorted-by'

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
  const [openVoteDrawer, setOpenVoteDrawer] = useState(false)
  const [loadBPs, { loading = true, data: { list, info } = {} }] = useLazyQuery(
    GET_BLOCK_PRODUCERS,
    { fetchPolicy: 'network-only' }
  )
  const isDesktop = useMediaQuery('(min-width:600px)', {
    defaultMatches: false
  })
  const isTablet = useMediaQuery('(max-width:1024px)', {
    defaultMatches: false
  })
  // const [openDesktopVotingTool, setOpenDesktopVotingTool] = useState(isDesktop)

  // delete this
  const hasMore = false
  const ual = { activeUser: null }
  // end to delete this

  const [ratingState, setRatingState] = useState({
    txError: null,
    txSuccess: false,
    showChipMessage: false
  })

  // const sortedBPs = applySortBy(sortBy, blockProducers)
  // const shownList = sortedBPs && sortedBPs.slice(0, currentlyVisible)
  // const hasMore = blockProducers && currentlyVisible < blockProducers.length
  const accountName = _get(ual, 'activeUser.accountName', null)

  const loadMore = () => setCurrentlyVisible(currentlyVisible + 12)
  // const goToTop = () => document.getElementById('mainContent').scrollTo(0, 0)

  const handleToggleCompareTool = () => {
    console.log('handleToggleCompareTool')
    setCompareBPTool(!state.compareBPToolVisible)
  }

  const handleToggleSelected = (item, isAddItem = false) => {
    if (isAddItem) {
      setSelectedProducers([...state.selectedProducers, item])
    } else {
      const removeSelected = state.selectedProducers.filter(
        bpName => bpName !== item
      )

      setSelectedProducers(removeSelected)
    }
  }

  const handleOpenDesktopVotingTool = () => {
    console.log('handleOpenDesktopVotingTool')

    // goToTop()
    !state.compareBPToolVisible && setCompareBPTool(true)
  }

  const handleOnClear = () => {
    // handleToggleCompareTool()
    // dispatch.blockProducers.clearSelected()
    setSelectedProducers([])
    // setOpenDesktopVotingTool(false)
    state.compareBPToolVisible && setCompareBPTool(false)
  }

  const handleOnClose = () => {
    // setOpenDesktopVotingTool(false)
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

  const handleSetIsNewRate = owner => {
    // if (user) {
    //   for (const userRate of user.userRates) {
    //     if (userRate.owner === owner) {
    //       return true
    //     }
    //   }
    //   return false
    // }
  }

  const sendVoteBps = async BPs => {
    if (!accountName) return

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
            proxy: '',
            producers: BPs.sort()
          }
        }
      ]
    }

    try {
      // dispatch.isLoading.storeIsContentLoading(true)

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      setRatingState({
        ...ratingState,
        txSuccess: true,
        showChipMessage: true
      })

      // dispatch.isLoading.storeIsContentLoading(false)

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
      // dispatch.isLoading.storeIsContentLoading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      !state.blockProducers.length && (await loadBPs())
      // {
      //   variables: {
      //     limit: 10
      //   }
      // }))
    }

    getData()
  }, [])

  useEffect(() => {
    if (loading || !list) {
      return
    }

    setProducers(list)
  }, [list, loading, info])

  console.log({ state })

  return (
    <div className={classes.root} ref={myRef}>
      <TitlePage title={t('bpsTitle')} />
      {isDesktop && (
        <Collapse in={state.compareBPToolVisible} timeout='auto' unmountOnExit>
          <CompareTool
            removeBP={handleToggleSelected}
            className={classNames(classes.compareTool)}
            list={state.blockProducers}
            selected={state.selectedProducers || []}
            onHandleVote={() => sendVoteBps(state.selectedProducers || [])}
            userInfo={state.user}
            message={ratingState}
            setMessage={handleSetRatingState}
            handleOnClose={handleOnClose}
            handleOnClear={handleOnClear}
          />
        </Collapse>
      )}
      <Grid
        className={classes.wrapper}
        container
        justifyContent='center'
        spacing={isDesktop ? 4 : 1}
      >
        {(state.blockProducers || []).map(blockProducer => (
          <Grid
            item
            xs={12}
            sm={6}
            md={isTablet ? 6 : 4}
            key={`${blockProducer.owner}-main-block-card`}
          >
            <Card
              isSelected={state.selectedProducers.includes(blockProducer.owner)}
              toggleSelection={(isAdding, producerAccountName) => () => {
                if (isAdding) {
                  if (
                    !state.selectedProducers.length &&
                    !state.compareBPToolVisible
                  ) {
                    handleToggleCompareTool()
                  }

                  handleToggleSelected(producerAccountName, isAdding)
                } else {
                  if (
                    state.selectedProducers.length === 1 &&
                    state.compareBPToolVisible
                  ) {
                    handleToggleCompareTool()
                  }

                  handleToggleSelected(producerAccountName, isAdding)
                }
              }}
              data={blockProducer}
              imageURL={_get(blockProducer, 'bpjson.org.branding.logo_256')}
              owner={_get(blockProducer, 'owner')}
              title={_get(blockProducer, 'bpjson.org.candidate_name')}
              pathLink='block-producers'
              buttonLabel={t('addToVote')}
              average={getAverageValue(_get(blockProducer, 'average', 0))}
              rate={_get(blockProducer, 'ratings_cntr', 0)}
              isNewRate={handleSetIsNewRate(blockProducer.owner)}
            />
          </Grid>
        ))}
      </Grid>
      {state.selectedProducers.length > 0 && (
        <Grid container justifyContent='flex-end'>
          <Grid item md={12} className={classes.openBottomSheetContainer}>
            <Button
              onClick={() =>
                isDesktop
                  ? handleOpenDesktopVotingTool(true)
                  : setOpenVoteDrawer(true)
              }
              variant='contained'
            >
              <ThumbUpAltIcon />
              <Typography>
                {t('btnVoteBPs')} ({state.selectedProducers.length})
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )}
      <SelectedBpsBottomSheet open={openVoteDrawer} setOpen={setOpenVoteDrawer}>
        <CompareTool
          removeBP={handleToggleSelected}
          className={classNames(classes.compareTool, {
            [classes.hidden]: !state.compareBPToolVisible // delete this
          })}
          list={state.blockProducers}
          selected={state.selectedProducers || []}
          onHandleVote={() => sendVoteBps(state.selectedProducers || [])}
          userInfo={state.user}
          message={ratingState}
          setMessage={handleSetRatingState}
          handleOnClose={handleOnClose}
          handleOnClear={handleOnClear}
        />
      </SelectedBpsBottomSheet>
      <Button
        className={classes.loadMoreButton}
        onClick={() => hasMore && loadMore()}
      >
        {t('loadMore')}
      </Button>
    </div>
  )
}

AllBps.propTypes = {}

export default AllBps
