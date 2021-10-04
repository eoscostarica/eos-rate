import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

import RateSlider from '../../components/RateSlider'

import styles from './styles'

const MARKS = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 }
]

const useStyles = makeStyles(styles)

const SliderRatingSection = ({
  t,
  handleStateChange,
  ratingState,
  producer
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.sliderBoxContent}>
      <Grid item xs={12}>
        <Typography
          variant='h6'
          className={classNames(
            ratingState.communityEnabled ? '' : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('community')}{' '}
        </Typography>
        <Typography paragraph> {t('communityTooltip')} </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.sliderWrapper}>
          <RateSlider
            disabled={!producer || !ratingState.communityEnabled}
            onChange={handleStateChange('community')}
            value={ratingState.community}
            marks={MARKS}
            valueLabelDisplay='on'
            min={1}
            step={1}
            max={10}
          />
          <Switch
            className={classes.switchBox}
            color='secondary'
            onChange={handleStateChange('communityEnabled')}
            checked={ratingState.communityEnabled}
          />
          <Typography variant='body2'>
            {' '}
            {ratingState.communityEnabled ? t('enabled') : t('disabled')}{' '}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h6'
          className={classNames(
            ratingState.developmentEnabled
              ? ''
              : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('development')}{' '}
        </Typography>
        <Typography paragraph> {t('developmentTooltip')} </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.sliderWrapper}>
          <RateSlider
            disabled={!producer || !ratingState.developmentEnabled}
            onChange={handleStateChange('development')}
            value={ratingState.development}
            marks={MARKS}
            valueLabelDisplay='on'
            min={1}
            step={1}
            max={10}
          />
          <Switch
            className={classes.switchBox}
            color='secondary'
            onChange={handleStateChange('developmentEnabled')}
            checked={ratingState.developmentEnabled}
          />
          <Typography variant='body2'>
            {' '}
            {ratingState.developmentEnabled ? t('enabled') : t('disabled')}{' '}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h6'
          className={classNames(
            ratingState.infraEnabled ? '' : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('infrastructure')}{' '}
        </Typography>
        <Typography paragraph> {t('infrastructureTooltip')} </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.sliderWrapper}>
          <RateSlider
            disabled={!producer || !ratingState.infraEnabled}
            onChange={handleStateChange('infrastructure')}
            value={ratingState.infrastructure}
            marks={MARKS}
            valueLabelDisplay='on'
            min={1}
            step={1}
            max={10}
          />
          <Switch
            className={classes.switchBox}
            color='secondary'
            onChange={handleStateChange('infraEnabled')}
            checked={ratingState.infraEnabled}
          />
          <Typography variant='body2'>
            {' '}
            {ratingState.infraEnabled ? t('enabled') : t('disabled')}{' '}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h6'
          className={classNames(
            ratingState.transparencyEnabled
              ? ''
              : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('transparency')}{' '}
        </Typography>
        <Typography paragraph> {t('transparencyTooltip')} </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.sliderWrapper}>
          <RateSlider
            disabled={!producer || !ratingState.transparencyEnabled}
            onChange={handleStateChange('transparency')}
            value={ratingState.transparency}
            marks={MARKS}
            valueLabelDisplay='on'
            min={1}
            step={1}
            max={10}
          />
          <Switch
            className={classes.switchBox}
            color='secondary'
            onChange={handleStateChange('transparencyEnabled')}
            checked={ratingState.transparencyEnabled}
          />
          <Typography variant='body2'>
            {' '}
            {ratingState.transparencyEnabled
              ? t('enabled')
              : t('disabled')}{' '}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h6'
          className={classNames(
            ratingState.trustinessEnabled ? '' : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('trustiness')}{' '}
        </Typography>
        <Typography paragraph> {t('trustinessTooltip')} </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.sliderWrapper}>
          <RateSlider
            disabled={!producer || !ratingState.trustinessEnabled}
            onChange={handleStateChange('trustiness')}
            value={ratingState.trustiness}
            marks={MARKS}
            valueLabelDisplay='on'
            min={1}
            step={1}
            max={10}
          />
          <Switch
            className={classes.switchBox}
            color='secondary'
            onChange={handleStateChange('trustinessEnabled')}
            checked={ratingState.trustinessEnabled}
          />
          <Typography variant='body2'>
            {' '}
            {ratingState.trustinessEnabled ? t('enabled') : t('disabled')}{' '}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

SliderRatingSection.propTypes = {
  t: PropTypes.any,
  handleStateChange: PropTypes.func,
  ratingState: PropTypes.object,
  producer: PropTypes.object
}

export default SliderRatingSection
