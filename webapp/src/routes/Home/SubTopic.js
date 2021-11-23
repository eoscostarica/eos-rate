import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

import Video from '../../components/Video'

import styles from './styles'

const useStyles = makeStyles(styles)

const SubTopic = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()

  return (
    <Box className={classes.subTopicContainer}>
      <Box className={classes.gridContent}>
        <Typography variant='h5' className={classes.mainTitle}>
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
        <Typography variant='h6' className={classes.subtitle}>
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
      </Box>
      <Box className={classes.videoBox}>
        <Video src={t('subTopic.videoUrl')} />
      </Box>
    </Box>
  )
}

export default memo(SubTopic)
