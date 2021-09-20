import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import Slider, { createSliderWithTooltip } from 'rc-slider'

import './style.css'

const Range = createSliderWithTooltip(Slider.Range)

const ParameterRangeSelector = ({ ...props }) => {
  const theme = useTheme()
  return (
    <Range
      pushable={10}
      min={0}
      max={100}
      trackStyle={[{ backgroundColor: theme.palette.secondary.dark }]}
      tipFormatter={value => `${value ? value / 10 : 0}`}
      handleStyle={[
        {
          backgroundColor: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main
        },
        {
          backgroundColor: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main
        }
      ]}
      {...props}
    />
  )
}

ParameterRangeSelector.propTypes = {}

export default ParameterRangeSelector
