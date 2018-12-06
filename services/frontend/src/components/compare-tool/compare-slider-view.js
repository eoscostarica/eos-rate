import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { withNamespaces } from 'react-i18next'

import comparisonParameters from 'config/comparison-parameters'
import BlockProducerRadar from 'components/block-producer-radar'

const style = theme => ({
  root: {},
  title: {},
  bpName: {
    paddingTop: 10,
    textAlign: 'center'
  },
  slider: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  sliderCard: {
    flex: '0 0 auto',
    width: 360,
    paddingRight: 16
  }
})

const CompareSliderView = ({ classes, selected, className, t, ...props }) => (
  <div className={[classes.root, className].join(' ')}>
    <Typography className={classes.title} variant='h5'>
      {t('compareToolTitle')}
    </Typography>
    <div className={classes.slider}>
      {selected.map(bp => (
        <div
          key={`slider-card-${bp.bpjson.producer_account_name}`}
          className={classes.sliderCard}
        >
          <BlockProducerRadar
            bpData={{
              labels: comparisonParameters,
              datasets: [{ ...bp.data }]
            }}
          />
          <Typography variant='subheading' className={classes.bpName}>
            {bp.bpjson.producer_account_name}
          </Typography>
        </div>
      ))}
    </div>
  </div>
)

CompareSliderView.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string
}

CompareSliderView.defaultProps = {}

export default withStyles(style)(
  withNamespaces('translations')(CompareSliderView)
)
