import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { makeStyles } from '@mui/styles'
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { useSharedState } from '../../context/state.context'
import LogIcon from '../../components/icon/logIcon'

import styles from './styles'

const useStyles = makeStyles(styles)

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

NavLink.displayName = 'NavLink'

const ExternalLink = React.forwardRef(({ to, children, className }, ref) => (
  <a
    ref={ref}
    href={to}
    className={className}
    target='_blank'
    rel='noopener noreferrer'
  >
    {children}
  </a>
))

ExternalLink.displayName = 'NavLink'

ExternalLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
}

const ListItem = ({ childrens, name, path, icon, isUserLogged, badge }) => {
  const classes = useStyles()
  const { t } = useTranslation('translations')

  if (name === 'myAccount' && !isUserLogged) return <></>

  return (
    <Box className={classes.listItem}>
      <MuiListItem
        button
        component={path.includes('http') ? ExternalLink : NavLink}
        exact
        to={path}
        activeClassName='active'
        className={classes.linkSidebar}
        href={path}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          className={{ [classes.versionStyle]: badge }}
          primary={t(name)}
        />
        {badge && (
          <ListItemText className={classes.versionStyle} primary={badge} />
        )}
      </MuiListItem>
    </Box>
  )
}

ListItem.propTypes = {
  childrens: PropTypes.array,
  name: PropTypes.string,
  path: PropTypes.string,
  badge: PropTypes.string,
  icon: PropTypes.node,
  isUserLogged: PropTypes.bool
}

const Sidebar = ({ routes, ...props }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [state] = useSharedState()

  return (
    <Drawer {...props}>
      <Box className={classes.brand}>
        {state.user ? (
          <AccountIcon className={classes.icon} />
        ) : (
          <Avatar className={classes.icon}>
            <LogIcon />
          </Avatar>
        )}
        <Typography className={classes.welcome}>{t('welcome')}</Typography>
        <Typography className={classes.userName}>
          {state.user?.accountName || t('loginToStart')}
        </Typography>
      </Box>
      <Divider />
      <Scrollbar className={classes.scrollbar}>
        <List component='nav' className={classes.navBox}>
          {routes.map((route, index) => (
            <ListItem
              key={`${route.name}${index}`}
              name={route.name}
              path={route.path}
              icon={route.icon}
              badge={route.badge}
              isUserLogged={!!state.user}
            />
          ))}
        </List>
      </Scrollbar>
    </Drawer>
  )
}

Sidebar.propTypes = {
  routes: PropTypes.array
}

export default memo(Sidebar)
