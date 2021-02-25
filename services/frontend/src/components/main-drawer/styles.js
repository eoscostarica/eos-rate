export default (theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  innerList: {
    backgroundColor: theme.palette.surface.main,
    '& li': {
      paddingLeft: theme.spacing(3),
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#adbcbf'
      }
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  selectedItem: {
    backgroundColor: theme.palette.surface.main
  },
  link: {
    textDecoration: 'none',
    color: '#443f56'
  },
  linkSelected: {
    backgroundColor: '#ced7d8  !important',
    color: '#443f5b'
  },
  sortSelected: {
    backgroundColor: '#adbcbf !important',
    color: '#443f5b'
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
})
