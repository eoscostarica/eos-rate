import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    background: theme.palette.primary.dark,
    width: '100%',
    height: '200px'
  },
  title: {
    color: 'white'
  }
})

const CompareTool = ({ classes, ...props }) => (
  <div className={classes.root}>
    <Typography className={classes.title} variant='title'>
      Compare Tool
    </Typography>
  </div>
)

CompareTool.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompareTool)
