import ReactGA from 'react-ga'

export const InitGA = () => {
  console.log('GA Init')
  ReactGA.initialize('UA-151600466-1')
}

export const LogPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
