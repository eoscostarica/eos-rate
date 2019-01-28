import React from 'react'
import { withNamespaces } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
// import ParameterRangeSelector from 'components/parameter-range-selector'
import BlockProducerRadar from 'components/block-producer-radar'
import bpParameters from 'config/comparison-parameters'

const styles = ({ palette, typography }) => ({
  coverContainer: {
    color: '#fff',
    maxWidth: '1024px'
  },
  title: {
    fontSize: typography.h4.fontSize
  },
  paragraph: {
    color: palette.grey[600]
  },
  ctaContainer: {
    textAlign: 'right'
  },
  chartContainer: {
    maxWidth: '400px',
    width: '100%'
  }
})

const HomeCover = ({ classes, t, blockProducer }) => (
  <Grid item container xs={12} className={classes.coverContainer} spacing={24}>
    <Grid item container xs={12} md={6} justify='center'>
      <div className={classes.chartContainer}>
        <BlockProducerRadar
          bpData={{
            labels: bpParameters,
            datasets: [blockProducer.data]
          }}
        />
      </div>
    </Grid>

    <Grid item xs={12} md={6}>
      <Typography variant='h5' className={classes.title}>
        {t('cover.title')}
      </Typography>

      <Typography
        variant='body2'
        className={classes.paragraph}
        align='justify'
        paragraph
      >
        {t('cover.paragraph')}
      </Typography>

      <div className={classes.ctaContainer}>
        <Button
          className='textPrimary'
          variant='contained'
          size='small'
          color='secondary'
        >
          {t('cover.cta')}
        </Button>
      </div>
    </Grid>

    {/* <Grid item xs={12}>
      <ParameterRangeSelector defaultValue={[0, 50]} />
    </Grid> */}
  </Grid>
)

HomeCover.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  blockProducer: PropTypes.object.isRequired
}

export default withStyles(styles)(withNamespaces('home')(HomeCover))
