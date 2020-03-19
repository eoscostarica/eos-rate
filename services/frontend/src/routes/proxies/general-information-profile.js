import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import _get from 'lodash.get'
import Typography from '@material-ui/core/Typography'

import formatNumber from 'utils/formatNumber'

const SocialNetworks = ({ classes, overrideClass, proxy }) => {
  const { t } = useTranslation('profile')
  const steemit = _get(proxy, 'steemit')
  const twitter = _get(proxy, 'twitter')
  const telegram = _get(proxy, 'telegram')

  if (!steemit && !twitter && !telegram) return null

  return (
    <Grid
      container
      direction='column'
      className={classNames(classes.category, overrideClass)}
    >
      <Typography variant='subtitle1' className={classes.title}>
        {t('social')}
      </Typography>
      {twitter && (
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            Twitter:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            <a
              href={`https://twitter.com/${twitter}`}
              className={classes.links}
              target='_blank'
              rel='noopener noreferrer'
            >
              {twitter}
            </a>
          </Typography>
        </Grid>
      )}
      {steemit && (
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            Steemit:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            <a
              href={`https://steemit.com/${steemit}`}
              className={classes.links}
              target='_blank'
              rel='noopener noreferrer'
            >
              {steemit}
            </a>
          </Typography>
        </Grid>
      )}
      {telegram && (
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            Telegram:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            <a
              href={`https://web.telegram.org/#/${telegram}`}
              className={classes.links}
              target='_blank'
              rel='noopener noreferrer'
            >
              {telegram}
            </a>
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

const GeneralInformation = ({ classes, proxy = {}, onClick, disabled }) => {
  const { t } = useTranslation('profile')
  const webpageURL = _get(proxy, 'website')
  const totalVotes = _get(proxy, 'totalVoteEOS') || 0
  const proxyVotes = _get(proxy, 'proxiedVoteEOS') || 0
  const background = _get(proxy, 'background')
  const philosophy = _get(proxy, 'philosophy')

  return (
    <>
      <Grid container direction='column' className={classes.category}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('generalInformation')}
        </Typography>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('account')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {_get(proxy, 'owner', '- -')}
          </Typography>
        </Grid>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('website')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {webpageURL ? (
              <a
                href={webpageURL}
                className={classes.links}
                target='_blank'
                rel='noopener noreferrer'
              >
                {webpageURL}
              </a>
            ) : (
              '- -'
            )}
          </Typography>
        </Grid>
        {background && (<Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.longSubTitle}>
            {t('background')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.longValue, classes.subTitle)}
          >
            {background}
          </Typography>
        </Grid>)}
        {philosophy && (<Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.longSubTitle}>
            {t('philosophy')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.longValue, classes.subTitle)}
          >
            {philosophy}
          </Typography>
        </Grid>)}
      </Grid>

      <Grid container direction='column' className={classes.category}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('rankings')}
        </Typography>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('proxyVotes')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {formatNumber(parseFloat(proxyVotes), 0)}
          </Typography>
        </Grid>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('totalVotes')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {formatNumber(parseFloat(totalVotes), 0)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction='column' className={classes.category}>
        <Grid container direction='row'>
          <Button
            disabled={disabled}
            className={classes.btnBP}
            onClick={() => onClick(_get(proxy, 'owner'))}
          >
            {t('buttonVote')}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

SocialNetworks.propTypes = {
  classes: PropTypes.object,
  overrideClass: PropTypes.any,
  proxy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

GeneralInformation.propTypes = {
  classes: PropTypes.object,
  proxy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export { SocialNetworks, GeneralInformation }
