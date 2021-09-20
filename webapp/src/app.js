import React, { Suspense, useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

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

  const userRoutes = useMemo(
    () => routes(state.user?.role || 'guest'),

    [state.user]
  )

  const theme = useMemo(() => getTheme(state.useDarkMode), [state.useDarkMode])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DashboardLayout routes={userRoutes.sidebar}>
            <Suspense fallback={<Loader />}>
              <Switch>{userRoutes.browser.map(renderRoute)}</Switch>
            </Suspense>
          </DashboardLayout>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
