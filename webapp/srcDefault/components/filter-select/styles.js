export default theme => ({
  wrapper: {
    color: 'inherit'
  },
  sortText: {
    fontSize: '1rem',
    marginLeft: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  iconFilter: {
    width: 24,
    height: 24
  }
})
