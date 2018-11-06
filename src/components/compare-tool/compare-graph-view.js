import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withNamespaces } from 'react-i18next'

import comparisonParameters from 'config/comparison-parameters'
import BlockProducerRadar from 'components/block-producer-radar'

const styles = theme => ({
  root: {},
  bpItem: {
    width: '75%',
    padding: '0 0 0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.primary.submenu
    }
  },
  bpNameWrapper: {
    height: 48,
    paddingTop: 14
  },
  bpColorCode: {
    display: 'inline-block',
    width: 15,
    height: 15,
    verticalAlign: 'text-bottom'
  },
  bpName: {
    padding: '0 0 0 10px',
    display: 'inline'
  }
})

const CompareGraphView = ({
  classes,
  removeBP,
  selected,
  t,
  className,
  ...props
}) => (
  <Grid container className={classes.root} spacing={16}>
    <Grid item xs={12} md={8}>
      <BlockProducerRadar
        bpData={{
          labels: comparisonParameters,
          datasets: selected.map(({ data }) => ({
            ...data,
            backgroundColor: data.backgroundColor.replace('.9', '.2')
          }))
        }}
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <Typography variant='title'>{t('compareToolTitle')}</Typography>
      {selected.map(bp => (
        <div
          className={classes.bpItem}
          key={`bp-list-name-${bp.producer_account_name}`}
        >
          <div className={classes.bpNameWrapper}>
            <Avatar
              className={classes.bpColorCode}
              component='span'
              style={{ backgroundColor: bp.data.pointBackgroundColor }}
            />
            <Typography className={classes.bpName} component='span'>
              {bp.producer_account_name}
            </Typography>
          </div>
          <IconButton
            onClick={removeBP(bp.producer_account_name)}
            aria-label='Remove block producer'
          >
            <CloseIcon />
          </IconButton>
        </div>
      ))}
    </Grid>
  </Grid>
)

CompareGraphView.propTypes = {
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string
}

CompareGraphView.defaultProps = {
  className: ''
}

export default withStyles(styles)(
  withNamespaces('translations')(CompareGraphView)
)
