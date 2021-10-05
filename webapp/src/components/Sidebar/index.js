import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterNavLink, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { makeStyles } from '@mui/styles'
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { useSharedState } from '../../context/state.context'

import styles from './styles'
import eosrateImg from './eosrate256.png'

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

const ListItem = ({ childrens, name, path, icon, isUserLogged }) => {
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
        <ListItemText primary={t(name)} />
      </MuiListItem>
    </Box>
  )
}

ListItem.propTypes = {
  childrens: PropTypes.array,
  name: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.node,
  isUserLogged: PropTypes.bool
}

const Sidebar = ({ routes, ...props }) => {
  const history = useHistory()
  const classes = useStyles()
  const [state] = useSharedState()

  return (
    <Drawer {...props}>
      <Box className={classes.brand}>
        {state.user ? (
          <>
            <AccountIcon className={classes.icon} />
            <Typography className={classes.welcome}>Welcome</Typography>
            <Typography className={classes.userName}>
              {state.user?.accountName || ''}
            </Typography>
          </>
        ) : (
          <img
            alt='eos rate'
            src={eosrateImg}
            onClick={() => history.push('/')}
            width={256}
            height={75}
          />
        )}
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
