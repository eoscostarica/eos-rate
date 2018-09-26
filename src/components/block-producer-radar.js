import React from 'react'
import PropTypes from 'prop-types'
import { Radar } from 'react-chartjs-2'

const BlockProducerRadar = ({ bpData, ...props }) => (
  <Radar data={() => bpData} />
)

BlockProducerRadar.propTypes = {
  bpData: PropTypes.object
}

export default BlockProducerRadar
