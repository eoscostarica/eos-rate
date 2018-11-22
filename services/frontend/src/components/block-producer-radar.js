import React from 'react'
import PropTypes from 'prop-types'
import { Radar } from 'react-chartjs-2'

const BlockProducerRadar = ({ bpData, ...props }) => (
  <Radar
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
        ticks: { display: false },
        gridLines: { color: '#6e6b81', lineWidth: 4, circular: true },
        angleLines: { color: '#6e6b81', lineWidth: 4 },
        pointLabels: { fontColor: 'white' }
      }
    }}
  />
)

BlockProducerRadar.propTypes = {
  bpData: PropTypes.object
}

export default BlockProducerRadar
