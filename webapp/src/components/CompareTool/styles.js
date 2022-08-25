export default theme => ({
  // index
  root: {
    padding: theme.spacing(2),
    background: theme.palette.surface.main,
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  compareSliderView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  boxSliderView: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    alignItems: 'center'
  },
  sliderBody: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  compareGraphView: {
    paddingTop: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '100%'
    }
  },
  wrapperDesktop: {
    height: 'calc(100% - 174px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      flexDirection: 'row',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      maxWidth: 1024
    }
  },
  btnClear: {
    textAlign: 'center',
    width: 200
  },
  footer: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    flexDirection: 'column',
    width: '100%',
    height: 'calc(50% - 170px)',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: 'auto',
      bottom: 0,
      width: 'calc(50% - 16px)'
    }
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 1024,
    [theme.breakpoints.up('mdg')]: {
      marginLeft: 24
    }
  },
  switchBox: {
    textAlign: 'center',
    height: 60
  },
  btnRate: {
    width: 100,
    [theme.breakpoints.up('md')]: {
      float: 'right',
      marginRight: 20,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark
      }
    }
  },
  chipMessage: {
    [theme.breakpoints.up('sm')]: {
      float: 'right',
      marginTop: 5,
      marginRight: 5
    }
  },
  errorColor: {
    backgroundColor: theme.palette.error.main
  },
  errorChip: {
    border: `1px solid ${theme.palette.error.main}`
  },
  labelErrorColor: {
    color: theme.palette.error.main
  },
  // slider view
  bpName: {
    marginTop: '-40px !important',
    textAlign: 'center'
  },
  slider: {
    width: '100%',
    maxWidth: 1024,
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  sliderCard: {
    flex: '0 0 auto',
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  chartWrapperSliderView: {
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
  // graph view
  bpItem: {
    width: '75%',
    padding: '0 0 0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.primary.submenu
    }
  },
  bpNameWrapper: {
    height: 48,
    paddingTop: 14
  },
  bpColorCode: {
    display: 'inline-block',
    width: 15,
    height: 15,
    verticalAlign: 'text-bottom'
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  avatar: {
    backgroundColor: theme.palette.surface.main
  },
  helpIcon: {
    width: '90%',
    height: '90%'
  },
  cardHeader: {
    borderBottom: `1px solid ${theme.palette.primary.light}`
  },
  titleLock: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center'
  },
  headerVotingCompare: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  marginRightElem: {
    marginRight: 10
  },
  icon: {
    color: theme.palette.primary.submenu,
    fontSize: 30,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  containerList: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    minHeight: 50,
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      height: 'fit-content',
      justifyContent: 'space-evenly'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      marginBottom: 0
    }
  },
  centerBox: {
    margin: 'auto',
    width: '100%',
    padding: '5px'
  },
  buttonsBox: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 32px)',
    backgroundColor: theme.palette.surface.main,
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      maxWidth: 1024,
      position: 'initial',
      justifyContent: 'flex-start'
    }
  },
  boxCloseIcon: {
    justifyContent: 'flex-end',
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start'
  },
  btnRateProxies: {
    backgroundColor: theme.palette.secondary.main,
    color: '#ffffff',
    width: '100px',
    padding: '5px 20px 5px 20px',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark
      }
    }
  },
  divbtnRateProxies: {
    margin: '10px 0 10px 0'
  },
  reliefGrid: {
    [theme.breakpoints.up('md')]: {
      border: '1px solid #f8f8f8',
      boxShadow:
        'inset 2px 2px 2px #fff, inset -1px 0 2px rgba(0,0,0,.1), 1px 3px 3px rgba(0,0,0,.1)',
      backgroundColor: '#fff'
    }
  },
  compareBodyListDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      width: '60%'
    }
  },
  compareBodyListMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  noBPSelected: {
    padding: theme.spacing(4, 4, 0, 3),
    textAlign: 'center'
  },
  marginNoBpSelected: {
    margin: '20%'
  },
  bodyModalView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: '40%'
    }
  },
  topModalView: {
    marginBottom: theme.spacing(2)
  },
  btnBox: {
    width: '100%',
    maxWidth: 1024,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
      marginTop: theme.spacing(2)
    }
  },
  proxyVote: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  chartWrapper: {
    width: '100%',
    '& .highcharts-container ': {
      height: '350px !important',
      width: '100% !important',
      '& > svg': {
        marginTop: '-40px !important',
        height: '400px !important',
        width: '100% !important'
      }
    }
  },
  overrideBreakpoint: {
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing(0, 1, 1, 1)} !important`
    }
  },
  hiddenMobile: {
    display: 'none !important',
    [theme.breakpoints.up('sm')]: {
      display: 'flex !important'
    }
  },
  hiddenDesktop: {
    display: 'flex !important',
    [theme.breakpoints.up('sm')]: {
      display: 'none  !important'
    }
  },
  snackbarCenter: {
    width: '100%',
    justifyContent: 'center !important'
  }
})
