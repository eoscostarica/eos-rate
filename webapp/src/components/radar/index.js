import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Radar } from 'react-chartjs-2'

import getRadarLabelName from 'utils/getRadarLabelName'

const RadarData = ({ bpData, height, showLabel, width, ...props }) => {
  const { t } = useTranslation('translations')
  const labels = getRadarLabelName(t)
  const [sizes, setSizes] = useState({ width: 250, height: 250 })
  const bpValidData =
    bpData.datasets && bpData.datasets.length
      ? { ...bpData, labels }
      : { labels, datasets: [{ data: [0, 0, 0, 0, 0] }] }

  useEffect(() => {
    if (!width && !height) return

    setSizes({ width, height })
  }, [width, height])

  return (
    <Radar
      data={bpValidData}
      style={{
        margin: 'auto',
        width: sizes.width,
        height: sizes.height
      }}
      options={{
        animation: {
          duration: false
        },
        plugins: {
          legend: {
            display: showLabel,
            labels: {
              font: {
                size: 14
              }
            }
          }
        },
        scales: {
          r: {
            ticks: {
              display: false,
              min: 0,
              max: 10,
              stepSize: 2
            },
            grid: {
              circular: true,
              lineWidth: 4
            },
            suggestedMin: 1,
            suggestedMax: 10,
            angleLines: { color: '#e5e5e5', lineWidth: 4 },
            pointLabels: {
              fontColor: '#443F5B',
              font: {
                size: 12
              }
            }
          }
        },
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
  height: PropTypes.any,
  width: PropTypes.any,
  showLabel: PropTypes.bool
}

RadarData.defaultProps = {
  showLabel: false
}

export default RadarData
