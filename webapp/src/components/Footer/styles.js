export default theme => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  listItem: {
    display: 'inline-block',
    width: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&:hover, &:active:': {
      color: theme.palette.action.selected
    }
  }
})
