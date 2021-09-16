export default (theme) => ({
  // index style
  root: {
    position: 'relative',
    maxWidth: '100%',
    margin: 'auto'
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
  wrapper: {
    padding: theme.spacing(1),
    maxWidth: '100%',
    margin: 'auto'
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
  // slider rating
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  sliderBoxContent: {
    marginTop: 30,
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
    marginLeft: 10
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
  bpName: {
    marginLeft: theme.spacing(1)
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
      backgroundColor: 'black',
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
    overflowY: 'initial'
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
  }
})
