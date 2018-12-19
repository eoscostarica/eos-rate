import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { Redux } from 'redux-render'
import { Link, Redirect } from '@reach/router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HelpOutline from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
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
  accountCircle: {
    color: theme.palette.secondary.light
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

const BlockProducerRate = ({ classes, account, ...props }) => (
  <Redux
    selector={({ blockProducers: { list } }) => ({
      blockProducer: list.find(
        bp => bp.bpjson.producer_account_name === account
      )
    })}
  >
    {({ blockProducer }) => {
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
              <Link to='/block-producers'>
                <IconButton>
                  <KeyboardArrowLeft />
                </IconButton>
              </Link>
              <Typography variant='caption'>All Block Producers</Typography>
              <Link
                to={`/block-producers/${
                  blockProducer.bpjson.producer_account_name
                }`}
              >
                <IconButton>
                  <KeyboardArrowLeft />
                </IconButton>
              </Link>
              <Typography variant='caption'>
                {blockProducer.bpjson.producer_account_name || ''}
              </Typography>
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
                      Publish the rate by signing with Scatter.
                    </Typography>
                    {/* TODO: Iterate over bpParameters */}
                    <Grid container style={{ marginTop: 30 }}>
                      <Grid item xs={12}>
                        <Typography paragraph style={{ margin: 0 }}>
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
                          <Slider min={0} max={5} step={1} />
                          <Switch checked />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography paragraph style={{ margin: 0 }}>
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
                          <Slider min={0} max={5} step={1} />
                          <Switch checked />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography paragraph style={{ margin: 0 }}>
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
                          <Slider min={0} max={5} step={1} />
                          <Switch checked />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography paragraph style={{ margin: 0 }}>
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
                          <Slider min={0} max={5} step={1} />
                          <Switch checked />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography paragraph style={{ margin: 0 }}>
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
                          <Slider min={0} max={5} step={1} />
                          <Switch checked />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Grid container direction='column'>
                      <Grid item xs={12} style={{ backgroundColor: '#000' }}>
                        <BlockProducerRadar
                          bpData={{
                            labels: bpParameters,
                            datasets: [blockProducer.data]
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                            href={`/block-producers/${
                              blockProducer.bpjson.producer_account_name
                            }`}
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
    }}
  </Redux>
)

BlockProducerRate.propTypes = {
  classes: PropTypes.object,
  account: PropTypes.string
}

export default withStyles(style)(
  withNamespaces('bpProfilePage')(BlockProducerRate)
)
