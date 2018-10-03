import React from 'react'
import PropTypes from 'prop-types'
import { Redux } from 'redux-render'
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  selectedItem: {
    backgroundColor: theme.palette.secondary.main
  },
  link: {
    textDecoration: 'none'
  }
})

const Menu = ({ onClick, currentPathname, links, classes, t }) => (
  <List>
    {links.map(({ to, label }) => {
      // FIXME: we should try to use mui's way, for some reason
      // it didn't work for me
      const isSelected = currentPathname === to
      const selectedStyle = {
        backgroundColor: '#5cf68a',
        color: 'black'
      }
      return (
        <Link
          key={`link-${to}`}
          to={to}
          className={classes.link}
          onClick={() => onClick && onClick()}
        >
          <ListItem
            button
            ContainerProps={{
              onClick: () => onClick && onClick()
            }}
            selected={isSelected}
            style={isSelected ? selectedStyle : {}}
          >
            <ListItemText primary={label} />
          </ListItem>
        </Link>
      )
    })}
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
  <Redux
    selector={({ location: { pathname: currentPathname } }) => ({
      currentPathname
    })}
  >
    {({ currentPathname }) => (
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
            <Menu
              onClick={() => onClose()}
              currentPathname={currentPathname}
              links={[
                { to: '/', label: t('drawerLinkHome') },
                { to: '/block-producers', label: t('drawerLinkAllBPs') },
                { to: '/settings', label: t('drawerLinkSettings') }
              ]}
              classes={classes}
              t={t}
            />
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
            <Menu
              currentPathname={currentPathname}
              links={[
                { to: '/', label: t('drawerLinkHome') },
                { to: '/block-producers', label: t('drawerLinkAllBPs') },
                { to: '/settings', label: t('drawerLinkSettings') }
              ]}
              classes={classes}
              t={t}
            />
          </Drawer>
        )}
      </React.Fragment>
    )}
  </Redux>
)

Menu.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
  links: PropTypes.array,
  onClick: PropTypes.func,
  currentPathname: PropTypes.string
}

MainDrawer.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
  theme: PropTypes.object,
  variant: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
}

export default withStyles(styles, { withTheme: true })(
  translate('translations')(MainDrawer)
)
