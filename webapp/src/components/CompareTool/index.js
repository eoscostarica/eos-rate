import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import _get from 'lodash.get'
import Switch from '@mui/material/Switch'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import clsx from 'clsx'

import CompareGraphView from './CompareGraphView'
import CompareSliderView from './CompareSliderView'
import styles from './styles'

const useStyles = makeStyles(styles)

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

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

  const handleClose = (e, reason) => {
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
          userInfo={{ proxy, producers, isUser: !!userInfo }}
          handleOnClear={handleOnClear}
          handleOnClose={handleOnClose}
          onHandleVote={onHandleVote}
          isCollapsedView={isCollapsedView}
          setIsCollapsedView={setIsCollapsedView}
        />
      ) : (
        <CompareSliderView
          removeBP={removeBP}
          selected={selectedData}
          handleOnClose={handleOnClose}
        />
      )}
      {!isCollapsedView && (
        <Box className={classes.footer}>
          <FormControlLabel
            className={classes.switch}
            control={
              <Switch
                checked={isCollapsedView}
                onChange={event => setIsCollapsedView(event.target.checked)}
                value='isCollapsedView'
                color='primary'
              />
            }
            label={t('compareToolCollapsedSwitch')}
          />
          <Box className={classes.btnBox}>
            <Button
              onClick={handleOnClear}
              className={classes.btnClear}
              aria-label='Clear selection'
            >
              {t('clearSelection')}
            </Button>
            <Button
              disabled={!userInfo}
              aria-label='Add to comparison'
              onClick={onHandleVote}
              className={classes.btnRate}
              variant='contained'
              color='secondary'
            >
              {t('voteToolToggle')}
            </Button>
          </Box>
        </Box>
      )}
      <Snackbar
        open={message.txError}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error' className={classes.alert}>
          {message.txError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={message.txSuccess}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='success'
          className={classes.alert}
        >
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
