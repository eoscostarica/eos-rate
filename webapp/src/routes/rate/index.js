import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2'
import Tooltip from 'rc-tooltip'
import Slider from 'rc-slider'
import set from 'lodash.set'

const Handle = Slider.Handle

const handle = props => {
  const { value, dragging, index, ...restProps } = props
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
}
const bpData = {
  labels: ['Transparency', 'BP Tooling', 'TestNet', 'Community', 'dRates'],
  datasets: [
    {
      label: 'EOS Costa Rica',
      backgroundColor: 'rgba(2,170,5,0.2)',
      borderColor: 'rgba(2,170,5,1)',
      pointBackgroundColor: 'rgba(2,170,5,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(2,170,5,1)',
      data: [9, 0, 8, 7, 2],
    },
    {
      label: 'EOS New York',
      backgroundColor: 'rgba(2,132,170,0.2)',
      borderColor: 'rgba(2,132,170,1)',
      pointBackgroundColor: 'rgba(2,132,170,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(2,132,170,1)',
      data: [9, 8, 8, 9, 8],
    },
    {
      label: 'EOS Meso',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [8, 0, 3, 7, 5],
    },
  ],
}

class Rate extends Component {
  constructor() {
    super()
    this.state = {
      data: bpData,
    }

    this.handleSliderChange = this.handleSliderChange.bind(this)
  }

  handleSliderChange = (index, value) => {
    const newData = set(bpData, `datasets[0].data[${index}]`, value)
    this.setState({
      data: newData,
    })
  }

  render() {
    console.log('render')
    console.log(this.state)
    const datasets = this.state.data.datasets
    return (
      <div style={{ padding: 30 }}>
        <h2>EOS Block Producers Comparison</h2>
        <Radar data={() => this.state.data} width="90%" redraw />
        <br />
        <hr />
        <h2>Rate EOS Costa Rica</h2>
        <br />
        Transparency
        <Slider
          min={0}
          max={10}
          defaultValue={datasets[0].data[0]}
          handle={handle}
          onChange={value => this.handleSliderChange(0, value)}
        />
        <br />
        BP Tooling
        <Slider
          min={0}
          max={10}
          defaultValue={datasets[0].data[1]}
          handle={handle}
          onChange={value => this.handleSliderChange(1, value)}
        />
        <br />
        TestNet
        <Slider
          min={0}
          max={10}
          defaultValue={datasets[0].data[2]}
          handle={handle}
          onChange={value => this.handleSliderChange(2, value)}
        />
        <br />
        Community
        <Slider
          min={0}
          max={10}
          defaultValue={datasets[0].data[3]}
          handle={handle}
          onChange={value => this.handleSliderChange(3, value)}
        />
        <br />
        dRates
        <Slider
          min={0}
          max={10}
          defaultValue={datasets[0].data[4]}
          handle={handle}
          onChange={value => this.handleSliderChange(4, value)}
        />
        <br />
        {/* <table>
          <tr>
            <th>BP</th>
            <th>Infrasctructure</th>
            <th>API</th>
            <th>History</th>
          </tr>
        </table> */}
      </div>
    )
  }
}

export default Rate
