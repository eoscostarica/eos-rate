import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { useTranslation } from 'react-i18next'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Help from '@material-ui/icons/HelpOutlineRounded'
import Error from '@material-ui/icons/Error'
import withWidth from '@material-ui/core/withWidth'
import Tooltip from '@material-ui/core/Tooltip'
import _get from 'lodash.get'
import _isEmpty from 'lodash.isempty'
import { Link } from '@reach/router'

import BlockProducerRadar from 'components/block-producer-radar'

const styles = theme => ({
  card: {
    backgroundColor: theme.palette.surface.dark
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  unsafeChip: {
    marginLeft: theme.spacing(2),
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
    background: theme.palette.surface.light,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  avatar: {
    backgroundColor: theme.palette.surface.main
  },
  helpIcon: {
    width: '90%',
    height: '90%'
  },
  btnRate: {
    backgroundColor: theme.palette.secondary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  warningBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  warningIcon: {
    color: 'rgb(255, 152, 0)'
  }
})

const TooltipWrapper = ({ open, onHandleTooltip, isClickable, t, classes }) => {
  if (isClickable) {
    return (
      <Tooltip open={open} title={t('noBpJson')} arrow>
        <Error className={classes.warningIcon} onClick={onHandleTooltip} />
      </Tooltip>
    )
  }

  return (
    <Tooltip title={t('noBpJson')} arrow>
      <Error className={classes.warningIcon} />
    </Tooltip>
  )
}

const BlockProducerCard = ({
  classes,
  blockProducer,
  isSelected = false,
  toggleSelection,
  width,
  ...props
}) => {
  const { t } = useTranslation('translations')
  const [open, setOpen] = useState(false)

  const handleTooltip = e => {
    setOpen(!open)
    e.preventDefault()
  }

  return (
    <Card className={classes.card}>
      <Link
        to={`/block-producers/${blockProducer.owner}`}
        style={{
          textDecoration: 'none'
        }}
      >
        <CardHeader
          className={classes.title}
          avatar={
            <Avatar aria-label='Block Producer' className={classes.avatar}>
              {_isEmpty(blockProducer.bpjson) ? (
                <Help className={classes.helpIcon} />
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
            <div className={classes.warningBox}>
              <span>{blockProducer.owner}</span>
              <TooltipWrapper
                open={open}
                onHandleTooltip={handleTooltip}
                isClickable={Boolean(width === 'xs')}
                t={t}
                classes={classes}
              />
            </div>
          )}
          subheader={
            _isEmpty(blockProducer.bpjson) ? null : blockProducer.owner
          }
        />
      </Link>
      <div className={classes.radar}>
        <BlockProducerRadar
          height={200}
          bpData={{
            datasets: [{ ...blockProducer.data }]
          }}
        />
      </div>
      <CardActions className={classes.actions}>
        <Button
          aria-label='Add to comparison'
          onClick={toggleSelection(!isSelected, blockProducer.owner)}
        >
          {isSelected ? 'REMOVE' : 'ADD'}
        </Button>
        <Button
          component={forwardRef((props, ref) => (
            <Link
              {...props}
              ref={ref}
              state={{ owner: blockProducer.owner }}
              to={`/block-producers/${blockProducer.owner}/rate`}
            />
          ))}
          className={classes.btnRate}
          size='small'
        >
          RATE
        </Button>
      </CardActions>
    </Card>
  )
}

BlockProducerCard.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  classes: PropTypes.object,
  blockProducer: PropTypes.object,
  isSelected: PropTypes.bool,
  toggleSelection: PropTypes.func
}

TooltipWrapper.propTypes = {
  classes: PropTypes.object,
  isClickable: PropTypes.bool,
  open: PropTypes.bool,
  onHandleTooltip: PropTypes.func,
  t: PropTypes.any
}

export default withStyles(styles)(withWidth()(BlockProducerCard))
