import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, Redirect } from '@reach/router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HelpOutline from '@material-ui/icons/HelpOutline'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/lab/Slider'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import BlockProducerRadar from 'components/block-producer-radar'
import bpParameters from 'config/comparison-parameters'

const style = theme => ({
  container: {
    padding: 10
  },
  bpName: {
    marginLeft: 6
  },
  parameterTitleDisabled: {
    color: '#bdbdbd'
  },
  accountCircle: {
    color: theme.palette.secondary.light
  },
  radarActionsWrapper: {
    height: '100%',
    justifyContent: 'space-between'
  },
  radarWrapper: {
    flexBasis: 0,
    background: '#000',
    padding: '30px 0'
  },
  ctasWrapper: {
    flexBasis: 0
  },
  box: {
    padding: 20
  },
  title: {
    color: '#5cf68a',
    marginBottom: 10
  },
  subTitle: {
    fontWeight: 'bold'
  },
  value: {
    marginLeft: 4
  },
  category: {
    marginTop: 10
  },
  breadcrumbText: {
    color: '#fff',
    textTransform: 'uppercase'
  },
  topicIcon: {
    color: 'rgba(255, 255, 255, 0.38)',
    verticalAlign: 'middle'
  }
})

class BlockProducerRate extends PureComponent {
  state = {
    transparency: 0,
    transparencyEnabled: true,
    infrastructure: 0,
    infrastructureEnabled: true,
    trustiness: 0,
    trustinessEnabled: true,
    community: 0,
    communityEnabled: true,
    development: 0,
    developmentEnabled: true
  }

  handleSliderChange = parameter => (event, value) =>
    this.setState({
      [parameter]: value
    })

  handleToggleParameter = parameter => (event, value) =>
    this.setState({
      [`${parameter}Enabled`]: value
    })

  render () {
    const { classes, account, list } = this.props
    const {
      transparency,
      transparencyEnabled,
      infrastructure,
      infrastructureEnabled,
      trustiness,
      trustinessEnabled,
      community,
      communityEnabled,
      development,
      developmentEnabled
    } = this.state

    const blockProducer = list.find(
      bp => bp.bpjson.producer_account_name === account
    )

    if (!blockProducer) {
      return <Redirect to='/not-found' />
    }

    return (
      <Grid
        container
        justify='center'
        spacing={16}
        className={classes.container}
      >
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            direction='row'
            alignItems='center'
            className={classes.breadcrumbText}
          >
            <Button
              component={props => <Link {...props} to='/block-producers' />}
            >
              <KeyboardArrowLeft />
              All Block Producers
            </Button>
            <Button
              component={props => (
                <Link
                  {...props}
                  to={`/block-producers/${blockProducer.owner}`}
                />
              )}
            >
              <KeyboardArrowLeft />
              {blockProducer.owner || ''}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Grid
              container
              direction='row'
              alignItems='center'
              className={classes.box}
            >
              <Grid container direction='row' alignItems='center'>
                <Grid item xs={12}>
                  <Grid container direction='row' alignItems='center'>
                    <AccountCircle className={classes.accountCircle} />
                    <Typography variant='h6' className={classes.bpName}>
                      {blockProducer.bpjson.producer_account_name || ''}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction='row'
                spacing={16}
                style={{ marginTop: 10 }}
              >
                <Grid item xs={12} sm={5}>
                  <Typography variant='subtitle1' className={classes.title}>
                    Rate Block Producer
                  </Typography>
                  <Typography paragraph>
                    Use the sliders to rate the BP.
                  </Typography>
                  <Typography paragraph>
                    If you feel that you do not have enough knowledge about a
                    specific category you can disable it.
                  </Typography>
                  <Typography paragraph>
                    Publish the rate by signing in with Scatter.
                  </Typography>
                  {/* TODO: Iterate over bpParameters */}
                  <Grid container style={{ marginTop: 30 }}>
                    <Grid item xs={12}>
                      <Typography
                        paragraph
                        style={{ margin: 0 }}
                        className={
                          transparencyEnabled
                            ? ''
                            : classes.parameterTitleDisabled
                        }
                      >
                        Transparency{' '}
                        <Tooltip title='Lorem ipsum' placement='right'>
                          <HelpOutline
                            fontSize='inherit'
                            className={classes.topicIcon}
                          />
                        </Tooltip>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Slider
                          disabled={!transparencyEnabled}
                          onChange={this.handleSliderChange('transparency')}
                          value={transparency}
                          min={0}
                          max={10}
                          step={1}
                        />
                        <Switch
                          onChange={this.handleToggleParameter('transparency')}
                          checked={transparencyEnabled}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        paragraph
                        style={{ margin: 0 }}
                        className={
                          infrastructureEnabled
                            ? ''
                            : classes.parameterTitleDisabled
                        }
                      >
                        Infrastruture{' '}
                        <Tooltip title='Lorem ipsum' placement='right'>
                          <HelpOutline
                            fontSize='inherit'
                            className={classes.topicIcon}
                          />
                        </Tooltip>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Slider
                          disabled={!infrastructureEnabled}
                          onChange={this.handleSliderChange('infrastructure')}
                          value={infrastructure}
                          min={0}
                          max={10}
                          step={1}
                        />
                        <Switch
                          onChange={this.handleToggleParameter(
                            'infrastructure'
                          )}
                          checked={infrastructureEnabled}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        paragraph
                        style={{ margin: 0 }}
                        className={
                          trustinessEnabled
                            ? ''
                            : classes.parameterTitleDisabled
                        }
                      >
                        Trustiness{' '}
                        <Tooltip title='Lorem ipsum' placement='right'>
                          <HelpOutline
                            fontSize='inherit'
                            className={classes.topicIcon}
                          />
                        </Tooltip>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Slider
                          disabled={!trustinessEnabled}
                          onChange={this.handleSliderChange('trustiness')}
                          value={trustiness}
                          min={0}
                          max={10}
                          step={1}
                        />
                        <Switch
                          onChange={this.handleToggleParameter('trustiness')}
                          checked={trustinessEnabled}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        paragraph
                        style={{ margin: 0 }}
                        className={
                          communityEnabled ? '' : classes.parameterTitleDisabled
                        }
                      >
                        Community{' '}
                        <Tooltip title='Lorem ipsum' placement='right'>
                          <HelpOutline
                            fontSize='inherit'
                            className={classes.topicIcon}
                          />
                        </Tooltip>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Slider
                          disabled={!communityEnabled}
                          onChange={this.handleSliderChange('community')}
                          value={community}
                          min={0}
                          max={10}
                          step={1}
                        />
                        <Switch
                          onChange={this.handleToggleParameter('community')}
                          checked={communityEnabled}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        paragraph
                        style={{ margin: 0 }}
                        className={
                          developmentEnabled
                            ? ''
                            : classes.parameterTitleDisabled
                        }
                      >
                        Development{' '}
                        <Tooltip title='Lorem ipsum' placement='right'>
                          <HelpOutline
                            fontSize='inherit'
                            className={classes.topicIcon}
                          />
                        </Tooltip>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Slider
                          disabled={!developmentEnabled}
                          onChange={this.handleSliderChange('development')}
                          value={development}
                          min={0}
                          max={10}
                          step={1}
                        />
                        <Switch
                          onChange={this.handleToggleParameter('development')}
                          checked={developmentEnabled}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Grid
                    container
                    direction='column'
                    className={classes.radarActionsWrapper}
                  >
                    <Grid className={classes.radarWrapper} item xs={12}>
                      <BlockProducerRadar
                        bpData={{
                          labels: bpParameters,
                          datasets: [blockProducer.data]
                        }}
                      />
                    </Grid>
                    <Grid className={classes.ctasWrapper} item xs={12}>
                      <Grid
                        container
                        justify='flex-end'
                        style={{ marginTop: 10 }}
                      >
                        <Button
                          className='textPrimary'
                          variant='contained'
                          size='small'
                          color='secondary'
                          style={{ marginRight: 10 }}
                        >
                          Publish Rating
                        </Button>
                        <Button
                          component={props => (
                            <Link
                              {...props}
                              to={`/block-producers/${
                                blockProducer.bpjson.producer_account_name
                              }`}
                            />
                          )}
                          variant='contained'
                          size='small'
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

BlockProducerRate.propTypes = {
  classes: PropTypes.object,
  account: PropTypes.string,
  list: PropTypes.array
}

const mapStateToProps = ({ blockProducers: { list } }) => ({
  list
})

const mapDispatchToProps = () => ({})

export default withStyles(style)(
  withNamespaces('bpProfilePage')(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(BlockProducerRate)
  )
)
