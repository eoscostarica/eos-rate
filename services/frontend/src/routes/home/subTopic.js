import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Video from 'components/video'

const styles = ({ palette, typography }) => ({
  subTopicContainer: {
    maxWidth: '1024px'
  },
  title: {
    fontSize: typography.h4.fontSize,
    color: palette.grey[600],
    marginBottom: 12.5
  },
  paragraph: {
    color: palette.grey[600]
  }
})

const SubTopic = ({ classes }) => {
  const { t } = useTranslation('home')
  return (
    <Grid
      item
      container
      xs={12}
      className={classes.subTopicContainer}
      spacing={24}
    >
      <Grid item xs={12} md={6}>
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
      </Grid>
      <Grid item xs={12} md={6}>
        <Video src={t('subTopic.videoUrl')} />
      </Grid>
    </Grid>
  )
}

SubTopic.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SubTopic)
