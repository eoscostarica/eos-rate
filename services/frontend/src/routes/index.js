import Home from './home'
import Account from './account'
import BlockProducerProfile from './block-producers/block-producer-profile'
import BlockProducerRate from './block-producers/block-producer-rate'
import AllBps, { blockProducersDrawer } from './block-producers'
import AllProxies, { proxiesDrawer } from './proxies'
import ProxyProfile from './proxies/proxy-profile'

// import Settings from './settings'

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
    path: '/proxies',
    Component: AllProxies,
    drawerLabel: 'drawerLinkAllProxies',
    drawerComponents: proxiesDrawer
  },
  {
    path: 'proxies/:account',
    Component: ProxyProfile
  },
  {
    path: '/account',
    Component: Account
    // drawerLabel: 'drawerLinkAccount'
  }
]
