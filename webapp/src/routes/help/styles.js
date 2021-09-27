export default theme => ({
  wrapperContainers: {
    color: '#433F5B',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(6, 2),
    '& h6': {
      marginBottom: theme.spacing(1)
    }
  },
  firstContainer: {
    maxWidth: 1024,
    width: '100%',

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
