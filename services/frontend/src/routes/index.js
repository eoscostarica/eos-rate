import Home from './home'
import Account from './account'
import BlockProducerProfile from './block-producers/block-producer-profile'
import BlockProducerRate from './block-producers/block-producer-rate'
import AllBps, { blockProducersDrawer } from './block-producers'
import AllProxies, { proxiesDrawer } from './proxies'
import ProxyProfile from './proxies/proxy-profile'
import Help from './help'
import TermsOfUse from './termsOfUse'
import About from './about'
import config from '../config'

console.log('config.networkMonitor: ', config)

export default [
  {
    path: '/',
    Component: Home,
    drawerLabel: 'drawerLinkHome',
    target: '_self'
  },
  {
    path: '/block-producers',
    Component: AllBps,
    drawerLabel: 'drawerLinkAllBPs',
    drawerComponents: blockProducersDrawer,
    target: '_self'
  },
  {
    path: 'block-producers/:account',
    Component: BlockProducerProfile,
    target: '_self'
  },
  {
    path: 'block-producers/:account/rate',
    Component: BlockProducerRate,
    target: '_self'
  },
  {
    path: '/proxies',
    Component: AllProxies,
    drawerLabel: 'drawerLinkAllProxies',
    drawerComponents: proxiesDrawer,
    target: '_self'
  },
  {
    path: 'proxies/:account',
    Component: ProxyProfile,
    target: '_self'
  },
  {
    path: '/account',
    Component: Account,
    target: '_self'
  },
  {
    path: config.networkMonitor,
    drawerLabel: 'drawerLinkNetworkMonitor',
    target: '_blank'
  },
  {
    path: '/about',
    Component: About,
    drawerLabel: 'drawerLinkAbout',
    target: '_self'
  },
  {
    path: '/ricardian-contract',
    Component: TermsOfUse,
    drawerLabel: 'drawerLinkRicardianContract',
    target: '_self'
  },
  {
    path: '/help',
    Component: Help,
    drawerLabel: 'drawerLinkHelp',
    target: '_self'
  }
]
