import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  getProxies,
  getProxy,
  getUserDataModeled,
  getProducers,
  getProducer,
  mutationInsertUserRating,
  getUserRates
} from './models'

const SharedStateContext = React.createContext()

const initialValue = {
  useDarkMode: false,
  user: null,
  loadingLogin: false,
  blockProducers: { data: [], rows: 0 },
  selectedProducers: [],
  blockProducer: null,
  transaction: null,
  compareBPToolVisible: false,
  sortBlockProducersBy: { sort: 'total_votes', value: 'vote' },
  proxies: { data: [], rows: 0 },
  selectedProxies: [],
  proxy: null,
  compareProxyToolVisible: false,
  homeProducers: [],
  loadingSkeleton: false
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

    case 'setCompareProxyTool':
      return {
        ...state,
        compareProxyToolVisible: action.isVisible
      }

    case 'setSelectedProxies':
      return {
        ...state,
        selectedProxies: action.selectedProxies
      }

    case 'setLastTransaction':
      return {
        ...state,
        transaction: action.transaction
      }

    case 'loadingLogin':
      return {
        ...state,
        loadingLogin: action.loading
      }

    case 'setHomeProducers':
      return {
        ...state,
        homeProducers: action.homeProducers
      }

    case 'skeletonLoading':
      return {
        ...state,
        loadingSkeleton: action.value
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
      dispatch({ type: 'loadingLogin', loading: true })
      if (ual.activeUser) {
        const user = await getUserDataModeled(ual)

        dispatch({ type: 'userChange', user })
      } else {
        dispatch({ type: 'userChange', user: ual.activeUser })
        dispatch({ type: 'setSelectedProducers', selectedProducers: [] })
      }

      dispatch({ type: 'ual', ual })
      dispatch({ type: 'loadingLogin', loading: false })
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
  const setUser = async tempUser => {
    let user = tempUser

    if (!user) {
      user = await getUserDataModeled(state.ual)
    }

    dispatch({ type: 'userChange', user })
  }
  const setSortBy = (sortBy, page) => {
    if (page === 'bp') {
      dispatch({ type: 'setSortProducersBy', sortBy })
    } else {
      // TODO: add logic to sort proxies
    }
  }

  // Block Producers Action
  const setProducers = async (limit, orderBy = null, bpList) => {
    const filter = orderBy || state.sortBlockProducersBy.sort
    let blockProducers = bpList

    if (!blockProducers) {
      blockProducers = await getProducers(limit, [
        { [filter]: 'desc_nulls_last' },
        { bpjson: 'desc' }
      ])
    }

    dispatch({ type: 'setProducers', blockProducers })
  }

  const setProducer = async (item, saveDirectly = false) => {
    let blockProducer = item

    if (!saveDirectly) {
      blockProducer = await getProducer(item)
    }

    if (!blockProducer) {
      dispatch({ type: 'setProducer', blockProducer })

      return
    }

    dispatch({ type: 'setProducer', blockProducer })
  }

  const setHomeProducers = async bpList => {
    let homeProducers = bpList

    if (!homeProducers) {
      homeProducers = await getProducers(3, [{ total_votes: 'desc' }])
    }
    dispatch({ type: 'setHomeProducers', homeProducers })
  }

  const handleMutationInsertUserRating = async ({
    ual,
    user,
    bp,
    result,
    transaction,
    ...ratings
  }) => {
    const ratingData = await mutationInsertUserRating({
      ual,
      user,
      bp,
      result,
      transaction,
      blockProducers: state?.blockProducers,
      isEden: state?.user?.userData?.edenMember,
      ...ratings
    })

    setProducer(ratingData?.currentBP, true)
    setProducers(30, null, {
      ...state?.blockProducers,
      data: ratingData?.producerUpdatedList
    })

    const userRates = getUserRates({
      userRate: { ...ratingData?.rateProducer, ...ratingData?.currentBP },
      user: state.user
    })

    setUser({
      ...state.user,
      userData: { ...state.user.userData, ...userRates }
    })
  }

  const setCompareBPTool = isVisible => {
    dispatch({ type: 'setCompareBPTool', isVisible })
  }

  const setSelectedProducers = selectedProducers =>
    dispatch({ type: 'setSelectedProducers', selectedProducers })

  const setLastTransaction = transaction => {
    dispatch({ type: 'setLastTransaction', transaction })
  }

  // Proxies Actions
  const setProxies = async limit => {
    const proxies = await getProxies(limit)

    dispatch({ type: 'setProxies', proxies })
  }
  const setProxy = async (data, saveDirectly = false) => {
    let proxy = data

    if (!saveDirectly) {
      proxy = await getProxy(data)
    }

    dispatch({ type: 'setProxy', proxy })
  }

  const setCompareProxyTool = isVisible =>
    dispatch({ type: 'setCompareProxyTool', isVisible })

  const setSelectedProxies = selectedProxies =>
    dispatch({ type: 'setSelectedProxies', selectedProxies })

  const setSkeletonLoading = skeletonLoading => {
    dispatch({ type: 'skeletonLoading', value: skeletonLoading })
  }

  return [
    state,
    {
      setState,
      showMessage,
      hideMessage,
      login,
      logout,
      setUser,
      setProducers,
      setProducer,
      handleMutationInsertUserRating,
      setCompareBPTool,
      setSelectedProducers,
      setLastTransaction,
      setSortBy,
      setProxies,
      setProxy,
      setCompareProxyTool,
      setSelectedProxies,
      setHomeProducers,
      setSkeletonLoading
    }
  ]
}
