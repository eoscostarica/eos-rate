import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { useTranslation } from 'react-i18next'
import _get from 'lodash.get'
import _isEmpty from 'lodash.isempty'

import Radar from 'components/radar'

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
  imageURL,
  isProxy,
  ...props
}) => {
  const { t } = useTranslation('translations')

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={8}>
        <Radar
          bpData={{
            datasets: selected.map(({ data }) => ({
              ...data,
              backgroundColor: data.backgroundColor.replace('.9', '.2')
            }))
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant='h5'>{t('compareToolTitle')}</Typography>
        {selected.map(data => {
          console.log({ isProxy });
          const path = isProxy ? 'logo_256' : 'bpjson.org.branding.logo_256'
          const imageURL= _get(data, path, null)

          return (
            <Chip
              className={classes.bpName}
              avatar={
                <Avatar
                  aria-label='Block Compare'
                  style={{ backgroundColor: data.data.pointBackgroundColor }}
                  className={classes.avatar}
                >
                  {!imageURL ? (
                    'BP'
                  ) : (
                    <img
                      src={imageURL}
                      alt=''
                      width='100%'
                    />
                  )}
                </Avatar>
              }
              color='secondary'
              onDelete={removeBP(data.owner)}
              label={data.owner}
              key={`data-list-name-${data.owner}`}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

CompareGraphView.propTypes = {
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  imageURL: PropTypes.string,
  isProxy: PropTypes.bool
}

CompareGraphView.defaultProps = {
  className: '',
  isProxy: false
}

export default withStyles(styles)(CompareGraphView)
