import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import countries from 'i18n-iso-countries'
import Grid from '@mui/material/Grid'
import _get from 'lodash.get'
import Typography from '@mui/material/Typography'

import formatNumber from '../../utils/format-number'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/es.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ko.json'))

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
// refactor this TODO
const SocialNetworks = ({ classes, producer }) => {
  const { t } = useTranslation('profile')
  const github = _get(producer, 'bpjson.org.social.github')
  const twitter = _get(producer, 'bpjson.org.social.twitter')
  const linkedin = _get(producer, 'bpjson.org.social.linkedin')
  const telegram = _get(producer, 'bpjson.org.social.telegram')
  const instagram = _get(producer, 'bpjson.org.social.instagram')

  return (
    <Grid container direction='column' className={classes.category}>
      <Typography variant='h6' className={classes.title}>
        {t('social')}
      </Typography>
      <div className={classes.marginLeftBox}>
        {github && (
          <Grid container direction='row'>
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                GitHub:
              </Typography>
            </div>
            <Typography
              variant='subtitle1'
              className={clsx(classes.value, classes.subTitle)}
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
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                Twitter:
              </Typography>
            </div>
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
          </Grid>
        )}
        {linkedin && (
          <Grid container direction='row'>
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                LinkedIn:
              </Typography>
            </div>
            <Typography
              variant='subtitle1'
              className={clsx(classes.value, classes.subTitle)}
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
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                Telegram:
              </Typography>
            </div>
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
          </Grid>
        )}
        {instagram && (
          <Grid container direction='row'>
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                Instagram:
              </Typography>
            </div>
            <Typography
              variant='subtitle1'
              className={clsx(classes.value, classes.subTitle)}
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
      </div>
    </Grid>
  )
}

const AdditionalResources = ({ classes, producer }) => {
  const { t } = useTranslation('profile')
  const edenInterview = _get(producer, 'general_info.edenInterview')
  const additionalResources = _get(producer, 'general_info.additionalResources')

  if (edenInterview || additionalResources) {
    return (
      <Grid container direction='column' className={classes.category}>
        <Typography variant='h6' className={classes.title}>
          {t('additionalResource')}
        </Typography>
        <div className={classes.marginLeftBox}>
          {additionalResources && additionalResources.alohaEOS && (
            <Grid container direction='row'>
              <div className={classes.subTitleBox}>
                <Typography
                  fontWeight='bold'
                  variant='subtitle1'
                  className={classes.subTitle}
                >
                  Aloha EOS:
                </Typography>
              </div>
              <Typography
                variant='subtitle1'
                className={clsx(classes.value, classes.subTitle)}
              >
                <a
                  href={additionalResources.alohaEOS}
                  className={clsx(classes.links, classes.noWrap)}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t('researchPortal')}
                </a>
              </Typography>
            </Grid>
          )}
          {additionalResources && additionalResources.eosNation && (
            <Grid container direction='row'>
              <div className={classes.subTitleBox}>
                <Typography
                  fontWeight='bold'
                  variant='subtitle1'
                  className={classes.subTitle}
                >
                  EOS Nation:
                </Typography>
              </div>
              <Typography
                variant='subtitle1'
                className={clsx(classes.value, classes.subTitle)}
                noWrap
              >
                <a
                  href={additionalResources.eosNation}
                  className={clsx(classes.links, classes.noWrap)}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t('bpValidator')}
                </a>
              </Typography>
            </Grid>
          )}
          {edenInterview && (
            <Grid container direction='row'>
              <div className={classes.subTitleBox}>
                <Typography
                  fontWeight='bold'
                  variant='subtitle1'
                  className={classes.subTitle}
                >
                  YouTube:
                </Typography>
              </div>
              <Typography
                variant='subtitle1'
                className={clsx(classes.value, classes.subTitle)}
                noWrap
              >
                <a
                  href={{ edenInterview }}
                  className={clsx(classes.links, classes.noWrap)}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t('bpInterviews')}
                </a>
              </Typography>
            </Grid>
          )}
        </div>
      </Grid>
    )
  }
  return <Grid item xs={12} />
}

const WebsiteLegend = ({ classes, webInfo }) => {
  const { t } = useTranslation('profile')

  const content = webInfo ? (
    <div className={classes.category}>
      <Typography variant='h6' className={classes.title}>
        {t('websiteInfo')}:
      </Typography>
      <div className={classes.marginLeftBox}>
        <Typography mt='2%' variant='subtitle1'>
          {webInfo.websiteText}
        </Typography>
      </div>
    </div>
  ) : null

  return (
    <Grid item xs={12} className={classes.websiteLegend}>
      {content}
    </Grid>
  )
}

const GeneralInformation = ({ classes, producer = {} }) => {
  const { t } = useTranslation('profile')

  const webpageURL = _get(producer, 'bpjson.org.website')
  const totalVotes = _get(producer, 'system.votesInEos') || 0
  const countryName = _getCountryName(
    _get(producer, 'bpjson.org.location.country', null),
    _get(producer, 'system.location', null),
    t('noCountryName')
  )

  return (
    <>
      <Grid container direction='column' className={classes.category}>
        <Typography variant='h6' className={classes.title}>
          {t('generalInformation')}
        </Typography>
        <div className={classes.marginLeftBox}>
          <Grid container direction='row'>
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                {t('account')}:
              </Typography>
            </div>
            <Typography
              variant='subtitle1'
              className={clsx(classes.value, classes.subTitle)}
            >
              {_get(producer, 'system.owner', '- -')}
            </Typography>
          </Grid>
          <Grid container direction='row'>
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                {t('location')}:
              </Typography>
            </div>
            <Typography
              variant='subtitle1'
              className={clsx(classes.value, classes.subTitle)}
            >
              {countryName}
            </Typography>
          </Grid>
          <Grid container direction='row'>
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                {t('website')}:
              </Typography>
            </div>
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
          </Grid>
          <Grid container direction='row'>
            <div className={classes.subTitleBox}>
              <Typography
                fontWeight='bold'
                variant='subtitle1'
                className={classes.subTitle}
              >
                {t('votes')}:
              </Typography>
            </div>
            <Typography
              variant='subtitle1'
              className={clsx(classes.value, classes.subTitle)}
            >
              {formatNumber(parseFloat(totalVotes), 0)}
            </Typography>
          </Grid>
        </div>
      </Grid>
    </>
  )
}

SocialNetworks.propTypes = {
  classes: PropTypes.object,
  producer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

AdditionalResources.propTypes = {
  classes: PropTypes.object,
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

export {
  SocialNetworks,
  GeneralInformation,
  WebsiteLegend,
  AdditionalResources
}
