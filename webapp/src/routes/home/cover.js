import React, { forwardRef, useState, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useMediaQuery } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Radar from '../../components/Radar'

import styles from './styles'

const refBPLink = (props, ref) => <Link innerRef={ref} {...props} />
const bpLink = forwardRef(refBPLink)

const useStyles = makeStyles(styles)

const HomeCover = ({ blockProducer }) => {
  const { t } = useTranslation('home')
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:769px)')
  const isTablet = useMediaQuery('(min-width:540px)')
  const isBigTablet = useMediaQuery('(max-width:1023px)')
  const [sizes, setSizes] = useState()

  useEffect(() => {
    setSizes(isDesktop ? 400 : '95%')
  }, [isDesktop])

  return (
    <Grid container className={classes.coverContainer}>
      <Grid item xs={12} md={12}>
        <Typography variant='h4' className={classes.coverTitle}>
          {t('cover.title')}
        </Typography>
      </Grid>
      {!isDesktop && (
        <Grid
          style={{ margin: '-10px 0 25px 0' }}
          container
          // xs={12}
          // md={isBigTablet ? 12 : 6}
          justifyContent='center'
        >
          <Grid item md={12} xs={isTablet ? 7 : 12}>
            <Radar
              height={sizes}
              width={sizes}
              bpData={{
                datasets: [blockProducer.data]
              }}
            />
          </Grid>
          <Grid item md={12} xs={isTablet ? 6 : 12}>
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
          </Grid>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={isBigTablet ? 12 : 6}
        className={classes.leftCoverBox}
      >
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
        {isDesktop && (
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
        )}
      </Grid>
      {isDesktop && (
        <Grid item xs={12} md={6}>
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
      )}
    </Grid>
  )
}

HomeCover.propTypes = {
  blockProducer: PropTypes.object.isRequired
}

export default memo(HomeCover)
