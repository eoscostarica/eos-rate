export default theme => ({
  brand: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 169,
    paddingTop: theme.spacing(5)
  },
  scrollbar: {
    backgroundColor: theme.palette.background.paper
  },
  badge: {
    fontWeight: theme.typography.fontWeightBold,
    height: '20px',
    backgroundColor: theme.palette.primary.main,
    '& span.MuiChip-label, & span.MuiChip-label:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(0, 1)
    }
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0 !important',
    '& p': {
      fonWeight: theme.typography.fontWeightBold,
      paddingLeft: theme.spacing(2),
      cursor: 'default'
    },
    '& .MuiBox-root': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '& .MuiCollapse-container': {
      width: '100%',
      paddingLeft: theme.spacing(2)
    },
    '& .MuiListItemText-root .MuiTypography-root': {
      fontSize: theme.typography.subtitle2.fontSize
    },
    '& .active': {
      backgroundColor: theme.palette.action.selected,
      borderRadius: 4
    },
    '& .MuiListItem-button:hover': {
      borderRadius: 4
    }
  },
  linkSidebar: {
    padding: theme.spacing(2, 1),
    '& > svg': {
      display: 'none'
    }
  },
  navBox: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  subMenu: {
    borderRadius: 4
  },
  subMenuWrapper: {
    backgroundColor: theme.palette.surface.dark
  },
  welcome: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px !important',
    lineHeight: '23px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginLeft: `${theme.spacing(2)} !important`
  },
  userName: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px !important',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: `${theme.spacing(2)} !important`
  },
  icon: {
    fontSize: '48px !important',
    width: '48px !important',
    height: '48px !important',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  versionStyle: {
    width: 60
  }
})
