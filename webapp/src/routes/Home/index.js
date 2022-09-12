import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { Tweet } from 'react-twitter-widgets'
import Typography from '@mui/material/Typography'
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
    <div>
      <TitlePage title={t('title')} />
      <div className={classes.mainCoverContainer}>
        <LogoSvg />
        <div className={classes.headerBg}>
          <div className={classes.gradientBg}>
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
              href='/block-producers'
              className={classes.btnStartRate}
            >
              {t('startRating')}
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.videoBox}>
        <Typography className={classes.videoTitle}>{t('tour')}</Typography>
        <div className={classes.video}>
          <Video src={t('videoUrl')} />
        </div>
        <Link
          variant='body2'
          href='/about'
          target='_blank'
          className={classes.link}
        >
          {t('learnMore')} <ArrowForwardIosIcon />
        </Link>
      </div>
      <div className={classes.blockProducers}>
        <Typography className={classes.votes}>{t('mostVoted')}</Typography>
        <Link
          variant='body2'
          href='/block-producers'
          className={classes.bpList}
        >
          {t('bpList')} <ArrowForwardIosIcon />
        </Link>
      </div>
      <div className={classes.wrapperGrid}>
        <div className={classes.gridRow}>
          {(state.homeProducers.data || []).map((blockProducer, index) => (
            <div
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
                  _get(blockProducer, 'total_average', 0)
                )}
                rate={_get(blockProducer, 'ratings_cntr', 0)}
                isNewRate={
                  state.user &&
                  state.user.userData.userRates.some(
                    ({ owner }) => owner === blockProducer.owner
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className={clsx(classes.blockProducers, classes.twitter)}>
        <Typography className={classes.votes}>{t('mention')}</Typography>
        <Link
          variant='body2'
          href='https://twitter.com/EOSCostaRica'
          target='_blank'
          className={classes.bpList}
        >
          {t('moreNews')} <ArrowForwardIosIcon />
        </Link>
      </div>
      <div className={clsx(classes.wrapperGrid, classes.twitter)}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <Tweet tweetId='1563298151556976640' />
          </div>
          <div className={classes.gridItem} id='cardBox1'>
            <Tweet tweetId='1460649455443759115' />
          </div>
          <div className={classes.gridItem} id='cardBox2'>
            <Tweet tweetId='1451875419246968833' />
          </div>
        </div>
      </div>
    </div>
  )
}

Home.whyDidYouRender = true

export default Home
