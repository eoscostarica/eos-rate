import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Message from '../../components/Message'
import { InitGA, LogPageView } from '../../config/google-analitycs-module'

import styles from './styles'

const drawerWidth = 260
const useStyles = makeStyles(theme => styles(theme, drawerWidth))

const Dashboard = ({ children, routes }) => {
  const classes = useStyles()
  const ref = useRef()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollTop, setScrollTop] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleScroll = useCallback(
    e => {
      if (e.target.scrollTop > 127 && !scrollTop) {
        setScrollTop(true)
      }

      if (e.target.scrollTop < 127 && scrollTop) {
        setScrollTop(false)
      }
    },
    [scrollTop]
  )

  useEffect(() => {
    const div = ref.current
    div && div.addEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    InitGA()
    LogPageView()
  }, [])

  return (
    <Box className={classes.root}>
      <Box>
        <Sidebar
          PaperProps={{ style: { width: drawerWidth } }}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          routes={routes}
        />
      </Box>
      <Box className={classes.mainContent}>
        <Header onDrawerToggle={handleDrawerToggle} showMenubar={scrollTop} />
        <Box className={classes.childContent} id='childContent' ref={ref}>
          {children}
          <Footer />
        </Box>
        <Message />
      </Box>
    </Box>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array
}

export default Dashboard
