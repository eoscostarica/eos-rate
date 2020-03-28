import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import _get from 'lodash.get'

import TitlePage from 'components/title-page'
import Card from 'components/card'
import CompareTool from 'components/compare-tool'
import getAverageValue from 'utils/getAverageValue'

const style = theme => ({
  root: {
    position: 'relative'
  },
  compareToggleButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
    zIndex: 1
  },
  badge: {
    border: `2px solid ${theme.palette.secondary}`,
    background: theme.palette.surface.main,
    color: theme.palette.primary.main
  },
  wrapper: {
    padding: theme.spacing(3)
  },
  compareTool: {
    minHeight: 340,
    transform: 'scaleY(1)',
    transformOrigin: 'top',
    opacity: 1,
    transition: [
      'opacity 0.25s ease',
      'height 0.25s ease',
      'transform 0.25s ease',
      'min-height 0.25s ease'
    ]
  },
  bpCard: {
    backgroundColor: theme.palette.primary.light
  },
  loadMoreButton: {
    color: '#443f56',
    display: 'block',
    margin: `${theme.spacing(2)}px auto`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: 'white'
    }
  },
  hidden: {
    opacity: 0,
    transform: 'scaleY(0)',
    minHeight: 0,
    height: 0
  }
})

const AllBps = ({
  getBPs,
  classes,
  selectedBPs,
  blockProducers,
  filtered,
  compareToolVisible,
  toggleCompareTool,
  removeSelected,
  addToSelected,
  ual,
  getUserChainData,
  user,
  storeIsContentLoading
}) => {
  const { t } = useTranslation('translations')
  const [currentlyVisible, setCurrentlyVisible] = useState(30)
  const [ratingState, setRatingState] = useState({
    txError: null,
    txSuccess: false,
    showChipMessage: false
  })
  const bpList = filtered && filtered.length ? filtered : blockProducers
  const shownList = bpList && bpList.slice(0, currentlyVisible)
  const hasMore = bpList && currentlyVisible < bpList.length
  const accountName = _get(ual, 'activeUser.accountName', null)

  const loadMore = () => setCurrentlyVisible(currentlyVisible + 12)

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
      storeIsContentLoading(true)

      console.log({ transaction, BPs })

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      setRatingState({
        ...ratingState,
        txSuccess: true,
        showChipMessage: true
      })

      storeIsContentLoading(false)

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
      storeIsContentLoading(false)
    }
  }

  useEffect(() => {
    async function getData () {
      await getBPs()
    }

    getData()
  }, [])

  useEffect(() => {
    async function getUserData () {
      if (ual.activeUser && !user) {
        await getUserChainData({ accountName: ual.activeUser.accountName })
      }
    }

    getUserData()
  })

  return (
    <div className={classes.root}>
      <TitlePage title={t('bpsTitle')} />
      <CompareTool
        removeBP={producerAccountName => () => {
          removeSelected(producerAccountName)
        }}
        className={classNames(classes.compareTool, {
          [classes.hidden]: !compareToolVisible
        })}
        list={blockProducers}
        selected={selectedBPs || []}
        onHandleVote={() => sendVoteBps(selectedBPs || [])}
        userInfo={user}
        message={ratingState}
      />
      <Grid className={classes.wrapper} container justify='center' spacing={4}>
        {(shownList || []).map(blockProducer => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={`${blockProducer.owner}-main-block-card`}
          >
            <Card
              isSelected={
                selectedBPs && selectedBPs.includes(blockProducer.owner)
              }
              toggleSelection={(isAdding, producerAccountName) => () => {
                if (isAdding) {
                  // if (!(selectedBPs || []).length) toggleCompareTool()

                  addToSelected(producerAccountName)
                } else {
                  // if ((selectedBPs || []).length === 1) toggleCompareTool()

                  removeSelected(producerAccountName)
                }
              }}
              data={blockProducer}
              imageURL={_get(blockProducer, 'bpjson.org.branding.logo_256')}
              owner={_get(blockProducer, 'owner')}
              title={_get(blockProducer, 'bpjson.org.candidate_name')}
              pathLink='block-producers'
              average={getAverageValue(_get(blockProducer, 'average', 0))}
              rate={_get(blockProducer, 'ratings_cntr', 0)}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        className={classes.loadMoreButton}
        onClick={() => hasMore && loadMore()}
      >
        LOAD MORE
      </Button>
    </div>
  )
}

AllBps.propTypes = {
  classes: PropTypes.object.isRequired,
  blockProducers: PropTypes.array.isRequired,
  getBPs: PropTypes.func.isRequired,
  toggleCompareTool: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
  addToSelected: PropTypes.func.isRequired,
  selectedBPs: PropTypes.array.isRequired,
  filtered: PropTypes.array.isRequired,
  compareToolVisible: PropTypes.bool.isRequired,
  ual: PropTypes.object,
  getUserChainData: PropTypes.func,
  user: PropTypes.object,
  storeIsContentLoading: PropTypes.func
}

AllBps.defaultProps = {
  blockProducers: [],
  selectedBPs: [],
  filtered: [],
  compareToolVisible: false
}

const mapStatetoProps = ({ blockProducers, user }) => ({
  blockProducers: blockProducers.list,
  selectedBPs: blockProducers.selected,
  filtered: blockProducers.filtered,
  compareToolVisible: blockProducers.compareTool,
  user: user.data
})

const mapDispatchToProps = ({
  blockProducers: { getBPs, toggleCompareTool, addToSelected, removeSelected },
  user: { getUserChainData },
  isLoading: { storeIsContentLoading }
}) => ({
  getBPs,
  toggleCompareTool,
  addToSelected,
  removeSelected,
  getUserChainData,
  storeIsContentLoading
})

export default withStyles(style)(
  connect(mapStatetoProps, mapDispatchToProps)(AllBps)
)

export const blockProducersDrawer = [
  // FilterBox
]
