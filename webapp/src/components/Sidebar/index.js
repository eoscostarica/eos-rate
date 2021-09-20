import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterNavLink, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/styles'
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon
} from 'react-feather'
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { mainConfig } from '../../config'

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

const ListItemLink = ({ name, path, icon, badge, ...props }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const primaryText = path.includes('http')
    ? t(name, name)
    : t(`${path}>sidebar`, path)

  return (
    <MuiListItem
      button
      component={path.includes('http') ? ExternalLink : NavLink}
      exact
      to={path}
      activeClassName='active'
      href={path}
      {...props}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primaryText} />
      {badge && <Chip className={classes.badge} label={badge} />}
    </MuiListItem>
  )
}

ListItemLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.string
}

const ListItemGroup = ({ name, icon, path, childrens, ...props }) => {
  const [open, setOpen] = useState(true)
  const { t } = useTranslation('translations')

  return (
    <>
      <MuiListItem button onClick={() => setOpen(() => !open)} {...props}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={t(name)} />
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </MuiListItem>
      {childrens && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          {childrens.map((route, index) => (
            <ListItem
              header={route.header}
              path={route.path}
              icon={route.icon}
              text={route.text}
              key={`${route.name}${index}`}
            />
          ))}
        </Collapse>
      )}
    </>
  )
}

ListItemGroup.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.node,
  childrens: PropTypes.array
}

const ListItem = ({ header, childrens, ...props }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.listItem}>
      {header && <Typography>{t(header)}</Typography>}
      {childrens && <ListItemGroup childrens={childrens} {...props} />}
      {!childrens && <ListItemLink {...props} />}
    </Box>
  )
}

ListItem.propTypes = {
  header: PropTypes.string,
  childrens: PropTypes.array
}

const Sidebar = ({ routes, ...props }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <Drawer {...props}>
      <Box className={classes.brand}>
        <img
          alt={mainConfig.title}
          src={mainConfig.logo}
          onClick={() => history.push('/')}
        />
      </Box>
      <Divider />
      <Scrollbar className={classes.scrollbar}>
        <List component='nav'>
          {routes.map((category, index) => (
            <ListItem
              key={`${category.name}${index}`}
              name={category.name}
              header={category.header}
              path={category.path}
              icon={category.icon}
              badge={category.badge}
              childrens={category.childrens}
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
