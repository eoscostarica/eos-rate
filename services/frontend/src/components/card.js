import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Help from '@material-ui/icons/HelpOutlineRounded'
import Error from '@material-ui/icons/Error'
import withWidth from '@material-ui/core/withWidth'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from '@reach/router'

import Radar from 'components/radar'

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
      backgroundColor: theme.palette.secondary.dark
    }
  },
  warningBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  warningIcon: {
    color: 'rgb(255, 152, 0)'
  },
  marginRightElem: {
    marginRight: 5
  },
  blockIcons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 25,
    padding: '0 10px'
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

const CardData = ({
  classes,
  data,
  isSelected = false,
  toggleSelection,
  width,
  imageURL,
  owner,
  title,
  useRateButton,
  buttonLabel,
  pathLink,
  average,
  rate,
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
        to={`/${pathLink}/${owner}`}
        style={{
          textDecoration: 'none'
        }}
      >
        <CardHeader
          className={classes.title}
          avatar={
            <Avatar aria-label='Block Card' className={classes.avatar}>
              {!imageURL ? (
                <Help className={classes.helpIcon} />
              ) : (
                <img src={imageURL} alt='' width='100%' />
              )}
            </Avatar>
          }
          title={
            <div className={classes.warningBox}>
              <Typography variant='h6'>{title || owner}</Typography>
              <div className={classes.warningBox}>
                <Typography
                  variant='subtitle2'
                  className={classes.marginRightElem}
                >
                  {`${t('averageCard')}:`}
                </Typography>
                <Typography variant='body2'>{average}</Typography>
              </div>
            </div>
          }
          subheader={
            <div className={classes.warningBox}>
              <span>{owner}</span>
              <div className={classes.warningBox}>
                <Typography
                  variant='subtitle2'
                  className={classes.marginRightElem}
                >
                  {`${t('rateCard')}:`}
                </Typography>
                <Typography variant='body2'>{rate || 0}</Typography>
              </div>
            </div>
          }
        />
      </Link>
      <div className={classes.radar}>
        <div className={classes.blockIcons}>
          {!title && (
            <TooltipWrapper
              open={open}
              onHandleTooltip={handleTooltip}
              isClickable={Boolean(width === 'xs')}
              t={t}
              classes={classes}
            />
          )}
        </div>
        <Radar
          height={200}
          bpData={{
            datasets: [{ ...data.data }]
          }}
        />
      </div>
      <CardActions className={classes.actions}>
        <Button
          aria-label='Add to comparison'
          onClick={toggleSelection(!isSelected, owner)}
        >
          {isSelected ? 'REMOVE' : buttonLabel}
        </Button>
        {useRateButton && (
          <Button
            component={forwardRef((props, ref) => (
              <Link
                {...props}
                ref={ref}
                state={{ owner: owner }}
                to={`/block-producers/${owner}/rate`}
              />
            ))}
            className={classes.btnRate}
            size='small'
          >
            RATE
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

CardData.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  classes: PropTypes.object,
  data: PropTypes.object,
  isSelected: PropTypes.bool,
  toggleSelection: PropTypes.func,
  imageURL: PropTypes.string,
  owner: PropTypes.string,
  title: PropTypes.string,
  useRateButton: PropTypes.bool,
  buttonLabel: PropTypes.string,
  pathLink: PropTypes.string,
  average: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

CardData.defaultProps = {
  useRateButton: true,
  buttonLabel: 'ADD',
  average: '0',
  rate: '0'
}

TooltipWrapper.propTypes = {
  classes: PropTypes.object,
  isClickable: PropTypes.bool,
  open: PropTypes.bool,
  onHandleTooltip: PropTypes.func,
  t: PropTypes.any
}

export default withStyles(styles)(withWidth()(CardData))
