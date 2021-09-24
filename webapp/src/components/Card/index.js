import React, { useState, forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Help from '@material-ui/icons/HelpOutlineRounded'
import Error from '@material-ui/icons/Error'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import Radar from '../Radar'

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
  const isDesktop = useMediaQuery('(min-width:770px)')
  const [sizes, setSizes] = useState()

  const handleTooltip = e => {
    setOpen(!open)
    e.preventDefault()
  }

  useEffect(() => {
    setSizes(isDesktop ? 400 : '95%')
  }, [isDesktop])

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
              <span>{owner}</span>
              <Box style={{ display: 'flex', float: 'right' }}>
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
        <Radar
          height={sizes}
          width={sizes}
          bpData={{
            datasets: [{ ...data.data }]
          }}
        />
        {showOptions && (
          <Grid container justifyContent='center'>
            <Grid item md={4} xs={4}>
              <Box className={classes.boxValueRates}>
                <Typography
                  variant='subtitle2'
                  style={{ fontWeight: 600 }}
                  className={classes.marginRightElem}
                >
                  {`${t('rateCard')}:`}
                </Typography>
                <Typography variant='body2'>{rate || 0}</Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={5}>
              <Box className={classes.boxValueRates}>
                <Typography
                  variant='subtitle2'
                  style={{ fontWeight: 600 }}
                  className={classes.marginRightElem}
                >
                  {`${t('averageCard')}:`}
                </Typography>
                <Typography variant='body2'>{average}</Typography>
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
              className={!isSelected ? classes.secondaryBtn : ''}
            >
              {isSelected ? t('remove') : buttonLabel}
            </Button>
            <Button
              // eslint-disable-next-line react/display-name
              component={forwardRef((props, ref) => (
                <Link
                  {...props}
                  ref={ref}
                  state={{ owner: owner }}
                  to={`/${pathLink}/${owner}/rate`}
                />
              ))}
              className={classes.btnRate}
              variant='contained'
              size='small'
            >
              {isNewRate ? t('updateRatingButton') : t('rate')}
            </Button>
          </>
        )}
        {!useRateButton && (
          <>
            <Button
              aria-label='Add to comparison'
              disabled={isSelected}
              className={!isSelected ? classes.secondaryBtn : ''}
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
