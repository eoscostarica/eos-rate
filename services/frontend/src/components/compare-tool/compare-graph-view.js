import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
// import IconButton from '@material-ui/core/IconButton'
// import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'
import _get from 'lodash.get'
import _isEmpty from 'lodash.isempty'

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
    margin: theme.spacing(1),
    color: 'white',
    backgroundColor: theme.palette.primary.light
  }
})

const CompareGraphView = ({
  classes,
  removeBP,
  selected,
  className,
  ...props
}) => {
  const { t } = useTranslation('translations')
  return (
    <Grid container className={classes.root}>
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
        <Typography variant='h5'>{t('compareToolTitle')}</Typography>
        {selected.map(bp => (
          <Chip
            className={classes.bpName}
            avatar={
              <Avatar
                aria-label='Block Producer'
                style={{ backgroundColor: bp.data.pointBackgroundColor }}
                className={classes.avatar}
              >
                {_isEmpty(bp.bpjson) ? (
                  'BP'
                ) : (
                  <img
                    src={_get(bp, 'bpjson.org.branding.logo_256')}
                    alt=''
                    width='100%'
                  />
                )}
              </Avatar>
            }
            color='secondary'
            onDelete={removeBP(bp.owner)}
            label={bp.owner}
            key={`bp-list-name-${bp.owner}`}
          />
        ))}
      </Grid>
    </Grid>
  )
}

CompareGraphView.propTypes = {
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string
}

CompareGraphView.defaultProps = {
  className: ''
}

export default withStyles(styles)(CompareGraphView)
