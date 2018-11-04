import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share'

import comparisonParameters from 'config/comparison-parameters'
import BlockProducerRadar from 'components/block-producer-radar'
import bpParameters from 'config/comparison-parameters'

const styles = theme => ({
  card: {},
  actions: {
    display: 'flex'
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
    <CardHeader
      avatar={
        <Avatar aria-label='Block Producer' className={classes.avatar}>
          BP
        </Avatar>
      }
      title={blockProducer.org.candidate_name}
      subheader={blockProducer.producer_account_name}
    />
    <div className={classes.radar}>
      <BlockProducerRadar
        bpData={{
          labels: comparisonParameters,
          datasets: [{ ...blockProducer.data }]
        }}
      />
    </div>
    <CardActions className={classes.actions} disableActionSpacing>
      <IconButton
        aria-label='Add to comparison'
        onClick={toggleSelection(
          !isSelected,
          blockProducer.producer_account_name
        )}
      >
        {isSelected ? <RemoveIcon /> : <AddIcon />}
      </IconButton>
      <IconButton aria-label='Share'>
        <ShareIcon />
      </IconButton>
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
