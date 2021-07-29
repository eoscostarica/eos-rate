import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import _get from 'lodash.get'
import { useTranslation } from 'react-i18next'

import Radar from 'components/radar'

import styles from './styles'

const useStyles = makeStyles(styles)

const CompareSliderView = ({
  selected,
  className,
  isProxy,
  optionalLabel,
  ...props
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <div className={className}>
      <Typography variant='h5'>
        {isProxy ? optionalLabel : t('compareToolTitle')}
      </Typography>
      <div className={classes.slider}>
        {selected.map((bp) => {
          if (!bp) return null

          const name = isProxy
            ? _get(bp, 'owner')
            : _get(bp, 'bpjson.producer_account_name')

          return (
            <div key={`slider-card-${name}`} className={classes.sliderCard}>
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
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool,
  optionalLabel: PropTypes.string
}

CompareSliderView.defaultProps = {}

export default CompareSliderView
