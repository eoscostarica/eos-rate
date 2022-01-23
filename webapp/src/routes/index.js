// eslint-disable-next-line no-unused-vars
import React, { lazy } from 'react'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AppsIcon from '@mui/icons-material/Apps'
import PersonIcon from '@mui/icons-material/Person'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import CallMergeIcon from '@mui/icons-material/CallMerge'

import { mainConfig } from '../config'

const Home = lazy(() => import('./Home'))
const BlockProducers = lazy(() => import('./BlockProducers'))
const BlockProducerProfile = lazy(() =>
  import('./BlockProducers/BlockProducerProfile')
)
const BlockProducerRate = lazy(() =>
  import('./BlockProducers/BlockProducerRate')
)
const Proxies = lazy(() => import('./Proxies'))
const ProxyProfile = lazy(() => import('./Proxies/ProxyProfile'))
const About = lazy(() => import('./About'))
const Help = lazy(() => import('./Help'))
const Page404 = lazy(() => import('./Route404'))
const TermsOfUse = lazy(() => import('./TermsOfUse'))
const Account = lazy(() => import('./Account'))

const routes = [
  {
    name: 'home',
    icon: <HomeOutlinedIcon />,
    component: Home,
    path: '/',
    exact: true
  },
  {
    name: 'myAccount',
    icon: <PersonIcon />,
    path: '/account',
    component: Account,
    exact: true
  },
  {
    name: 'blockProducers',
    icon: <AppsIcon />,
    component: BlockProducers,
    path: '/block-producers',
    exact: true
  },
  {
    path: '/block-producers/:account',
    component: BlockProducerProfile,
    exact: true
  },
  {
    path: '/block-producers/:account/rate',
    component: BlockProducerRate,
    exact: true
  },
  {
    path: '/proxies',
    icon: <GroupsOutlinedIcon />,
    component: Proxies,
    name: 'proxies',
    exact: true
  },
  {
    path: '/proxies/:account',
    component: ProxyProfile,
    exact: true
  },
  {
    path: mainConfig.networkMonitor,
    icon: <TrendingUpIcon />,
    name: 'networkMonitor',
    target: '_blank'
  },
  {
    name: 'about',
    icon: <InfoOutlinedIcon />,
    component: About,
    path: '/about',
    exact: true
  },
  {
    path: '/ricardian-contract',
    component: TermsOfUse,
    icon: <DescriptionOutlinedIcon />,
    name: 'ricardianContract',
    exact: true
  },
  {
    name: 'help',
    icon: <HelpOutlineOutlinedIcon />,
    component: Help,
    path: '/help',
    exact: true
  },
  {
    name: 'version',
    badge: mainConfig.appVersion,
    path: 'https://github.com/eoscostarica/eos-rate/releases',
    icon: <CallMergeIcon />,
    target: '_blank'
  },
  {
    component: Page404
  }
]

export default () => ({
  sidebar: routes.filter(route => !!route.name),
  browser: routes.filter(route => !!route.component)
})
