import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { Tweet } from 'react-twitter-widgets'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import _get from 'lodash.get'
import clsx from 'clsx'

import TitlePage from '../../components/PageTitle'
import Video from '../../components/Video'
import Card from '../../components/Card'
import getAverageValue from '../../utils/get-average-value'
import { useSharedState } from '../../context/state.context'

import styles from './styles'
import LogoSvg from './LogoSvg'

const useStyles = makeStyles(styles)

const Home = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()
  const [state, { setHomeProducers }] = useSharedState()

  useEffect(() => {
    const getHomeBP = async () => {
      await setHomeProducers()
    }

    getHomeBP()
  }, [])

  return (
    <Box>
      <TitlePage title={t('title')} />
      <Box className={classes.mainCoverContainer}>
        <LogoSvg />
        <Box className={classes.headerBg}>
          <Box className={classes.gradientBg}>
            <Typography className={classes.headerTitle}>
              {t('knowBP')}
            </Typography>
            <Typography className={classes.headerSubtitle}>
              {t('welcome')}
            </Typography>
            <Typography
              className={clsx(classes.headerSubtitle, classes.headerInfo)}
            >
              {t('ratinInfo')}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              className={classes.btnStartRate}
            >
              {t('startRating')}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={classes.videoBox}>
        <Typography className={classes.videoTitle}>{t('tour')}</Typography>
        <Box className={classes.video}>
          <Video src={t('videoUrl')} />
        </Box>
        <Link
          component='button'
          variant='body2'
          className={classes.link}
          onClick={() => {
            console.info("I'm a button.")
          }}
        >
          {t('learnMore')} <ArrowForwardIosIcon />
        </Link>
      </Box>
      <Box className={classes.blockProducers}>
        <Typography className={classes.votes}>{t('mostVoted')}</Typography>
        <Link
          component='button'
          variant='body2'
          className={classes.bpList}
          onClick={() => {
            console.info("I'm a button.")
          }}
        >
          {t('bpList')} <ArrowForwardIosIcon />
        </Link>
      </Box>
      <Box className={classes.wrapperGrid}>
        <Box className={classes.gridRow}>
          {(state.homeProducers.data || []).map((blockProducer, index) => (
            <Box
              className={classes.gridItem}
              key={`${blockProducer.owner}-main-block-card`}
              id={`cardBox${index}`}
            >
              <Card
                toggleSelection={() => {}}
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
      <Box className={clsx(classes.blockProducers, classes.twitter)}>
        <Typography className={classes.votes}>{t('mention')}</Typography>
        <Link
          component='button'
          variant='body2'
          className={classes.bpList}
          onClick={() => {
            console.info("I'm a button.")
          }}
        >
          {t('moreNews')} <ArrowForwardIosIcon />
        </Link>
      </Box>
      <Box className={clsx(classes.wrapperGrid, classes.twitter)}>
        <Box className={classes.gridRow}>
          <Box className={classes.gridItem}>
            <Tweet tweetId='1460649455443759115' />
          </Box>
          <Box className={classes.gridItem} id='cardBox1'>
            <Tweet tweetId='1451875419246968833' />
          </Box>
          <Box className={classes.gridItem} id='cardBox2'>
            <Tweet tweetId='1457795829666697217' />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

Home.whyDidYouRender = true

export default Home
