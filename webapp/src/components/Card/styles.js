export default theme => ({
  card: {
    backgroundColor: theme.palette.surface.dark,
    minWidth: 250
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    backgroundColor: '#F8F8F8'
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
    padding: `${theme.spacing(2)} !important`,
    backgroundColor: '#F8F8F8'
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
  warningBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  warningIcon: {
    color: 'rgb(255, 152, 0)'
  },
  marginRightElem: {
    marginRight: '5px !important',
    color: theme.palette.primary.dark
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
    fontStyle: 'normal',
    fontSize: '20px !important',
    lineHeight: '23px !important',
    letterSpacing: '0.15px',
    color: theme.palette.primary.dark,
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
  },
  subTitleHeader: {
    fontStyle: 'normal',
    fontWeight: 'normal !important',
    fontSize: '14px !important',
    lineHeight: '20px !important',
    letterSpacing: '0.25px !important',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  moreWrapper: {
    display: 'flex',
    float: 'right',
    '& h6': {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '11px',
      lineHeight: '16px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'right',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.38)'
    },
    '& svg': {
      fontSize: '14px !important',
      color: 'rgba(0, 0, 0, 0.38)'
    }
  },
  avgText: {
    fontStyle: 'normal',
    fontWeight: 'bold !important',
    fontSize: '16px !important',
    lineHeight: '28px !important',
    letterSpacing: '0.44px'
  },
  avgValue: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px !important',
    lineHeight: '28px !important',
    letterSpacing: '0.44px'
  }
})
