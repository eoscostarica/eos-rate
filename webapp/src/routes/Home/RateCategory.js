import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

import CommunityIcon from '../../components/icon/communityIcon'
import TransparencyIcon from '../../components/icon/transparencyIcon'
import TrustinessIcon from '../../components/icon/trustinessIcon'
import InfrastructureIcon from '../../components/icon/infrastructureIcon'
import DevelopmentIcon from '../../components/icon/developmentIcon'

import styles from './styles'

const useStyles = makeStyles(styles)

const RatingCategory = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()

  return (
    <Box className={classes.ratingContainer}>
      <Typography variant='h5' className={classes.mainTitle}>
        {t('ratingCategory.title')}
      </Typography>
      <Box>
        <Box className={classes.subTitleContainer}>
          <TransparencyIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.transparency.title')}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.transparency.description')}
        </Typography>
      </Box>
      <Box>
        <Box className={classes.subTitleContainer}>
          <InfrastructureIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.infrastructure.title')}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.infrastructure.description')}
        </Typography>
      </Box>
      <Box>
        <Box className={classes.subTitleContainer}>
          <TrustinessIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.trustiness.title')}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.trustiness.description')}
        </Typography>
      </Box>
      <Box>
        <Box className={classes.subTitleContainer}>
          <CommunityIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.community.title')}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.community.description')}
        </Typography>
      </Box>
      <Box>
        <Box className={classes.subTitleContainer}>
          <DevelopmentIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.development.title')}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.development.description')}
        </Typography>
      </Box>
    </Box>
  )
}

export default memo(RatingCategory)
