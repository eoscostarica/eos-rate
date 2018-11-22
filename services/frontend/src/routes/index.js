import Home from './home'
import Account from './account'
import ProfilePage from './block-producers/block-producer-profile'
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
  },
  {
    path: 'block-producer-profile/:account',
    Component: ProfilePage
  }
]
