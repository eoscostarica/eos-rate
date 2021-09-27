export default theme => ({
  // index
  root: {
    padding: theme.spacing(2),
    background: theme.palette.surface.main,
    width: '100%',
    position: 'relative'
  },
  compareGraphView: {
    paddingTop: 0,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2)
    }
  },
  wrapperDesktop: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 75px)',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
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
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  switch: {
    [theme.breakpoints.up('md')]: {
      float: 'right'
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
    paddingTop: 10,
    textAlign: 'center'
  },
  slider: {
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
    paddingRight: 16
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
    flexDirection: 'column'
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
      marginBottom: 38,
      justifyContent: 'space-around'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      marginBottom: 0
    }
  },
  centerBox: {
    margin: 'auto',
    width: '45%',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  buttonsBox: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center'
    }
  },
  boxCloseIcon: {
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    height: '100%'
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
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  compareBodyListMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  noBPSelected: {
    padding: theme.spacing(4, 4, 0, 3),
    textAlign: 'center'
  },
  bodyModalView: {
    height: 'calc(100% - 100px)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  topModalView: {
    marginBottom: theme.spacing(2)
  },
  btnBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  alert: {
    width: '100%'
  },
  proxyVote: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  chartWrapper: {
    '& .highcharts-container ': {
      height: '400px !important',
      width: '340px !important',
      '& > svg': {
        height: '400px !important',
        width: '340px !important'
      },
      [theme.breakpoints.up('sm')]: {
        height: '400px !important',
        width: '600px !important',
        '& > svg': {
          height: '400px !important',
          width: '600px !important'
        }
      }
    }
  },
  overrideBreakpoint: {
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing(0, 1, 1, 1)} !important`
    }
  }
})
