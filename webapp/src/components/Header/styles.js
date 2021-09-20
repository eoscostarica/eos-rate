export default theme => ({
  appBar: {
    boxShadow: `${theme.shadows[0]}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: `${theme.shadows[4]}`,
      borderBottom: 0
    }
  },
  toolbar: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(0, 2)}`
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
      width: 180
    }
  }
})
