import { createTheme } from '@material-ui/core/styles'

import palette from './palette'
import breakpoints from './breakpoints'
import typography from './typography'

export default useDarkMode =>
  createTheme({
    breakpoints,
    typography,
    palette: { type: useDarkMode ? 'dark' : 'light', ...palette },
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
      }
    }
  })
