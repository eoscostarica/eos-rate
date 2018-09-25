import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#436895' },
    secondary: { main: '#000000' }
  },
  overrides: {
    root: {
      fontSize: '2em'
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
      root: {
        height: 45
      }
    }
  }
})

export default theme
