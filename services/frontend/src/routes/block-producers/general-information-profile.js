import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from '@reach/router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const SocialNetworks = ({ classes, overrideClass, producer }) => {
  const { t } = useTranslation('bpProfile')

  return (
    <Grid
      container
      direction='column'
      className={classNames(classes.category, overrideClass)}
    >
      <Typography variant='subtitle1' className={classes.title}>
        {t('social')}
      </Typography>
      <Grid container direction='row'>
        <Typography variant='subtitle1' className={classes.subTitle}>
          GitHub:
        </Typography>
        <Typography
          variant='subtitle1'
          className={classNames(classes.value, classes.subTitle)}
        >
          {(producer && producer.org.social.github) || '- -'}
        </Typography>
      </Grid>
      <Grid container direction='row'>
        <Typography variant='subtitle1' className={classes.subTitle}>
          Twitter:
        </Typography>
        <Typography
          variant='subtitle1'
          className={classNames(classes.value, classes.subTitle)}
        >
          {(producer && producer.org.social.twitter) || '- -'}
        </Typography>
      </Grid>
      <Grid container direction='row'>
        <Typography variant='subtitle1' className={classes.subTitle}>
          LinkedIn:
        </Typography>
        <Typography
          variant='subtitle1'
          className={classNames(classes.value, classes.subTitle)}
        >
          {(producer && producer.org.social.linkedin) || '- -'}
        </Typography>
      </Grid>
      <Grid container direction='row'>
        <Typography variant='subtitle1' className={classes.subTitle}>
          Telegram:
        </Typography>
        <Typography
          variant='subtitle1'
          className={classNames(classes.value, classes.subTitle)}
        >
          {(producer && producer.org.social.telegram) || '- -'}
        </Typography>
      </Grid>
      <Grid container direction='row'>
        <Typography variant='subtitle1' className={classes.subTitle}>
          Instagram:
        </Typography>
        <Typography
          variant='subtitle1'
          className={classNames(classes.value, classes.subTitle)}
        >
          {(producer && producer.org.social.instagram) || '- -'}
        </Typography>
      </Grid>
    </Grid>
  )
}

const WebsiteLegend = ({ classes, overrideClass }) => {
  const { t } = useTranslation('bpProfile')

  return (
    <Grid item xs={12} className={classes.websiteLegend}>
      <Typography variant='subtitle1' className={classes.title}>
        {t('websiteInfo')}:
      </Typography>
      <Typography variant='subtitle1' className={classes.value}>
        We believe that technology is only as good as the people and intentions
        behind it. We want EOS to be decentralized, promote freedom, cut,
        inefficiencies in government, help sustainable development, secure
        censorship-resistance, increase individual sovereignty and advance
        citizen advocacy Each of the projects we promote must provide a “Proof
        of impact” in the advancement of democracy
      </Typography>
    </Grid>
  )
}

const GeneralInformation = ({ classes, producer, overrideClass }) => {
  const { t } = useTranslation('bpProfile')

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
            {(producer && producer.system.owner) || '- -'}
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
            {(producer && producer.system.location) || '- -'}
          </Typography>
        </Grid>
        <Grid container direction='row'>
          <Typography variant='subtitle1' className={classes.subTitle}>
            {t('status')}:
          </Typography>
          <Typography
            variant='subtitle1'
            className={classNames(classes.value, classes.subTitle)}
          >
            {(producer && producer.system.is_active) || ' - -'}
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
            {(producer && producer.system.url) || '- -'}
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
            {(producer && producer.system.total_votes) || '- -'}
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
            - -
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
            - -
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction='column' className={classes.category}>
        <Grid container direction='row'>
          <Button
            disabled={!producer}
            component={props => (
              <Link
                {...props}
                to={`/block-producers/${(producer && producer.owner) ||
                  'noBlockProducerName'}/rate`}
              />
            )}
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
  producer: PropTypes.object
}

GeneralInformation.propTypes = {
  classes: PropTypes.object,
  overrideClass: PropTypes.any,
  producer: PropTypes.object
}

WebsiteLegend.propTypes = {
  classes: PropTypes.object,
  overrideClass: PropTypes.any
}

export { SocialNetworks, GeneralInformation, WebsiteLegend }
