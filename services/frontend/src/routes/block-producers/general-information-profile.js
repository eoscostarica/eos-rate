import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import countries from 'i18n-iso-countries'
import { Link } from '@reach/router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import _get from 'lodash.get'
import Typography from '@material-ui/core/Typography'

import formatNumber from 'utils/formatNumber'
import getAverageValue from 'utils/getAverageValue'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/es.json'))

const _getCountryName = (country = null, locationNumber, defaultMessage) => {
  const { i18n } = useTranslation()
  const language = (i18n.language || 'en').substring(0, 2)
  const countryNameByLocationNumber = countries.getName(
    locationNumber,
    language
  )

  if (countryNameByLocationNumber) return countryNameByLocationNumber

  const countryNameByISO = countries.getName(country, language)

  if (countryNameByISO) return countryNameByISO

  return defaultMessage
}

const SocialNetworks = ({ classes, overrideClass, producer }) => {
  const { t } = useTranslation('profile')
  const github = _get(producer, 'org.social.github')
  const twitter = _get(producer, 'org.social.twitter')
  const linkedin = _get(producer, 'org.social.linkedin')
  const telegram = _get(producer, 'org.social.telegram')
  const instagram = _get(producer, 'org.social.instagram')

  return (
    <Grid
      container
      direction='column'
      className={classNames(classes.category, overrideClass)}
    >
      <Typography variant='subtitle1' className={classes.title}>
        {t('social')}
      </Typography>
      {github && (
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            GitHub:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            <a
              href={`https://github.com/${github}`}
              className={classes.links}
              target='_blank'
              rel='noopener noreferrer'
            >
              {github}
            </a>
          </Typography>
        </Grid>
      )}
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
      {linkedin && (
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            LinkedIn:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            <a
              href={`https://www.linkedin.com/in/${linkedin}`}
              className={classes.links}
              target='_blank'
              rel='noopener noreferrer'
            >
              {linkedin}
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
      {instagram && (
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            Instagram:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            <a
              href={`https://www.instagram.com/${instagram}`}
              className={classes.links}
              target='_blank'
              rel='noopener noreferrer'
            >
              {instagram}
            </a>
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

const WebsiteLegend = ({ classes, webInfo }) => {
  const { t } = useTranslation('profile')

  const content = webInfo ? (
    <>
      <Typography variant='subtitle1' className={classes.title}>
        {t('websiteInfo')}:
      </Typography>
      <Typography variant='subtitle1' className={classes.value}>
        {webInfo.websiteText}
      </Typography>
    </>
  ) : null

  return <Grid item xs={12} className={classes.websiteLegend}>{content}</Grid>
}

const GeneralInformation = ({ classes, producer = {} }) => {
  const { t } = useTranslation('profile')

  const webpageURL = _get(producer, 'system.url')
  const totalVotes = _get(producer, 'system.votesInEos') || 0
  const countryName = _getCountryName(
    _get(producer, 'bpjson.org.location.country', null),
    _get(producer, 'system.location', null),
    t('noCountryName')
  )

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
            {_get(producer, 'system.owner', '- -')}
          </Typography>
        </Grid>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('location')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {countryName}
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
      </Grid>

      <Grid container direction='column' className={classes.category}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('rankings')}
        </Typography>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('votes')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {formatNumber(parseFloat(totalVotes), 0)}
          </Typography>
        </Grid>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('rates')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {_get(producer, 'ratings_cntr', null) || 0}
          </Typography>
        </Grid>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('average')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >

            {getAverageValue(_get(producer, 'average', 0))}

          </Typography>
        </Grid>
      </Grid>
      <Grid container direction='column' className={classes.category}>
        <Grid container direction='row'>
          <Button
            disabled={!producer}
            component={forwardRef((props, ref) => (
              <Link
                {...props}
                ref={ref}
                to={`/block-producers/${_get(
                  producer,
                  'owner',
                  'noBlockProducerName'
                )}/rate`}
              />
            ))}
            className={classes.btnBP}
          >
            {t('buttonRate')}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

SocialNetworks.propTypes = {
  classes: PropTypes.object,
  overrideClass: PropTypes.any,
  producer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

GeneralInformation.propTypes = {
  classes: PropTypes.object,
  producer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

WebsiteLegend.propTypes = {
  classes: PropTypes.object,
  webInfo: PropTypes.object
}

export { SocialNetworks, GeneralInformation, WebsiteLegend }
