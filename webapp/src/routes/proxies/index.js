import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import _get from 'lodash.get'

import TitlePage from 'components/title-page'
import Card from 'components/card'
import CompareTool from 'components/compare-tool'

import styles from './styles'
import SelectedBpsBottomSheet from './../block-producers/bottom-sheet-selected-bps'

const useStyles = makeStyles(styles)

const AllProxies = ({ ual }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const dispatch = useDispatch()
  const { data: user } = useSelector((state) => state.user)
  const {
    compareTool: compareToolVisible,
    selected: selectedProxies,
    filtered,
    proxies
  } = useSelector((state) => state.proxies)
  const [currentlyVisible, setCurrentlyVisible] = useState(30)
  const proxiesList = filtered && filtered.length ? filtered : proxies
  const shownList = proxiesList && proxiesList.slice(0, currentlyVisible)
  const hasMore = proxiesList && currentlyVisible < proxiesList.length
  const isDesktop = useMediaQuery('(min-width:767px)')
  const accountName = _get(ual, 'activeUser.accountName', null)
  const [openVoteDrawer, setOpenVoteDrawer] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [openDesktopVotingTool, setOpenDesktopVotingTool] = useState(isDesktop)
  const [ratingState, setRatingState] = useState({
    processing: false,
    txError: null,
    txSuccess: false
  })

  const loadMore = () => setCurrentlyVisible(currentlyVisible + 12)
  const goToTop = () => document.getElementById('mainContent').scrollTo(0, 0)

  const handleToggleCompareTool = () => {
    dispatch.proxies.toggleCompareTool()
  }

  const handleToggleSelected = (item, isAddItem = false) => {
    if (isAddItem) {
      dispatch.proxies.addToSelected(item)
    } else {
      dispatch.proxies.removeSelected(item)
    }
  }

  const handleOnClose = () => {
    setOpenDesktopVotingTool(false)
  }

  const handleOpenDesktopVotingTool = (
    isAdding,
    producerAccountName,
    value
  ) => {
    if (isAdding) {
      if (!(selectedProxies || []).length && !compareToolVisible)
        handleToggleCompareTool()
      handleToggleSelected(producerAccountName, isAdding)
      isDesktop ? setOpenDesktopVotingTool(value) : setOpenVoteDrawer(value)
      goToTop()
    } else if (!isAdding) {
      if ((selectedProxies || []).length === 1 && compareToolVisible)
        handleToggleCompareTool()
      handleToggleSelected()
    }
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
            proxy: selectedProxies[0],
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

  const cmprTool = () => (
    <CompareTool
      removeBP={handleToggleSelected}
      className={classNames(classes.compareTool)}
      list={proxies || []}
      selected={selectedProxies || []}
      onHandleVote={sendVoteProxy}
      isProxy
      message={ratingState}
      setMessage={handleSetRatingState}
      userInfo={user}
      onHandleClose={() => {
        handleToggleCompareTool()
        handleToggleSelected()
      }}
      handleOnClose={handleOnClose}
    />
  )

  useEffect(() => {
    const getData = async () => {
      await dispatch.blockProducers.getBPs()
      await dispatch.proxies.getProxies()
    }

    getData()
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      if (ual.activeUser && !user) {
        await dispatch.user.getUserChainData({ ual })
      }
    }

    dispatch.blockProducers.setShowSortSelected(false)
    getUserData()
  }, [user, ual.activeUser, ual])

  return (
    <div className={classes.root}>
      <TitlePage title={t('proxiesTitle')} />
      {isDesktop && openDesktopVotingTool && cmprTool()}
      <Grid
        className={classes.wrapper}
        container
        justifyContent='center'
        spacing={4}
      >
        {(shownList || []).map((proxy) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={`${proxy.owner}-main-block-card`}
          >
            <Card
              isSelected={
                selectedProxies && selectedProxies.includes(proxy.owner)
              }
              toggleSelection={handleOpenDesktopVotingTool}
              data={proxy}
              imageURL={_get(proxy, 'logo_256')}
              owner={_get(proxy, 'owner')}
              title={_get(proxy, 'name')}
              useRateButton={false}
              buttonLabel={t('view')}
              pathLink='proxies'
              showOptions={false}
            />
          </Grid>
        ))}
      </Grid>
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

AllProxies.propTypes = {
  ual: PropTypes.object
}

export default AllProxies

export const proxiesDrawer = []
