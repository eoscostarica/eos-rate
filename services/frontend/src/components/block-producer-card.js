import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ReportProblem from '@material-ui/icons/ReportProblem'
import _get from 'lodash.get'
import _isEmpty from 'lodash.isempty'

import { Link } from '@reach/router'

import comparisonParameters from 'config/comparison-parameters'
import BlockProducerRadar from 'components/block-producer-radar'

const styles = theme => ({
  card: {},
  title: {
    textDecoration: 'none',
    color: '#ffffff'
  },
  unsafeChip: {
    marginLeft: theme.spacing.unit * 2,
    backgroundColor: '#E91E63',
    color: 'white'
  },
  unsafeAvatar: {
    backgroundColor: '#AD1457',
    color: 'white'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  radar: {
    background: theme.palette.primary.dark,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
})

const BlockProducerCard = ({
  classes,
  blockProducer,
  isSelected = false,
  toggleSelection,
  ...props
}) => (
  <Card className={classes.card}>
    <Link
      to={`/block-producers/${blockProducer.owner}`}
      style={{
        textDecoration: 'none'
      }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label='Block Producer' className={classes.avatar}>
            {_isEmpty(blockProducer.bpjson) ? (
              'BP'
            ) : (
              <img
                src={_get(blockProducer, 'bpjson.org.branding.logo_256')}
                alt=''
                width='100%'
              />
            )}
          </Avatar>
        }
        title={_get(
          blockProducer,
          'bpjson.org.candidate_name',
          <React.Fragment>
            <span>{blockProducer.owner}</span>
            <Chip
              avatar={
                <Avatar className={classes.unsafeAvatar}>
                  <ReportProblem />
                </Avatar>
              }
              className={classes.unsafeChip}
              label={'Non-compliant'}
              color='secondary'
            />
          </React.Fragment>
        )}
        subheader={_isEmpty(blockProducer.bpjson) ? null : blockProducer.owner}
      />
    </Link>
    <div className={classes.radar}>
      <BlockProducerRadar
        height={200}
        bpData={{
          labels: comparisonParameters,
          datasets: [{ ...blockProducer.data }]
        }}
      />
    </div>
    <CardActions className={classes.actions} disableActionSpacing>
      <Button
        aria-label='Add to comparison'
        onClick={toggleSelection(!isSelected, blockProducer.owner)}
      >
        {isSelected ? 'REMOVE' : 'ADD'}
      </Button>
    </CardActions>
  </Card>
)

BlockProducerCard.propTypes = {
  classes: PropTypes.object,
  blockProducer: PropTypes.object,
  isSelected: PropTypes.bool,
  toggleSelection: PropTypes.func
}

export default withStyles(styles)(BlockProducerCard)
