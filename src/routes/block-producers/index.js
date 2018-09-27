import React, { Component } from 'react'
import { Redux } from 'redux-render'
// import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { translate } from 'react-i18next'

import BlockProducerCard from 'components/block-producer-card'
import store from 'store'

const { dispatch } = store

const style = theme => ({})

class AllBps extends Component {
  componentDidMount () {
    dispatch.blockProducers.getBPs()
  }

  render () {
    return (
      <Redux
        selector={state => ({
          blockProducers: state.blockProducers.list
        })}
      >
        {(state, dispatch) => (
          <Grid container justify='center' spacing='16'>
            {state.blockProducers.map(blockProducer => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={`${blockProducer.producer_account_name}-main-block-card`}
              >
                <BlockProducerCard blockProducer={blockProducer} />
              </Grid>
            ))}
          </Grid>
        )}
      </Redux>
    )
  }
}

AllBps.propTypes = {
  // classes: PropTypes.object.isRequired,
  // t: PropTypes.func.isRequired
}

export default withStyles(style)(translate('translations')(AllBps))
