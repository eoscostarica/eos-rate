export default theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '& a': {
      lineBreak: 'anywhere'
    }
  },
  wrapper: {
    maxWidth: 1024,
    width: '100%'
  }
})
