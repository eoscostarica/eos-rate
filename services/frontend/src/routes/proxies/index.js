import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import _get from 'lodash.get'

import TitlePage from 'components/title-page'
import Card from 'components/card'
import CompareTool from 'components/compare-tool'

import styles from './styles'

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
      <CompareTool
        removeBP={handleToggleSelected}
        className={classNames(classes.compareTool, {
          [classes.hidden]: !compareToolVisible
        })}
        list={proxies || []}
        selected={selectedProxies || []}
        isProxy
        userInfo={user}
        onHandleClose={() => {
          handleToggleCompareTool()
          handleToggleSelected()
        }}
      />
      <Grid className={classes.wrapper} container justify='center' spacing={4}>
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
              toggleSelection={(isAdding, producerAccountName) => () => {
                if (isAdding) {
                  if (!(selectedProxies || []).length && !compareToolVisible)
                    handleToggleCompareTool()
                  handleToggleSelected(producerAccountName, isAdding)
                  goToTop()
                } else if (!isAdding) {
                  if (
                    (selectedProxies || []).length === 1 &&
                    compareToolVisible
                  )
                    handleToggleCompareTool()
                  handleToggleSelected()
                }
              }}
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
