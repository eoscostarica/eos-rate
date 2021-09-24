import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import _get from 'lodash.get'
import Switch from '@material-ui/core/Switch'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import clsx from 'clsx'

import CompareGraphView from './CompareGraphView'
import CompareSliderView from './CompareSliderView'
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
  handleOnClear,
  setMessage,
  handleOnClose
}) => {
  console.log({ list, selected })
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [isCollapsedView, setIsCollapsedView] = useState(true)
  const selectedData = selected.map(name =>
    list.find(({ owner }) => name === owner)
  )
  const { proxy, producers } = _get(userInfo, 'voter_info', {
    proxy: '',
    producers: []
  })

  const Alert = props => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setMessage()
  }

  if (useOnlySliderView) {
    const data =
      isProxy && selectedData.length
        ? _get(selectedData[0], 'voter_info.producers', [])
        : selectedData

    return (
      <Box className={[classes.root, className].join(' ')}>
        <CompareSliderView
          removeBP={removeBP}
          selected={data}
          isProxy={isProxy}
          optionalLabel={optionalLabel}
        />
      </Box>
    )
  }

  return (
    <Box
      className={clsx([classes.root, className].join(' '), classes.reliefGrid)}
    >
      {isCollapsedView ? (
        <CompareGraphView
          removeBP={removeBP}
          selected={selectedData}
          isProxy={isProxy}
          userInfo={{ proxy, producers, isUser: Boolean(userInfo) }}
          handleOnClear={handleOnClear}
          handleOnClose={handleOnClose}
          onHandleVote={onHandleVote}
          isCollapsedView={isCollapsedView}
          setIsCollapsedView={setIsCollapsedView}
        />
      ) : (
        <CompareSliderView removeBP={removeBP} selected={selectedData} />
      )}
      <Box className={classes.footer}>
        {!isCollapsedView && (
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
              onClick={handleOnClear}
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
              {t('voteToolToggle')}
            </Button>
          </>
        )}
      </Box>
      <Snackbar
        open={message.txError}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error'>
          {message.txError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={message.txSuccess}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success'>
          {t('success')}
        </Alert>
      </Snackbar>
    </Box>
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
  handleOnClear: PropTypes.func,
  setMessage: PropTypes.func,
  handleOnClose: PropTypes.func
}

CompareTool.defaultProps = {
  className: '',
  isProxy: false,
  useOnlySliderView: false,
  onHandleVote: () => {},
  userInfo: null,
  message: { showChipMessage: false, txError: null, txSuccess: false },
  handleOnClear: () => {},
  handleOnClose: () => {}
}

export default CompareTool
