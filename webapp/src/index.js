import './wdyr'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { UALProvider, withUAL } from '@eoscostarica/ual-reactjs-renderer'
import { ApolloProvider } from '@apollo/client'

import App from './app'
import { client } from './graphql'
import * as serviceWorker from './serviceWorker'
import { ualConfig } from './config'
import { SharedStateProvider } from './context/state.context'

const SharedStateProviderWithUAL = withUAL(SharedStateProvider)
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <UALProvider
    chains={[ualConfig.network]}
    authenticators={ualConfig.authenticators}
    appName={ualConfig.appName}
  >
    <SharedStateProviderWithUAL>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </SharedStateProviderWithUAL>
  </UALProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
