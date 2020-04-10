import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined'
import LockIcon from '@material-ui/icons/LockOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import withWidth from '@material-ui/core/withWidth'
import Help from '@material-ui/icons/HelpOutlineRounded'
import { useTranslation } from 'react-i18next'
import _get from 'lodash.get'

import Radar from 'components/radar'
import ProducerChipAvatar from 'components/bp-chip-avatar'

const styles = theme => ({
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
  },
  titleLock: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center'
  },
  marginRightElem: {
    marginRight: 10
  },
  icon: {
    color: theme.palette.primary.submenu,
    fontSize: 30,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  containerList: {
    maxHeight: 385,
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginBottom: 38
    }
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
    <div className={classes.containerList}>
      {selectedData.map(data => {
        const imageURL = _get(data, 'bpjson.org.branding.logo_256', null)

        return (
          <ProducerChipAvatar
            data={data}
            onHandleRemove={removeBP}
            classNames={classes}
            imageURL={imageURL}
            key={`data-list-name-${data.owner}`}
          />
        )
      })}
    </div>
  )
}

const TooltipWrapper = ({
  open,
  onHandleTooltip,
  isClickable,
  t,
  classes,
  userHasVote,
  isUser
}) => {
  const message = userHasVote ? t('availableToRate') : t('notAvailableToRate')

  if (isClickable) {
    return (
      <Tooltip
        open={open}
        title={isUser ? message : t('voteWithoutLogin')}
        arrow
      >
        {userHasVote ? (
          <LockOpenIcon className={classes.icon} onClick={onHandleTooltip} />
        ) : (
          <LockIcon className={classes.icon} onClick={onHandleTooltip} />
        )}
      </Tooltip>
    )
  }

  return (
    <Tooltip title={isUser ? message : t('voteWithoutLogin')} arrow>
      {userHasVote ? (
        <LockOpenIcon className={classes.icon} />
      ) : (
        <LockIcon className={classes.icon} />
      )}
    </Tooltip>
  )
}

const TooltipWrapper = ({
  open,
  onHandleTooltip,
  isClickable,
  t,
  classes,
  userHasVote,
  isUser
}) => {
  const message = userHasVote ? t('availableToRate') : t('notAvailableToRate')

  if (isClickable) {
    return (
      <Tooltip open={open} title={isUser ? message : t('voteWithoutLogin')} arrow>
        {userHasVote ? (
          <LockOpenIcon className={classes.icon} onClick={onHandleTooltip} />
        ) : (
          <LockIcon className={classes.icon} onClick={onHandleTooltip} />
        )}
      </Tooltip>
    )
  }

  return (
    <Tooltip title={isUser ? message : t('voteWithoutLogin')} arrow>
      {userHasVote ? (
        <LockOpenIcon className={classes.icon} />
      ) : (
        <LockIcon className={classes.icon} />
      )}
    </Tooltip>
  )
}

const CompareGraphView = ({
  classes,
  removeBP,
  selected,
  className,
  isProxy,
  userInfo,
  width,
  ...props
}) => {
  const { t } = useTranslation('translations')
  const [open, setOpen] = useState(false)
  const userHasVote =
    Boolean(userInfo.proxy.length) || Boolean(userInfo.producers.length > 21)

  const handleTooltip = e => {
    setOpen(!open)
    e.preventDefault()
  }

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
        <div className={classes.titleLock}>
          <Typography variant='h5' className={classes.marginRightElem}>
            {t('voteToolTitle')}
          </Typography>
          <TooltipWrapper
            open={open}
            onHandleTooltip={handleTooltip}
            isClickable={Boolean(width === 'xs')}
            t={t}
            classes={classes}
            userHasVote={userHasVote}
            isUser={userInfo.isUser}
          />
        </div>
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
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  removeBP: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool,
  userInfo: PropTypes.object
}

CompareGraphView.defaultProps = {
  className: '',
  isProxy: false,
  userInfo: { proxy: '', producers: [], isUser: false }
}

CompareBodyList.propTypes = {
  isProxy: PropTypes.bool,
  selectedData: PropTypes.array,
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired
}

TooltipWrapper.propTypes = {
  classes: PropTypes.object,
  isClickable: PropTypes.bool,
  open: PropTypes.bool,
  onHandleTooltip: PropTypes.func,
  t: PropTypes.any,
  userHasVote: PropTypes.bool,
  isUser: PropTypes.bool
}

export default withStyles(styles)(withWidth()(CompareGraphView))
