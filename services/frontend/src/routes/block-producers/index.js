import React from 'react'
import PropTypes from 'prop-types'
import { Redux } from 'redux-render'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import classNames from 'classnames'
import Component from '@reach/component-component'

import BlockProducerCard from 'components/block-producer-card'
import CompareTool from 'components/compare-tool'
// import FilterBox from './filter-box'
import CompareToolToggle from './compare-tool-toggle'

const style = theme => ({
  wrapper: {
    padding: theme.spacing.unit * 3
  },
  compareTool: {
    minHeight: 340,
    transform: 'scaleY(1)',
    transformOrigin: 'top',
    opacity: 1,
    transition: [
      'opacity 0.25s ease',
      'height 0.25s ease',
      'transform 0.25s ease',
      'min-height 0.25s ease'
    ]
  },
  hidden: {
    opacity: 0,
    transform: 'scaleY(0)',
    minHeight: 0,
    height: 0
  }
})

const AllBps = ({ classes, ...props }) => (
  <Redux
    selector={state => ({
      fullBPState: state.blockProducers,
      blockProducers: state.blockProducers.list,
      selectedBPs: state.blockProducers.selected,
      filtered: state.blockProducers.filtered,
      compareToolVisible: state.blockProducers.compareTool
    })}
  >
    {(
      {
        fullBPState,
        selectedBPs,
        blockProducers,
        filtered,
        compareToolVisible
      },
      dispatch
    ) => {
      const bpList = filtered.length ? filtered : blockProducers
      return (
        <Component componentDidMount={() => dispatch.blockProducers.getBPs()}>
          {() => (
            <React.Fragment>
              <CompareTool
                removeBP={producerAccountName => () => {
                  dispatch.blockProducers.removeSelected(producerAccountName)
                }}
                className={classNames(classes.compareTool, {
                  [classes.hidden]: !compareToolVisible
                })}
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
                    key={`${blockProducer.owner}-main-block-card`}
                  >
                    <BlockProducerCard
                      isSelected={selectedBPs.includes(blockProducer.owner)}
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

export default withStyles(style)(withNamespaces('translations')(AllBps))

export const blockProducersDrawer = [
  CompareToolToggle
  // FilterBox
]
