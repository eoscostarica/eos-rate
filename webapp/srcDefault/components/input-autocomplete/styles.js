export default theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  input: {
    color: 'white'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: '-24px',
    right: 0,
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      left: 0,
      width: 'auto'
    }
  },
  highlightMatch: {
    fontWeight: 600
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  inputAdornment: {
    margin: '5px 25px 5px 0',
    [theme.breakpoints.up('md')]: {
      margin: '5px 25px'
    }
  },
  searchIcon: {
    fill: 'white'
  }
})
