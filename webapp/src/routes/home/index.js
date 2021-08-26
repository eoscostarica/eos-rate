import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'

import TitlePage from 'components/title-page'

import styles from './styles'
import Cover from './cover'
import SubTopic from './subTopic'
import RateCategory from './rateCategory'

const useStyles = makeStyles(styles)

const Home = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()
  const dispatch = useDispatch()
  const { blockProducer } = useSelector((state) => state.home)

  useEffect(() => {
    dispatch.home.getBlockData()
  }, [])

  useEffect(() => {
    dispatch.blockProducers.setShowSortSelected(false)
  })

  return (
    <>
      <TitlePage title={t('title')} />
      <Grid container direction='column'>
        <Grid item xs>
          {blockProducer && (
            <Grid
              container
              justifyContent='center'
              className={classNames(
                classes.spacingContainers,
                classes.mainCoverContainer
              )}
            >
              <Cover blockProducer={blockProducer} />
            </Grid>
          )}
        </Grid>

        <Grid item xs>
          {blockProducer && (
            <Grid
              container
              justifyContent='center'
              className={classNames(
                classes.spacingContainers,
                classes.rateCategoryContainer
              )}
            >
              <RateCategory />
            </Grid>
          )}
        </Grid>

        <Grid item xs>
          <Grid
            container
            justifyContent='center'
            className={classNames(
              classes.spacingContainers,
              classes.mainSubTopicContainer
            )}
          >
            <SubTopic />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
