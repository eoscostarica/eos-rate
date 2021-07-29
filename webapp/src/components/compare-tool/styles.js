export default (theme) => ({
  // index
  root: {
    padding: theme.spacing(2),
    background: theme.palette.surface.main,
    width: '100%',
    position: 'relative'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: 'auto',
      bottom: 0,
      width: 'calc(50% - 16px)'
    }
  },
  switch: {
    [theme.breakpoints.up('sm')]: {
      float: 'right'
    }
  },
  btnRate: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: 5,
    color: '#ffffff',
    [theme.breakpoints.up('sm')]: {
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
    backgroundColor: 'red'
  },
  errorChip: {
    border: '1px solid red'
  },
  labelErrorColor: {
    color: 'red'
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
    alignItems: 'center'
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
    maxHeight: 385,
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginBottom: 38
    }
  }
})
