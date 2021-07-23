import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined'
import LockIcon from '@material-ui/icons/LockOutlined'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'
import withWidth from '@material-ui/core/withWidth'
import Help from '@material-ui/icons/HelpOutlineRounded'
import { useTranslation } from 'react-i18next'
import _get from 'lodash.get'

import Radar from 'components/radar'
import ProducerChipAvatar from 'components/bp-chip-avatar'

import styles from './styles'

const useStyles = makeStyles(styles)

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
        {producers.map((producer) => {
          const imageURL = _get(producer, 'bpjson.org.branding.logo_256', null)

          return (
            <ProducerChipAvatar
              data={producer}
              onHandleRemove={removeBP}
              classNames={classes}
              imageURL={imageURL}
              key={`data-list-name-${producer.owner}`}
              defaultName='P'
            />
          )
        })}
      </>
    )
  }

  return (
    <div className={classes.containerList}>
      {selectedData.map((data) => {
        const imageURL = _get(data, 'bpjson.org.branding.logo_256', null)

        return (
          <ProducerChipAvatar
            data={data}
            onHandleRemove={removeBP}
            classNames={classes}
            imageURL={imageURL}
            key={`data-list-name-${data.owner}`}
            defaultName='BP'
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

const CompareGraphView = ({
  removeBP,
  selected,
  className,
  isProxy,
  userInfo,
  width,
  onHandleClose,
  onHandleVote,
  ...props
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  // const [open, setOpen] = useState(false)
  // const userHasVote =
  //   Boolean(userInfo.proxy.length) || Boolean(userInfo.producers.length > 21)

  // const handleTooltip = (e) => {
  //   setOpen(!open)
  //   e.preventDefault()
  // }

  return (
    <Grid container style={{ backgroundColor: '#bb11bb' }} spacing={2}>
      <Grid item md={12} xs={12}>
        <Box className={classes.headerVotingCompare}>
          <Box>
            <Typography variant='h6' className={classes.marginRightElem}>
              {`${t('voteToolTitle')} (${selected.length} ${t('selected')})`}
            </Typography>
            {/* <TooltipWrapper
              open={open}
              onHandleTooltip={handleTooltip}
              isClickable={Boolean(width === 'xs')}
              t={t}
              classes={classes}
              userHasVote={userHasVote}
              isUser={userInfo.isUser}
            /> */}
            <Typography variant='body1' style={{ display: 'flex' }}>
              {t('voteToolDescription')}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid style={{ backgroundColor: '#11bb11' }} container xs={12} md={5}>
        <Grid
          item
          md={12}
          style={{ backgroundColor: '#001100', padding: '20px' }}
        >
          <Radar
            bpData={{
              datasets: selected.map(({ data }) => ({
                ...data,
                backgroundColor: data.backgroundColor.replace('.9', '.2')
              }))
            }}
          />
        </Grid>
        {isProxy && (
          <Grid
            item
            md={12}
            style={{
              backgroundColor: '#ababab',
              textAlign: 'center',
              padding: '10px'
            }}
          >
            <Typography>PROXY NAME</Typography>
          </Grid>
        )}
        <Grid item md={6} style={{ backgroundColor: '#cf0f0c' }}>
          <Box className={classes.centerBox}>
            <Button aria-label='Clear selection'>{t('clearSelection')}</Button>
          </Box>
        </Grid>
        <Grid item md={6} style={{ backgroundColor: '#c0f0fc' }}>
          <Box className={classes.centerBox}>
            <Button
              disabled={!userInfo}
              aria-label='Add to comparison'
              className={classes.btnRate}
              variant='contained'
            >
              {t('btnVoteBPs')}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid style={{ backgroundColor: '#0011bb' }} item xs={12} md={7}>
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
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  removeBP: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool,
  userInfo: PropTypes.object,
  onHandleClose: PropTypes.func,
  onHandleVote: PropTypes.func
}

CompareGraphView.defaultProps = {
  className: '',
  isProxy: false,
  userInfo: { proxy: '', producers: [], isUser: false },
  onHandleVote: () => {},
  onHandleClose: () => {}
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
  isUser: PropTypes.bool.apply
}

export default withWidth()(CompareGraphView)
