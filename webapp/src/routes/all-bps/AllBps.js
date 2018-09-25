import React from 'react'
import { Redux } from 'redux-render'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { translate } from 'react-i18next'
// import BPCard from 'components/bp-card/bp-card'

const style = theme => ({
  root: {},

  sidebar: {
    height: '100vh'
  },
  sidebarInner: {
    width: '100%'
  }
})

const AllBps = ({ classes, t, ...props }) => (
  <Redux
    selector={state => ({
      bps: state.bps
    })}
  >
    {(state, dispatch) => (
      <React.Fragment>
        <Typography>Main!!!</Typography>
      </React.Fragment>
    )}
  </Redux>
)

AllBps.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(style)(translate('translations')(AllBps))
