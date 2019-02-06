import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { getPersistor } from '@rematch/persist'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { I18nextProvider } from 'react-i18next'

import store from './store'
import theme from './config/theme'
import App from './app'
import i18n from './i18n'
import * as serviceWorker from './serviceWorker'

import './config/radar'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={getPersistor()}>
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
