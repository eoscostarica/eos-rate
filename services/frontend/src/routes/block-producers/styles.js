export default (theme) => ({
  // index style
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
  wrapper: {
    padding: theme.spacing(3)
  },
  compareTool: {
    minHeight: 340,
    transform: 'scaleY(1)',
    transformOrigin: 'top',
    opacity: 1,
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
  sliderBoxContent: { marginTop: 30 },
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
    marginTop: theme.spacing(1)
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

    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  alert: {
    width: '100%',
    marginTop: theme.spacing(1)
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
  links: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
})
