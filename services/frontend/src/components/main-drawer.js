import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from '@reach/router'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'

import routes from 'routes'

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  innerList: {
    backgroundColor: theme.palette.surface.main,
    '& li': {
      paddingLeft: theme.spacing(3),
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#adbcbf'
      }
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  selectedItem: {
    backgroundColor: theme.palette.surface.main
  },
  link: {
    textDecoration: 'none',
    color: '#443f56'
  },
  linkSelected: {
    backgroundColor: '#ced7d8  !important',
    color: '#443f5b'
  },
  sortSelected: {
    backgroundColor: '#adbcbf !important',
    color: '#443f5b'
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

const Menu = ({ onClick, currentPathname, links, sortBy, setSortBy }) => {
  const { t } = useTranslation('sortInput')
  const classes = useStyles()

  return (
    <List>
      {links
        .filter(({ label }) => label)
        .map(({ to, label, collapsedItems }) => {
          // FIXME: we should try to use mui's way, for some reason
          // it didn't work for me
          const isSelected = currentPathname === to

          return (
            <Fragment key={`link-${to}`}>
              {label === 'About' && <Divider className={classes.divider} />}
              <Link
                to={to}
                className={classes.link}
                onClick={() => onClick && onClick(!!collapsedItems)}
              >
                <ListItem
                  button
                  ContainerProps={{
                    onClick: () => onClick && onClick(!!collapsedItems)
                  }}
                  selected={isSelected}
                  className={classnames({ [classes.linkSelected]: isSelected })}
                >
                  <ListItemText primary={label} />
                </ListItem>
              </Link>
              {collapsedItems && !!collapsedItems.length && (
                <Collapse
                  className={classes.innerList}
                  in={isSelected}
                  timeout='auto'
                >
                  {collapsedItems.map(({ value }, index) => (
                    <ListItem
                      key={`${value}-collapsed-item-${index}`}
                      selected={value === sortBy}
                      className={classnames({
                        [classes.sortSelected]: value === sortBy
                      })}
                      onClick={() => setSortBy(value)}
                    >
                      {t(value)}
                    </ListItem>
                  ))}
                </Collapse>
              )}
            </Fragment>
          )
        })}
    </List>
  )
}

const MainDrawer = ({
  variant = 'desktop',
  onClose,
  open = false,
  sortBy,
  setSortBy,
  currentPathname,
  ...props
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <Box className={classes.toolbar} />
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
            onClick={isCollapsible => {
              if (!isCollapsible) {
                onClose()
              }
            }}
            currentPathname={currentPathname}
            links={routes.map(route => ({
              to: route.path,
              label: t(route.drawerLabel),
              collapsedItems: route.drawerComponents
            }))}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Drawer>
      )}
      {variant === 'desktop' && (
        <Drawer
          variant='persistent'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Menu
            currentPathname={currentPathname}
            links={routes.map(route => ({
              to: route.path,
              label: t(route.drawerLabel),
              collapsedItems: route.drawerComponents
            }))}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Drawer>
      )}
    </>
  )
}

Menu.propTypes = {
  links: PropTypes.array,
  onClick: PropTypes.func,
  currentPathname: PropTypes.string,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string
}

MainDrawer.propTypes = {
  currentPathname: PropTypes.string,
  theme: PropTypes.object,
  variant: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func
}

const mapStateToProps = ({
  location: { pathname: currentPathname },
  blockProducers
}) => ({
  currentPathname,
  sortBy: blockProducers.sortBy
})

const mapDispatchToProps = ({ blockProducers }) => ({
  setSortBy: blockProducers.setSortBy
})

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer)
