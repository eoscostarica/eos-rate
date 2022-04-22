export default theme => ({
  mainCoverContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.surface.main,
    padding: theme.spacing(10, 1, 0, 1)
  },
  gradientBg: {
    background:
      'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(14)
  },
  headerBg: {
    width: '100%',
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.surface.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'url("bg.png")',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  headerTitle: {
    maxWidth: 893,
    fontStyle: 'normal',
    fontWeight: '500 !important',
    fontSize: '42px !important',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '1.5px !important',
    color: theme.palette.primary.main,
    lineHeight: '1 !important',
    marginBottom: `${theme.spacing(5)} !important`,
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      fontSize: '66px !important',
      lineHeight: '68px !important'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '96px !important',
      lineHeight: '98px !important'
    }
  },
  headerSubtitle: {
    maxWidth: 860,
    color: theme.palette.primary.main,
    fontWeight: '500 !important',
    fontSize: '24px !important',
    lineHeight: '30px !important',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.25px',
    marginBottom: `${theme.spacing(2)} !important`,
    [theme.breakpoints.up('sm')]: {
      fontSize: '34px !important',
      lineHeight: '40px !important'
    }
  },
  headerInfo: {
    fontWeight: 'normal !important'
  },
  btnStartRate: {
    width: 277,
    height: 58,
    marginTop: `${theme.spacing(8)} !important`
  },
  videoBox: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  video: {
    height: 'auto',
    width: '100%',
    maxWidth: 1085,
    [theme.breakpoints.up('sm')]: {
      height: 500
    }
  },
  videoTitle: {
    margin: `${theme.spacing(10, 0, 2, 0)} !important`,
    fontStyle: 'normal',
    fontWeight: '500 !important',
    fontSize: '24px !important',
    lineHeight: '30px !important',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.25px !important',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      fontSize: '34px !important',
      lineHeight: '40px !important'
    }
  },
  link: {
    margin: `${theme.spacing(4, 0, 3, 0)} !important`,
    color: `${theme.palette.common.white} !important`,
    textTransform: 'uppercase',
    fontWeight: '500 !important',
    fontSize: '12px !important',
    lineHeight: '12px !important',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '1px !important',
    '& svg': {
      fontSize: '12px !important',
      marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px !important',
      lineHeight: '16px !important',
      '& svg': {
        fontSize: '14px !important'
      }
    }
  },
  wrapperGrid: {
    paddingBottom: theme.spacing(4),
    maxWidth: '100%',
    margin: '0 auto',
    '& #cardBox1': {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'initial'
      }
    },
    '& #cardBox2': {
      display: 'none',
      [theme.breakpoints.up('mdd')]: {
        display: 'initial'
      }
    }
  },
  gridRow: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  },
  gridItem: {
    flexBasis: '100%',
    '-ms-flex': 'auto',
    width: '100%',
    position: 'relative',
    padding: 10,
    boxSizing: 'border-box',
    '& iframe': {
      width: '100% !important'
    },
    [theme.breakpoints.up('sm')]: {
      flexBasis: '50%',
      '& iframe': {
        width: '100% !important'
      }
    },
    [theme.breakpoints.up('mdd')]: {
      flexBasis: '33.33%',
      '& iframe': {
        width: '100% !important'
      }
    }
  },
  blockProducers: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(5, 2, 2, 2)} !important`,
    [theme.breakpoints.up('sm')]: {
      flexBasis: '50%',
      flexDirection: 'row'
    }
  },
  votes: {
    fontStyle: 'normal !important',
    fontWeight: '500 !important',
    fontSize: '28px !important',
    lineHeight: '40px !important',
    letterSpacing: '0.25px !important',
    color: `${theme.palette.primary.main} !important`,
    textAlign: 'center',
    marginBottom: `${theme.spacing(2)} !important`,
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
      fontSize: '34px !important',
      marginBottom: '0 !important'
    }
  },
  bpList: {
    fontStyle: 'normal !important',
    fontWeight: '500 !important',
    fontSize: '14px !important',
    lineHeight: '16px !important',
    textAlign: 'center',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.6) !important',
    textDecoration: 'none !important',
    display: 'flex',
    '& svg': {
      fontSize: '14px !important',
      marginLeft: theme.spacing(1)
    }
  },
  twitter: {
    backgroundColor: theme.palette.common.white
  }
})
