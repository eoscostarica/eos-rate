import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterNavLink, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { makeStyles } from '@mui/styles'
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { useSharedState } from '../../context/state.context'

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

const ListItem = ({
  childrens,
  name,
  path,
  icon,
  badge,
  handleOnClick,
  openMenu,
  isUserLogged,
  handleSortBy,
  ...props
}) => {
  const classes = useStyles()
  const { t: tSort } = useTranslation('sortInput')
  const { t } = useTranslation('translations')

  const sortBy = 'generalRate' // get this value form context

  if (name === 'myAccount' && !isUserLogged) return <></>

  console.log({ props })

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
        onClick={() => handleOnClick(name)}
        {...props}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={t(name)} />
        {badge && <Chip className={classes.badge} label={badge} />}
      </MuiListItem>
      {childrens && (
        <Collapse
          in={openMenu}
          timeout='auto'
          unmountOnExit
          className={classes.subMenuWrapper}
        >
          {childrens.map(({ value }, index) => (
            <MuiListItem
              button
              key={`${value}-collapsed-item-${index}`}
              selected={value === sortBy}
              className={classes.subMenu}
              onClick={() => handleSortBy(value, name)} // setSortBy(value)}
            >
              <ListItemText primary={tSort(value)} />
            </MuiListItem>
          ))}
        </Collapse>
      )}
    </Box>
  )
}

ListItem.propTypes = {
  header: PropTypes.string,
  childrens: PropTypes.array,
  name: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.string,
  handleOnClick: PropTypes.func,
  openMenu: PropTypes.bool,
  isUserLogged: PropTypes.bool,
  handleSortBy: PropTypes.func
}

const Sidebar = ({ routes, ...props }) => {
  const history = useHistory()
  const classes = useStyles()
  const [state, { setSortBy }] = useSharedState()
  const [openMenu, setOpenMenu] = useState(false)

  const handleOnClick = name => {
    setOpenMenu(name === 'blockProducers')
  }

  useEffect(() => {
    setOpenMenu(history.location.pathname === '/block-producers')
  }, [])

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
            src='https://eosrate.io/images/eosrate-256.png'
            onClick={() => history.push('/')}
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
              header={route.header}
              path={route.path}
              icon={route.icon}
              badge={route.badge}
              childrens={route.childrens}
              handleOnClick={handleOnClick}
              openMenu={openMenu}
              isUserLogged={!!state.user}
              handleSortBy={setSortBy}
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
