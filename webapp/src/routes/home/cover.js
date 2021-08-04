import React, { forwardRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useMediaQuery } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'

import Radar from 'components/radar'

import styles from './styles'

// eslint-disable-next-line react/display-name
const bpLink = forwardRef((props, ref) => <Link innerRef={ref} {...props} />)
const useStyles = makeStyles(styles)

const HomeCover = ({ blockProducer }) => {
  const { t } = useTranslation('home')
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:767px)')
  const [sizes, setSizes] = useState()

  useEffect(() => {
    setSizes(isDesktop ? 400 : 240)
  }, [isDesktop])

  return (
    <Grid item container xs={12} className={classes.coverContainer}>
      <Typography variant='h5' className={classes.coverTitle}>
        {t('cover.title')}
      </Typography>
      <Grid item xs={12} md={6} className={classes.leftCoverBox}>
        <Typography variant='h6' className={classes.subtitle}>
          {t('cover.paragraph.subtitle1')}
        </Typography>
        <Typography variant='body2' align='justify' paragraph>
          {t('cover.paragraph.text1')}
        </Typography>
        <Typography variant='body2' align='justify' paragraph>
          {t('cover.paragraph.text2')}
        </Typography>
        <Typography variant='h6' className={classes.subtitle}>
          {t('cover.paragraph.subtitle2')}
        </Typography>
        <Typography variant='body2' align='justify' paragraph>
          {t('cover.paragraph.text3')}
        </Typography>
        <Typography variant='body2' align='justify' paragraph>
          {t('cover.paragraph.text4')}
        </Typography>
        <div className={classes.ctaContainer}>
          <Button
            className={classes.btn}
            component={bpLink}
            variant='contained'
            size='medium'
            color='secondary'
            to='/block-producers'
            fullWidth
          >
            {t('cover.cta')}
          </Button>
        </div>
      </Grid>

      <Grid item container xs={12} md={6} justifyContent='center'>
        <div className={classes.chartContainer}>
          <Radar
            height={sizes}
            width={sizes}
            bpData={{
              datasets: [blockProducer.data]
            }}
          />
        </div>
      </Grid>
    </Grid>
  )
}

HomeCover.propTypes = {
  blockProducer: PropTypes.object.isRequired
}

export default HomeCover
