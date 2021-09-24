export default theme => ({
  wrapperContainers: {
    color: '#433F5B',
    padding: theme.spacing(6, 2),
    '& h6': {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 4)
    }
  },
  firstContainer: {
    '& h5': {
      fontSize: theme.typography.h4.fontSize,
      marginBottom: 12.5
    }
  },
  boxLinks: {
    display: 'flex',
    marginTop: theme.spacing(3),
    '& a': {
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '& svg': {
      marginRight: theme.spacing(3)
    },
    '& p': {
      marginTop: 0
    }
  }
})
