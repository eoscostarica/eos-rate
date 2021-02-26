import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Radar } from 'react-chartjs-2'

import getRadarLabelName from 'utils/getRadarLabelName'

const RadarData = ({ bpData, height, showLabel, ...props }) => {
  const { t } = useTranslation('translations')
  const labels = getRadarLabelName(t)
  const bpValidData =
    bpData.datasets && bpData.datasets.length
      ? { ...bpData, labels }
      : { labels, datasets: [{ data: [0, 0, 0, 0, 0] }] }

  return (
    <Radar
      redraw
      height={height}
      data={bpValidData}
      options={{
        legend: { display: showLabel },
        layout: {
          padding: {
            bottom: 10
          }
        },
        chartArea: {
          backgroundColor: '#f8f8f8',
          strokeColor: '#e5e5e5',
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
          angleLines: { color: '#e5e5e5', lineWidth: 4 },
          pointLabels: { fontColor: '#443F5B', fontSize: 14 }
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItem, data) =>
              `${data.labels[tooltipItem.index]}: ${
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              }`,
            title: (tooltipItem, data) => {
              const titleModeled = tooltipItem.reduce(
                (acc, current, index) => {
                  if (current.datasetIndex === acc.prevDatasetIndex) return acc

                  const label = `${acc.title} ${index ? '||' : ''} ${
                    data.datasets[current.datasetIndex].label
                  }`

                  return {
                    title: label,
                    prevDatasetIndex: current.datasetIndex
                  }
                },
                { title: '', prevDatasetIndex: null }
              )

              return titleModeled.title
            }
          }
        }
      }}
    />
  )
}

RadarData.propTypes = {
  bpData: PropTypes.object,
  height: PropTypes.number,
  showLabel: PropTypes.bool
}

RadarData.defaultProps = {
  showLabel: false
}

export default RadarData
