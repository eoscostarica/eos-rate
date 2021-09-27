export default theme => ({
  wrapper: {
    color: 'inherit'
  },
  languageText: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      marginLeft: `${theme.spacing(0.5)} !important`,
      display: 'inline',
      color: theme.palette.common.white,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 20,
      lineHeight: '23px'
    }
  },
  iconLanguage: {
    width: 24,
    height: 24,
    color: theme.palette.common.white
  }
})
