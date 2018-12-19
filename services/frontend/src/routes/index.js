import Home from './home'
import Account from './account'
import BlockProducerProfile from './block-producers/block-producer-profile'
import BlockProducerRate from './block-producers/block-producer-rate'
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
    path: 'block-producers/:account',
    Component: BlockProducerProfile
  },
  {
    path: 'block-producers/:account/rate',
    Component: BlockProducerRate
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
