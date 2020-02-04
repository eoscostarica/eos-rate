import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from '@reach/router'

const styles = ({ spacing, palette }) => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 128px)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  container: {
    margin: spacing(2),
    height: '100%',
    width: '50%',
    background: palette.primary.sectionBackground,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-around',
    flexDirection: 'column',
    '& > *': {
      marginTop: spacing(4)
    }
  },
  graphic: {
    borderRadius: '50%',
    background: palette.primary.dark,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    height: '200px',
    '& > span': {
      fontWeight: '600',
      lineHeight: 1
    },
    '& > span:first-child': {
      fontSize: '4rem'
    },
    '& > span:nth-child(2)': {
      fontSize: '1.8rem'
    }
  }
})

const NotFound = ({ classes }) => {
  const { t } = useTranslation('not-found')
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
          component={props => <Link to='/' {...props} />}
          color='secondary'
        >
          {t('recoveryCta')}
        </Button>
      </div>
    </div>
  )
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(styles)(NotFound)
