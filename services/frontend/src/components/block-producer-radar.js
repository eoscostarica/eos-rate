import React from 'react'
import PropTypes from 'prop-types'
import { Radar } from 'react-chartjs-2'

const BlockProducerRadar = ({ bpData, height, ...props }) => {
  const bpValidData =
    bpData.datasets && bpData.datasets.length
      ? bpData
      : { ...bpData, datasets: [{ data: [0, 0, 0, 0, 0] }] }

  return (
    <Radar
      height={height}
      data={() => ({
        ...bpValidData
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
          gridLines: { lineWidth: 4, circular: true },
          angleLines: { color: '#6e6b81', lineWidth: 4 },
          pointLabels: { fontColor: 'white', fontSize: 14 }
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItem, data) =>
              `${data.labels[tooltipItem.index]}: ${
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              }`
          }
        }
      }}
    />
  )
}

BlockProducerRadar.propTypes = {
  bpData: PropTypes.object,
  height: PropTypes.number
}

export default BlockProducerRadar
