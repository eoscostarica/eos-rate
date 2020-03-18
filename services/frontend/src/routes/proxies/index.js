import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useTranslation } from 'react-i18next'
import Visibility from '@material-ui/icons/Visibility'
import classNames from 'classnames'
import _get from 'lodash.get'

import Card from 'components/card'
import CompareTool from 'components/compare-tool'

const style = theme => ({
  root: {
    position: 'relative'
  },
  compareToggleButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
    zIndex: 1
  },
  badge: {
    border: `2px solid ${theme.palette.secondary}`,
    background: theme.palette.surface.main,
    color: theme.palette.primary.main
  },
  wrapper: {
    padding: theme.spacing(3)
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
  bpCard: {
    backgroundColor: theme.palette.primary.light
  },
  loadMoreButton: {
    color: '#443f56',
    display: 'block',
    margin: `${theme.spacing(2)}px auto`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: 'white'
    }
  },
  hidden: {
    opacity: 0,
    transform: 'scaleY(0)',
    minHeight: 0,
    height: 0
  }
})

const AllProxies = ({
  getBPs,
  classes,
  selectedProxies,
  filtered,
  compareToolVisible,
  toggleCompareTool,
  removeSelected,
  addToSelected,
  getProxies,
  proxies
}) => {
  const { t } = useTranslation('translations')
  const [currentlyVisible, setCurrentlyVisible] = useState(30)
  const proxiesList = filtered && filtered.length ? filtered : proxies
  const shownList = proxiesList && proxiesList.slice(0, currentlyVisible)
  const hasMore = proxiesList && currentlyVisible < proxiesList.length
  const fabLegend = compareToolVisible
    ? t('hideComparisonTool')
    : t('showComparisonTool')

  const loadMore = () => setCurrentlyVisible(currentlyVisible + 12)

  useEffect(() => {
    async function getData () {
      await getBPs()
      await getProxies()
    }

    getData()
  }, [])

  return (
    <div className={classes.root}>
      <Tooltip aria-label={fabLegend} placement='left' title={fabLegend}>
        <Fab
          color='secondary'
          aria-label={fabLegend}
          className={classes.compareToggleButton}
          onClick={() => toggleCompareTool()}
        >
          <Badge
            classes={{ badge: classes.badge }}
            invisible={!selectedProxies || !selectedProxies.length}
            badgeContent={selectedProxies ? selectedProxies.length : 0}
          >
            {compareToolVisible ? <VisibilityOff /> : <Visibility />}
          </Badge>
        </Fab>
      </Tooltip>
      <CompareTool
        removeBP={producerAccountName => () => {
          removeSelected(producerAccountName)
        }}
        className={classNames(classes.compareTool, {
          [classes.hidden]: !compareToolVisible
        })}
        list={proxies}
        selected={selectedProxies || []}
        isProxy
      />
      <Grid className={classes.wrapper} container justify='center' spacing={4}>
        {(shownList || []).map(proxy => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={`${proxy.owner}-main-block-card`}
          >
            <Card
              isSelected={
                selectedProxies && selectedProxies.includes(proxy.owner)
              }
              toggleSelection={(isAdding, producerAccountName) => () => {
                if (isAdding && !selectedProxies.length) {
                  addToSelected(producerAccountName)
                } else {
                  removeSelected(producerAccountName)
                }
              }}
              data={proxy}
              imageURL={_get(proxy, 'logo_256')}
              owner={_get(proxy, 'owner')}
              title={_get(proxy, 'name')}
              useRateButton={false}
              buttonLabel='View'
              pathLink='proxies'
            />
          </Grid>
        ))}
      </Grid>
      <Button
        className={classes.loadMoreButton}
        onClick={() => hasMore && loadMore()}
      >
        LOAD MORE
      </Button>
    </div>
  )
}

AllProxies.propTypes = {
  classes: PropTypes.object.isRequired,
  getBPs: PropTypes.func.isRequired,
  toggleCompareTool: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
  addToSelected: PropTypes.func.isRequired,
  selectedProxies: PropTypes.array.isRequired,
  filtered: PropTypes.array.isRequired,
  compareToolVisible: PropTypes.bool.isRequired,
  getProxies: PropTypes.func.isRequired,
  proxies: PropTypes.array
}

AllProxies.defaultProps = {
  proxies: [],
  selectedProxies: [],
  filtered: [],
  compareToolVisible: true
}

const mapStatetoProps = ({ proxies }) => ({
  selectedProxies: proxies.selected,
  filtered: proxies.filtered,
  compareToolVisible: proxies.compareTool,
  proxies: proxies.proxies
})

const mapDispatchToProps = ({ blockProducers, proxies }) => {
  const { getBPs } = blockProducers
  const {
    getProxies,
    toggleCompareTool,
    addToSelected,
    removeSelected
  } = proxies

  return {
    getBPs,
    toggleCompareTool,
    addToSelected,
    removeSelected,
    getProxies
  }
}

export default withStyles(style)(
  connect(mapStatetoProps, mapDispatchToProps)(AllProxies)
)

export const proxiesDrawer = []
