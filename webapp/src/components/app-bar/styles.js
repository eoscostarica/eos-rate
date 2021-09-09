export default (theme, alpha) => ({
  root: {
    flexGrow: 1
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  linkHover: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10
    }
  },
  grow: {
    flexGrow: 1
  },
  title: {
    width: 140,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      width: 210
    }
  },
  menuButton: {
    marginLeft: -18,
    [theme.breakpoints.up('sm')]: {
      marginRight: 15
    }
  },
  search: {
    position: 'relative',
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: 'auto'
    }
  },
  mobileSearch: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sessionText: {
    marginLeft: 5,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  logoStyle: {
    width: 110,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      width: 180
    }
  }
})
