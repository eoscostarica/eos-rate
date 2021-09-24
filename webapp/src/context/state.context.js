import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import getBpDataModeled from '../utils/modeled-bp-data'
import getProxyDataModeled from '../utils/modeled-proxy-data'

import { getProxies } from './models'

const SharedStateContext = React.createContext()

const initialValue = {
  useDarkMode: false,
  user: null,
  blockProducers: [],
  selectedProducers: [],
  blockProducer: null,
  compareBPToolVisible: false,
  sortBlockProducersBy: null,
  proxies: [],
  proxy: null
}

const sharedStateReducer = (state, action) => {
  switch (action.type) {
    case 'ual':
      return {
        ...state,
        ual: action.ual
      }

    case 'userChange':
      return {
        ...state,
        user: action.user
      }

    case 'set': {
      return {
        ...state,
        ...action.payload
      }
    }

    case 'showMessage':
      return {
        ...state,
        message: action.payload
      }

    case 'hideMessage':
      return {
        ...state,
        message: null
      }

    case 'login':
      state.ual.showModal()

      return state

    case 'logout':
      state.ual.logout()

      return state

    case 'setProducers':
      return {
        ...state,
        blockProducers: action.blockProducers
      }

    case 'setProducer':
      return {
        ...state,
        blockProducer: action.blockProducer
      }

    case 'setSortProducersBy':
      return {
        ...state,
        sortBlockProducersBy: action.sortBy
      }

    case 'setCompareBPTool':
      return {
        ...state,
        compareBPToolVisible: action.isVisible
      }

    case 'setSelectedProducers':
      return {
        ...state,
        selectedProducers: action.selectedProducers
      }

    case 'setProxies':
      return {
        ...state,
        proxies: action.proxies
      }

    case 'setProxy':
      return {
        ...state,
        proxy: action.proxy
      }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

export const SharedStateProvider = ({ children, ual, ...props }) => {
  const [state, dispatch] = React.useReducer(sharedStateReducer, {
    ...initialValue,
    ual
  })
  const value = React.useMemo(() => [state, dispatch], [state])

  useEffect(() => {
    const load = async () => {
      // ual.activeUser && (await getUserDataModeled(ual))
      dispatch({ type: 'userChange', user: ual.activeUser })
      dispatch({ type: 'ual', ual })
    }

    load()
  }, [ual?.activeUser])

  return (
    <SharedStateContext.Provider value={value} {...props}>
      {children}
    </SharedStateContext.Provider>
  )
}

SharedStateProvider.propTypes = {
  children: PropTypes.node,
  ual: PropTypes.any
}

export const useSharedState = () => {
  const context = React.useContext(SharedStateContext)

  if (!context) {
    throw new Error(`useSharedState must be used within a SharedStateContext`)
  }

  const [state, dispatch] = context
  const setState = payload => dispatch({ type: 'set', payload })
  const showMessage = payload => dispatch({ type: 'showMessage', payload })
  const hideMessage = () => dispatch({ type: 'hideMessage' })
  const login = () => dispatch({ type: 'login' })
  const logout = () => dispatch({ type: 'logout' })
  const setSortBy = (sortBy, page) => {
    if (page === 'blockProducers') {
      dispatch({ type: 'setSortProducersBy', sortBy })
    } else {
      // dispatch({ type: 'setSortProducersBy', sortBy })
    }
  }

  // Block Producers Action
  const setProducers = producers => {
    const blockProducers = producers.map(getBpDataModeled)

    dispatch({ type: 'setProducers', blockProducers })
  }
  const setProducer = (producer, isDataModeled = true) => {
    let blockProducer = producer

    if (!isDataModeled) {
      blockProducer = getBpDataModeled(producer)
    }

    dispatch({ type: 'setProducer', blockProducer })
  }
  const setCompareBPTool = isVisible => {
    console.log({ isVisible })
    dispatch({ type: 'setCompareBPTool', isVisible })
  }

  const setSelectedProducers = selectedProducers =>
    dispatch({ type: 'setSelectedProducers', selectedProducers })

  // Proxies Actions
  const setProxies = async () => {
    const proxies = await getProxies()

    dispatch({ type: 'setProxies', proxies })
  }
  const setProxy = (data, isDataModeled = true) => {
    let proxy = data

    if (!isDataModeled) {
      proxy = getProxyDataModeled(proxy)
    }

    dispatch({ type: 'setProxy', proxy })
  }

  return [
    state,
    {
      setState,
      showMessage,
      hideMessage,
      login,
      logout,
      setProducers,
      setProducer,
      setCompareBPTool,
      setSelectedProducers,
      setSortBy,
      setProxies,
      setProxy
    }
  ]
}
