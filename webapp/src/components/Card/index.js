import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
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
  isNewRate
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

  const formatRadarData = rateData => [
    parseFloat(formatNumber(rateData?.community || 0, 1)),
    parseFloat(formatNumber(rateData?.development || 0, 1)),
    parseFloat(formatNumber(rateData?.development || 0, 1)),
    parseFloat(formatNumber(rateData?.transparency || 0, 1)),
    parseFloat(formatNumber(rateData?.trustiness || 0, 1))
  ]

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
            <Box className={classes.warningBox}>
              <Box className={classes.boxTitle}>
                <Typography className={classes.noWrap} variant='h6'>
                  {title || owner}
                </Typography>
              </Box>
            </Box>
          }
          subheader={
            <Box className={classes.warningBox}>
              <Typography className={classes.subTitleHeader}>
                {owner}
              </Typography>
              <Box className={classes.moreWrapper}>
                <Typography style={{ margin: 'auto' }} variant='subtitle2'>
                  {t('view')}
                </Typography>
                <KeyboardArrowRightIcon />
              </Box>
            </Box>
          }
        />
      </Link>
      <Box className={classes.radar}>
        <Box className={classes.blockIcons}>
          {!title && (
            <TooltipWrapper
              open={open}
              onHandleTooltip={handleTooltip}
              isClickable={isMobile}
              t={t}
              classes={classes}
            />
          )}
        </Box>
        <Box className={classes.chartWrapper}>
          <PolarChart
            data={[{ ...data.data, data: formatRadarData(data.totalStats) }]}
          />
        </Box>
        {showOptions && (
          <Grid container justifyContent='center'>
            <Grid item md={4} xs={4}>
              <Box className={classes.boxValueRates}>
                <Typography
                  variant='subtitle2'
                  className={clsx(classes.avgText, classes.marginRightElem)}
                >
                  {`${t('rateCard')}:`}
                </Typography>
                <Typography className={classes.avgValue} variant='body2'>
                  {rate || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={5}>
              <Box className={classes.boxValueRates}>
                <Typography
                  variant='subtitle2'
                  className={clsx(classes.avgText, classes.marginRightElem)}
                >
                  {`${t('averageCard')}:`}
                </Typography>
                <Typography className={classes.avgValue} variant='body2'>
                  {average}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <CardActions className={classes.actions}>
        {useRateButton && (
          <>
            <Button
              aria-label='Add to comparison'
              onClick={toggleSelection(!isSelected, owner)}
              variant='outlined'
              color={isSelected ? 'secondary' : 'primary'}
            >
              {isSelected ? t('remove') : buttonLabel}
            </Button>
            <Button
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
  isNewRate: PropTypes.bool
}

CardData.defaultProps = {
  useRateButton: true,
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
