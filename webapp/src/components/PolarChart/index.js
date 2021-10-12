import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'

import { polarCharConfig } from '../../config'

import styles from './styles'

HighchartsMore(Highcharts)

const useStyles = makeStyles(styles)

const PolarChart = ({ data = [], showLegend = false }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [options] = useState(polarCharConfig.options)

  return (
    <Box className={classes.highchartsFigure}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...options,
          xAxis: {
            ...options.xAxis,
            categories: [
              t('community'),
              t('development'),
              t('infrastructure'),
              t('transparency'),
              t('trustiness')
            ]
          },
          series: data,
          legend: {
            enabled: showLegend
          }
        }}
      />
    </Box>
  )
}

PolarChart.propTypes = {
  data: PropTypes.array,
  showLegend: PropTypes.bool
}

export default PolarChart
