import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from '@reach/router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import AccountCircle from '@material-ui/icons/AccountCircle'
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
    padding: 10
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
  }
})

const BlockProducerProfile = ({
  classes,
  account,
  blockProducers,
  ...props
}) => {
  const blockProducer = blockProducers.find(
    bp => bp.bpjson.producer_account_name === account
  )
  if (!blockProducer) {
    return <Redirect to='/not-found' />
  }
  return (
    <Grid container justify='center' spacing={16} className={classes.container}>
      <Grid item xs={12}>
        <Grid container spacing={16} direction='row' alignItems='center'>
          <Button
            component={props => <Link {...props} to='/block-producers' />}
          >
            <KeyboardArrowLeft />
            All Block Producers
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
                  <Grid item xs={4}>
                    <Grid container direction='row' alignItems='center'>
                      <AccountCircle className={classes.accountCircle} />
                      <Typography variant='h6' className={classes.bpName}>
                        {blockProducer.producer_account_name || ''}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container direction='row' justify='flex-end'>
                      <Button
                        style={{
                          marginRight: 10,
                          backgroundColor: '#010318'
                        }}
                      >
                        ADD TO COMPARE
                      </Button>
                      <Button
                        component={props => (
                          <Link
                            {...props}
                            to={`/block-producers/${blockProducer.bpjson.producer_account_name}/rate`}
                          />
                        )}
                        className='textPrimary'
                        variant='contained'
                        size='small'
                        color='secondary'
                      >
                        RATE
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction='row' style={{ marginTop: 10 }}>
              <Grid item xs={4}>
                <Grid container direction='column' className={classes.category}>
                  <Typography variant='subtitle1' className={classes.title}>
                    General Information
                  </Typography>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Location:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      Costa Rica
                    </Typography>
                  </Grid>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Website:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      eoscostarica.io
                    </Typography>
                  </Grid>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Position:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      #15
                    </Typography>
                  </Grid>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Votes:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      1.56 %
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container direction='column' className={classes.category}>
                  <Typography variant='subtitle1' className={classes.title}>
                    Economy
                  </Typography>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Balance:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      4.0800 EOS
                    </Typography>
                  </Grid>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Staked:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      6.7800 EOS
                    </Typography>
                  </Grid>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Daily Reward:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      500 EOS
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container direction='column' className={classes.category}>
                  <Typography variant='subtitle1' className={classes.title}>
                    Ratings
                  </Typography>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Rate:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      8.5
                    </Typography>
                  </Grid>
                  <Grid container direction='row'>
                    <Typography
                      variant='subtitle1'
                      className={classes.subTitle}
                    >
                      Raters:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      450 accounts
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Grid container direction='column'>
                  <Grid
                    item
                    xs={12}
                    style={{ padding: '30px 0', backgroundColor: '#000' }}
                  >
                    <BlockProducerRadar
                      bpData={{
                        labels: bpParameters,
                        datasets: [blockProducer.data]
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1' className={classes.title}>
                      From Their Website:
                    </Typography>
                    <Typography variant='subtitle1' className={classes.value}>
                      We believe that technology is only as good as the people
                      and intentions behind it. We want EOS to be decentralized,
                      promote freedom, cut, inefficiencies in government, help
                      sustainable development, secure censorship-resistance,
                      increase individual sovereignty and advance citizen
                      advocacy Each of the projects we promote must provide a
                      “Proof of impact” in the advancement of democracy
                    </Typography>
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

BlockProducerProfile.propTypes = {
  classes: PropTypes.object,
  account: PropTypes.string,
  blockProducers: PropTypes.array
}

const mapStateToProps = ({ blockProducers: { list } }) => ({
  blockProducers: list
})

const mapDispatchToProps = () => ({})

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlockProducerProfile)
)
