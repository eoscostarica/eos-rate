import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Help from '@mui/icons-material/HelpOutlineRounded'
import Error from '@mui/icons-material/Error'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import PolarChart from '../PolarChart'
import formatNumber from '../../utils/format-number'

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
  isNewRate,
  disable,
  isProxy
}) => {
  const { t } = useTranslation('translations')
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const handleTooltip = e => {
    setOpen(!open)
    e.preventDefault()
  }

  const formatRadarData = info => {
    if (isProxy) return info.data

    return {
      ...info.data,
      data: [
        parseFloat(formatNumber(info.total_community || 0, 1)),
        parseFloat(formatNumber(info.total_development || 0, 1)),
        parseFloat(formatNumber(info.total_transparency || 0, 1)),
        parseFloat(formatNumber(info.total_infrastructure || 0, 1)),
        parseFloat(formatNumber(info.total_trustiness || 0, 1))
      ]
    }
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
              <div className={classes.boxTitle}>
                <Typography className={classes.noWrap} variant='h6'>
                  {title || owner}
                </Typography>
              </div>
            </div>
          }
          subheader={
            <div className={classes.warningBox}>
              <Typography className={classes.subTitleHeader}>
                {owner}
              </Typography>
              <div className={classes.moreWrapper}>
                <Typography style={{ margin: 'auto' }} variant='subtitle2'>
                  {t('view')}
                </Typography>
                <KeyboardArrowRightIcon />
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
              isClickable={isMobile}
              t={t}
              classes={classes}
            />
          )}
        </div>
        <div className={classes.chartWrapper}>
          <PolarChart
            data={[
              {
                ...formatRadarData(data)
              }
            ]}
          />
        </div>
        {showOptions && (
          <Grid container justifyContent='center'>
            <Grid item md={4} xs={4}>
              <div className={classes.boxValueRates}>
                <Typography
                  variant='subtitle2'
                  className={clsx(classes.avgText, classes.marginRightElem)}
                >
                  {`${t('rateCard')}:`}
                </Typography>
                <Typography className={classes.avgValue} variant='body2'>
                  {rate || 0}
                </Typography>
              </div>
            </Grid>
            <Grid item md={4} xs={5}>
              <div className={classes.boxValueRates}>
                <Typography
                  variant='subtitle2'
                  className={clsx(classes.avgText, classes.marginRightElem)}
                >
                  {`${t('averageCard')}:`}
                </Typography>
                <Typography className={classes.avgValue} variant='body2'>
                  {average}
                </Typography>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
      <CardActions className={classes.actions}>
        {useRateButton && (
          <>
            <Button
              className={classes.btn}
              aria-label='Add to comparison'
              onClick={toggleSelection(!isSelected, owner)}
              variant='outlined'
              color={isSelected ? 'secondary' : 'primary'}
              disabled={!isSelected && disable}
            >
              {isSelected ? t('remove') : buttonLabel}
            </Button>
            <Button
              className={classes.btn}
              component={forwardRef(function linkRef(props, ref) {
                return (
                  <Link
                    {...props}
                    ref={ref}
                    state={{ owner: owner }}
                    to={`/${pathLink}/${owner}/rate`}
                  />
                )
              })}
              variant='contained'
              color='secondary'
            >
              {isNewRate ? t('updateRatingButton') : t('rate')}
            </Button>
          </>
        )}
        {!useRateButton && (
          <>
            <Button
              className={classes.btn}
              variant='outlined'
              aria-label='Add to comparison'
              color={isSelected ? 'secondary' : 'primary'}
              disabled={isSelected}
              onClick={() => toggleSelection(!isSelected, owner, true)}
            >
              {isSelected ? t('selected') : t('addToVote')}
            </Button>
          </>
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
  showOptions: PropTypes.bool,
  isNewRate: PropTypes.bool,
  disable: PropTypes.bool,
  isProxy: PropTypes.bool
}

CardData.defaultProps = {
  useRateButton: true,
  average: '0',
  rate: '0',
  showOptions: true,
  isProxy: false
}

TooltipWrapper.propTypes = {
  classes: PropTypes.object,
  isClickable: PropTypes.bool,
  open: PropTypes.bool,
  onHandleTooltip: PropTypes.func,
  t: PropTypes.any
}

export default CardData
