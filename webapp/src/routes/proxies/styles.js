export default (theme) => ({
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
  wrapper: {
    padding: theme.spacing(1),
    maxWidth: '100%',
    margin: 'auto'
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
    marginLeft: 6
  },
  accountCircle: {
    color: theme.palette.secondary.main
  },
  box: {
    padding: '3%'
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    marginBottom: 5,
    marginTop: 5
  },
  subTitle: {
    fontSize: 14
  },
  longSubTitle: {
    margin: '7px 0',
    fontSize: 14
  },
  longValue: {
    marginLeft: 4,
    marginTop: 7,
    fontWeight: 500
  },
  value: {
    marginLeft: 4,
    fontWeight: 500
  },
  category: {
    marginTop: 10
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
    margin: '0 30px 30px 30px',
    padding: '20px',
    border: '1px solid #f8f8f',
    borderRadius: '6px',
    boxShadow:
      'inset 2px 2px 2px #fff, inset -1px 0 2px rgba(0,0,0,.1), 1px 1px 3px rgba(0,0,0,.1)',
    backgroundColor: '#fff'
  }
})
