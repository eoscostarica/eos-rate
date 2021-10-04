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
  },
  grow: {
    flexGrow: 1
  },
  eoscostaricaLogo: {
    height: 36,
    width: 'auto'
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  legend: {
    display: 'flex',
    width: 150,
    lineHeight: '1.4 !important',
    fontSize: '8px !important',
    fontWeight: '500 !important',
    fontStretch: 'normal',
    letterSpacing: '1.1px !important',
    textAlign: 'right !important',
    color: 'rgba(255, 255, 255, 0.6)',
    paddingRight: theme.spacing(2)
  }
})
