import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'

import ParameterRangeSelector from 'components/parameter-range-selector'
import bpParameters from 'config/comparison-parameters'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing(2),
    color: 'white'
  },
  listItem: {
    display: 'block'
  }
})

class FilterBox extends Component {
  state = {
    ...bpParameters.reduce(
      (result, parameter) => ({
        ...result,
        [parameter]: [0, 20]
      }),
      {}
    )
  }

  handleValueChange = parameter => value =>
    this.setState({
      [parameter]: value
    })

  render () {
    const { classes } = this.props
    return (
      <List
        className={classes.nested}
        subheader={<ListSubheader>Filter Parameters</ListSubheader>}
      >
        {bpParameters.map(parameter => (
          <ListItem
            className={classes.listItem}
            key={`filter-parameter-${parameter}`}
          >
            <Typography id={`${parameter}-label`}>{parameter}</Typography>

            <ParameterRangeSelector
              aria-labelledby={`${parameter}-label`}
              allowCross={false}
              defaultValue={this.state[parameter]}
              onChange={this.handleValueChange(parameter)}
            />
          </ListItem>
        ))}
      </List>
    )
  }
}

FilterBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FilterBox)
