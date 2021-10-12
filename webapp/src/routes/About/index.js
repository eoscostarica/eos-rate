import React, { memo } from 'react'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import TitlePage from '../../components/PageTitle'

import styles from './styles'

const useStyles = makeStyles(styles)

const About = () => {
  const classes = useStyles()
  const { t } = useTranslation('about')

  return (
    <Box>
      <TitlePage title={t('tabTitle')} />
      <Box>
        <Box className={classes.firstContainer}>
          <Box className={classes.wrapperContainers}>
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
          </Box>
        </Box>

        <Box className={classes.lastContainer}>
          <Box className={classes.wrapperContainers}>
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
          </Box>
        </Box>

        <Box className={classes.middleContainer}>
          <Box className={classes.wrapperContainers}>
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
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(About)
