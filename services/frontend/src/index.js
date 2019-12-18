import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { getPersistor } from '@rematch/persist'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'

import store from './store'
import theme from './config/theme'
import App from './app'
import * as serviceWorker from './serviceWorker'

import './config/radar'
import './i18n'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={getPersistor()}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
