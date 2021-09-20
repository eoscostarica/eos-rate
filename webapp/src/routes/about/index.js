import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const About = () => {
  const classes = useStyles()
  const { t } = useTranslation('aboutRoute')

  return (
    <Box>
      <Grid container direction='column'>
        <Grid item xs>
          <Grid container direction='column'>
            <Typography variant='h3' className={classes.title}>
              {t('title')}
            </Typography>
            <Typography variant='h4'>{t('subtitle1')}</Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('paragraph1')}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction='column'>
            <Typography variant='h4'>{t('subtitle2')}</Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('paragraph2')}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction='column'>
            <Typography variant='h4'>{t('subtitle3')}</Typography>
            <Typography variant='body2' align='justify' paragraph>
              {t('paragraph3')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default About
