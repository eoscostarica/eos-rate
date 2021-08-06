import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from '@reach/router'

import styles from './styles'

const useStyles = makeStyles(styles)

const NotFound = () => {
  const { t } = useTranslation('not-found')
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.graphic}>
          <Typography component='span'>404</Typography>
          <Typography component='span'>{t('graphic')}</Typography>
        </div>
        <Typography variant='h6' className={classes.description}>
          {t('description')}
        </Typography>
        <Button
          className={classes.recoveryCta}
          variant='contained'
          // eslint-disable-next-line react/display-name
          component={forwardRef((props, ref) => (
            <Link {...props} ref={ref} to='/' />
          ))}
          color='secondary'
        >
          {t('recoveryCta')}
        </Button>
      </div>
    </div>
  )
}

export default NotFound
