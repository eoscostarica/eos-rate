import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Error from '@material-ui/icons/ErrorOutlined'
import Button from '@material-ui/core/Button'
import { Avatar, Chip } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import _get from 'lodash.get'
import Switch from '@material-ui/core/Switch'

import CompareGraphView from './compare-graph-view'
import CompareSliderView from './compare-slider-view'

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.surface.main,
    width: '100%',
    position: 'relative'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 16px)'
    }
  },
  switch: {
    [theme.breakpoints.up('sm')]: {
      float: 'right'
    }
  },
  btnRate: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: 5,
    [theme.breakpoints.up('sm')]: {
      float: 'right',
      marginRight: 20,
      color: '#ffffff',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark
      }
    }
  },
  chipMessage: {
    [theme.breakpoints.up('sm')]: {
      float: 'right',
      marginTop: 5,
      marginRight: 5
    }
  },
  errorColor: {
    backgroundColor: 'red'
  },
  errorChip: {
    border: '1px solid red'
  },
  labelErrorColor: {
    color: 'red'
  }
})

const CompareTool = ({
  classes,
  removeBP,
  list,
  selected,
  className,
  isProxy,
  useOnlySliderView,
  optionalLabel,
  onHandleVote,
  userInfo,
  message
}) => {
  const { t } = useTranslation('translations')
  const [isCollapsedView, setIsCollapsedView] = useState(true)
  const selectedData = selected.map(name =>
    list.find(({ owner }) => name === owner)
  )
  const { proxy, producers } = _get(userInfo, 'voter_info', {
    proxy: '',
    producers: []
  })
  const showChip = message.txSuccess || Boolean(message.txError)

  if (useOnlySliderView) {
    const data =
      isProxy && selectedData.length
        ? _get(selectedData[0], 'voter_info.producers', [])
        : selectedData

    return (
      <div className={[classes.root, className].join(' ')}>
        <CompareSliderView
          removeBP={removeBP}
          selected={data}
          isProxy={isProxy}
          optionalLabel={optionalLabel}
        />
      </div>
    )
  }

  return (
    <div className={[classes.root, className].join(' ')}>
      {isCollapsedView ? (
        <CompareGraphView
          removeBP={removeBP}
          selected={selectedData}
          isProxy={isProxy}
          userInfo={{ proxy, producers, isUser: Boolean(userInfo) }}
        />
      ) : (
        <CompareSliderView removeBP={removeBP} selected={selectedData} />
      )}
      <div className={classes.footer}>
        {!isProxy && (
          <>
            <FormControlLabel
              className={classes.switch}
              control={
                <Switch
                  checked={isCollapsedView}
                  onChange={event => setIsCollapsedView(event.target.checked)}
                  value='isCollapsedView'
                />
              }
              label={t('compareToolCollapsedSwitch')}
            />
            <Button
              disabled={!userInfo}
              aria-label='Add to comparison'
              onClick={onHandleVote}
              className={classes.btnRate}
              size='large'
            >
              Vote for this BPs
            </Button>
            {showChip && (
              <Chip
                className={classNames(classes.chipMessage, {
                  [classes.errorChip]: message.txError
                })}
                avatar={
                  <Avatar>
                    <Error
                      className={classNames({
                        [classes.errorColor]: message.txError
                      })}
                    />
                  </Avatar>
                }
                color='secondary'
                label={
                  <span
                    className={classNames({
                      [classes.labelErrorColor]: message.txError
                    })}
                  >
                    {message.txSuccess ? 'Success!' : message.txError}
                  </span>
                }
                variant='outlined'
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

CompareTool.propTypes = {
  classes: PropTypes.object.isRequired,
  removeBP: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool,
  useOnlySliderView: PropTypes.bool,
  optionalLabel: PropTypes.string,
  onHandleVote: PropTypes.func,
  userInfo: PropTypes.object,
  message: PropTypes.object
}

CompareTool.defaultProps = {
  className: '',
  isProxy: false,
  useOnlySliderView: false,
  onHandleVote: () => {},
  userInfo: null,
  message: { showChipMessage: false, txError: null, txSuccess: false }
}

export default withStyles(styles)(CompareTool)
