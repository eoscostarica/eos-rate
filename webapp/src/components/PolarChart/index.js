import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'

import { polarCharConfig } from '../../config'

import styles from './styles'

HighchartsMore(Highcharts)

const useStyles = makeStyles(styles)

const PolarChart = ({ data = [] }) => {
  const classes = useStyles()
  const [options] = useState(polarCharConfig.options)

  return (
    <Box className={classes.highchartsFigure}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...options,
          series: data
        }}
      />
    </Box>
  )
}

PolarChart.propTypes = {
  data: PropTypes.array
}

export default PolarChart
