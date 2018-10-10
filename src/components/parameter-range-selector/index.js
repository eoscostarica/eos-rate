import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Range } from 'rc-slider'

import './style.css'

const styles = {
  root: {}
}

const ParameterRangeSelector = ({ classes, theme, ...props }) => (
  <Range
    className={classes.root}
    pushable={10}
    trackStyle={[{ backgroundColor: theme.palette.secondary.dark }]}
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
