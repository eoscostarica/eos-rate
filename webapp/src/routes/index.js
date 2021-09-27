// eslint-disable-next-line no-unused-vars
import React, { lazy } from 'react'
import {
  Activity as ActivityIcon,
  Grid as GridIcon,
  Home as HomeIcon,
  Server as ServerIcon,
  FileText as FileTextIcon,
  User as UserIcon,
  Info as InfoIcon,
  HelpCircle as HelpIcon,
  GitMerge as GitMergeIcon
} from 'react-feather'

import { mainConfig } from '../config'

const filters = [
  { value: 'alphabetical' },
  { value: 'generalRate' },
  { value: 'edenRate' },
  { value: 'infrastructure' },
  { value: 'community' },
  { value: 'trustiness' },
  { value: 'development' },
  { value: 'transparency' },
  { value: 'vote' },
  { value: 'ratings' }
]
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
    icon: <HomeIcon />,
    component: Home,
    path: '/',
    exact: true
  },
  {
    name: 'myAccount',
    icon: <UserIcon />,
    path: '/account',
    component: Account,
    exact: true
  },
  {
    name: 'blockProducers',
    icon: <GridIcon />,
    component: BlockProducers,
    path: '/block-producers',
    childrens: filters,
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
    icon: <ServerIcon />,
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
    icon: <ActivityIcon />,
    name: 'networkMonitor',
    target: '_blank'
  },
  {
    name: 'about',
    icon: <InfoIcon />,
    component: About,
    path: '/about',
    exact: true
  },
  {
    path: '/ricardian-contract',
    component: TermsOfUse,
    icon: <FileTextIcon />,
    name: 'ricardianContract',
    exact: true
  },
  {
    name: 'help',
    icon: <HelpIcon />,
    component: Help,
    path: '/help',
    exact: true
  },
  {
    name: 'version',
    badge: mainConfig.appVersion,
    path: 'https://github.com/eoscostarica/full-stack-boilerplate/tags',
    icon: <GitMergeIcon />,
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
