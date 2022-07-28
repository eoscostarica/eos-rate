import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import _get from 'lodash.get'
import Typography from '@mui/material/Typography'

import formatNumber from '../../utils/format-number'

const SocialNetworks = ({ classes, proxy }) => {
  const { t } = useTranslation('profile')
  const steemit = _get(proxy, 'steemit')
  const twitter = _get(proxy, 'twitter')
  const telegram = _get(proxy, 'telegram')

  if (!steemit && !twitter && !telegram) return null

  return (
    <Grid container direction='column' className={classes.category}>
      <Typography variant='subtitle1' className={classes.title}>
        {t('social')}
      </Typography>
      {twitter && (
        <div className={classes.rowBox}>
          <Typography variant='subtitle1' className={classes.subTitle}>
            Twitter:
          </Typography>
          <Typography
            variant='subtitle1'
            className={clsx(classes.value, classes.subTitle)}
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
        </div>
      )}
      {steemit && (
        <div className={classes.rowBox}>
          <Typography variant='subtitle1' className={classes.subTitle}>
            Steemit:
          </Typography>
          <Typography
            variant='subtitle1'
            className={clsx(classes.value, classes.subTitle)}
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
        </div>
      )}
      {telegram && (
        <div className={classes.rowBox}>
          <Typography variant='subtitle1' className={classes.subTitle}>
            Telegram:
          </Typography>
          <Typography
            variant='subtitle1'
            className={clsx(classes.value, classes.subTitle)}
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
        </div>
      )}
    </Grid>
  )
}

const GeneralInformation = ({ classes, proxy = {} }) => {
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
        <div className={classes.rowBox}>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('account')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={clsx(classes.value, classes.subTitle)}
          >
            {_get(proxy, 'owner', '- -')}
          </Typography>
        </div>
        <div className={classes.rowBox}>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('website')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={clsx(classes.value, classes.subTitle)}
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
        </div>
        {background && (
          <div>
            <Typography variant='subtitle1' className={classes.longSubTitle}>
              {t('background')}:
            </Typography>
            <Typography
              variant='subtitle1'
              className={clsx(classes.longValue, classes.subTitle)}
            >
              {background}
            </Typography>
          </div>
        )}
        {philosophy && (
          <div>
            <Typography variant='subtitle1' className={classes.longSubTitle}>
              {t('philosophy')}:
            </Typography>
            <Typography
              variant='subtitle1'
              className={clsx(classes.longValue, classes.subTitle)}
            >
              {philosophy}
            </Typography>
          </div>
        )}
      </Grid>
      <Grid container direction='column' className={classes.category}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('rankings')}
        </Typography>
        <div className={classes.rowBox}>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('proxyVotes')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={clsx(classes.value, classes.subTitle)}
          >
            {formatNumber(parseFloat(proxyVotes), 0)}
          </Typography>
        </div>
        <div className={classes.rowBox}>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('totalVotes')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={clsx(classes.value, classes.subTitle)}
          >
            {formatNumber(parseFloat(totalVotes), 0)}
          </Typography>
        </div>
      </Grid>
    </>
  )
}

SocialNetworks.propTypes = {
  classes: PropTypes.object,
  proxy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

GeneralInformation.propTypes = {
  classes: PropTypes.object,
  proxy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

export { SocialNetworks, GeneralInformation }
