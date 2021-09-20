export default theme => ({
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: 400
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
