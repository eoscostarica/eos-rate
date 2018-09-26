import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from '@reach/router'
import { translate } from 'react-i18next'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  link: {
    textDecoration: 'none'
  }
})

const Menu = ({ classes, t }) => (
  <List>
    <Link to='/' className={classes.link}>
      <ListItem button>
        <ListItemText primary={t('drawerLinkHome')} />
      </ListItem>
    </Link>
    <Link to='/block-producers' className={classes.link}>
      <ListItem button>
        <ListItemText primary={t('drawerLinkAllBPs')} />
      </ListItem>
    </Link>
    <Link to='/settings' className={classes.link}>
      <ListItem button>
        <ListItemText primary={t('drawerLinkSettings')} />
      </ListItem>
    </Link>
  </List>
)

const MainDrawer = ({
  classes,
  theme,
  variant = 'desktop',
  onClose,
  open = false,
  t,
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
        <Menu classes={classes} t={t} />
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
        <Menu classes={classes} t={t} />
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

export default withStyles(styles, { withTheme: true })(
  translate('translations')(MainDrawer)
)
