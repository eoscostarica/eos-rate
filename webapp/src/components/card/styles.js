export default (theme) => ({
  card: {
    backgroundColor: theme.palette.surface.dark,
    minWidth: 250
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    padding: theme.spacing(2, 2, 1, 2)
  },
  unsafeChip: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#E91E63',
    color: 'white'
  },
  unsafeAvatar: {
    backgroundColor: '#AD1457',
    color: 'white'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  radar: {
    background: theme.palette.surface.light
  },
  avatar: {
    backgroundColor: theme.palette.surface.main
  },
  helpIcon: {
    width: '90%',
    height: '90%'
  },
  btnRate: {
    backgroundColor: theme.palette.primary.submenu,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  warningBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  warningIcon: {
    color: 'rgb(255, 152, 0)'
  },
  marginRightElem: {
    marginRight: 5
  },
  blockIcons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(0, 1)
  },
  boxTitle: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '250px'
    },
    [theme.breakpoints.up('md')]: {
      width: '260px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '370px'
    }
  },
  noWrap: {
    [theme.breakpoints.up('sm')]: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  },
  showOnlySm: {
    display: 'flex'
  },
  showOnlyLg: {
    display: 'none'
  },
  mobileBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2, 1, 2),
    color: theme.palette.primary.main
  },
  boxValueRates: {
    display: 'flex',
    marginBottom: '15px',
    justifyContent: 'center'
  }
})
