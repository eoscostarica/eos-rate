import React from 'react'
import PropTypes from 'prop-types'
import { Radar } from 'react-chartjs-2'

const BlockProducerRadar = ({ bpData, ...props }) => (
  <Radar
    data={() => ({
      ...bpData
    })}
    options={{
      legend: false,
      scale: {
        gridLines: { color: 'white', circular: true },
        angleLines: { color: 'white' },
        pointLabels: { fontColor: 'white' }
      }
    }}
  />
)

BlockProducerRadar.propTypes = {
  bpData: PropTypes.object
}

export default BlockProducerRadar
