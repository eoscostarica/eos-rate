import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockOpenIcon from '@mui/icons-material/LockOpenOutlined'
import LockIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import Switch from '@mui/material/Switch'
import CloseIcon from '@mui/icons-material/Close'
import _get from 'lodash.get'

import PolarChart from '../PolarChart'
import ProducerChipAvatar from '../BpChipAvatar'

import styles from './styles'

const useStyles = makeStyles(styles)

const CompareBodyList = ({ isProxy, selectedData, classes, removeBP }) => {
  if (!selectedData.length) return null

  if (isProxy) {
    const proxy = selectedData[0]
    const producers = _get(proxy, 'voter_info.producers', [])

    return (
      <Box className={classes.containerList}>
        {producers.map(producer => (
          <ProducerChipAvatar
            data={producer}
            onHandleRemove={removeBP}
            classNames={classes}
            imageURL={_get(producer, 'bpjson.org.branding.logo_256', null)}
            isProxy={isProxy}
            key={`data-list-name-${producer.owner}`}
            defaultName='P'
          />
        ))}
      </Box>
    )
  }

  return (
    <Box className={classes.containerList}>
      {selectedData.map(data => (
        <ProducerChipAvatar
          data={data}
          onHandleRemove={removeBP}
          classNames={classes}
          imageURL={_get(data, 'bpjson.org.branding.logo_256', null)}
          key={`data-list-name-${data?.owner}`}
          defaultName='BP'
        />
      ))}
    </Box>
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
  isProxy,
  userInfo,
  handleOnClear,
  handleOnClose,
  onHandleVote,
  setIsCollapsedView,
  isCollapsedView
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.compareGraphView}>
      <Box className={classes.headerVotingCompare}>
        <Box />
        <Box className={classes.modalHeader}>
          <Typography variant='h6' className={classes.marginRightElem}>
            {selected.length > 0
              ? `${t('voteToolTitle')} (${selected.length} ${t('chosen')})`
              : `${t('voteToolTitle')} (${t('noBPSelected')})`}
          </Typography>
          <Typography variant='body1' style={{ display: 'flex' }}>
            {t('voteToolDescription')}
          </Typography>
        </Box>
        <Box className={classes.boxCloseIcon}>
          <CloseIcon style={{ cursor: 'pointer' }} onClick={handleOnClose} />
        </Box>
      </Box>
      <Box className={classes.wrapperDesktop}>
        <Box className={classes.bodyModalView}>
          <Box className={classes.chartWrapper}>
            <PolarChart data={selected.map(bp => bp?.data).filter(bp => bp)} />
          </Box>
          {isProxy && selected.length > 0 && (
            <Box className={classes.proxyVote}>
              <Typography style={{ fontSize: '20px', fontWeight: 500 }}>
                {selected[0].name}
              </Typography>
              <Box style={{ margin: '10px 0 10px 0' }}>
                <Button
                  disabled={!userInfo.isUser}
                  aria-label='Add to comparison'
                  className={classes.btnRateProxies}
                  variant='contained'
                  onClick={onHandleVote}
                >
                  {t('voteToolToggle')}
                </Button>
              </Box>
            </Box>
          )}
          {!isProxy && (
            <Box className={classes.switchBox}>
              <Box className={classes.centerBox}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isCollapsedView}
                      color='secondary'
                      onChange={event =>
                        setIsCollapsedView(event.target.checked)
                      }
                      value='isCollapsedView'
                    />
                  }
                  label={t('compareToolCollapsedSwitch')}
                />
              </Box>
            </Box>
          )}

          <Box className={classes.compareBodyListMobile}>
            {selected.length > 0 ? (
              <CompareBodyList
                isProxy={isProxy}
                selectedData={selected}
                classes={classes}
                removeBP={removeBP}
              />
            ) : (
              <Box className={clsx(classes.centerBox, classes.noBPSelected)}>
                <Typography variant='subtitle2'>{t('noSelectedBP')}</Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box className={classes.compareBodyListDesktop}>
          {selected.length > 0 ? (
            <CompareBodyList
              isProxy={isProxy}
              selectedData={selected}
              classes={classes}
              removeBP={removeBP}
            />
          ) : (
            <Box className={classes.centerBox} style={{ marginTop: '20%' }}>
              <Typography variant='h6'>{t('noSelectedBP')}</Typography>
            </Box>
          )}
        </Box>
      </Box>
      {!isProxy && (
        <Box className={classes.buttonsBox}>
          <Button
            className={classes.btnClear}
            aria-label='Clear selection'
            onClick={handleOnClear}
          >
            {t('clearSelection')}
          </Button>
          <Button
            disabled={!userInfo.isUser}
            aria-label='Add to comparison'
            className={classes.btnRate}
            variant='contained'
            color='secondary'
            onClick={onHandleVote}
          >
            {t('voteToolToggle')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

CompareGraphView.propTypes = {
  removeBP: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  isProxy: PropTypes.bool,
  userInfo: PropTypes.object,
  handleOnClear: PropTypes.func,
  handleOnClose: PropTypes.func,
  onHandleVote: PropTypes.func,
  setIsCollapsedView: PropTypes.func,
  isCollapsedView: PropTypes.bool
}

CompareGraphView.defaultProps = {
  isProxy: false,
  userInfo: { proxy: '', producers: [], isUser: false },
  onHandleVote: () => {},
  handleOnClear: () => {},
  handleOnClose: () => {},
  setIsCollapsedView: () => {},
  isCollapsedView: true
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

export default CompareGraphView
