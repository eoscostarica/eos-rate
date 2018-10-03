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
        gridLines: { color: 'white' },
        angleLines: { color: 'white' }
      }
    }}
  />
)

BlockProducerRadar.propTypes = {
  bpData: PropTypes.object
}

export default BlockProducerRadar
