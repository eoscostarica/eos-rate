import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import { withStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import classNames from 'classnames'

import BlockProducerCard from 'components/block-producer-card'
import CompareTool from 'components/compare-tool'
// import FilterBox from './filter-box'

const style = theme => ({
  root: {
    position: 'relative'
  },
  compareToggleButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 2,
    zIndex: 1
  },
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

class AllBps extends Component {
  componentDidMount () {
    this.props.getBPs()
  }

  render () {
    const {
      classes,
      selectedBPs,
      blockProducers,
      filtered,
      compareToolVisible,
      toggleCompareTool,
      removeSelected,
      addToSelected
    } = this.props
    const bpList = filtered.length ? filtered : blockProducers
    return (
      <div className={classes.root}>
        <Button
          variant='fab'
          color='secondary'
          aria-label='Toggle comparison tool visiblity'
          className={classes.compareToggleButton}
          onClick={() => toggleCompareTool()}
        >
          {compareToolVisible ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <CompareTool
          removeBP={producerAccountName => () => {
            removeSelected(producerAccountName)
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
                toggleSelection={(isAdding, producerAccountName) => () => {
                  if (isAdding) {
                    addToSelected(producerAccountName)
                  } else {
                    removeSelected(producerAccountName)
                  }
                }}
                blockProducer={blockProducer}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

AllBps.propTypes = {
  classes: PropTypes.object.isRequired,
  // t: PropTypes.func.isRequired,
  blockProducers: PropTypes.array.isRequired,
  getBPs: PropTypes.func.isRequired,
  toggleCompareTool: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
  addToSelected: PropTypes.func.isRequired,
  selectedBPs: PropTypes.array.isRequired,
  filtered: PropTypes.array.isRequired,
  compareToolVisible: PropTypes.bool.isRequired
}

const mapStatetoProps = ({ blockProducers }) => ({
  blockProducers: blockProducers.list,
  selectedBPs: blockProducers.selected,
  filtered: blockProducers.filtered,
  compareToolVisible: blockProducers.compareTool
})

const mapDispatchToProps = ({
  blockProducers: { getBPs, toggleCompareTool }
}) => ({ getBPs, toggleCompareTool })

export default withStyles(style)(
  withNamespaces('translations')(
    connect(
      mapStatetoProps,
      mapDispatchToProps
    )(AllBps)
  )
)

export const blockProducersDrawer = [
  // FilterBox
]
