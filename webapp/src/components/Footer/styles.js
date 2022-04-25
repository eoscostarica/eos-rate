export default theme => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  listItem: {
    display: 'inline-block',
    width: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&:hover, &:active:': {
      color: theme.palette.action.selected
    }
  },
  grow: {
    flexGrow: 1
  },
  eoscostaricaLogo: {
    height: 36,
    width: 'auto'
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  legend: {
    display: 'flex',
    width: 150,
    lineHeight: '1.4 !important',
    fontSize: '8px !important',
    fontWeight: '500 !important',
    fontStretch: 'normal',
    letterSpacing: '1.1px !important',
    textAlign: 'right !important',
    color: 'rgba(255, 255, 255, 0.6)',
    paddingRight: theme.spacing(2)
  },
  network: {
    marginTop: `${theme.spacing(3)} !important`
  },
  linkHome: {
    marginTop: `${theme.spacing(1)} !important`,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: '16px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: `${theme.palette.common.white} !important`,
    textDecoration: 'none'
  },
  centerFooterText: {
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: '134.69%',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
    textAlign: 'left',
    letterSpacing: '0.15px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center'
    }
  },
  socialText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: '23px',
    display: 'flex',
    color: theme.palette.common.white,
    alignItems: 'center',
    textAlign: 'left',
    letterSpacing: '0.15px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    }
  },
  footerHome: {
    width: '100%',
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start !important',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center !important'
    }
  },
  boxToolbar: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  footerText: {
    marginTop: `${theme.spacing(3)} !important`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center !important'
  },
  socialBox: {
    marginTop: theme.spacing(2)
  },
  socialIconBox: {
    marginTop: theme.spacing(2)
  },
  colorLink: {
    paddingLeft: theme.spacing(0.5),
    color: `${theme.palette.common.white} !important`
  }
})
