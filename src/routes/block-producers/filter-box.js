import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Switch from '@material-ui/core/Switch'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 2,
    color: 'white'
  }
})

const FilterBox = ({ classes, ...props }) => (
  <List
    className={classes.nested}
    subheader={<ListSubheader>Main Strengths</ListSubheader>}
  >
    <ListItem>
      <ListItemText primary='Tooling' />
      <ListItemSecondaryAction>
        <Switch />
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary='Transparency' />
      <ListItemSecondaryAction>
        <Switch />
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary='TestNets' />
      <ListItemSecondaryAction>
        <Switch />
      </ListItemSecondaryAction>
    </ListItem>
  </List>
)

FilterBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FilterBox)
