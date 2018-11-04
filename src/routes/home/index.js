import React, { Component } from 'react'
import { Redux } from 'redux-render'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Cover from './cover'
import SubTopic from './subTopic'
import store from 'store'

const { dispatch } = store

const styles = ({ spacing, palette }) => ({
  spacingContainers: {
    padding: spacing.unit * 4
  },
  coverContainer: {
    backgroundColor: palette.primary.dark
  },
  subTopicContainer: {
    backgroundColor: '#1a1b29'
  }
})

class Home extends Component {
  componentDidMount () {
    dispatch.home.getBlockData()
  }

  render () {
    const { classes } = this.props
    return (
      <Redux
        selector={state => ({
          home: state.home
        })}
      >
        {({ home }) => (
          <Grid container direction='column'>
            <Grid item xs>
              {home.blockProducer && (
                <div
                  className={`${classes.spacingContainers}
                    ${classes.coverContainer}
                  `}
                >
                  <Cover blockProducer={home.blockProducer} />
                </div>
              )}
            </Grid>

            <Grid item xs>
              <div
                className={`${classes.spacingContainers}
                ${classes.subTopicContainer}
              `}
              >
                <SubTopic />
              </div>
            </Grid>
          </Grid>
        )}
      </Redux>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.required
}

export default withStyles(styles)(Home)
