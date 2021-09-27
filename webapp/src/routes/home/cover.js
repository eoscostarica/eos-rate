import React, { forwardRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'

// import Radar from '../../components/Radar'
import PolarChart from '../../components/PolarChart'

import styles from './styles'

const refBPLink = (props, ref) => <Link innerRef={ref} {...props} />
const bpLink = forwardRef(refBPLink)

const useStyles = makeStyles(styles)

const HomeCover = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()
  // const isDesktop = useMediaQuery('(min-width:769px)')
  // const [sizes, setSizes] = useState()

  // useEffect(() => {
  //   // setSizes(isDesktop ? 400 : '95%')
  // }, [isDesktop])

  return (
    <Box container className={classes.coverContainer}>
      <Typography variant='h4' className={classes.mainTitle}>
        {t('cover.title')}
      </Typography>
      <Box className={classes.mobileView}>
        <Box className={classes.chartContainerMobile}>
          <PolarChart
            data={[
              { type: 'area', name: 'Block Producer', data: [9, 4, 6, 9, 7] }
            ]}
          />
        </Box>
        <Box className={classes.btnWrapper}>
          <Button
            className={classes.btnMobile}
            component={bpLink}
            variant='contained'
            size='medium'
            color='secondary'
            to='/block-producers'
          >
            {t('cover.cta')}
          </Button>
        </Box>
      </Box>
      <Box className={classes.desktopView}>
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
        </Box>
        <Box className={classes.chartContainer}>
          <PolarChart
            data={[
              { type: 'area', name: 'Block Producer', data: [9, 4, 6, 9, 7] }
            ]}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(HomeCover)
