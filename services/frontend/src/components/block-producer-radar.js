import React from 'react'
import PropTypes from 'prop-types'
import { Radar } from 'react-chartjs-2'

const BlockProducerRadar = ({ bpData, height, ...props }) => (
  <Radar
    height={height}
    data={() => ({
      ...bpData
    })}
    options={{
      legend: { display: false },
      layout: {
        padding: {
          bottom: 10
        }
      },
      chartArea: {
        backgroundColor: '#484656',
        strokeColor: '#b1afad',
        lineWidth: 4
      },
      scale: {
        ticks: {
          display: false,
          min: 0,
          max: 10,
          stepSize: 2
        },
        gridLines: { color: '#6e6b81', lineWidth: 4, circular: true },
        angleLines: { color: '#6e6b81', lineWidth: 4 },
        pointLabels: { fontColor: 'white', fontSize: 14 }
      }
    }}
  />
)

BlockProducerRadar.propTypes = {
  bpData: PropTypes.object,
  height: PropTypes.number
}

export default BlockProducerRadar
