import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import _get from 'lodash.get'

import TitlePage from 'components/title-page'
import CompareTool from 'components/compare-tool'
import getAverageValue from 'utils/getAverageValue'
import { useMediaQuery } from '@material-ui/core'
import applySortBy from 'utils/sortedBy'
import Card from 'components/card'

import styles from './styles'
import SelectedBpsBottomSheet from './bottom-sheet-selected-bps'

const useStyles = makeStyles(styles)

const AllBps = ({ ual }) => {
  const { t } = useTranslation('translations')
  const dispatch = useDispatch()
  const classes = useStyles()
  const myRef = useRef(null)
  const [currentlyVisible, setCurrentlyVisible] = useState(30)
  const [openVoteDrawer, setOpenVoteDrawer] = useState(false)
  const { data: user } = useSelector((state) => state.user)
  const isDesktop = useMediaQuery('(min-width:600px)', {
    defaultMatches: false
  })
  const isTablet = useMediaQuery('(max-width:1024px)', {
    defaultMatches: false
  })
  const [openDesktopVotingTool, setOpenDesktopVotingTool] = useState(isDesktop)
  const {
    list: blockProducers,
    selected: selectedBPs,
    compareTool: compareToolVisible,
    sortBy
  } = useSelector((state) => state.blockProducers)

  const [ratingState, setRatingState] = useState({
    txError: null,
    txSuccess: false,
    showChipMessage: false
  })
  const sortedBPs = applySortBy(sortBy, blockProducers)
  const shownList = sortedBPs && sortedBPs.slice(0, currentlyVisible)
  const hasMore = blockProducers && currentlyVisible < blockProducers.length
  const accountName = _get(ual, 'activeUser.accountName', null)

  const loadMore = () => setCurrentlyVisible(currentlyVisible + 12)
  const goToTop = () => document.getElementById('mainContent').scrollTo(0, 0)

  const handleToggleCompareTool = () => {
    dispatch.blockProducers.toggleCompareTool()
  }

  const handleToggleSelected = (item, isAddItem = false) => {
    if (isAddItem) {
      dispatch.blockProducers.addToSelected(item)
    } else {
      dispatch.blockProducers.removeSelected(item)
    }
  }

  const handleOpenDesktopVotingTool = (value) => {
    goToTop()
    setOpenDesktopVotingTool(value)
  }

  const handleOnClear = () => {
    handleToggleCompareTool()
    dispatch.blockProducers.clearSelected()
    setOpenDesktopVotingTool(false)
  }

  const handleOnClose = () => {
    setOpenDesktopVotingTool(false)
  }

  const handleSetRatingState = () => {
    setRatingState({
      ...ratingState,
      txError: null,
      txSuccess: false,
      showChipMessage: false
    })
  }

  const handleSetIsNewRate = (owner) => {
    if (user) {
      for (const userRate of user.userRates) {
        if (userRate.owner === owner) {
          return true
        }
      }
      return false
    }
  }

  const sendVoteBps = async (BPs) => {
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
      dispatch.isLoading.storeIsContentLoading(true)

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      setRatingState({
        ...ratingState,
        txSuccess: true,
        showChipMessage: true
      })

      dispatch.isLoading.storeIsContentLoading(false)

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
      dispatch.isLoading.storeIsContentLoading(false)
    }
  }

  const cmprTool = () => (
    <CompareTool
      removeBP={handleToggleSelected}
      className={classNames(classes.compareTool, {
        [classes.hidden]: !compareToolVisible
      })}
      list={blockProducers}
      selected={selectedBPs || []}
      onHandleVote={() => sendVoteBps(selectedBPs || [])}
      userInfo={user}
      message={ratingState}
      setMessage={handleSetRatingState}
      handleOnClose={handleOnClose}
      handleOnClear={handleOnClear}
    />
  )

  useEffect(() => {
    const getData = async () => {
      !blockProducers.length && (await dispatch.blockProducers.getBPs())
    }

    getData()
  }, [blockProducers.length])

  useEffect(() => {
    const getUserData = async () => {
      if (ual.activeUser && !user) {
        await dispatch.user.getUserChainData({ ual })
      }
    }

    dispatch.blockProducers.setShowSortSelected(true)
    getUserData()
  }, [user, ual.activeUser, ual])

  return (
    <div className={classes.root} ref={myRef}>
      <TitlePage title={t('bpsTitle')} />
      {isDesktop && openDesktopVotingTool && cmprTool()}
      <Grid
        className={classes.wrapper}
        container
        justify='center'
        spacing={isDesktop ? 4 : 1}
      >
        {(shownList || []).map((blockProducer) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={isTablet ? 6 : 4}
            key={`${blockProducer.owner}-main-block-card`}
          >
            <Card
              isSelected={
                selectedBPs && selectedBPs.includes(blockProducer.owner)
              }
              toggleSelection={(isAdding, producerAccountName) => () => {
                if (isAdding) {
                  if (!(selectedBPs || []).length && !compareToolVisible) {
                    handleToggleCompareTool()
                  }

                  handleToggleSelected(producerAccountName, isAdding)
                } else {
                  if ((selectedBPs || []).length === 1 && compareToolVisible) {
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
              average={getAverageValue(_get(blockProducer, 'average', 0))}
              rate={_get(blockProducer, 'ratings_cntr', 0)}
              isNewRate={handleSetIsNewRate(blockProducer.owner)}
            />
          </Grid>
        ))}
      </Grid>
      {selectedBPs && selectedBPs.length > 0 && (
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
                {t('btnVoteBPs')} ({selectedBPs.length})
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )}
      <SelectedBpsBottomSheet open={openVoteDrawer} setOpen={setOpenVoteDrawer}>
        {cmprTool()}
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

AllBps.propTypes = {
  ual: PropTypes.object
}

export default AllBps

export const blockProducersDrawer = [
  { value: 'alphabetical' },
  { value: 'generalRate' },
  { value: 'edenRate' },
  { value: 'infrastructure' },
  { value: 'community' },
  { value: 'trustiness' },
  { value: 'development' },
  { value: 'transparency' },
  { value: 'vote' },
  { value: 'ratings' }
]
