import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import TitlePage from 'components/title-page'

import Cover from './cover'
import SubTopic from './subTopic'
import RateCategory from './rateCategory'

const styles = ({ spacing, palette }) => ({
  spacingContainers: {
    padding: spacing(8, 0, 8, 0)
  },
  coverContainer: {
    backgroundColor: palette.surface.main
  },
  subTopicContainer: {
    backgroundColor: palette.surface.main
  },
  rateCategoryContainer: {
    backgroundColor: '#f5f5f5'
  }
})

const Home = ({ classes, home, getBlockData, setShowSortSelected, showSortSelected }) => {
  const { t } = useTranslation('home')

  useEffect(() => {
    getBlockData()
  }, [])

  useEffect(() => {
    setShowSortSelected(false)
  })

  return (
    <>
      <TitlePage title={t('title')} />
      <Grid container direction='column'>
        <Grid item xs>
          {home.blockProducer && (
            <Grid
              container
              justify='center'
              className={`${classes.spacingContainers}
                    ${classes.coverContainer}
                  `}
            >
              <Cover blockProducer={home.blockProducer} />
            </Grid>
          )}
        </Grid>

        <Grid item xs>
          {home.blockProducer && (
            <Grid
              container
              justify='center'
              className={`${classes.spacingContainers}
                    ${classes.rateCategoryContainer}
                  `}
            >
              <RateCategory />
            </Grid>
          )}
        </Grid>

        <Grid item xs>
          <Grid
            container
            justify='center'
            className={`${classes.spacingContainers}
                ${classes.subTopicContainer}
              `}
          >
            <SubTopic />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const mapStatetoProps = ({ home, blockProducers }) => ({
  home,
  showSortSelected: blockProducers.showSortSelected
})

const mapDispatchToProps = ({ home: { getBlockData }, blockProducers: { setShowSortSelected } }) => ({
  getBlockData,
  setShowSortSelected
})

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
  getBlockData: PropTypes.func.isRequired,
  showSortSelected: PropTypes.bool,
  setShowSortSelected: PropTypes.func
}

export default withStyles(styles)(
  connect(mapStatetoProps, mapDispatchToProps)(Home)
)
