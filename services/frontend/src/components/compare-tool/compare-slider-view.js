import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import _get from 'lodash.get'
import { useTranslation } from 'react-i18next'

import Radar from 'components/radar'

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

const CompareSliderView = ({ classes, selected, className, isProxy, optionalLabel, ...props }) => {
  const { t } = useTranslation('translations')

  return (
    <div className={[classes.root, className].join(' ')}>
      <Typography className={classes.title} variant='h5'>
        {isProxy ? optionalLabel : t('compareToolTitle')}
      </Typography>
      <div className={classes.slider}>
        {selected.map(bp => {
          if (!bp) return null

          const name = isProxy ? _get(bp, 'owner') : _get(bp, 'bpjson.producer_account_name')

          return (
            <div
              key={`slider-card-${name}`}
              className={classes.sliderCard}
            >
              <Radar
                bpData={{
                  datasets: bp.data ? [{ ...bp.data }] : []
                }}
              />
              <Typography variant='subtitle1' className={classes.bpName}>
                {name}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}

CompareSliderView.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool,
  optionalLabel: PropTypes.string
}

CompareSliderView.defaultProps = {}

export default withStyles(style)(CompareSliderView)
