import React, { Suspense, useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import routes from './routes'
import Loader from './components/Loader'
import DashboardLayout from './layouts/Dashboard'
import { useSharedState } from './context/state.context'
import getTheme from './theme'
import './i18n'

const App = () => {
  const [state] = useSharedState()

  const renderRoute = ({ component: Component, ...route }, index) => (
    <Route
      key={`path-${route.path}-${index}`}
      path={route.path}
      exact={route.exact}
    >
      <Component />
    </Route>
  )

  const userRoutes = useMemo(() => routes())

  const theme = useMemo(() => getTheme(state.useDarkMode), [state.useDarkMode])

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
