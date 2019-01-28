import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark',
    background: {
      default: '#5b576f'
    },
    primary: {
      light: '#2b2e3e',
      main: '#010318',
      dark: '#000000',
      sectionBackground: '#1b1a2b',
      submenu: '#252838'
    },
    secondary: {
      light: '#fff',
      main: '#00c25b',
      dark: '#00902e'
    }
  },
  overrides: {
    root: {
      fontSize: '2em'
    },
    MuiPaper: {
      root: {
        backgroundColor: '#1b1a2b'
      }
    },
    MuiListItem: {
      selected: {
        color: 'black',
        backgroundColor: '#5cf68a'
      },
      button: {
        color: 'white',
        '&:hover': {
          backgroundColor: '#5cf68a',
          color: 'black'
        }
      }
    },
    MuiListItemText: {
      primary: {
        color: 'inherit'
      }
    },
    MuiSelect: {
      root: {
        paddingTop: 8
      }
    },
    MuiInput: {
      root: {
        height: 50,
        fontSize: 20
      }
    },
    MuiButton: {
      containedSecondary: {
        color: '#fff'
      }
    }
  }
})

export default theme
