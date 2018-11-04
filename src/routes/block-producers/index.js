import React from 'react'
import PropTypes from 'prop-types'
import { Redux } from 'redux-render'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { translate } from 'react-i18next'
import Component from '@reach/component-component'

import BlockProducerCard from 'components/block-producer-card'
import CompareTool from 'components/compare-tool'
import FilterBox from './filter-box'

const style = theme => ({
  wrapper: {
    padding: theme.spacing.unit * 3
  },
  compareTool: {
    minHeight: 340
  }
})

const AllBps = ({ classes, ...props }) => (
  <Redux
    selector={state => ({
      fullBPState: state.blockProducers,
      blockProducers: state.blockProducers.list,
      selectedBPs: state.blockProducers.selected,
      filtered: state.blockProducers.filtered
    })}
  >
    {({ fullBPState, selectedBPs, blockProducers, filtered }, dispatch) => {
      const bpList = filtered.length ? filtered : blockProducers
      return (
        <Component componentDidMount={() => dispatch.blockProducers.getBPs()}>
          {() => (
            <React.Fragment>
              <CompareTool
                removeBP={producerAccountName => () => {
                  dispatch.blockProducers.removeSelected(producerAccountName)
                }}
                className={classes.compareTool}
                bpList={blockProducers}
                selected={selectedBPs}
              />
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
                    <BlockProducerCard
                      isSelected={selectedBPs.includes(
                        blockProducer.producer_account_name
                      )}
                      toggleSelection={(
                        isAdding,
                        producerAccountName
                      ) => () => {
                        if (isAdding) {
                          dispatch.blockProducers.addToSelected(
                            producerAccountName
                          )
                        } else {
                          dispatch.blockProducers.removeSelected(
                            producerAccountName
                          )
                        }
                      }}
                      blockProducer={blockProducer}
                    />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          )}
        </Component>
      )
    }}
  </Redux>
)

AllBps.propTypes = {
  classes: PropTypes.object.isRequired
  // t: PropTypes.func.isRequired
}

export default withStyles(style)(translate('translations')(AllBps))

export const blockProducersDrawer = [FilterBox]
