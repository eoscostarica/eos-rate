import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Cover from './cover'
import SubTopic from './subTopic'
import RateCategory from './rateCategory'

const styles = ({ spacing, palette }) => ({
  spacingContainers: {
    padding: spacing(4)
  },
  coverContainer: {
    backgroundColor: palette.primary.dark
  },
  subTopicContainer: {
    backgroundColor: '#1a1b29'
  },
  rateCategoryContainer: {
    backgroundColor: palette.primary[800]
  }
})

class Home extends Component {
  componentDidMount () {
    this.props.getBlockData()
  }

  render () {
    const { classes, home } = this.props
    return (
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
    )
  }
}

const mapStatetoProps = ({ home }) => ({
  home
})

const mapDispatchToProps = ({ home: { getBlockData } }) => ({
  getBlockData
})

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
  getBlockData: PropTypes.func.isRequired
}

export default withStyles(styles)(
  connect(mapStatetoProps, mapDispatchToProps)(Home)
)
