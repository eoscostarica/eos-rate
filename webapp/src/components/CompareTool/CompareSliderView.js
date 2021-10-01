import React from 'react'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import _get from 'lodash.get'
import clsx from 'clsx'

import PolarChart from '../PolarChart'

import styles from './styles'

const useStyles = makeStyles(styles)

const CompareSliderView = ({
  selected,
  className,
  isProxy,
  optionalLabel,
  handleOnClose
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={clsx(classes.compareSliderView, className)}>
      <Box className={classes.headerVotingCompare}>
        <Box className={classes.modalHeader}>
          <Typography variant='h6' className={classes.marginRightElem}>
            {isProxy ? optionalLabel : t('compareToolTitle')}
          </Typography>
          <Box className={classes.boxCloseIcon}>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleOnClose} />
          </Box>
        </Box>
      </Box>

      <Box className={classes.slider}>
        {selected.map((bp, index) => {
          if (!bp) return null

          const name = isProxy
            ? _get(bp, 'owner')
            : _get(bp, 'bpjson.producer_account_name')

          return (
            <Box
              key={`slider-card-${name}-${index}`}
              className={classes.sliderCard}
            >
              <Box className={classes.chartWrapperSliderView}>
                <PolarChart data={bp.data ? [{ ...bp.data }] : []} />
              </Box>
              <Typography variant='subtitle1' className={classes.bpName}>
                {name}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

CompareSliderView.propTypes = {
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool,
  handleOnClose: PropTypes.func,
  optionalLabel: PropTypes.string
}

CompareSliderView.defaultProps = {}

export default CompareSliderView
