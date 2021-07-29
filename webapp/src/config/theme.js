import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'light',
    background: {
      default: '#eeeeee'
    },
    primary: {
      light: '#787291',
      main: '#443f56',
      dark: '#221e38',
      sectionBackground: '#ffffff',
      submenu: '#597a81'
    },
    secondary: {
      light: '#8ba2a6',
      main: '#597a81',
      dark: '#222f32'
    },
    surface: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#f8f8f8'
    }
  },
  overrides: {
    root: {
      fontSize: '2em'
    },
    MuiListItem: {
      button: {
        // color: 'black',
        '&:hover': {
          // backgroundColor: '#5cf68a',
          // color: 'black'
        }
      },
      root: {
        '&$selected': {
          // color: 'black',
          // backgroundColor: '#5cf68a'
        }
      }
    },
    MuiListItemText: {
      primary: {
        // color: 'inherit'
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
        // color: '#fff'
      }
    }
  }
})

export default theme
