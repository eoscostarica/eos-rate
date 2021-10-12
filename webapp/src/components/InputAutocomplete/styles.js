export default theme => ({
  root: {
    flexGrow: 1,
    '& input': {
      color: theme.palette.common.white,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 20,
      lineHeight: '23px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent !important'
    }
  },
  container: {
    position: 'relative',
    margin: 'auto',
    borderRadius: 4,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 344,
      height: 58,
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.45)'
      }
    }
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
    color: theme.palette.common.white
  }
})
