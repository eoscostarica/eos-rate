import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import CompareGraphView from './compare-graph-view'
import CompareSliderView from './compare-slider-view'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    background: theme.palette.primary.dark,
    width: '100%',
    position: 'relative'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: 'calc(100% - 16px)'
  },
  switch: {
    float: 'right'
  }
})

class CompareTool extends Component {
  state = {
    isCollapsedView: true
  }

  render () {
    const { classes, removeBP, bpList, selected, t, className } = this.props

    const selectedBlockProducers = selected.map(bpName =>
      bpList.find(
        ({ bpjson: { producer_account_name: producerAccountName } }) =>
          bpName === producerAccountName
      )
    )

    return (
      <div className={[classes.root, className].join(' ')}>
        {this.state.isCollapsedView ? (
          <CompareGraphView
            removeBP={removeBP}
            selected={selectedBlockProducers}
          />
        ) : (
          <CompareSliderView
            removeBP={removeBP}
            selected={selectedBlockProducers}
          />
        )}
        <div className={classes.footer}>
          <FormControlLabel
            className={classes.switch}
            control={
              <Switch
                checked={this.state.isCollapsedView}
                onChange={event =>
                  this.setState({
                    isCollapsedView: event.target.checked
                  })
                }
                value='isCollapsedView'
              />
            }
            label={t('compareToolCollapsedSwitch')}
          />
        </div>
      </div>
    )
  }
}

CompareTool.propTypes = {
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  bpList: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string
}

CompareTool.defaultProps = {
  className: ''
}

export default withStyles(styles)(withNamespaces('translations')(CompareTool))
