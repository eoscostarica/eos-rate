import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import CommunityIcon from 'components/icon/communityIcon'
import TransparencyIcon from 'components/icon/transparencyIcon'
import TrustinessIcon from 'components/icon/trustinessIcon'
import InfrastructureIcon from 'components/icon/infrastructureIcon'
import DevelopmentIcon from 'components/icon/developmentIcon'

import styles from './styles'

const useStyles = makeStyles(styles)

const RatingCategory = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()

  return (
    <Grid item container xs={12} className={classes.ratingContainer}>
      <Grid item xs={12} md={12}>
        <Typography variant='h5' className={classes.ratingTitle}>
          {t('ratingCategory.title')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.subTitleContainer}>
          <TransparencyIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.transparency.title')}
          </Typography>
        </div>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.transparency.description')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.subTitleContainer}>
          <InfrastructureIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.infrastructure.title')}
          </Typography>
        </div>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.infrastructure.description')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.subTitleContainer}>
          <TrustinessIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.trustiness.title')}
          </Typography>
        </div>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.trustiness.description')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.subTitleContainer}>
          <CommunityIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.community.title')}
          </Typography>
        </div>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.community.description')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.subTitleContainer}>
          <DevelopmentIcon />
          <Typography variant='h6' className={classes.ratingSubtitle}>
            {t('ratingCategory.development.title')}
          </Typography>
        </div>
        <Typography
          variant='body2'
          className={classes.paragraph}
          align='justify'
          paragraph
        >
          {t('ratingCategory.development.description')}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default RatingCategory
