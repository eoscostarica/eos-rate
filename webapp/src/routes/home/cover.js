import React, { forwardRef, useState, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'

import Radar from '../../components/Radar'

import styles from './styles'

const refBPLink = (props, ref) => <Link innerRef={ref} {...props} />
const bpLink = forwardRef(refBPLink)

const useStyles = makeStyles(styles)

const HomeCover = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:769px)')
  const [sizes, setSizes] = useState()

  useEffect(() => {
    setSizes(isDesktop ? 400 : '95%')
  }, [isDesktop])

  return (
    <Box container className={classes.coverContainer}>
      <Typography variant='h4' className={classes.mainTitle}>
        {t('cover.title')}
      </Typography>
      {!isDesktop && (
        <Box style={{ margin: '-10px 0 25px 0' }}>
          <Box>
            <Radar
              height={sizes}
              width={sizes}
              bpData={{
                datasets: [
                  {
                    label: 'Block Producer',
                    lineTension: 0.3,
                    borderJoinStyle: 'round',
                    backgroundColor: 'rgba(175, 207, 162, .6)',
                    borderColor: 'rgba(175, 207, 162, .6)',
                    pointBackgroundColor: 'rgba(175, 207, 162, .6)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(175, 207, 162, 1)',
                    data: [9, 4, 6, 9, 7]
                  }
                ]
              }}
            />
          </Box>
          <Box>
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
          </Box>
        </Box>
      )}
      <Box className={classes.leftCoverBox}>
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
          <Box className={classes.ctaContainer}>
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
          </Box>
        )}
      </Box>
      {isDesktop && (
        <Box className={classes.chartContainer}>
          <Radar
            height={sizes}
            width={sizes}
            bpData={{
              datasets: [
                {
                  label: 'Block Producer',
                  lineTension: 0.3,
                  borderJoinStyle: 'round',
                  backgroundColor: 'rgba(175, 207, 162, .6)',
                  borderColor: 'rgba(175, 207, 162, .6)',
                  pointBackgroundColor: 'rgba(175, 207, 162, .6)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(175, 207, 162, 1)',
                  data: [9, 4, 6, 9, 7]
                }
              ]
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default memo(HomeCover)
