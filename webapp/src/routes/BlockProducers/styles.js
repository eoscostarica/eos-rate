export default theme => ({
  // index style
  rootBP: {
    position: 'relative',
    maxWidth: '100%'
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
    height: '100%',
    paddingTop: 0
  },
  bpCard: {
    backgroundColor: theme.palette.primary.light
  },
  loadMoreBtnBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0)
  },
  loadMoreButton: {
    display: 'block',
    margin: `${theme.spacing(2)}px auto`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: 'white'
    }
  },
  hiddenMobile: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  hiddenDesktop: {
    display: 'flex',
    overflow: 'hidden',
    maxHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // slider rating
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  sliderBoxContent: {
    marginTop: 30,
    padding: '0 10px 0 10px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 10
    }
  },
  marginOff: { margin: 0 },
  parameterTitleDisabled: {
    color: '#bdbdbd'
  },
  topicIcon: {
    verticalAlign: 'middle'
  },
  switchBox: {
    marginLeft: 10,
    color: '#443f56 !important'
  },
  // filter box
  nestedPadding: {
    paddingLeft: theme.spacing(2)
  },
  // compate toggle
  nested: {
    color: 'white'
  },
  listItem: {
    display: 'block'
  },
  // bp rate
  container: {
    padding: theme.spacing(1)
  },
  pageTitle: {
    display: 'flex',
    alignItems: 'center'
  },
  bpName: {
    marginLeft: `${theme.spacing(1)} !important`
  },
  accountCircle: {
    color: theme.palette.surface.main
  },
  radarActionsWrapper: {
    height: '100%',
    justifyContent: 'space-between'
  },
  radarWrapper: {
    flexBasis: 0,
    padding: theme.spacing(4, 0)
  },
  ctasWrapper: {
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  box: {
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  value: {
    marginLeft: 4,
    fontWeight: 500
  },
  category: {
    marginTop: theme.spacing(5)
  },
  breadcrumbText: {
    color: '#fff',
    textTransform: 'uppercase'
  },
  avatar: {
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

    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  alert: {
    width: '100%',
    marginTop: theme.spacing(1),
    '& > div.MuiAlert-message': {
      width: '100%'
    }
  },
  alertBody: {
    width: '100%'
  },
  alertActionsContainer: {
    maxWidth: '60%'
  },
  closeIconButton: {
    padding: 0,
    verticalAlign: 'middle',
    color: 'black'
  },
  detailsIconButton: {
    padding: '0 10px'
  },
  // bp profile
  bpAccountCircle: {
    color: theme.palette.secondary.main
  },
  bpBox: {
    padding: '3%'
  },
  bPtitle: {
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    marginBottom: 10,
    marginTop: 5
  },
  btnBP: {
    color: theme.palette.surface.main,
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },

    [theme.breakpoints.up('sm')]: {
      marginRight: 10
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
  websiteLegend: {
    margin: '10px 0',
    [theme.breakpoints.up('sm')]: {
      margin: 0
    }
  },
  openBottomSheetContainer: {
    position: 'fixed',
    bottom: 0,
    zIndex: 999,
    maxWidth: '100%',
    '& > button': {
      backgroundColor: theme.palette.common.black,
      color: 'white',
      borderRadius: '24px 0 0 0'
    }
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  paperAnchor: {
    right: '0',
    overflowY: 'hidden'
  },
  reliefGrid: {
    margin: '10px 16px 30px 16px',
    padding: '20px',
    border: '1px solid #f8f8f',
    borderRadius: '6px',
    boxShadow:
      'inset 2px 2px 2px #fff, inset -1px 0 2px rgba(0,0,0,.1), 1px 1px 3px rgba(0,0,0,.1)',
    backgroundColor: '#fff'
  },
  marginLeftBox: {
    marginLeft: '11px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '11px'
    }
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '54%'
    }
  },
  backButtonStyle: {
    marginLeft: '16px !important',
    padding: '6px 16px !important'
  },
  snackbar: {
    '& .MuiSnackbarContent-root': {
      padding: 0
    },
    '& .MuiSnackbarContent-action': {
      padding: 0
    },
    '& .MuiAlert-icon': {
      alignItems: 'center'
    }
  },
  linkRate: {
    marginLeft: `${theme.spacing(2)} !important`,
    padding: `${theme.spacing(1, 2)} !important`
  },
  showMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  showDesktop: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  infoGridStyle: {
    borderRight: 'solid 1px rgba(0, 0, 0, 0.38)',
    paddingTop: 18,
    paddingRight: 50,
    [theme.breakpoints.down('md')]: {
      borderRight: 0,
      paddingRight: 0
    }
  },
  chartWrapperSliderView: {
    '& .highcharts-container ': {
      height: '400px !important',
      width: '325px !important',
      '& > svg': {
        height: '400px !important',
        width: '325px !important'
      }
    }
  },
  tableBox: {
    marginBottom: '70px !important',
    justifyContent: 'center !important',
    margin: 'auto !important'
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  profileChartWrapper: {
    marginTop: 20,
    '& .highcharts-container ': {
      height: '400px !important',
      width: '100% !important',
      '& > svg': {
        height: '400px !important',
        width: '100% !important'
      }
    }
  }
})
