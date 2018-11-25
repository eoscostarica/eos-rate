import React from 'react'
import { withNamespaces } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Video from 'components/video'

const styles = ({ palette, typography }) => ({
  title: {
    fontSize: typography.h4.fontSize,
    color: palette.grey[600]
  },
  paragraph: {
    color: palette.grey[600]
  }
})

const SubTopic = ({ classes, t }) => (
  <Grid
    item
    container
    xs={12}
    className={classes.subTopicContainer}
    spacing={16}
  >
    <Grid item xs={12} md={7}>
      <Video src={t('subTopic.videoUrl')} />
    </Grid>

    <Grid item xs={12} md={5}>
      <Typography variant='headline' className={classes.title}>
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
  </Grid>
)

SubTopic.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(styles)(withNamespaces('home')(SubTopic))
