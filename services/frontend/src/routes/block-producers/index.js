import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
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
  badge: {
    border: `2px solid ${theme.palette.secondary}`,
    background: theme.palette.primary.sectionBackground
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
  loadMoreButton: {
    display: 'block',
    margin: `${theme.spacing.unit * 2}px auto`
  },
  hidden: {
    opacity: 0,
    transform: 'scaleY(0)',
    minHeight: 0,
    height: 0
  }
})

class AllBps extends Component {
  state = {
    currentlyVisible: 10
  }

  componentDidMount () {
    this.props.getBPs()
  }

  loadMore = () =>
    this.setState(({ currentlyVisible }) => ({
      currentlyVisible: currentlyVisible + 10
    }))

  render () {
    const {
      classes,
      selectedBPs,
      blockProducers,
      filtered,
      compareToolVisible,
      toggleCompareTool,
      removeSelected,
      addToSelected,
      t
    } = this.props
    const { currentlyVisible } = this.state
    const bpList = filtered.length ? filtered : blockProducers
    const shownList = bpList.slice(0, currentlyVisible)

    const hasMore = currentlyVisible < bpList.length
    const fabLegend = compareToolVisible
      ? t('hideComparisonTool')
      : t('showComparisonTool')
    return (
      <div className={classes.root}>
        <Tooltip aria-label={fabLegend} placement='left' title={fabLegend}>
          <Button
            variant='fab'
            color='secondary'
            aria-label={fabLegend}
            className={classes.compareToggleButton}
            onClick={() => toggleCompareTool()}
          >
            <Badge
              classes={{ badge: classes.badge }}
              invisible={!selectedBPs.length}
              badgeContent={selectedBPs.length}
            >
              {compareToolVisible ? <VisibilityOff /> : <Visibility />}
            </Badge>
          </Button>
        </Tooltip>
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
          {shownList.map(blockProducer => (
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
        <Button
          className={classes.loadMoreButton}
          onClick={() => hasMore && this.loadMore()}
        >
          LOAD MORE
        </Button>
      </div>
    )
  }
}

AllBps.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
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
  blockProducers: { getBPs, toggleCompareTool, addToSelected, removeSelected }
}) => ({ getBPs, toggleCompareTool, addToSelected, removeSelected })

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
