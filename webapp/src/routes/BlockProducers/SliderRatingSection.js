import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import HelpOutline from '@mui/icons-material/HelpOutline'

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
          paragraph
          className={classNames(
            ratingState.communityEnabled ? '' : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('community')}{' '}
          <Tooltip title={t('communityTooltip')} placement='right'>
            <HelpOutline fontSize='inherit' className={classes.topicIcon} />
          </Tooltip>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.sliderWrapper}>
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
            onChange={handleStateChange('communityEnabled')}
            checked={ratingState.communityEnabled}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography
          paragraph
          className={classNames(
            ratingState.developmentEnabled
              ? ''
              : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('development')}{' '}
          <Tooltip title={t('developmentTooltip')} placement='right'>
            <HelpOutline fontSize='inherit' className={classes.topicIcon} />
          </Tooltip>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.sliderWrapper}>
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
            onChange={handleStateChange('developmentEnabled')}
            checked={ratingState.developmentEnabled}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography
          paragraph
          className={classNames(
            ratingState.infraEnabled ? '' : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('infrastructure')}{' '}
          <Tooltip title={t('infrastructureTooltip')} placement='right'>
            <HelpOutline fontSize='inherit' className={classes.topicIcon} />
          </Tooltip>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.sliderWrapper}>
          <RateSlider
            disabled={!producer || !ratingState.infraEnabled}
            onChange={handleStateChange('infra')}
            value={ratingState.infra}
            marks={MARKS}
            valueLabelDisplay='on'
            min={1}
            step={1}
            max={10}
          />
          <Switch
            className={classes.switchBox}
            onChange={handleStateChange('infraEnabled')}
            checked={ratingState.infraEnabled}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography
          paragraph
          className={classNames(
            ratingState.transparencyEnabled
              ? ''
              : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('transparency')}{' '}
          <Tooltip title={t('transparencyTooltip')} placement='right'>
            <HelpOutline fontSize='inherit' className={classes.topicIcon} />
          </Tooltip>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.sliderWrapper}>
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
            onChange={handleStateChange('transparencyEnabled')}
            checked={ratingState.transparencyEnabled}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography
          paragraph
          className={classNames(
            ratingState.trustinessEnabled ? '' : classes.parameterTitleDisabled,
            classes.marginOff
          )}
        >
          {t('trustiness')}{' '}
          <Tooltip title={t('trustinessTooltip')} placement='right'>
            <HelpOutline fontSize='inherit' className={classes.topicIcon} />
          </Tooltip>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.sliderWrapper}>
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
            onChange={handleStateChange('trustinessEnabled')}
            checked={ratingState.trustinessEnabled}
          />
        </div>
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
