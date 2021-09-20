import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Video from '../../components/Video'

import styles from './styles'

const useStyles = makeStyles(styles)

const SubTopic = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()

  return (
    <Grid container className={classes.subTopicContainer}>
      <Grid item xs={12} md={6} className={classes.gridContent}>
        <Typography variant='h5' className={classes.title}>
          {t('subTopic.title')}
        </Typography>

        <Typography
          variant='body2'
          className={classes.paragraph1}
          align='justify'
          paragraph
        >
          {t('subTopic.paragraph1')}
        </Typography>

        <Typography
          variant='body2'
          className={classes.paragraph2}
          align='justify'
          paragraph
        >
          {t('subTopic.paragraph2')}
        </Typography>
        <Typography variant='h6' className={classes.topicSubtitle}>
          {t('subTopic.subtitle')}
        </Typography>

        <Typography
          variant='body2'
          className={classes.paragraph1}
          align='justify'
          paragraph
        >
          {`${t('subTopic.text')} `}
          <a
            href='https://t.me/eoscr'
            target='_blank'
            rel='noopener noreferrer'
            className={classes.link}
          >
            {t('subTopic.telegramGroup')}.
          </a>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Video src={t('subTopic.videoUrl')} />
      </Grid>
    </Grid>
  )
}

export default memo(SubTopic)
