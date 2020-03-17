import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
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
    position: 'absolute',
    bottom: 0,
    width: 'calc(100% - 16px)'
  },
  switch: {
    float: 'right'
  }
})

const CompareTool = ({
  classes,
  removeBP,
  list,
  selected,
  className,
  isProxy,
  useOnlySliderView
}) => {
  const { t } = useTranslation('translations')
  const [isCollapsedView, setIsCollapsedView] = useState(true)
  const selectedData = selected.map(name =>
    list.find(({ owner }) => name === owner)
  )

  if (useOnlySliderView) {
    const data = isProxy && selectedData.length ? _get(selectedData[0], 'voter_info.producers', []) : selectedData

    return (
      <div className={[classes.root, className].join(' ')}>
        <CompareSliderView removeBP={removeBP} selected={data} isProxy={isProxy} />
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
        />
      ) : (
        <CompareSliderView removeBP={removeBP} selected={selectedData} />
      )}
      <div className={classes.footer}>
        {!isProxy && (
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
  useOnlySliderView: PropTypes.bool
}

CompareTool.defaultProps = {
  className: '',
  isProxy: false,
  useOnlySliderView: false
}

export default withStyles(styles)(CompareTool)
