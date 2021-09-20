import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'

import TitlePage from '../../components/PageTitle'
import mockedBPs from '../../mock/bps'
import getBPRadarData from '../../utils/get-bp-radar-data'

import styles from './styles'
import Cover from './cover'
import SubTopic from './subTopic'
import RateCategory from './rateCategory'

const useStyles = makeStyles(styles)

const Home = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()
  const [blockProducer, setBlockProducer] = useState(null)

  useEffect(() => {
    // const blockProducer = await findBPById(0)

    setBlockProducer({
      ...mockedBPs[0],
      data: getBPRadarData({
        name: mockedBPs[0].org.candidate_name,
        parameters: mockedBPs[0].parameters
      })
    })
    // setBlockProducer(getBPRadarData(mockedBPs[0]))
  }, [])

  console.log({ blockProducer })

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
