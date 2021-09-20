export default theme => ({
  root: {
    padding: theme.spacing(2),
    border: '1px solid green'
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
