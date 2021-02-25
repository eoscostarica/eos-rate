import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Card from '@material-ui/core/Card'
import classNames from 'classnames'
import CardHeader from '@material-ui/core/CardHeader'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Help from '@material-ui/icons/HelpOutlineRounded'
import Error from '@material-ui/icons/Error'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from '@reach/router'

import Radar from 'components/radar'

import styles from './styles'

const useStyles = makeStyles(styles)

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
  data,
  isSelected = false,
  toggleSelection,
  imageURL,
  owner,
  title,
  useRateButton,
  buttonLabel,
  pathLink,
  average,
  rate,
  showOptions,
  ...props
}) => {
  const { t } = useTranslation('translations')
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))

  const handleTooltip = (e) => {
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
              {showOptions && (
                <div
                  className={classNames(classes.warningBox, classes.showOnlyLg)}
                >
                  <Typography
                    variant='subtitle2'
                    className={classes.marginRightElem}
                  >
                    {`${t('averageCard')}:`}
                  </Typography>
                  <Typography variant='body2'>{average}</Typography>
                </div>
              )}
            </div>
          }
          subheader={
            <div className={classes.warningBox}>
              <span>{owner}</span>
              {showOptions && (
                <div
                  className={classNames(classes.warningBox, classes.showOnlyLg)}
                >
                  <Typography
                    variant='subtitle2'
                    className={classes.marginRightElem}
                  >
                    {`${t('rateCard')}:`}
                  </Typography>
                  <Typography variant='body2'>{rate || 0}</Typography>
                </div>
              )}
            </div>
          }
        />
        {showOptions && (
          <div className={classes.mobileBox}>
            <div className={classNames(classes.warningBox, classes.showOnlySm)}>
              <Typography
                variant='subtitle2'
                className={classes.marginRightElem}
              >
                {`${t('averageCard')}:`}
              </Typography>
              <Typography variant='body2'>{average}</Typography>
            </div>
            <div className={classNames(classes.warningBox, classes.showOnlySm)}>
              <Typography
                variant='subtitle2'
                className={classes.marginRightElem}
              >
                {`${t('rateCard')}:`}
              </Typography>
              <Typography variant='body2'>{rate || 0}</Typography>
            </div>
          </div>
        )}
      </Link>
      <div className={classes.radar}>
        <div className={classes.blockIcons}>
          {!title && (
            <TooltipWrapper
              open={open}
              onHandleTooltip={handleTooltip}
              isClickable={isMobile}
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
            // eslint-disable-next-line react/display-name
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
  rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showOptions: PropTypes.bool
}

CardData.defaultProps = {
  useRateButton: true,
  buttonLabel: 'ADD TO VOTE',
  average: '0',
  rate: '0',
  showOptions: true
}

TooltipWrapper.propTypes = {
  classes: PropTypes.object,
  isClickable: PropTypes.bool,
  open: PropTypes.bool,
  onHandleTooltip: PropTypes.func,
  t: PropTypes.any
}

export default CardData
