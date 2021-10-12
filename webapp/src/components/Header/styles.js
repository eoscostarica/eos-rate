export default theme => ({
  appBar: {
    boxShadow: theme.shadows[0],
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: theme.shadows[4],
      borderBottom: 0
    }
  },
  toolbar: {
    padding: 0,
    justifyContent: 'space-between',
    paddingLeft: `${theme.spacing(1)} !important`,
    paddingRight: `${theme.spacing(1)} !important`,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 2)
    }
  },
  typography: {
    color: theme.palette.text.primary,
    flexGrow: 1
  },
  desktopSection: {
    display: 'none',
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
    '& svg, & span': {
      color: theme.palette.common.white
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  mobileSection: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  boxLogo: {
    display: 'flex',
    '& svg': {
      color: theme.palette.common.white
    },
    '& img': {
      width: 145
    },
    [theme.breakpoints.up('md')]: {
      '& img': {
        width: 180
      }
    }
  },
  boxSearch: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  onSignOut: {
    '& svg': {
      color: theme.palette.common.white
    }
  },
  onLogin: {
    '& svg': {
      color: theme.palette.common.white
    }
  },
  textBtn: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      color: theme.palette.common.white,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 20,
      lineHeight: '23px',
      marginLeft: `${theme.spacing(0.5)} !important`
    }
  },
  link: {
    display: 'flex'
  },
  mobileSearch: {
    '& svg': {
      color: theme.palette.common.white
    }
  },
  arrow: {
    color: 'rgba(97, 97, 97, 0.9)',
    marginLeft: 30
  },
  tooltip: {
    boxShadow: theme.shadows[1],
    width: 140,
    fontSize: 14,
    textAlign: 'center'
  },
  logoTypeUSerSize: {
    width: 28
  }
})
