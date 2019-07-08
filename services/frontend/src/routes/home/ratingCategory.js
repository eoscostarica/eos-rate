import React from 'react'
import { withNamespaces } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import FlipToFrontIcon from '@material-ui/icons/FlipToFrontOutlined'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutlineOutlined'
import StorageIcon from '@material-ui/icons/StorageOutlined'
import BuildIcon from '@material-ui/icons/BuildOutlined'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

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
    marginLeft: spacing.unit * 4.5,
    marginTop: spacing.unit * 1
  },
  subTitleContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  iconStyle: {
    width: 25,
    marginRight: spacing.unit * 2
  }
})

const RatingCategory = ({ classes, t }) => (
  <Grid item container xs={12} className={classes.ratingContainer} spacing={24}>
    <Grid item xs={12} md={12}>
      <Typography variant={'h5'} className={classes.title}>
        {t('ratingCategory.title')}
      </Typography>
    </Grid>
    <Grid item xs={12} md={12}>
      <div className={classes.subTitleContainer}>
        <FlipToFrontIcon className={classes.iconStyle} />
        <Typography variant={'h6'} className={classes.subTitle}>
          {t('ratingCategory.transparency.title')}
        </Typography>
      </div>
      <Typography
        variant={'body2'}
        className={classes.paragraph}
        align={'justify'}
        paragraph
      >
        {t('ratingCategory.transparency.description')}
      </Typography>
    </Grid>
    <Grid item xs={12} md={12}>
      <div className={classes.subTitleContainer}>
        <StorageIcon className={classes.iconStyle} />
        <Typography variant={'h6'} className={classes.subTitle}>
          {t('ratingCategory.infrastructure.title')}
        </Typography>
      </div>
      <Typography
        variant={'body2'}
        className={classes.paragraph}
        align={'justify'}
        paragraph
      >
        {t('ratingCategory.infrastructure.description')}
      </Typography>
    </Grid>
    <Grid item xs={12} md={12}>
      <div className={classes.subTitleContainer}>
        <FlipToFrontIcon className={classes.iconStyle} />
        <Typography variant={'h6'} className={classes.subTitle}>
          {t('ratingCategory.trustiness.title')}
        </Typography>
      </div>
      <Typography
        variant={'body2'}
        className={classes.paragraph}
        align={'justify'}
        paragraph
      >
        {t('ratingCategory.trustiness.description')}
      </Typography>
    </Grid>
    <Grid item xs={12} md={12}>
      <div className={classes.subTitleContainer}>
        <PeopleOutlineIcon className={classes.iconStyle} />
        <Typography variant={'h6'} className={classes.subTitle}>
          {t('ratingCategory.community.title')}
        </Typography>
      </div>
      <Typography
        variant={'body2'}
        className={classes.paragraph}
        align={'justify'}
        paragraph
      >
        {t('ratingCategory.community.description')}
      </Typography>
    </Grid>
    <Grid item xs={12} md={12}>
      <div className={classes.subTitleContainer}>
        <BuildIcon className={classes.iconStyle} />
        <Typography variant={'h6'} className={classes.subTitle}>
          {t('ratingCategory.development.title')}
        </Typography>
      </div>
      <Typography
        variant={'body2'}
        className={classes.paragraph}
        align={'justify'}
        paragraph
      >
        {t('ratingCategory.development.description')}
      </Typography>
    </Grid>
  </Grid>
)

RatingCategory.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(styles)(withNamespaces('home')(RatingCategory))
