import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import _get from 'lodash.get'

import Radar from '../Radar'

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
  const isDesktop = useMediaQuery('(min-width:767px)')
  const [sizes, setSizes] = useState()

  useEffect(() => {
    setSizes(isDesktop ? 400 : '95%')
  }, [isDesktop])

  return (
    <div className={className}>
      <Typography variant='h5'>
        {isProxy ? optionalLabel : t('compareToolTitle')}
      </Typography>
      <div className={classes.slider}>
        {selected.map(bp => {
          if (!bp) return null

          const name = isProxy
            ? _get(bp, 'owner')
            : _get(bp, 'bpjson.producer_account_name')

          return (
            <div key={`slider-card-${name}`} className={classes.sliderCard}>
              <Radar
                height={sizes}
                width={sizes}
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
