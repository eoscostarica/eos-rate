import React, {
  createContext,
  useCallback,
  useReducer,
  useContext
} from 'react'
import PropTypes from 'prop-types'
import { initAccessContext } from 'eos-transit'
import lynx from 'eos-transit-lynx-provider'
import meetone from 'eos-transit-meetone-provider'
import scatter from 'eos-transit-scatter-provider'
import tokenPocket from 'eos-transit-tokenpocket-provider'
import config from 'config'
import providers from 'config/wallet-providers'

const WalletStateContext = createContext(undefined)
const WalletDispatchContext = createContext(undefined)

const actionTypes = {
  CONNECT_ERROR: 'CONNECT_ERROR',
  CONNECT_WALLET: 'CONNECT_WALLET',
  CONNECT_WALLET_START: 'CONNECT_WALLET_START',
  DISCONNECT_WALLET: 'DISCONNECT_WALLET'
}

const walletReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CONNECT_WALLET_START:
      return {
        ...state,
        connecting: true,
        error: false
      }
    case actionTypes.CONNECT_WALLET:
      return {
        ...state,
        connecting: false,
        wallet: action.payload.wallet,
        error: false
      }
    case actionTypes.DISCONNECT_WALLET:
      return {
        connecting: false,
        wallet: null,
        error: false
      }
    case actionTypes.CONNECT_ERROR:
      return {
        connecting: false,
        error: true,
        wallet: null
      }

    default:
      throw new Error(`Invalid action: ${action.type}`)
  }
}

const getWallet = walletProvider => {
  const accessContext = initAccessContext({
    appName: config.appName || 'EOSRate',
    network: {
      host: config.eosApiHost || 'jungle2.cryptolions.io',
      port: parseInt(config.eosApiPort || '443'),
      protocol: config.eosApiProtocol || 'https',
      chainId:
        config.eosChainId ||
        'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    },
    // Follow the same order declared in `config/wallet-providers.js`
    walletProviders: [lynx(), meetone(), scatter(), tokenPocket()]
  })

  const walletProviders = accessContext.getWalletProviders()

  return accessContext.initWallet(
    walletProviders[providers.findIndex(p => p.id === walletProvider)]
  )
}

export function WalletProvider ({ children }) {
  const [state, dispatch] = useReducer(walletReducer, {
    connecting: false,
    error: false,
    wallet: null
  })

  return (
    <WalletStateContext.Provider value={state}>
      <WalletDispatchContext.Provider value={dispatch}>
        {children}
      </WalletDispatchContext.Provider>
    </WalletStateContext.Provider>
  )
}

WalletProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export function useWalletState () {
  const state = useContext(WalletStateContext)

  if (state === undefined) {
    throw new Error(
      'You must wrap your application with <WalletProvider /> in order to useWalletState().'
    )
  }

  return state
}

export function useWalletDispatch () {
  const dispatch = useContext(WalletDispatchContext)

  if (dispatch === undefined) {
    throw new Error(
      'You must wrap your application with <WalletProvider /> in order to useWalletDispatch().'
    )
  }

  const connectWallet = useCallback(
    async provider => {
      dispatch({
        type: actionTypes.CONNECT_WALLET_START,
        payload: { provider }
      })

      try {
        const wallet = await getWallet(provider)
        await wallet.connect()
        await wallet.login()

        dispatch({
          type: actionTypes.CONNECT_WALLET,
          payload: { wallet }
        })
      } catch (err) {
        console.log(err)
        dispatch({
          type: actionTypes.CONNECT_ERROR
        })
      }
    },
    [dispatch]
  )

  const disconnectWallet = useCallback(
    async wallet => {
      dispatch({ type: actionTypes.DISCONNECT_WALLET })
      try {
        await wallet.disconnect()
        await wallet.logout()
      } catch (err) {
        console.log(err)
      }
    },
    [dispatch]
  )

  return {
    connectWallet,
    disconnectWallet
  }
}
