import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Error from '@material-ui/icons/ErrorOutlined'
import Button from '@material-ui/core/Button'
import { Avatar, Chip } from '@material-ui/core'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import _get from 'lodash.get'
// import Switch from '@material-ui/core/Switch'

import CompareGraphView from './compare-graph-view'
import CompareSliderView from './compare-slider-view'
import styles from './styles'

const useStyles = makeStyles(styles)

const CompareTool = ({
  removeBP,
  list,
  selected,
  className,
  isProxy,
  useOnlySliderView,
  optionalLabel,
  onHandleVote,
  userInfo,
  message,
  onHandleClose
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [isCollapsedView /* , setIsCollapsedView */] = useState(true)
  const selectedData = selected.map((name) =>
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
            {/* <FormControlLabel
              className={classes.switch}
              control={
                <Switch
                  checked={isCollapsedView}
                  onChange={(event) => setIsCollapsedView(event.target.checked)}
                  value='isCollapsedView'
                />
              }
              label={t('compareToolCollapsedSwitch')}
            /> */}

            <Button
              onClick={onHandleClose}
              aria-label='Clear selection'
              size='large'
            >
              {t('clearSelection')}
            </Button>
            <Button
              disabled={!userInfo}
              aria-label='Add to comparison'
              onClick={onHandleVote}
              className={classes.btnRate}
              variant='contained'
              size='large'
            >
              {t('btnVoteBPs')}
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
  removeBP: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  className: PropTypes.string,
  isProxy: PropTypes.bool,
  useOnlySliderView: PropTypes.bool,
  optionalLabel: PropTypes.string,
  onHandleVote: PropTypes.func,
  userInfo: PropTypes.object,
  message: PropTypes.object,
  onHandleClose: PropTypes.func
}

CompareTool.defaultProps = {
  className: '',
  isProxy: false,
  useOnlySliderView: false,
  onHandleVote: () => {},
  userInfo: null,
  message: { showChipMessage: false, txError: null, txSuccess: false },
  onHandleClose: () => {}
}

export default CompareTool
