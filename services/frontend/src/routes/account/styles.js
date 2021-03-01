export default (theme) => ({
  container: {
    padding: theme.spacing(3),
    color: '#ffffff'
  },
  account: {
    padding: theme.spacing(3, 4)
  },
  title: {
    textAlign: 'center'
  },
  box: {
    padding: theme.spacing(3, 0)
  },
  bold: {
    fontWeight: 'bold',
    wordBreak: 'break-all'
  },
  button: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  rateList: {
    '& hr': {
      width: '100%'
    }
  },
  avatar: {
    backgroundColor: theme.palette.surface.main
  }
})
