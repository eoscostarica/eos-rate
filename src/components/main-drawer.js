import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  }
})

const list = (
  <List>
    <ListItem button>
      <ListItemText primary='Inbox' />
    </ListItem>
    <ListItem button>
      <ListItemText primary='Starred' />
    </ListItem>
    <ListItem button>
      <ListItemText primary='Send mail' />
    </ListItem>
    <ListItem button>
      <ListItemText primary='Drafts' />
    </ListItem>
  </List>
)

const MainDrawer = ({
  classes,
  theme,
  variant = 'desktop',
  onClose,
  open = false,
  ...props
}) => (
  <React.Fragment>
    <div className={classes.toolbar} />
    {variant === 'mobile' && (
      <Drawer
        variant='temporary'
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {list}
      </Drawer>
    )}
    {variant === 'desktop' && (
      <Drawer
        variant='permanent'
        open
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {list}
      </Drawer>
    )}
  </React.Fragment>
)

MainDrawer.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  variant: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
}

export default withStyles(styles, { withTheme: true })(MainDrawer)
