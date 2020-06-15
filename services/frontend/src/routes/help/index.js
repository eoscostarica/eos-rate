import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import classNames from 'classnames'
import Link from '@material-ui/core/Link'

import TitlePage from 'components/title-page'

const useStyles = makeStyles(theme => ({
  wrapperContainers: {
    color: '#433F5B',
    padding: theme.spacing(6, 2),
    '& h6': {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 4)
    }
  },
  firstContainer: {
    '& h5': {
      fontSize: theme.typography.h4.fontSize,
      marginBottom: 12.5
    }
  }
}))

const Help = () => {
  const classes = useStyles()
  const { t } = useTranslation('help')

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
            <Typography variant='body2' align='justify' paragraph>
              {t('paragraph')}
            </Typography>
            <ul>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <Link
                    href='https://github.com/eoscostarica'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('githubEOSCR')}
                  </Link>
                </Typography>
              </li>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <Link
                    href='https://web.telegram.org/#/eoscr'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('telegramChannel')}
                  </Link>
                </Typography>
              </li>
              <li>
                <Typography variant='body2' align='justify' paragraph>
                  <Link
                    href='https://eoscostarica.io/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('websiteEOSCR')}
                  </Link>
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Help
