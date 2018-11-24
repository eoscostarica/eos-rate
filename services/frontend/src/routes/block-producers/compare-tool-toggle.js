import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Redux } from 'redux-render'
import { withNamespaces } from 'react-i18next'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const style = theme => ({
  nested: {
    // paddingLeft: theme.spacing.unit * 2,
    color: 'white'
  },
  listItem: {
    display: 'block'
  }
})

const CompareToolToggle = ({ classes, t, ...props }) => (
  <Redux
    selector={state => ({
      compareTool: state.blockProducers.compareTool,
      selectedCount: state.blockProducers.selected.length
    })}
  >
    {({ compareTool, selectedCount }, dispatch) => (
      <List className={classes.nested}>
        <ListItem
          className={classes.listItem}
          button
          onClick={() => dispatch.blockProducers.toggleCompareTool()}
        >
          <ListItemText
            primary={`${t('compareToolToggle')}(${selectedCount})`}
          />
          <ListItemSecondaryAction>
            {compareTool ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    )}
  </Redux>
)

CompareToolToggle.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(style)(
  withNamespaces('translations')(CompareToolToggle)
)
