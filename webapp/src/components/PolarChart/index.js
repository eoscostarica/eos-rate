import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import Box from '@mui/material/Box'

import styles from './styles'

HighchartsMore(Highcharts)

const useStyles = makeStyles(styles)

const PolarChart = ({
  data = [
    // {
    //   type: 'area',
    //   name: 'eoscostarica',
    //   data: [8, 7, 6, 5, 4],
    //   pointPlacement: 'between'
    // },
    // {
    //   type: 'area',
    //   name: 'eosbarcelona',
    //   data: [1, 2, 3, 4, 5]
    // },
    // {
    //   type: 'area',
    //   name: 'eosriobrazil',
    //   data: [1, 8, 2, 7, 5]
    // },
    // {
    //   type: 'area',
    //   name: 'tetogomezeos',
    //   data: [8, 6, 6, 5, 3],
    //   pointPlacement: 'between'
    // },
    {
      type: 'area',
      name: 'tetodgomez12',
      data: [10, 10, 9, 9, 9]
    },
    {
      type: 'area',
      name: 'eosrateuser1',
      data: [1, 2, 2, 3, 5]
    }
  ]
}) => {
  const classes = useStyles()

  const options = {
    chart: {
      polar: true
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    title: {
      text: ''
    },
    pane: {
      startAngle: 0,
      endAngle: 360
    },
    xAxis: {
      gridLineWidth: 3,
      gridLineColor: '#e5e5e5',
      lineColor: '#e5e5e5',
      categories: [
        'community',
        'development',
        'infrastructure',
        'transparency',
        'trustiness'
      ],
      lineWidth: 3,
      startOnTick: true,
      tickmarkPlacement: 'on',
      labels: {
        align: 'center'
      }
    },
    yAxis: {
      gridLineWidth: 3,
      gridLineColor: '#e5e5e5',
      min: 0,
      max: 11,
      endOnTick: false,
      tickInterval: 2,
      gridLineInterpolation: 'circle',
      labels: {
        enabled: false
      }
    },

    plotOptions: {
      followPointer: true,
      series: {
        pointStart: 0
      },
      column: {
        pointPadding: 0,
        groupPadding: 0
      }
    }
  }

  useEffect(() => {
    // console.log('check responsive')
  }, [])

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
