import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import classNames from 'classnames'

import TitlePage from 'components/title-page'

import styles from './styles'

const useStyles = makeStyles(styles)

const About = () => {
  const classes = useStyles()
  const { t } = useTranslation('about')

  return (
    <Box>
      <TitlePage title={t('tabTitle')} />
      <Grid container direction='column'>
        <Grid item xs>
          <Grid
            container
            direction='column'
            className={classNames(
              classes.wrapperContainers,
              classes.firstContainer
            )}
          >
            <Typography variant='h5'>{t('title')}</Typography>
            <Typography variant='h6'>{t('subtitle1')}</Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body1.paragraph1')}
            </Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body1.paragraph2')}
            </Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body1.paragraph3')}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid
            container
            direction='column'
            className={classNames(
              classes.wrapperContainers,
              classes.lastContainer
            )}
          >
            <Typography variant='h6'>{t('subtitle2')}</Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body2.paragraph1')}
            </Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body2.paragraph2')}
            </Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body2.paragraph3')}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid
            container
            direction='column'
            className={classNames(
              classes.wrapperContainers,
              classes.middleContainer
            )}
          >
            <Typography variant='h6'>{t('subtitle3')}</Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body3.paragraph1')}
            </Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body3.paragraph2')}
            </Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body3.paragraph3')}
            </Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('body3.paragraph4')}
            </Typography>
            <ul>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <strong>{`${t('categories.transparency.title')}: `}</strong>
                  {t('categories.transparency.description')}
                </Typography>
              </li>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <strong>{`${t('categories.infrastructure.title')}: `}</strong>
                  {t('categories.infrastructure.description')}
                </Typography>
              </li>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <strong>{`${t('categories.trustiness.title')}: `}</strong>
                  {t('categories.trustiness.description')}
                </Typography>
              </li>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <strong>{`${t('categories.community.title')}: `}</strong>
                  {t('categories.community.description')}
                </Typography>
              </li>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <strong>{`${t('categories.development.title')}: `}</strong>
                  {t('categories.development.description')}
                </Typography>
              </li>
            </ul>
            <Typography variant='body2' align='justify' paragraph>
              {t('body3.paragraph5')}
            </Typography>
            <img
              src='/EOS-Rate-Infographic.jpg'
              alt='EOS block producer ratings'
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default About
