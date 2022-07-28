import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
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
    <div className={classes.root}>
      <div>
        <Sidebar
          PaperProps={{ style: { width: drawerWidth } }}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          routes={routes}
        />
      </div>
      <div className={classes.mainContent}>
        <Header onDrawerToggle={handleDrawerToggle} showMenubar={scrollTop} />
        <div className={classes.childContent} id='childContent' ref={ref}>
          {children}
          <Footer />
        </div>
        <Message />
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array
}

export default Dashboard
