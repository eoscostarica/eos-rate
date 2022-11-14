import React, { Suspense, useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { StylesProvider, createGenerateClassName } from '@mui/styles'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import routes from './routes'
import Loader from './components/Loader'
import DashboardLayout from './layouts/Dashboard'
import { useSharedState } from './context/state.context'
import getTheme from './theme'
import './i18n'

const generateClassName = createGenerateClassName({
  productionPrefix: 'eosRate'
})

const App = () => {
  const [state] = useSharedState()
  const userRoutes = useMemo(() => routes())
  const theme = useMemo(() => getTheme(state.useDarkMode), [state.useDarkMode])

  const renderRoute = ({ component: Component, ...route }, index) => (
    <Route
      key={`path-${route.path}-${index}`}
      path={route.path}
      exact={route.exact}
    >
      <Component />
    </Route>
  )

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DashboardLayout routes={userRoutes.sidebar}>
              <Suspense fallback={<Loader />}>
                <Switch>{userRoutes.browser.map(renderRoute)}</Switch>
              </Suspense>
            </DashboardLayout>
          </LocalizationProvider>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  )
}

export default App
