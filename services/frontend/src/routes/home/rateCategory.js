import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import CommunityIcon from '../../components/icon/communityIcon'
import TransparencyIcon from '../../components/icon/transparencyIcon'
import TrustinessIcon from '../../components/icon/trustinessIcon'
import InfrastructureIcon from '../../components/icon/infrastructureIcon'
import DevelopmentIcon from '../../components/icon/developmentIcon'

const styles = ({ typography, spacing }) => ({
  ratingContainer: {
    color: '#433F5B',
    maxWidth: '1024px'
  },
  title: {
    fontSize: typography.h4.fontSize,
    display: 'flex',
    marginBottom: 12.5
  },
  paragraph: {
    marginLeft: spacing(4.5)
  },
  subTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 6
  },
  iconStyle: {
    marginRight: spacing(2),
    marginTop: spacing(1),
    color: '#433F5B'
  }
})

const RatingCategory = ({ classes }) => {
  const { t } = useTranslation('home')

  return (
    <Grid
      item
      container
      xs={12}
      className={classes.ratingContainer}
    >
      <Grid item xs={12} md={12}>
        <Typography variant='h5' className={classes.title}>
          {t('ratingCategory.title')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.subTitleContainer}>
          <TransparencyIcon />
          <Typography variant='h6' className={classes.subTitle}>
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
          <Typography variant='h6' className={classes.subTitle}>
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
          <Typography variant='h6' className={classes.subTitle}>
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
          <Typography variant='h6' className={classes.subTitle}>
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
          <Typography variant='h6' className={classes.subTitle}>
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

RatingCategory.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RatingCategory)
