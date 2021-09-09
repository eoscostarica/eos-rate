export default (theme) => ({
  card: {
    backgroundColor: theme.palette.surface.dark,
    minWidth: 250
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    padding: theme.spacing(1, 2, 1, 2)
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
    justifyContent: 'space-between',
    padding: 16
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
    paddingLeft: 24,
    paddingRight: 24,
    boxShadow: `0px 3px 1px -2px ${theme.palette.secondary.main}, 0px 2px 2px 0px ${theme.palette.secondary.main}, 0px 1px 5px 0px ${theme.palette.secondary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  secondaryBtn: {
    border: `1px solid ${theme.palette.primary.main}`,
    paddingLeft: 16,
    paddingRight: 16
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
    marginRight: 5,
    color: theme.palette.primary.main
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
    marginBottom: '20px',
    justifyContent: 'center'
  }
})
