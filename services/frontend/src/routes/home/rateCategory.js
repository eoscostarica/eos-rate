import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Icon from '../../components/icon'

const styles = ({ typography, spacing }) => ({
  ratingContainer: {
    color: '#fff',
    maxWidth: '1024px'
  },
  title: {
    fontSize: typography.h4.fontSize,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  paragraph: {
    marginLeft: spacing(4.5),
    marginTop: spacing(1)
  },
  subTitleContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  iconStyle: {
    marginRight: spacing(2)
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
      spacing={24}
    >
      <Grid item xs={12} md={12}>
        <Typography variant='h5' className={classes.title}>
          {t('ratingCategory.title')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.subTitleContainer}>
          <Icon
            name='transparency'
            useImage
            className={classes.iconStyle}
            size={25}
          />
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
          <Icon
            name='infrastructure'
            useImage
            className={classes.iconStyle}
            size={25}
          />

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
          <Icon
            name='trustiness'
            useImage
            className={classes.iconStyle}
            size={25}
          />
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
          <Icon
            name='community'
            useImage
            className={classes.iconStyle}
            size={25}
          />
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
          <Icon
            name='development'
            useImage
            className={classes.iconStyle}
            size={25}
          />
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
