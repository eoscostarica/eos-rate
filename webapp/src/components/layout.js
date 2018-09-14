import React from 'react'
import { Link } from '@reach/router'

import BottomNavBar from './bottom-navbar'

const Layout = ({ isLoggedIn, onLogout, children, t }) => (
  <div style={{ padding: '8px 16px 50px' }}>
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        marginBottom: 0,
        padding: isLoggedIn ? '16px 0' : '32px 0'
      }}
    >
      <Link
        to='/'
        style={{
          border: '1px solid black',
          color: 'black',
          fontFamily: 'Montserrat,sans-serif',
          fontSize: isLoggedIn ? 16 : 32,
          fontWeight: 'bold',
          marginLeft: isLoggedIn ? 0 : 'auto',
          marginRight: 'auto',
          padding: 10,
          textTransform: 'uppercase',
          textDecoration: 'none'
        }}
      >
        EOS Rate
      </Link>
    </div>
    {children}
    <BottomNavBar />
  </div>
)

export default Layout
