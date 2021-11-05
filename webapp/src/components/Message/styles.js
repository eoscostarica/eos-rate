export default theme => ({
  alert: {
    '& a': {
      color: theme.palette.info.contrastText,
      lineBreak: 'anywhere'
    }
  },
  snackbarCenter: {
    width: '100%',
    justifyContent: 'center !important'
  }
})
