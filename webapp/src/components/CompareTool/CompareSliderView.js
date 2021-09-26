import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import _get from 'lodash.get'

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
  const isDesktop = useMediaQuery('(min-width:767px)')
  // const [sizes, setSizes] = useState()

  useEffect(() => {
    // setSizes(isDesktop ? 400 : '95%')
  }, [isDesktop])

  return (
    <Box className={className}>
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
        {selected.map(bp => {
          if (!bp) return null

          console.log({ bp })

          const name = isProxy
            ? _get(bp, 'owner')
            : _get(bp, 'bpjson.producer_account_name')

          return (
            <Box key={`slider-card-${name}`} className={classes.sliderCard}>
              <PolarChart bpData={bp.data ? [{ ...bp.data }] : []} />
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
