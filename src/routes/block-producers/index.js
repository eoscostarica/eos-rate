import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redux } from 'redux-render'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { translate } from 'react-i18next'

import BlockProducerCard from 'components/block-producer-card'
import CompareTool from 'components/compare-tool'
import FilterBox from './filter-box'
import store from 'store'

const { dispatch } = store

const style = theme => ({
  wrapper: {
    padding: theme.spacing.unit * 3
  }
})

class AllBps extends Component {
  componentDidMount () {
    dispatch.blockProducers.getBPs()
  }

  render () {
    return (
      <Redux
        selector={state => ({
          fullBPState: state.blockProducers,
          blockProducers: state.blockProducers.list,
          filtered: state.blockProducers.filtered
        })}
      >
        {({ fullBPState, blockProducers, filtered }, dispatch) => {
          const bpList = filtered.length ? filtered : blockProducers
          const { classes } = this.props
          return (
            <React.Fragment>
              <CompareTool />
              <Grid
                className={classes.wrapper}
                container
                justify='center'
                spacing={16}
              >
                {bpList.map(blockProducer => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={`${
                      blockProducer.producer_account_name
                    }-main-block-card`}
                  >
                    <BlockProducerCard blockProducer={blockProducer} />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          )
        }}
      </Redux>
    )
  }
}

AllBps.propTypes = {
  classes: PropTypes.object.isRequired
  // t: PropTypes.func.isRequired
}

export default withStyles(style)(translate('translations')(AllBps))

export const blockProducersDrawer = [FilterBox]
