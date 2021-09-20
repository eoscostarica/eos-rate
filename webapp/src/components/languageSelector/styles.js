export default theme => ({
  wrapper: {
    color: 'inherit'
  },
  languageText: {
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  iconLanguage: {
    width: 24,
    height: 24
  }
})
