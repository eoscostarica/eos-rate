import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined'
import LockIcon from '@material-ui/icons/LockOutlined'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'
import withWidth from '@material-ui/core/withWidth'
import { useMediaQuery } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Switch from '@material-ui/core/Switch'
import CloseIcon from '@material-ui/icons/Close'
import _get from 'lodash.get'

import Radar from 'components/radar'
import ProducerChipAvatar from 'components/bp-chip-avatar'

import styles from './styles'

const useStyles = makeStyles(styles)

const CompareBodyList = ({ isProxy, selectedData, classes, removeBP }) => {
  if (!selectedData.length) return null

  if (isProxy) {
    const proxy = selectedData[0]
    const producers = _get(proxy, 'voter_info.producers', [])

    return (
      <>
        {producers.map((producer) => {
          const imageURL = _get(producer, 'bpjson.org.branding.logo_256', null)

          return (
            <ProducerChipAvatar
              data={producer}
              onHandleRemove={removeBP}
              classNames={classes}
              imageURL={imageURL}
              isProxy={isProxy}
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
  handleOnClear,
  handleOnClose,
  onHandleVote,
  setIsCollapsedView,
  isCollapsedView,
  ...props
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:767px)')
  const mobileMedium = useMediaQuery('(min-height:711px)')
  const [sizes, setSizes] = useState()

  useEffect(() => {
    setSizes(isDesktop ? 400 : 250)
  }, [isDesktop])

  return (
    <Grid
      justifyContent='center'
      style={{ paddingTop: isDesktop ? '20px' : 0 }}
      container
      spacing={2}
    >
      <Grid item md={11} xs={11}>
        <Box className={classes.headerVotingCompare}>
          <Box>
            <Typography variant='h6' className={classes.marginRightElem}>
              {selected.length > 0
                ? `${t('voteToolTitle')} (${selected.length} ${t('selecteds')})`
                : `${t('voteToolTitle')} (${t('noBPSelected')})`}
            </Typography>
            <Typography variant='body1' style={{ display: 'flex' }}>
              {t('voteToolDescription')}
            </Typography>
          </Box>
        </Box>
      </Grid>
      {isDesktop && (
        <Grid item md={1} xs={1}>
          <Box className={classes.boxCloseIcon}>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleOnClose} />
          </Box>
        </Grid>
      )}
      <Grid container justifyContent='center' xs={12} md={5}>
        <Grid
          item
          md={12}
          style={{ padding: mobileMedium ? '15px 0 15px 0' : '0' }}
        >
          <Radar
            height={sizes}
            width={sizes}
            bpData={{
              datasets: selected.map(({ data }) => ({
                ...data,
                backgroundColor: data.backgroundColor.replace('.9', '.2')
              }))
            }}
          />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          style={{
            textAlign: 'center',
            height: isProxy ? '90px' : ''
          }}
        >
          <Box className={classes.centerBox}>
            {isProxy && selected.length > 0 && (
              <Grid container>
                <Grid item md={12} xs={12}>
                  <Typography style={{ fontSize: '20px', fontWeight: 500 }}>
                    {selected[0].name}
                  </Typography>
                </Grid>
                <Grid style={{ margin: '10px 0 10px 0' }} item md={12} xs={12}>
                  <Button
                    disabled={!userInfo.isUser}
                    aria-label='Add to comparison'
                    className={classes.btnRateProxies}
                    variant='contained'
                    onClick={onHandleVote}
                  >
                    {t('voteToolToggle')}
                  </Button>
                </Grid>
              </Grid>
            )}
            {!isProxy && (
              <FormControlLabel
                control={
                  <Switch
                    checked={isCollapsedView}
                    onChange={(event) =>
                      setIsCollapsedView(event.target.checked)
                    }
                    value='isCollapsedView'
                  />
                }
                label={t('compareToolCollapsedSwitch')}
              />
            )}
          </Box>
        </Grid>
        {!isDesktop && (
          <Grid
            item
            xs={12}
            md={7}
            style={{
              height: mobileMedium ? '225px' : '105px'
            }}
          >
            {selected.length > 0 ? (
              <CompareBodyList
                isProxy={isProxy}
                selectedData={selected}
                classes={classes}
                removeBP={removeBP}
              />
            ) : (
              <Box
                className={classes.centerBox}
                style={{ padding: '30px 30px 0 20px', textAlign: 'center' }}
              >
                <Typography variant='subtitle2'>{t('noSelectedBP')}</Typography>
              </Box>
            )}
          </Grid>
        )}
        {!isProxy && (
          <Grid md={12} container xs={12} className={classes.buttonsBox}>
            <Grid item md={6} xs={7}>
              <Box className={classes.centerBox}>
                <Button
                  style={{
                    textAlign: 'center',
                    width: '200px'
                  }}
                  aria-label='Clear selection'
                  onClick={handleOnClear}
                >
                  {t('clearSelection')}
                </Button>
              </Box>
            </Grid>
            <Grid item md={6} xs={5}>
              <Box
                className={classes.centerBox}
                style={{
                  width: '50%',
                  justifyContent: 'start',
                  display: 'flex'
                }}
              >
                <Button
                  disabled={!userInfo.isUser}
                  aria-label='Add to comparison'
                  className={classes.btnRate}
                  variant='contained'
                  onClick={onHandleVote}
                >
                  {t('voteToolToggle')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
      {isDesktop && (
        <Grid item xs={12} md={7}>
          {selected.length > 0 ? (
            <CompareBodyList
              isProxy={isProxy}
              selectedData={selected}
              classes={classes}
              removeBP={removeBP}
            />
          ) : (
            <Box className={classes.centerBox} style={{ marginTop: '20%' }}>
              <Typography variant='h6'>
                No block producers have been selected yet. Click on “Add to
                vote” and proceed to vote.
              </Typography>
            </Box>
          )}
        </Grid>
      )}
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
  handleOnClear: PropTypes.func,
  handleOnClose: PropTypes.func,
  onHandleVote: PropTypes.func,
  setIsCollapsedView: PropTypes.func,
  isCollapsedView: PropTypes.bool
}

CompareGraphView.defaultProps = {
  className: '',
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

export default withWidth()(CompareGraphView)
