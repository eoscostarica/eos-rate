export default theme => ({
  // index
  root: {
    position: 'relative'
  },
  compareToggleButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
    zIndex: 1
  },
  badge: {
    border: `2px solid ${theme.palette.secondary}`,
    background: theme.palette.surface.main,
    color: theme.palette.primary.main
  },
  wrapperGrid: {
    maxWidth: '100%',
    margin: '0 auto'
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
    [theme.breakpoints.up('sm')]: {
      flexBasis: '50%'
    },
    [theme.breakpoints.up('mdd')]: {
      flexBasis: '33.33%'
    }
  },
  compareTool: {
    paddingTop: '0 !important',
    transform: 'scaleY(1)',
    transformOrigin: 'top',
    opacity: 1,
    height: '100%',
    transition: [
      'opacity 0.25s ease',
      'height 0.25s ease',
      'transform 0.25s ease',
      'min-height 0.25s ease'
    ]
  },
  bpCard: {
    backgroundColor: theme.palette.primary.light
  },
  loadMoreButton: {
    color: '#443f56',
    display: 'block',
    margin: `${theme.spacing(2)}px auto`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: 'white'
    }
  },
  hidden: {
    opacity: 0,
    transform: 'scaleY(0)',
    minHeight: 0,
    height: 0
  },
  // compare tool
  nested: {
    color: 'white'
  },
  listItem: {
    display: 'block'
  },
  // proxy profile
  container: {
    padding: 10
  },
  bpName: {
    marginLeft: `${theme.spacing(1)} !important`,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.17',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: theme.palette.common.black
  },
  accountCircle: {
    color: theme.palette.secondary.main
  },
  box: {
    padding: '3%'
  },
  title: {
    color: theme.palette.common.black,
    fontSize: '1.5rem !important'
  },
  bpSlogan: {
    marginLeft: `${theme.spacing(2)} !important`,
    [theme.breakpoints.up('md')]: {
      marginLeft: `${theme.spacing(3)} !important`
    }
  },
  subTitle: {
    fontSize: '18px !important',
    fontWeight: '500 !important'
  },
  rowBox: {
    display: 'flex',
    marginLeft: `${theme.spacing(2)} !important`,
    [theme.breakpoints.up('md')]: {
      marginLeft: `${theme.spacing(3)} !important`
    }
  },
  longSubTitle: {
    fontSize: '18px !important',
    fontWeight: '500 !important',
    marginLeft: `${theme.spacing(2)} !important`,
    [theme.breakpoints.up('md')]: {
      marginLeft: `${theme.spacing(3)} !important`
    }
  },
  longValue: {
    margin: `${theme.spacing(0, 0, 1, 2)} !important`,
    fontWeight: '400 !important',
    [theme.breakpoints.up('md')]: {
      marginLeft: `${theme.spacing(0, 0, 1, 3)} !important`
    }
  },
  value: {
    marginLeft: '4px !important',
    fontWeight: '400 !important'
  },
  category: {
    marginTop: 10
  },
  btnBP: {
    color: theme.palette.surface.main,
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: 36,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  wrapperBox: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      width: '100%'
    }
  },
  BlockProducerRadarBox: {
    padding: '30px 0',
    backgroundColor: theme.palette.surface.main
  },
  showOnlySm: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  showOnlyLg: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  websiteLegend: {
    margin: '10px 0',
    [theme.breakpoints.up('sm')]: {
      margin: 0
    }
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  avatar: {
    backgroundColor: theme.palette.surface.main
  },
  errorBox: {
    padding: '10px 0px'
  },
  votingTextProgress: {
    display: 'flex'
  },
  slogan: {
    margin: '10px 0 0 0',
    fontStyle: 'italic',
    '&:before': { content: 'open-quote' },
    '&:after': { content: 'close-quote' }
  },
  reliefGrid: {
    padding: '20px 0',
    border: '1px solid #f8f8f',
    borderRadius: '6px',
    boxShadow:
      'inset 2px 2px 2px #fff, inset -1px 0 2px rgba(0,0,0,.1), 1px 1px 3px rgba(0,0,0,.1)',
    backgroundColor: '#fff'
  },
  hiddenDesktop: {
    display: 'flex !important',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none !important'
    }
  },
  hiddenMobile: {
    display: 'none !important',
    [theme.breakpoints.up('md')]: {
      display: 'flex !important',
      justifyContent: 'center'
    }
  },
  loadMoreBtnBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0)
  },
  avatarTitle: {
    display: 'flex',
    alignItems: 'center'
  },
  polarGraphWrapper: {
    width: '100%',
    '& .highcharts-container ': {
      height: '400px !important',
      width: '100% !important',
      '& > svg': {
        height: '400px !important',
        width: '100% !important'
      }
    }
  },
  paddingHorinzontal: {
    padding: theme.spacing(0, 1)
  },
  snackbarCenter: {
    width: '100%',
    justifyContent: 'center !important'
  }
})
