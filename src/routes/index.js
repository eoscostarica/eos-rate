import Home from './home'
import Account from './account'
import AllBps, { blockProducersDrawer } from './block-producers'
import Settings from './settings'

export default [
  {
    path: '/',
    Component: Home,
    drawerLabel: 'drawerLinkHome'
  },
  {
    path: '/block-producers',
    Component: AllBps,
    drawerLabel: 'drawerLinkAllBPs',
    drawerComponents: blockProducersDrawer
  },
  {
    path: '/settings',
    Component: Settings,
    drawerLabel: 'drawerLinkSettings'
  },
  {
    path: '/account',
    Component: Account
  }
]
