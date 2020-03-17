import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Help from '@material-ui/icons/HelpOutlineRounded'
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
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  avatar: {
    backgroundColor: theme.palette.surface.main
  },
  helpIcon: {
    width: '90%',
    height: '90%'
  },
  cardHeader: {
    borderBottom: `1px solid ${theme.palette.primary.light}`
  }
})

const CompareBodyList = ({ isProxy, selectedData, classes, removeBP }) => {
  if (!selectedData.length) return null

  if (isProxy) {
    const proxy = selectedData[0]
    const owner = _get(proxy, 'owner')
    const title = _get(proxy, 'name')
    const imageURL = _get(proxy, 'logo_256', null)
    const producers = _get(proxy, 'voter_info.producers', [])

    return (
      <>
        <CardHeader
          className={classes.title}
          classes={{
            root: classes.cardHeader
          }}
          avatar={
            <Avatar aria-label='Block Card' className={classes.avatar}>
              {!imageURL ? (
                <Help className={classes.helpIcon} />
              ) : (
                <img src={imageURL} alt='' width='100%' />
              )}
            </Avatar>
          }
          title={title || <span>{owner}</span>}
          subheader={owner}
        />
        {producers.map(producer => {
          const imageURL = _get(producer, 'bpjson.org.branding.logo_256', null)
          const backgroundColor = _get(
            producer,
            'data.pointBackgroundColor',
            '#597a81'
          )

          return (
            <Chip
              className={classes.bpName}
              avatar={
                <Avatar
                  aria-label='Block Compare'
                  style={{
                    backgroundColor
                  }}
                  className={classes.avatar}
                >
                  {!imageURL ? (
                    'BP'
                  ) : (
                    <img src={imageURL} alt='' width='100%' />
                  )}
                </Avatar>
              }
              color='secondary'
              label={producer.owner}
              key={`producer-list-name-${producer.owner}`}
            />
          )
        })}
      </>
    )
  }

  return (
    <>
      {selectedData.map(data => {
        const imageURL = _get(data, 'bpjson.org.branding.logo_256', null)

        return (
          <Chip
            className={classes.bpName}
            avatar={
              <Avatar
                aria-label='Block Compare'
                style={{ backgroundColor: data.data.pointBackgroundColor }}
                className={classes.avatar}
              >
                {!imageURL ? 'BP' : <img src={imageURL} alt='' width='100%' />}
              </Avatar>
            }
            color='secondary'
            onDelete={removeBP(data.owner)}
            label={data.owner}
            key={`data-list-name-${data.owner}`}
          />
        )
      })}
    </>
  )
}

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
        <Typography variant='h5'>
          {isProxy ? t('voteToolTitle') : t('compareToolTitle')}
        </Typography>
        <CompareBodyList
          isProxy={isProxy}
          selectedData={selected}
          classes={classes}
          removeBP={removeBP}
        />
      </Grid>
    </Grid>
  )
}

CompareGraphView.propTypes = {
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool
}

CompareGraphView.defaultProps = {
  className: '',
  isProxy: false
}

CompareBodyList.propTypes = {
  isProxy: PropTypes.bool,
  selectedData: PropTypes.array,
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired
}

export default withStyles(styles)(CompareGraphView)
