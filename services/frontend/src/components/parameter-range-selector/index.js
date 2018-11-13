import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Slider, { createSliderWithTooltip } from 'rc-slider'

import './style.css'

const Range = createSliderWithTooltip(Slider.Range)

const styles = {
  root: {}
}

const ParameterRangeSelector = ({ classes, theme, ...props }) => (
  <Range
    className={classes.root}
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

ParameterRangeSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(ParameterRangeSelector)
